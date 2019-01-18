'use strict';

const Homey = require('homey');

class SamsungIR extends Homey.App {
	onInit() {
		this.log('Samsung IR is running...');
	}
}

module.exports = SamsungIR;
