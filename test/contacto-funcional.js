const server = require('../index');
const browser = require('zombie');
var Lab = require("lab");
var lab = exports.lab = Lab.script();
var code = require("code");

lab.experiment('Formulario Contacto', function() {
    lab.before(function() {
        return new Promise(function(done) {
            this.browser = new browser({ site: 'http://localhost:3000' });
            done();
        })
    });
    lab.before(function() {
        return new Promise(function(done) {
            this.browser.visit('/contacto', done);
        })
    });

    lab.test('Validar formulario', function(done) {
        code.expect(this.browser.success).to.equal(true);
        code.expect(this.browser.text('h1')).to.equal('Formulario de contacto');

        code.expect(this.browser.text('form label')).to.equal('UsuarioContraseña');
        code.expect(this.browser.evaluate('$("[type=password]").length')).to.equal(1);

        done();
    });
});