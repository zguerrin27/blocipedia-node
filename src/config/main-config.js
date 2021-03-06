require("dotenv").config();
const logger = require('morgan');
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const passportConfig = require("./passport-config");
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

module.exports = {
  init(app, express){
    app.use(logger('dev'));
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(session({
      secret: "process.env.cookieSecret",             // "do not let this get checked into version control" from .env added to heroku with a command// 
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 } //set cookie to expire in 14 days
    }));
    app.use(flash());
    passportConfig.init(app);
    app.use((req,res,next) => {
      res.locals.currentUser = req.user;
      next();
    })
  }
};