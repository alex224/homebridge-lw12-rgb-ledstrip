var lw12 = require('./lw12-mod')('192.168.1.59');

console.log("state: " + lw12.powerState)

lw12.setPowerState(false, function(result) {
	console.log(result);
	console.log("state: " + lw12.powerState)
})
