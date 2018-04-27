const Hapi = require('hapi');
const dotenv = require('dotenv');
const inert = require('inert');

dotenv.load();
const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: 3000
});
server.register([{
    register: require('hapi-router'),
    options: {
        routes: 'routes/**/*.js'
    }
}, {
    register: require('hapi-postgres-connection')
}, {
    register: inert
}], function(err) {
    if (err) {
        console.log('Error cargando un modulo');
    }
});

server.start(function() {
    console.log('Server running on: ', server.info.uri);
});
module.exports = server;