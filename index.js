var Service, Characteristic;

/**
 * @module homebridge
 * @param {object} homebridge Export functions required to create a
 *                            new instance of this plugin.
 */
module.exports = function(homebridge){
    console.log("homebridge API version: " + homebridge.version);

    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-lw12-rgbledstripe', 'LW12-RGB', LW12_RGB);
};

/**
 * Parse the config and instantiate the object.
 *
 * @summary Constructor
 * @constructor
 * @param {function} log Logging function
 * @param {object} config Your configuration object
 */
function LW12_RGB(log, config) {
    //create instance for one stripe to store state
    this.stripe = require("./lw12-mod.js")(config.ip)

    this.log = log;
    this.name                          = config.name;
}

/**
 * @augments LW12_RGB
 */
LW12_RGB.prototype = {

    /** Required Functions **/
    identify: function(callback) {
        this.log('Identify requested!');
        callback();
    },

    getServices: function() {
        // You may OPTIONALLY define an information service if you wish to override
        // default values for devices like serial number, model, etc.
        var informationService = new Service.AccessoryInformation();

        informationService
            .setCharacteristic(Characteristic.Manufacturer, 'Lagute LW-12')
            .setCharacteristic(Characteristic.Model, 'homebridge-lw12-rgbledstripe')
            .setCharacteristic(Characteristic.SerialNumber, 'LW-12 Serial Number');

        this.log('creating Lightbulb service');
        var lightbulbService = new Service.Lightbulb(this.name);

        // Handle on/off
        lightbulbService
            .getCharacteristic(Characteristic.On)
            .on('get', this.getPowerState.bind(this))
            .on('set', this.setPowerState.bind(this));

        // Handle brightness
        this.log('... adding Brightness');
        lightbulbService
            .addCharacteristic(new Characteristic.Brightness())
            .on('get', this.getBrightness.bind(this))
            .on('set', this.setBrightness.bind(this));

        // Handle color
        this.log('... adding Hue');
        lightbulbService
            .addCharacteristic(new Characteristic.Hue())
            .on('get', this.getHue.bind(this))
            .on('set', this.setHue.bind(this));

        this.log('... adding Saturation');
        lightbulbService
            .addCharacteristic(new Characteristic.Saturation())
            .on('get', this.getSaturation.bind(this))
            .on('set', this.setSaturation.bind(this));

        return [informationService, lightbulbService];

    },

    /**
     * Gets power state of led stripe.
     * @param {function} homebridge-callback function(error, result)
     */
    getPowerState: function(callback) {
        var result = this.stripe.getPowerState();
        this.log('... powerState: ' + result);
        callback(null, result);
    },

    /**
     * Gets power state of led stripe.
     * @param state true = on, false = off
     * @param {function} homebridge-callback function(error, result)
     */
    setPowerState: function(state, callback) {
        var me = this;
        this.log('... setting powerState to ' + state);
        this.stripe.setPowerState(state, function(success) {
            me.log('... setting powerState success: ' + success);
            callback(undefined, success)
        });
    },

    /**
     * Gets brightness of led stripe.
     * @param {function} homebridge-callback function(error, level)
     */
    getBrightness: function(callback) {
        var result = this.stripe.getBrightness();
        this.log('... brightness: ' + result);
        callback(null, result);
    },

    /**
     * Sets brightness of led stripe.
     * @param {number} level 0-100
     * @param {function} callback The callback that handles the response.
     */
    setBrightness: function(level, callback) {
        var me = this;
        this.log('... setting brightness to ' + level);
        this.stripe.setBrightness(level, function(success) {
            me.log('... setting brightness success: ' + success);
            callback(undefined, success)
        });
    },

    /**
     * Gets hue of led stripe.
     * @param {function} homebridge-callback function(error, level)
     */
    getHue: function(callback) {
        var result = this.stripe.getHue();
        this.log('... hue: ' + result);
        callback(null, result);
    },

    /**
     * Sets hue of led stripe.
     * @param {number} level 0-360
     * @param {function} callback The callback that handles the response.
     */
    setHue: function(level, callback) {
        var me = this;
        this.log('... setting hue to ' + level);
        this.stripe.setHue(level, function(success) {
            me.log('... setting hue success: ' + success);
            callback(undefined, success)
        });
    },

    /**
     * Gets saturation of led stripe.
     * @param {function} homebridge-callback function(error, level)
     */
    getSaturation: function(callback) {
        var result = this.stripe.getSaturation();
        this.log('... saturation: ' + result);
        callback(null, result);
    },

    /**
     * Sets saturation of led stripe.
     * @param {number} level 0-100
     * @param {function} callback The callback that handles the response.
     */
    setSaturation: function(level, callback) {
        var me = this;
        this.log('... setting saturation to ' + level);
        this.stripe.setSaturation(level, function(success) {
            me.log('... setting saturation success: ' + success);
            callback(undefined, success)
        });
    }

};