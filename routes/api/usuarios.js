module.exports = [{
    method: 'GET',
    path: '/api/usuarios',
    handler: function(request, reply) {
        reply('Hola API usuarios!');
    }
}];