const Lab = require('lab');
const code = require('code');
const server = require('../index');
const lab = exports.lab = Lab.script();

lab.experiment('Users', function() {
    lab.test('Evaluar ruta /api/users por GET = status 200', (done) => {
        var options = {
            method: 'GET',
            url: '/api/users'
        };
        server.inject(options, function(response) {
            const result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.be.instanceof(Array);
            done();
        });
    });
    lab.test('Evaluar POST /api/users sin datos = status 400', (done) => {
        const options = {
            method: 'POST',
            url: '/api/users'
        };
        server.inject(options, function(response) {
            code.expect(response.statusCode).to.equal(400);
            done();
        });
    });
});