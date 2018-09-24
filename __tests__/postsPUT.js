const frisby                = require('frisby');
const expect                = require('chai').expect;
const utils                 = require('../helpers/utils');

it('PUT posts', function (done) {

    var bodyParams = {
        id: 1,
        title: 'updated text for title',
        body: 'updated text for body',
        userId: 1
    };

    frisby
        .timeout(20000)
        .put(utils.apiUrl + '/posts/1', {
            body: bodyParams,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        .then(function(result) {
            expect(result._body.title).to.equal(bodyParams.title);
            expect(result._body.body).to.equal(bodyParams.body);
        })
        .expect('status', 200)

        .done(done);
}, 50000);
