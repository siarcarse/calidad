var Lab = require("lab");
var lab = exports.lab = Lab.script();
var server = require("../index.js")
var code = require("code");
var fs = require("fs");


lab.experiment("Products", function() {
    lab.test('Validar si existe archivo de ruta y su contenido', function(done) {
        var file = fs.readFileSync("./routes/api/products.js");
        var Routes;
        if (file) {
            Routes = require("../routes/api/products.js");
        } else {
            Routes = false;
        }
        code.expect(Routes).to.not.equal(false);
        code.expect(Routes).to.be.instanceof(Array);
        code.expect(Routes).to.have.length(4);
        Routes.forEach(route => { // Se esta recorriendo el arreglo Routes
            code.expect(route).to.be.instanceof(Object);
            code.expect(route.path).to.be.equal('/api/products');
            code.expect(route.config.handler).to.be.a.function();
        });
        code.expect(Routes[0].method).to.equal('GET');
        code.expect(Routes[1].method).to.equal('POST');
        code.expect(Routes[1].config.validate).to.be.instanceof(Object);
        code.expect(Routes[2].method).to.equal('PATCH');
        code.expect(Routes[2].config.validate).to.be.instanceof(Object);
        code.expect(Routes[3].method).to.equal('DELETE');
        code.expect(Routes[3].config.validate).to.be.instanceof(Object);
        done();
    });
    /* DESDE AQUÍ LO NUEVO */
    lab.test("Probando POST /API/PRODUCTS Con Todos los Datos STATUS 200 Y RESPUESTA", function(done) {
        var options = {
            method: "POST",
            url: "/api/products",
            payload: {
                name: 'NOTEBOOK_TEST',
                code: '09809809890',
                price: 100000,
                active: true
            }
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.be.instanceof(Object);
            code.expect(result).to.contain(['pk']);
            done();
        });
    });
    lab.test("Probando GET /API/PRODUCTS STATUS 200", function(done) {
        var options = {
            method: "GET",
            url: "/api/products"
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.be.instanceof(Array);
            code.expect(result.length).to.be.least(1);
            done();
        });
    });

    lab.test("Probando DELETE /API/PRODUCTS STATUS 200 Y RESPUESTA", function(done) {
        var options = {
            method: "DELETE",
            url: "/api/products",
            payload: {
                name: 'NOTEBOOK_TEST'
            }
        };

        server.inject(options, function(response) {
            var result = response.result;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.part.include({ deleted: true });
            done();
        });
    });
    /* HASTA AQUÍ LO NUEVO */
});