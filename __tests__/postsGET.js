const frisby                 = require('frisby');
const expect                 = require('chai').expect;
const utils                  = require('../helpers/utils');
const postsOneUserSchema     = require('../schemas/onePost');
const postsSchema            = require('../schemas/posts');

it('GET posts with all users', function (done) {

    frisby.timeout(20000)
        .get(utils.apiUrl + '/posts')
        .expect('status', 200)
        .then(function(result) {
            utils.checkResultWithSchema(result._body, postsSchema);
        })

        .done(done);
}, 50000);

it('GET one post', function (done) {

    frisby.timeout(20000)
        .get(utils.apiUrl + '/posts/2')
        .expect('status', 200)
        .then(function(result) {
            utils.checkResultWithSchema(result._body, postsOneUserSchema);
        })
        .expect('json', 'id', '2')

        .done(done);
}, 50000);

it('GET all posts for one user', function (done) {

    var requestParams = {
        userId: 1
    };

    var apiUrl = utils.getSignedApiURL('posts', requestParams);

    frisby.timeout(20000)
        .get(apiUrl)
        .expect('status', 200)
        .then(function(result) {
            utils.checkResultWithSchema(result._body, postsSchema);
            var arr = result._body;
            arr.forEach(function(item, i, arr) {
                expect(arr[i].userId).to.eql(1,
                    'should be the same user as in request');
            });
        })

        .done(done);
}, 50000);
