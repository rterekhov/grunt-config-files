var deepExtend = require("deep-extend");

var testSettings = require("./settings.test");

module.exports = deepExtend(testSettings, {
    user: {
        name: "Default"
    }
});
