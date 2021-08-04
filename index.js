const express = require('express');
const sequelize = require("./config/connection")

// Sets up the Express App
// =============================================================
const app = express();
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
const routes = require('./controllers');


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

const exphbs = require('express-handlebars');

// const hbs = exphbs.create({});

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

const session = require("express-session")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge:1000*60*60*2
    },
    store: new SequelizeStore({
        db: sequelize,
      })
}))

app.use('/',routes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});