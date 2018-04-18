var Lab = require("lab");
var lab = exports.lab = Lab.script();
var server = require("../index.js")
var code = require("code");
var fs = require("fs");


lab.experiment("Patient", function() {
    lab.test('Validar si existe archivo de ruta y su contenido', function(done) {
        var file = fs.readFileSync("./routes/api/patient.js");
        var Routes;
        if (file) {
            Routes = require("../routes/api/patient.js");
        } else {
            Routes = false;
        }
        code.expect(Routes).to.not.equal(false);
        code.expect(Routes).to.be.instanceof(Array);
        code.expect(Routes).to.have.length(5);
        Routes.forEach(route => {
            code.expect(route).to.be.instanceof(Object);
            code.expect(route.path).to.include('/api/patient/');
            code.expect(route.config.handler).to.be.a.function();
        });
        code.expect(Routes[0].method).to.equal('GET');
        code.expect(Routes[1].method).to.equal('GET');
        code.expect(Routes[1].path).to.equal('/api/patient/name');
        code.expect(Routes[2].method).to.equal('POST');
        code.expect(Routes[2].config.validate).to.be.instanceof(Object);
        code.expect(Routes[3].method).to.equal('PATCH');
        code.expect(Routes[3].config.validate).to.be.instanceof(Object);
        code.expect(Routes[4].method).to.equal('DELETE');
        code.expect(Routes[4].config.validate).to.be.instanceof(Object);
        done();
    });
    lab.test("Probando POST /API/patient/ SIN Todos los Datos STATUS 400", function(done) {
        var options = {
            method: "POST",
            url: "/api/patient/",
            payload: {
                lastname: 'PEREZ',
                email: 'example@domain.com',
                birthdate: '2018-01-03'
            }
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(400);
            code.expect(result).to.be.instanceof(Object);
            done();
        });
    });
    lab.test("Probando POST /API/patient/ validadndo email STATUS 400", function(done) {
        var options = {
            method: "POST",
            url: "/api/patient/",
            payload: {
                name: 'JUANITO',
                lastname: 'PEREZ',
                email: 'a',
                birthdate: '2018-01-03'
            }
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(400);
            code.expect(result).to.be.instanceof(Object);
            done();
        });
    });
    lab.test("Probando POST /API/patient/ Con datos vacios STATUS 200 Y RESPUESTA", function(done) {
        var options = {
            method: "POST",
            url: "/api/patient/",
            payload: {
                name: 'JUANITO',
                lastname: '',
                email: 'example@domain.com',
                birthdate: '2018-01-03'
            }
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.be.instanceof(Object);
            code.expect(result).to.contain(['pk', 'nombre']);
            done();
        });
    });
    lab.test("Probando GET /API/patient/ STATUS 200", function(done) {
        var options = {
            method: "GET",
            url: "/api/patient/"
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.be.instanceof(Array);
            code.expect(result.length).to.be.least(1);
            done();
        });
    });
    lab.test("Probando GET /API/patient/name STATUS 200", function(done) {
        var options = {
            method: "GET",
            url: "/api/patient/name?name=JUANITO"
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.be.instanceof(Object);
            code.expect(result).to.contain(['pk', 'nombre', 'apellido', 'nacimiento']);
            done();
        });
    });

    lab.test("Probando DELETE /API/patient/ STATUS 200 Y RESPUESTA", function(done) {
        var options = {
            method: "DELETE",
            url: "/api/patient/",
            payload: {
                name: 'JUANITO'
            }
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.be.instanceof(Object);
            code.expect(result).to.part.include({ deleted: true });
            done();
        });
    });
});
