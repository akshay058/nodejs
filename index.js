const express = require('express');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const app =express();
const port =8000;

//use layouts in ejs USE BEFORE ROUTES.....
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//database connection...
const db = require('./config/mongoose');

//cookies
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

//use static files such as css , images, js
app.use(express.static('./assets'));


//use express router
app.use('/',require('./routes/index'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`); ///here we are using `` this are back ticks at left side of 1 function key
    }
    console.log(`Server is running on port: ${port}`); // ${} .... using this is called INTERPOLATION
});