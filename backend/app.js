const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const Pusher = require("pusher");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const customerAuth = require("./middleware/verify.js").Verify;
const verify = require("./auth/verifyOTP.js");
const signup = require("./auth/signup.js");
const login = require("./auth/login.js");
const usersRouter = require("./controllers/users");
const businessRouter = require("./controllers/business");
const blogRouter = require("./controllers/blog.js");
const adminRouter = require("./controllers/admin.js");
const investorRouter = require("./controllers/invester.js");
const adminlogin = require("./auth/adminLogin.js");
const applicantRouter = require("./controllers/applicant.js");
const superRouter = require("./controllers/superAdmin.js");
const franchiseRouter = require("./controllers/franchise.js");
const notificationRouter = require("./controllers/notification.js");
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
const cors = require('cors')
dotenv.config();
const client = new MongoClient(
  process.env.MONGO_URL,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

app.use(cors())

app.use(express.json());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Origin, X-Requested-With, Accept,  Authorization");
    next();
  });

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/user", usersRouter);
app.use("/business", customerAuth, businessRouter);
app.use("/investor", customerAuth, investorRouter);
app.use("/franchise", franchiseRouter);
app.use("/verify", verify);
app.use("/login", login);
app.use("/signup", signup);
app.use("/auth", adminlogin);
app.use("/blog", blogRouter);
app.use("/admin", adminRouter);
app.use("/superadmin", superRouter);
app.use("/applicant", applicantRouter);
app.use('/notification', notificationRouter);
app.use('/chat', require('./controllers/whatsapp.js'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;