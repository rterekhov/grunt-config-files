var deepExtend = require("deep-extend");

var commonSettings = require("./settings.common");

module.exports = deepExtend(commonSettings, {
    connection_string: "prod_connection_string"
});
