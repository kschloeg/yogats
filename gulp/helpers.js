var helpers = {
    setMaxListeners: function() {
        process.setMaxListeners(20);
        require('events').EventEmitter.prototype._maxListeners = 20;
    }
};

module.exports = helpers;
