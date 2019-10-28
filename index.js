const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 5000;



// set handlebars middleware

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff i added"


//set handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: otherstuff
    });
});



// set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server listening on port ' + PORT));