const express = require("express");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const auth = nodemailer.createTransport({
  service: "gmail",
  secure: "true",
  port: "465",
  auth: {
    user: "divyanshu.designoweb@gmail.com",
    pass: "spfuwgvcgyehwhwc",
  },
});

app.post("/sendEmail", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 10000);
  res.render("welcomeMessage", { randomNumber }, (err, template) => {
    if (err) {
      throw err;
    } else {
      const reciever = {
        from: "divyanshu.designoweb@gmail.com",
        to: "tanishk.designoweb@gmail.com",
        subject: "Testing nodemailer",
        html: template,
      };

      auth.sendMail(reciever, (error, response) => {
        if (error) {
          throw error;
        }
        console.log("mail sent successfully");
        res.status(200).json({
          message: "Mail sent successfully.",
        });
      });
    }
  });
  //   ejs.renderFile(__dirname + "/views/welcomeMessage.ejs", (error, template) => {
  //     if (error) {
  //       throw error;
  //     } else {
  //       const reciever = {
  //         from: "divyanshu.designoweb@gmail.com",
  //         to: "divyanshu022030@gmail.com",
  //         subject: "Testing nodemailer",
  //         html: template,
  //       };

  //       auth.sendMail(reciever, (error, response) => {
  //         if (error) {
  //           throw error;
  //         }
  //         console.log("mail sent successfully");
  //         res.status(200).json({
  //           message: "Mail sent successfully.",
  //         });
  //       });
  //     }
  //   });
});

app.listen(4000, () => {
  console.log("Server started on 4000");
});
