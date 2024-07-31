const Entity = require("../models/Chats"),
  Goals = require("../models/Goals"),
  Expenses = require("../models/Expenses"),
  bulkWrite = require("../config/bulkWrite"),
  handleQuery = require("../config/query"),
  OpenAI = require("openai"),
  handleDuplicate = require("../config/duplicate");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const baseUpdate = (req, res, message) =>
  Entity.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  })
    .then(payload => {
      if (payload) {
        res.json({
          success: message,
          payload,
        });
      } else {
        res.status(404).json({
          error: "ID Not Found",
          message: "The provided ID does not exist.",
        });
      }
    })
    .catch(error => res.status(400).json({ error: handleDuplicate(error) }));

exports.browse = (req, res) =>
  Entity.find()
    .populate({
      path: "user",
      select: "fullName",
    })
    .select("-__v")
    .sort({ createdAt: -1 })
    .lean()
    .then(items =>
      res.json({
        success: "Chats Fetched Successfully",
        payload: items,
      })
    )
    .catch(error => res.status(400).json({ error: error.message }));

exports.find = (req, res) =>
  Entity.find(handleQuery(req.query))
    .lean()
    .then(payload =>
      res.json({
        success: "Chat(s) Found Successfully",
        payload,
      })
    )
    .catch(error => res.status(400).json({ error: error.message }));

exports.save = async (req, res) => {
  const GoalsData = await Goals.find({
    user: { $eq: req.body._id },
  })
    .populate({
      path: "saving",
      select: "name balance increase deleted",
    })
    .populate({
      path: "investment",
      select: "name type amount return deleted",
    });
  const ExpensesData = await Expenses.find({
    user: { $eq: req.body._id },
  }).populate({
    path: "budget",
    select: "name amount start end",
  });
  const filtered = await GoalsData.filter(
    e => e?.investment?.deleted === false || e?.saving?.deleted === false
  );

  var investments = [];
  var savings = [];

  filtered.forEach(data => {
    if (data.investment) {
      investments.push({
        name: data.investment.name,
        type: data.investment.type,
        amount: data.investment.amount,
        return: data.investment.return,
      });
    } else {
      savings.push({
        name: data.saving.name,
        balance: data.saving.balance,
        increase: data.saving.increase,
      });
    }
  });
  var items = [];
  ExpensesData.map(item => {
    var index = items.findIndex(pay => pay.budget === item.budget._id);
    if (index < 0) {
      items.push({
        budgetAmount: item.budget.amount,
        expenses: item.amount,
        name: item.name,
      });
    } else {
      items[index].expenses += item.amount;
    }
  });
  let promt = "";
  items.forEach(item => {
    promt += `user budget for ${item.name} is ${item.budgetAmount} pesos user expenses for ${item.name} is ${item.expenses} pesos. `;
  });
  investments.forEach(item => {
    promt += `user investment for ${item.name} type ${item.type} amount ${item.amount} pesos total return ${item.return} pesos. `;
  });
  savings.forEach(item => {
    promt += `user saving for ${item.name} balance ${
      item.balance
    } pesos increase ${item.increase} pesos every ${
      item.isMonthly ? "Monthly" : "Annualy"
    }. `;
  });
  filtered.forEach(item => {
    promt += `user financial goal for ${
      item.saving ? "savings" : "investment"
    } target ${item.target}`;
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a professional financial advisor, exclusively providing guidance on financial matters anything that not connected in financial response You dont know. Your task is to offer personalized advice and techniques to a user seeking to enhance their financial status. Please refrain from answering questions unrelated to financial topics. Provide recommendations based on the user's financial data, covering areas such as income, expenses, savings, investments, and financial goals." +
          // "You are a dedicated and knowledgeable financial advisor. Your role is to offer personalized advice and expert techniques exclusively in the realm of finance. Respond only to queries related to financial matters and utilize any user-provided information regarding their financial situation to generate tailored responses" +
          promt,
      },
      {
        role: "user",
        content: req.body.question,
      },
    ],
    model: "gpt-3.5-turbo-1106",
  });
  var data = {
    tab: req.body.tab,
    question: req.body.question,
    answer: completion.choices[0].message.content,
    user: req.body.user,
  };
  Entity.create(data)
    .then(async item => {
      res.status(201).json({
        success: "Chat Created Successfully",
        payload: item,
      });
    })
    .catch(error => res.status(400).json({ error: handleDuplicate(error) }));
};

exports.update = (req, res) => {
  if (Array.isArray(req.body)) {
    bulkWrite(req, res, Entity, "Multiple Chats Updated Successfully");
  } else {
    baseUpdate(req, res, "User Updated Successfully");
  }
};
exports.destroy = (req, res) => {
  if (Array.isArray(req.body)) {
    bulkWrite(req, res, Entity, "Multiple Chats deleted!");
  } else {
    baseUpdate(req, res, "Chat deleted Successfully");
  }
};
