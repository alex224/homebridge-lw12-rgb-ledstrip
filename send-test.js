var dgram = require('dgram');

var onMessage = '7e040401ffffff00ef';
var offMessage = '7e04040000ffff00ef';

var hexMessage = '7e040164ffffff00ef';


var client = dgram.createSocket('udp4');
var message = new Buffer(hexMessage, 'hex')

client.send(message, 0, message.length, 5000, "192.168.1.59", function(err, bytes) {
	if (err) {
		console.log('UDP ERROR ' + module.ip +':'+ module.port);
		//throw err;
	} else {
		console.log('UDP message ' + hexMessage + ' sent');
		client.close();
	}
});
