var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session  = require('express-session');

var surveyRouter = require('./app/routes/survey.server.routes');

var app = express();
app.locals.products = ['iPhone XS Max', 'Huawei Mate 20X', 'Pixel 3 XL', 'Samsung S10'];
app.locals.surveyresults = {
    fp: [0, 0, 0, 0], mp: [0, 0, 0, 0]
};

app.set('views', path.join(__dirname, 'app/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// addtion
app.use(session({
    secret:'shhhh',
    cookie: {maxAge: 60000},
    resave: true,
    saveUninitialized: true
}))

app.use("/", surveyRouter);


app.listen(3000, function() {
    console.log('survey app is listening on port 3000!');
});
