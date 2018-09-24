const frisby                = require('frisby');
const utils                 = require('../helpers/utils');

it('DELETE posts', function (done) {

    frisby
        .timeout(20000)
        .del(utils.apiUrl + '/posts/1')
        .expect('status', 200)

        .done(done);
}, 50000);
