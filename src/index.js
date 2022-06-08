const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//variables globales
app.use((req, res, next) => {
    next();
});

//rutas
app.use(require('./routes'));
app.use(require('./routes/autentication'));
app.use('/links', require('./routes/links'));

//publicos
app.use(express.static(path.join(__dirname, 'public')));

//start
app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'))
});