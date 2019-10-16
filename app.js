const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path')
const bodyParser = require('body-parser');
const fs = require('fs');

// Body Parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
const exphbs  = require('express-handlebars');
app.engine( 'hbs', exphbs( {
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
      json: function (content) { return JSON.stringify(content); },
      ifEquals: function(arg1, arg2, options) {return (arg1 == arg2) ? options.fn(this) : options.inverse(this);}
    },
    layoutsDir: path.join(__dirname, "views/layouts/"),
    partialsDir: path.join(__dirname, 'views/partials')
  }));

app.set('view engine', '.hbs');


// Routes
app.use(express.static(__dirname + '/public')); //Public

app.get('/', (req,res) =>{
    res.render('login')
})


app.get('/dashboard', (req,res) =>{
  res.render('dashboard')
})

  

app.listen(PORT, console.log(`Server started on port ${PORT}`))