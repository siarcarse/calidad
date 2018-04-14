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
});