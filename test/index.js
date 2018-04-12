const Lab = require('lab');
const code = require('code');
const lab = exports.lab = Lab.script();

lab.test('Suma básica 2+2', function(done) {
    code.expect(2 + 2 + 1).to.equal(5);
    done();
});