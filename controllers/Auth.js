const nodemailer = require("nodemailer");
const Entity = require("../models/Users"),
  handlebars = require("handlebars"),
  fs = require("fs");
const generateToken = require("../config/generateToken");
const verifyToken = require("../config/verifyToken");
const jwt = require("jsonwebtoken");

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
const decodedToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
exports.login = (req, res) => {
  const { email, password } = req.query;

  Entity.findOne({ email })
    .select("-createdAt -updatedAt -__v")
    .populate({ path: "role", select: "name" })
    .then(async item => {
      const handleSuccess = () => {
        const user = { ...item._doc };
        delete user.password;
        const token = verifyToken({ _id: item._id, role: item.role });
        if (!user.verified) {
          readHTMLFile("./mails/link.html", async (err, html) => {
            let template = handlebars.compile(html);
            let replacements = {
              link: `http://localhost:3000/verify/${token}`,
              message: "Verification",
              appName: process.env.APP_NAME,
            };
            let htmlToSend = template(replacements);
            let msg = {
              from: `${process.env.APP_NAME} Team <${process.env.EMAIL_USER}>`,
              to: item.email,
              subject: "Sending Email using",
              html: htmlToSend,
            };
            await transporter
              .sendMail(msg)
              .then(() => {
                return res.json({
                  success: "Verification send",
                  // payload: {
                  //   token: generateToken({ _id: item._id, role: item.role }),
                  //   user,
                  // },
                });
              })
              .catch(err => () => {
                return res.json({ message: err });
              });
          });
        } else {
          return res.json({
            success: "Login Success",
            payload: {
              token: generateToken({ _id: item._id, role: item.role }),
              user,
            },
          });
        }
      };

      if (item) {
        if (await item.matchPassword(password)) {
          if (!item.wasBanned) {
            handleSuccess();
          } else {
            res.status(400).json({
              error: "User Banned or ongoing",
              message: item.wasBanned.for,
            });
          }
        } else {
          res.status(400).json({
            error: "Invalid Credentials",
            message: "The provided Credentials does not match.",
          });
        }
      } else {
        res.status(404).json({
          error: "User Not Found",
          message: "The provided Credentials does not exist.",
        });
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

exports.verifyLogin = (req, res) => {
  const { authorization } = req.headers;
  decodedToken(authorization.split(" ")[1])
    .then(response => {
      Entity.findById(response._id)
        .select("-createdAt -updatedAt -__v")
        .populate({ path: "role", select: "name" })
        .then(async item => {
          const handleSuccess = async () => {
            const user = { ...item._doc };
            delete user.password;
            await Entity.findByIdAndUpdate(
              user._id,
              { verified: true },
              {
                new: true,
              }
            );
            res.json({
              success: "Login Success",
              payload: {
                token: generateToken({ _id: item._id, role: item.role }),
                user,
              },
            });
          };

          if (item) {
            if (!item.wasBanned) {
              handleSuccess();
            } else {
              res.status(400).json({
                error: "User Banned or ongoing",
                message: item.wasBanned.for,
              });
            }
          } else {
            res.status(404).json({
              error: "User Not Found",
              message: "The provided Credentials does not exist.",
            });
          }
        })
        .catch(error => res.status(400).json({ error: error.message }));
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

exports.provideAuth = (req, res) =>
  res.json({
    success: "Validatation Success",
    payload: res.locals.caller,
  });

exports.upload = (req, res) => {
  const { path, base64, name } = req.body;
  const url = `./assets/${path}`;
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url, { recursive: true });
  }
  try {
    fs.writeFileSync(`${url}/${name}`, base64, "base64");
    return res.json({ message: "File Uploaded Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
