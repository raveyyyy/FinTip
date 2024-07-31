const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const Entity = require("../models/Users");
const generateToken = require("../config/generateToken");

const transporter = nodemailer.createTransport({
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_HOST,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

let readHTMLFile = (path, cb) => {
  fs.readFile(path, { encoding: "utf-8" }, (err, html) => {
    if (err) {
      throw err;
    } else {
      cb(null, html);
    }
  });
};

exports.sendLink = (req, res) => {
  readHTMLFile("./mails/link.html", (err, html) => {
    let template = handlebars.compile(html);
    let replacements = {
      link: req.body.link,
      message: req.body.message,
      appName: process.env.APP_NAME,
    };
    let htmlToSend = template(replacements);
    let msg = {
      from: `${process.env.APP_NAME} Team <${process.env.EMAIL_USER}>`,
      to: req.body.to,
      subject: req.body.subject,
      html: htmlToSend,
      attachments: [
        {
          filename: "default.png",
          path: "./assets/default.png",
          cid: "aplogo",
        },
      ],
    };
    transporter
      .sendMail(msg)
      .then(() => {
        return res.json({ message: "Email sent successfully." });
      })
      .catch(err => () => {
        return res.json({ message: err });
      });
  });
};

exports.sendCode = (req, res) => {
  readHTMLFile("./mails/code.html", (err, html) => {
    let template = handlebars.compile(html);
    let replacements = {
      code: req.body.code,
      message: req.body.message,
      username: req.body.username,
      appName: process.env.APP_NAME,
    };
    let htmlToSend = template(replacements);
    let msg = {
      from: `${process.env.APP_NAME} Team <${process.env.EMAIL_USER}>`,
      to: req.body.to,
      subject: req.body.subject,
      html: htmlToSend,
      attachments: [
        {
          filename: "default.png",
          path: "./assets/default.png",
          cid: "aplogo",
        },
      ],
    };
    transporter
      .sendMail(msg)
      .then(() => {
        return res.json({ message: "Email sent successfully." });
      })
      .catch(err => () => {
        return res.json({ message: err });
      });
  });
};

exports.forgotPassword = (req, res) => {
  const { email, password } = req.body;
  Entity.findOne({ email })
    .select("-createdAt -updatedAt -__v")
    .populate({ path: "role", select: "name" })
    .then(async item => {
      if (item) {
        const token = generateToken({ _id: item._id, role: item.role });
        readHTMLFile("./mails/link.html", (err, html) => {
          let template = handlebars.compile(html);
          let replacements = {
            link: `http://localhost:3000/reset-password/${item._id}/${token}`,
            message: "Request a Reset Password",
            appName: process.env.APP_NAME,
          };
          let htmlToSend = template(replacements);
          let msg = {
            from: `${process.env.APP_NAME} Team <${process.env.EMAIL_USER}>`,
            to: item.email,
            subject: "Sending Email using Node.js",
            html: htmlToSend,
          };
          console.log(email);
          transporter
            .sendMail(msg)
            .then(() => {
              return res.json({
                message: "Email sent successfully check your email.",
              });
            })
            .catch(err => () => {
              return res.json({ message: err });
            });
        });
      } else {
        res.status(404).json({
          error: "Email not found",
          message: "Please provide registered email.",
        });
      }
    })
    .catch(err => () => {
      return res.json({ message: err });
    });
};
