const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path')
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcryptjs')
const moment = require('moment');

// Body Parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs({
  extname: '.hbs',
  helpers: {
    json: function (content) { return JSON.stringify(content); },
    ifEquals: function (arg1, arg2, options) { return (arg1 == arg2) ? options.fn(this) : options.inverse(this); }
  },
  layoutsDir: path.join(__dirname, "views/layouts/"),
  partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', '.hbs');

// Mongoose Config and Connection
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));


// Express Session Middleware
const session = require('express-session');
app.use(session({
  secret: 'killroy',
  resave: true,
  saveUninitialized: true,
  //   cookie: { secure: true }
}))

// Passport middleware
const passport = require('passport');
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
const flash = require('connect-flash');
app.use(flash())

// Models
const PRF = require('./model/PRF')
const PO = require('./model/PO')
const User = require('./model/User')

//Global Var
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error_msg');
  next();
})


// Routes
app.use(express.static(__dirname + '/public')); //Public
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/prf', require('./routes/prf'))
app.use('/po', require('./routes/po'))
app.use('/export', require('./routes/export'))
app.use('/headings', require('./routes/headings'))




// Redirects
app.post('/dashboard', (req, res) => {

  // const dataSet = PRF.find().lean().exec(function (err, prfs) {
  //   return res.end(JSON.stringify(prfs));
  // })

  let invalid = 'INVALID'

  let password = req.body.pw
  User.findOne({ password: password }, function (err, doc) {
    if (err) {
      console.log(err)
    }

    if (doc && password == doc.password) {
      console.log(password)
      PRF.find({}, function (err, prfs) {
        var dataSet = {};

        prfs.forEach(function (prfs) {
          dataSet[prfs._id] = prfs;
        });

        console.log(dataSet)

        res.render("dashboard.hbs", {
          title: 'my other page', layout: 'dashboardLayout',
          dataSet
        })
      });
    }

    else {
      console.log("ERROR")
      res.render('login.hbs', { invalid: invalid })
    }

  })




})

app.post('/dashboard3', (req, res) => {
  let invalid = 'INVALID'
  PRF.find({}, function (err, prfs) {
    var dataSet = {};

    prfs.forEach(function (prfs) {
      dataSet[prfs._id] = prfs;
    });

    console.log(dataSet)

    res.render("dashboard.hbs", {
      title: 'my other page', layout: 'dashboardLayout',
      dataSet,
      invalid: invalid
    })
  });
})

app.post('/dashboard1', (req, res) => {
  let invalid = ''
  PRF.find({}, function (err, prfs) {
    var dataSet = {};

    prfs.forEach(function (prfs) {
      dataSet[prfs._id] = prfs;
    });

    console.log(dataSet)

    res.render("dashboard.hbs", {
      layout: 'dashboardLayout',
      dataSet,
      invalid: invalid
    })
  });
})

app.get('/login', (req, res) => {
  res.render("login.hbs")
})

app.post('/gross', (req, res) => {
  let password = req.body.pw
  let type = 'CO'

  User.findOne({ type: type }, function (err, doc) {
    if (err) {
      console.log(err)
    }
    if (doc && password == doc.password) {
      console.log(doc.password)
      console.log(password)

      PRF.find({}, function (err, prfs) {
        var dataSet = {};

        prfs.forEach(function (prfs) {
          dataSet[prfs._id] = prfs;
        });

        console.log(prfs)

        if (err) {
          throw (err)
        }
        else if (prfs) {
          res.render("grossreport.hbs", {
            layout: 'dashboardLayout',
            dataSet
          })
        }
      })

    }
    else {

      res.redirect(307, '/dashboard3')
    }
  })
})


app.post('/passwordmanager', (req, res) => {
  let password = req.body.pw
  let type = 'CO'

  User.findOne({ type: type }, function (err, doc) {
    if (err) {
      console.log(err)
    }
    if (doc && password == doc.password) {
      console.log(doc.password)
      console.log(password)
      res.render("passwordmanager.hbs", { layout: 'dashboardLayout' })
    }
    else {
      res.redirect(307, '/dashboard3')
    }
  })
})

app.post('/headings', (req, res) => {
  let password = req.body.pw
  let type = 'CO'

  User.findOne({ type: type }, function (err, doc) {
    if (err) {
      console.log(err)
    }
    if (doc && password == doc.password) {
      console.log(doc.password)
      console.log(password)
      res.render("headings.hbs")
    }
    else {
      res.redirect(307, 'dashboard3')
    }
  })
})

app.post("/staffNew", (req, res) => {
  let password = req.body.currentstaff
  let newPassword = req.body.newstaff
  let type = 'Staff'
  let errormessage = 'Current Password Does not Match with your Input...'
  let successmessage = 'Password Change Successful!!'

  User.findOne({ type: type }, (err, doc) => {
    if (err) {
      console.log(err)
    }
    if (doc && password == doc.password) {
      console.log('testing')
      User.updateOne({ type: type }, {
        type: type,
        password: newPassword
      }, (err, affected, resp) => {
        console.log(resp)
        res.render("passwordmanager.hbs", { layout: 'dashboardLayout', errormessage: successmessage })
      })
    }
    else {
      res.render("passwordmanager.hbs", { layout: 'dashboardLayout', errormessage: errormessage })
    }
  })
})



app.post("/ownerNew", (req, res) => {
  let password = req.body.currentowner
  let newPassword = req.body.newowner
  let type = 'CO'
  let errormessage = 'Current Password Does not Match with your Input...'
  let successmessage = 'Password Change Successful!!'

  User.findOne({ type: type }, (err, doc) => {
    if (err) {
      console.log(err)
    }
    if (doc && password == doc.password) {
      console.log('testing')
      User.updateOne({ type: type }, {
        type: type,
        password: newPassword
      }, (err, affected, resp) => {
        console.log(resp)
        res.render("passwordmanager.hbs", { layout: 'dashboardLayout', errormessage: successmessage })
      })
    }
    else {
      res.render("passwordmanager.hbs", { layout: 'dashboardLayout', errormessage: errormessage })
    }
  })
})



app.listen(PORT, console.log(`Server started on port ${PORT}`))