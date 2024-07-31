const Entity = require("../models/Savings"),
  Goals = require("../models/Goals"),
  bulkWrite = require("../config/bulkWrite"),
  handleQuery = require("../config/query"),
  handleDuplicate = require("../config/duplicate");

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
        success: "Savings Fetched Successfully",
        payload: items,
      })
    )
    .catch(error => res.status(400).json({ error: error.message }));

exports.find = (req, res) =>
  Entity.find(handleQuery(req.query))
    .sort({ createdAt: -1 })
    .lean()
    .then(payload =>
      res.json({
        success: "Saving(s) Found Successfully",
        payload,
      })
    )
    .catch(error => res.status(400).json({ error: error.message }));

exports.save = (req, res) =>
  Entity.create(req.body)
    .then(item => {
      Goals.create({
        saving: item._id,
        user: req.body.user,
        start: new Date(),
        target: req.body.balance * 5,
        // start: req.body.start,
      });
      res.status(201).json({
        success: "Saving Created Successfully",
        payload: item,
      });
    })
    .catch(error => res.status(400).json({ error: handleDuplicate(error) }));

exports.update = (req, res) => {
  if (Array.isArray(req.body)) {
    bulkWrite(req, res, Entity, "Multiple Savings Updated Successfully");
  } else {
    baseUpdate(req, res, "User Updated Successfully");
  }
};
exports.destroy = (req, res) => {
  if (Array.isArray(req.body)) {
    bulkWrite(req, res, Entity, "Multiple Savings deleted!");
  } else {
    baseUpdate(req, res, "Saving deleted Successfully");
  }
};
