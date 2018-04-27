module.exports = [{
    method: 'GET',
    path: '/contacto',
    handler: function(request, reply) {
        reply.file('./views/contacto.html');
    }
}];