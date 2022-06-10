const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLstore = require('express-mysql-session');
const databse = require('./keys');
const { database } = require('./keys');


//inicializacion
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
const hbs =  exphbs.create({
    defaultLayaut: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//midlewares
app.use(session({
    secret: 'luisgtzwebapilnlstore',
    resave: false,
    saveUninitialized: false,
    store: new MySQLstore(database)

}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//variables globales
app.use((req, res, next) => {
    app.locals.exito = req.flash('exito');
    next();

});

//rutas
app.use(require('./routes'));
app.use(require('./routes/autentication'));
app.use('/products', require('./routes/links'));

//publicos
app.use(express.static(path.join(__dirname, 'public')));

//start
app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'))
});