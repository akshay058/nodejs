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

//session encryption key
const session =require('express-session');


//used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// store session data in mongo ...
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//cookies
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

//use static files such as css , images, js
app.use(express.static('./assets'));

//session creation
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },

     store: MongoStore.create({
         mongoUrl:'mongodb://localhost/codeial_development',
        mongooseConnection: db,
        autoRemove: 'disabled'
       },
        function(err){
         console.log(err || 'connect-mongodb setup ok');
    })

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


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