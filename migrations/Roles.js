const { default: mongoose } = require("mongoose");
const Entity = require("../models/Roles");

const array = [
  {
    _id: "647dd18adced91b0b39444ab",
    name: "ADMINISTRATOR",
  },
  {
    _id: "647dd1e9dced91b0b39444ad",
    name: "USER",
  },
  {
    _id: "654be5c0b40f46df0ebf2ced",
    name: "VIP",
  },
];

exports.roles = (req, res) => {
  mongoose.connection.db.dropCollection("roles");
  Entity.insertMany(array)
    .then(response => {
      res.status(201).json({
        message: "Success",
        paylaod: response,
      });
    })
    .catch(err => res.status(400).json({ message: err.message }));
};
