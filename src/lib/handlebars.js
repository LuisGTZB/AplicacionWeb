
//mostrar un contador de cuando se publico el articulo
const { format } = require('timeago.js');

//ya no es necesario instanciar solo mandar a llamar el metodo format

//const timeagoInstancia = timeago(); 

const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
}

module.exports = helpers;

