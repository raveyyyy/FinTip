const Entity = require("../models/Goals"),
  bulkWrite = require("../config/bulkWrite"),
  handleQuery = require("../config/query"),
  handleDuplicate = require("../config/duplicate");

const baseUpdate = (req, res, message) =>
  Entity.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  })
    .populate({
      path: "saving",
      select: "name balance",
    })
    .populate({
      path: "investment",
      select: "name amount",
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
    .populate({
      path: "saving",
      select: "name",
    })
    .populate({
      path: "investment",
      select: "name",
    })
    .select("-__v")
    .sort({ createdAt: -1 })
    .lean()
    .then(items =>
      res.json({
        success: "Goals Fetched Successfully",
        payload: items,
      })
    )
    .catch(error => res.status(400).json({ error: error.message }));

exports.find = (req, res) =>
  Entity.find(handleQuery(req.query))
    .populate({
      path: "saving",
      select: "name balance deleted",
    })
    .populate({
      path: "investment",
      select: "name amount deleted",
    })
    .sort({ createdAt: -1 })
    .lean()
    .then(payload => {
      var _payload = [...payload];
      const newPayload = _payload.filter(item =>
        item.investment ? !item.investment.deleted : !item.saving.deleted
      );
      res.json({
        success: "Goal(s) Found Successfully",
        payload: newPayload,
      });
    })
    .catch(error => res.status(400).json({ error: error.message }));

exports.save = (req, res) =>
  Entity.create(req.body)
    .populate({
      path: "saving",
      select: "name balance",
    })
    .populate({
      path: "investment",
      select: "name amount",
    })
    .then(item =>
      res.status(201).json({
        success: "Goal Created Successfully",
        payload: item,
      })
    )
    .catch(error => res.status(400).json({ error: handleDuplicate(error) }));

exports.update = (req, res) => {
  if (Array.isArray(req.body)) {
    bulkWrite(req, res, Entity, "Multiple Goals Updated Successfully");
  } else {
    baseUpdate(req, res, "User Updated Successfully");
  }
};
exports.destroy = (req, res) => {
  if (Array.isArray(req.body)) {
    bulkWrite(req, res, Entity, "Multiple Goals deleted!");
  } else {
    baseUpdate(req, res, "Goal deleted Successfully");
  }
};
