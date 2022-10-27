const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug");
const cors = require("cors");
const csurf = require("csurf");

require("./models/User");
require("./models/Mailinglist");
require("./models/Post");
require("./config/passport");

const passport = require("passport");

const { isProduction } = require("./config/keys");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

if (!isProduction) {
  app.use(cors());
}
// app.use(csrf());
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

const mailinglistsRouter = require("./routes/api/mailinglists");
const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");
const mailRouter = require('./routes/api/mail');

app.use("/api/mailinglists", mailinglistsRouter);
app.use("/api/users", usersRouter);
app.use("/api/csrf", csrfRouter);
app.use("/api/mail", mailRouter);

// if (isProduction) {
//   const path = require("path");

//   app.get("/", (req, res) => {
//     res.cookie("CSRF-TOKEN", req.csrfToken());
//     res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
//   });

//   app.use(express.static(path.resolve("../frontend/build")));

//   app.get(/^(?!\/?api).*/, (req, res) => {
//     res.cookie("CSRF-TOKEN", req.csrfToken());
//     res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
//   });
// }

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug("backend:error");

app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors,
  });
});

module.exports = app;
