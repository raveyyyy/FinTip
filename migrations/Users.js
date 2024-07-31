const Entity = require("../models/Users");

const array = [
  {
    _id: "647dd2a5dced91b0b39444b3",
    fullName: {
      fname: "Admin",
      mname: "Admin",
      lname: "Admin",
    },
    address: {
      street: "SAMPLE",
      barangay: "SAMPLE",
      city: "SAMPLE",
      province: "SAMPLE",
      region: "REGION 3",
    },
    mobile: "9324234234",
    bio: "afsdf\n",
    dob: "1999-09-15",
    role: "647dd18adced91b0b39444ab", // Administrator
    email: "admin@gmail.com",
    password: "password",
  },
  {
    _id: "647dd2a5dced91b0b39444b4",
    fullName: {
      fname: "user",
      mname: "user",
      lname: "user",
    },
    address: {
      street: "SAMPLE",
      barangay: "SAMPLE",
      city: "SAMPLE",
      province: "SAMPLE",
      region: "REGION 3",
    },
    mobile: "9324234234",
    bio: "afsdf\n",
    dob: "1999-09-15",
    role: "647dd1e9dced91b0b39444ad", // User
    email: "user@gmail.com",
    password: "password",
  },
];

exports.users = (req, res) =>
  Entity.create(array)
    .then(response => {
      res.status(201).json({
        message: "Success",
        paylaod: response,
      });
    })
    .catch(err => res.status(400).json({ message: err.message }));
