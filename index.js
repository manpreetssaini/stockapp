const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;


//use bodyparser middleware

app.use(bodyParser.urlencoded({extended: false}));

// api key pk_5f805ca504d74f89a9658b2d1f36a56d
//create call api function

function callApi(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_5f805ca504d74f89a9658b2d1f36a56d', { json: true }, (err, res, body) => {
    if (err) {return (err);}
    if (res.statusCode === 200){
        finishedAPI(body);
        };
    });
};

// set handlebars middleware

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');




//set handlebar index GET routes
app.get('/', function (req, res) {
    callApi(function(doneAPI)  {
            res.render('home', {
            stock: doneAPI
        });
    }, "fb");
});


//set handlebar index POST routes
app.post('/', function (req, res) {
    callApi(function(doneAPI)  {
            //posted_stuff = req.body.stock_ticker;
            res.render('home', {
            stock: doneAPI
        });
    }, req.body.stock_ticker);
});


// create about page route

app.get('/about.html', function (req, res) {
    res.render('about', {
    });
});


// set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server listening on port ' + PORT));