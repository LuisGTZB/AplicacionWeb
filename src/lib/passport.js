const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM  users WHERE username = ?', [username]);
    if( rows.length > 0 ) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword) {
            done(null, user, req.flash('exito', 'Bienvenido ' + user.username));
        } else {
            done(null, false, req.flash('message','contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'No existe este usuario'));
    }
    //console.log(req.body);
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { nombre } = req.body;
    const newUser = {
        username,
        password,
        nombre
    };
    newUser.password = await helpers.encryptPassword(password);

    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);

    //console.log(result);
    //console.log(req.body);

}));

passport.serializeUser((user, done) => {
    done(null, user.id);

});

passport.deserializeUser( async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});
