const Lab = require('lab');
const code = require('code');
const server = require('../index');
const lab = exports.lab = Lab.script();

lab.experiment('Users', function() {
    lab.test("Probando GET /API/USERS STATUS 200 Y cantidad de datos 3", function(done) {
        var options = {
            method: "GET",
            url: "/api/users"
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.be.instanceof(Array);
            code.expect(result).to.have.length(3);
            done();
        });
    });
    lab.test("Probando POST /API/USERS Con Todos los Datos STATUS 200 Y RESPUESTA", function(done) {
        var options = {
            method: "POST",
            url: "/api/users",
            payload: {
                name: 'testing',
                lastname: 'Hapi',
                birthdate: '2018-04-01'
            }
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.contain(['id', 'nombre', 'apellido']);
            done();
        });
    });

    lab.test("Probando DELETE /API/USERS STATUS 200 Y RESPUESTA", function(done) {
        var options = {
            method: "DELETE",
            url: "/api/users",
            payload: {
                name: 'testing'
            }
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.part.include({ deleted: true });
            done();
        });
    });
});