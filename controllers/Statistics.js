const Expenses = require("../models/Expenses"),
  Savings = require("../models/Savings"),
  Chat = require("../models/Chats"),
  Goals = require("../models/Goals"),
  Investments = require("../models/Investments");
const handleQuery = require("../config/query");
const OpenAI = require("openai");
const Users = require("../models/Users");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
exports.browse = (req, res) =>
  Expenses.find(handleQuery(req.query))
    .populate({
      path: "budget",
      select: "name amount start end",
    })
    .sort({ createdAt: -1 })
    .lean()
    .then(async payload => {
      const investments = await Investments.find(handleQuery(req.query));
      const savings = await Savings.find(handleQuery(req.query));
      var items = [];
      payload.map(item => {
        var index = items.findIndex(pay => pay.budget === item.budget._id);
        if (index < 0) {
          items.push({
            budget: item.budget._id,
            budgetAmount: item.budget.amount,
            expenses: item.amount,
            name: `${item.budget.name} balance=(${
              item.budget.amount - item.amount
            })`,
          });
        } else {
          items[index].expenses += item.amount;
          items[index].name = `${item.budget.name} balance=(${
            item.budget.amount - (items[index].expenses + item.amount)
          })`;
        }
      });
      let savingsActive = [...savings];
      let investmentsActive = [...investments];
      var _payload = {
        budgets: [],
        expenses: [],
        labels: [],
        savings: savingsActive.filter(saving => !saving.deleted),
        income: 0,
        totalExpenses: 0,
      };
      investmentsActive
        .filter(saving => !saving.deleted)
        .forEach(investment => {
          if (investment.return > investment.amount) {
            _payload.income += investment.return - investment.amount;
          }
        });
      items.map(item => {
        _payload.budgets.push(item.budgetAmount);
        _payload.expenses.push(item.expenses);
        _payload.labels.push(item.name);
      });
      _payload.expenses.forEach(a => (_payload.totalExpenses += a));
      res.json({
        success: "Budget(s) Found Successfully",
        payload: _payload,
      });
    })
    .catch(error => res.status(400).json({ error: error.message }));

exports.admin = (req, res) =>
  Users.find()
    .populate({
      path: "role",
      select: "name",
    })
    .sort({ createdAt: -1 })
    .lean()
    .then(async payload => {
      const items = payload.filter(
        item => item?.role?.name === "USER" || item?.role?.name === "VIP"
      );
      const newUser = items.filter(
        user =>
          new Date(user.createdAt).toLocaleString().split(",")[0] ===
          new Date().toLocaleString().split(",")[0]
      ).length;

      const total = items.length;

      const pending = items.filter(user => user.wasBanned === true).length;

      let barData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let dates = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      items.forEach(item => {
        const month = new Date(item.createdAt).toDateString().split(" ")[1];
        const isExist = dates.indexOf(month);
        barData[isExist]++;
      });

      const data = { pending, new: newUser, total, barData, dates };
      res.json({
        success: "Data successfully generated",
        payload: data,
      });
    })
    .catch(error => res.status(400).json({ error: error.message }));

exports.bot = (req, res) =>
  Expenses.find(handleQuery(req.query))
    .populate({
      path: "budget",
      select: "name amount start end",
    })
    .sort({ createdAt: -1 })
    .lean()
    .then(async payload => {
      const GoalsData = await Goals.find(handleQuery(req.query))
        .populate({
          path: "saving",
          select: "name balance increase deleted",
        })
        .populate({
          path: "investment",
          select: "name type amount return deleted",
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
      payload.map(item => {
        var index = items.findIndex(pay => pay.budget === item.budget._id);
        if (index < 0) {
          items.push({
            budgetAmount: item.budget.amount,
            expenses: item.amount,
            name: item.name,
          });
        } else {
          items[index].expenses += item.amount;
          items[index].name = `${item.budget.name} balance=(${
            item.budget.amount - (items[index].expenses + item.amount)
          })`;
        }
      });
      let promt = "";
      items.forEach(item => {
        promt += `my budget for ${item.name} is ${item.budgetAmount} pesos my expenses for ${item.name} is ${item.expenses} pesos. `;
      });
      investments.forEach(item => {
        promt += `my investment for ${item.name} type ${item.type} amount ${item.amount} pesos total return ${item.return} pesos. `;
      });
      savings.forEach(item => {
        promt += `my saving for ${item.name} balance ${
          item.balance
        } pesos increase ${item.increase} pesos every ${
          item.isMonthly ? "Monthly" : "Annualy"
        }. `;
      });
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              // "You are a helpful professional financial advisor. Your task is to provide personalized advice and techniques to a user based on data provided. The user is seeking guidance to improve their financial status. Generate HTML content to present the advice and techniques in an organized and clear format.",
              "You are a professional financial advisor, exclusively providing guidance on financial matters anything not about financial reply I'am financial advicor bot. Your task is to offer personalized advice and techniques to a user seeking to enhance their financial status. Please refrain from answering questions unrelated to financial topics. Provide recommendations based on the user's financial data, covering areas such as income, expenses, savings, investments, and financial goals.",
          },
          {
            role: "user",
            content: promt,
          },
        ],
        model: "gpt-3.5-turbo-1106",
      });
      Chat.create({
        answer: completion.choices[0].message.content,
        user: handleQuery(req.query).user.$eq,
      });
      res.json({
        success: "Financial advice generated successfully",
        payload: completion.choices[0].message.content,
      });
    });
