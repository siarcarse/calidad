module.exports = [{
    method: 'GET',
    path: '/usuarios',
    handler: function(request, reply) {
        reply('Hola usuarios!');
    }
}];