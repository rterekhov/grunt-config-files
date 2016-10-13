var deepExtend = require('deep-extend');

var commonSettings = require('./settings.common');

module.exports = deepExtend(commonSettings, {
    user: {
        email: 'test@email.com'
    },
    connection_string: 'test_connection_string'
});
