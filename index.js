const express = require("express");
const sequelize = require("./config/connection");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
const allRoutes = require("./controllers");
// const helpers = require("./utils/date")

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

const exphbs = require("express-handlebars");

const hbs = exphbs.create({
  helpers: {
    dateFormat(date) {
      return `${new Date(date).getMonth() + 1}/${new Date(
        date
      ).getDate()}/${new Date(date).getFullYear()}`;
    },
    plural: (word, amount) => {
      if (amount !== 1) {
        return `${word}s`;
      }

      return word;
    },
  },
  defaultLayout: "main",
  partialsDir: ["views/partials/"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});