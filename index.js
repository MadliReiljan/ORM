const express = require("express");
const app = express();
const sessions = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

const path = require('path')
const hbs = require('express-handlebars','hbs');
const handlebars = require('handlebars');
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, 
        allowProtoMethodsByDefault: true,    
    }
}))
app.use(express.static('public'));
app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}))

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch(err => {
        console.error('Unable to connect to the database', err);
    });

//using routes and controllers
const articleRouter = require('./routes/article');
app.use('/', articleRouter);
app.use('/article', articleRouter)
app.use('admin/article', articleRouter)

const authorRouter = require('./routes/author.js');
app.use('/', authorRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});