'use strict';

const DefaultDriver = require('../drivers/lib/ir/driver.js');

module.exports = class Driver extends DefaultDriver {

	init(exports, connectedDevices, callback) {
		super.init(exports, connectedDevices, callback);

		const updateState = (device, cmd) => {
			if (cmd === 'onoff') {
				const state = this.getState(device);
				state.onoff = !state.onoff;
				this.setState(device, state);
				this.realtime(device, 'onoff', state.onoff);
			} else if (cmd === 'power_on' || cmd === 'power_off') {
				this.setState(device, Object.assign(this.getState(device), { onoff: cmd === 'power_on' }));
				this.realtime(device, 'onoff', cmd === 'power_on');
			}
		};

		this.on('device_cmd_received', updateState);
		this.on('device_cmd_send', updateState);
	}
};
