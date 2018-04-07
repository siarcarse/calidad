const http = require('http');
const url = require('url');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer(function(request, response) {
    var url_parts = url.parse(request.url);
    const ruta = url_parts.path;
    switch (ruta) {
        case '/':
            responder(response, 200, 'Hola Root');
            break;
        case '/usuarios':
            responder(response, 200, 'Hola USUARIOS');
            break;
        default:
            responder(response, 404, 'Not FOUND!');

    }
});

function responder(response, status, text) {
    response.statusCode = status;
    response.setHeader('Content-Type', 'text/plain');
    response.end(text);
}

server.listen(port, hostname, function() {
    console.log(`Server running on http://${hostname}:${port}`);
});