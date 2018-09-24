const assert              = require('chai').assert;

var Validator = require('jsonschema').Validator;
var v = new Validator();

module.exports = {

    apiUrl: 'https://jsonplaceholder.typicode.com',

    checkResultWithSchema: function(result, schema) {
        var expectedResult = v.validate(result, schema).valid;

        if (expectedResult === false) {
            console.log(v.validate(result, schema),
                "error when comparing the result with the schema")
        }

        assert.isTrue(expectedResult);
    },

    getSignedApiURL: function(path, params){
        var url = [this.apiUrl, path].join('/');
        var urlWithParams = url + '?' + this.encodeParams(params);

        return urlWithParams;
    },

    encodeParams: function (data, forSign) {
        var result = [],
            i, keys;

        // input plain object validation
        if (data && typeof data === 'object') {
            keys = Object.keys(data);

            // apply encoding
            for (i = 0; i < keys.length; i++) {
                result.push(encodeURIComponent(keys[i]) + '=' + data[keys[i]]);
            }

            // build the list of params
            if (result.length > 0) {
                if(forSign){
                    return result.join('');
                }else{
                    return result.join('&');
                }
            }
        }

        return null;
    }
};
