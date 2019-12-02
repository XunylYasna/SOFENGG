const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path')
const bodyParser = require('body-parser');
const fs = require('fs');
const stringify = require('csv-stringify');

// Body Parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
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
app.use('/headings', require('./routes/headings'))



// Redirects
app.get('/dashboard', (req, res) => {

  // const dataSet = PRF.find().lean().exec(function (err, prfs) {
  //   return res.end(JSON.stringify(prfs));
  // })


  PRF.find({}, function (err, prfs) {
    var dataSet = {};

    prfs.forEach(function (prfs) {
      dataSet[prfs._id] = prfs;
    });

    console.log(dataSet)

    res.render("dashboard.hbs", {
      dataSet
    })
  });



})

app.get('/login', (req, res) => {
  res.render("login.hbs")
})

app.get('/grossreport', (req, res) => {
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
        dataSet
      })
    }
  })
})



app.get('/passwordmanager', (req, res) => {
  res.render("passwordmanager.hbs")
})

app.get('/export', (req, res) => {

  PO.find({}, function (err, po) {
    var dataSet = {};

    po.forEach(function (po) {
      dataSet[po._id] = po;
    });

    if (err) {
      res.send(err)
    }


    // JSON to csv

    const dataSetKey = Object.keys(dataSet)

    var dataArray = ["PRF Number", "PO Number", "Buyer", "Date", "PAX Name", "Route", "Description", "USD Amount", "PHP Amount", "Total", "Prepared By", "Approved By", "Received By"];
    dataSetKey.forEach((key, index) => {
      const data = dataSet[key]
      dataArray[index + 1] = [data.prfNumber, data.poNumber, data.buyer, data.date, data.paxName, data.route, data.description, data.usAmount, data.phpAmount, data.total, data.preparedBy, data.approvedBy, data.receivedBy]
    })

    const poDownload = dataArray.join(",");
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'PO export ' + Date.now() + '.csv\"');
    res.send(poDownload);
  });


  // PRF.find({}, function (err, prfs) {    
  //   var dataSet = {};

  //   prfs.forEach(function (prfs) {
  //     dataSet[prfs._id] = prfs;
  //   });

  //   console.log(dataSet)

  //   if(err){
  //     res.send(err)
  //   }

  //   res.render("dashboard.hbs", {
  //     dataSet
  //   })
  // });
})




app.listen(PORT, console.log(`Server started on port ${PORT}`))