const express = require('express');

const server = express();

server.get('/', function(resuest, response) {
    /* response.send('Hello Root'); */
    response.sendfile('index.html');
});
server.post('/usuarios', function(resuest, response) {
    var usuarios = {
        name: 'Juanito',
        lastname: 'Perez',
        username: 'jperez',
        password: '1234'
    };
    response.send(usuarios);
});
server.listen(3000, function() {
    console.log('Server running on http://localhost:3000');
})