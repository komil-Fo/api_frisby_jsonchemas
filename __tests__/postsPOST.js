const frisby                = require('frisby');
const utils                 = require('../helpers/utils');
const postsOneUserSchema    = require('../schemas/onePost');

it('POST posts', function (done) {

    var bodyParams = {
        title: 'text for title',
        body: 'text for body',
        userId: 1
    };

    frisby
        .timeout(20000)
        .post(utils.apiUrl + '/posts', {
            body: bodyParams,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        .then(function(result) {
            utils.checkResultWithSchema(result._body, postsOneUserSchema);
        })
        .expect('status', 201)

        .done(done);
}, 50000);
