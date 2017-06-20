'use strict';
/* eslint-disable */
const config = {
	name: 'samsung_remote',
	driver: '../../ir_generator/driver.js',
	class: 'tv',
	icon: '../../ir_generator/assets/remote.svg',
	images: {
		small: '../../ir_generator/assets/images/small.jpg',
		large: '../../ir_generator/assets/images/large.jpg'
	},
	capabilities: ['onoff',
		'volume_mute',
		'volume_up',
		'volume_down',
		'channel_up',
		'channel_down'
	],
	capabilityToCommandMap: {
		onoff: ['power_on', 'power_off'],
		volume_mute: 'mute',
		volume_up: 'volume_up',
		volume_down: 'volume_down',
		channel_up: 'channel_up',
		channel_down: 'channel_down'
	},
	minTxInterval: 250,
	signal: 'test',
	cmdType: 'tv',
	triggers: [{
		id: 'remote:cmd_received',
		title: 'ir_generator.flow.cmd_received',
		args: [{
			name: 'cmd',
			type: 'autocomplete'
		}, {
			name: 'device',
			type: 'device',
			filter: 'driver_id=remote'
		}]
	}],
	actions: [{
		id: 'remote:send_cmd',
		title: 'ir_generator.flow.send_cmd',
		args: [{
			name: 'cmd',
			type: 'autocomplete'
		}, {
			name: 'device',
			type: 'device',
			filter: 'driver_id=remote'
		}]
	}, {
		id: 'remote:send_cmd_number',
		title: 'ir_generator.flow.send_cmd_number',
		args: [{
			name: 'number',
			type: 'number',
			min: '0',
			max: '999'
		}, {
			name: 'device',
			type: 'device',
			filter: 'driver_id=remote'
		}]
	}],
	pair: {
		viewOrder: ['modelSelect', 'generic_done'],
		views: [{
			template: '../../ir_generator/views/model_select.html',
			options: {
				title: 'views.model_select.up_arrow.title',
				body: 'views.model_select.up_arrow.body',
				svg: '../../ir_generator/assets/remote_up_arrow.svg',
				type: 'payload',
				options: [{
					payload: [
						[0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
						[1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1]
					],
					metadata: {}
				}, {
					payload: [
						[1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
						[1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1]
					],
					metadata: {
						cmdSubType: 'old'
					}
				}],
				default: {
					metadata: {}
				},
				prepend: [],
				append: [],
				svgWidth: '80vw',
				svgHeight: '70vh',
				next: true,
				previous: true
			},
			prepend: ['../../assets/ir_generator/css/styles.css',
				'../../assets/ir_generator/css/svg.css',
				'../../assets/ir_generator/js/svghighlighter.js'
			],
			append: [],
			id: 'modelSelect'
		}, {
			template: '../lib/pair/done.html',
			options: {
				title: 'views.generic_done.title',
				prepend: '',
				append: ''
			},
			prepend: [],
			append: [],
			id: 'generic_done'
		}]
	},
	id: 'remote',
	cmds: ['tv$~onoff',
		'tv$~power_on',
		'tv$~power_off',
		'tv$~number_0',
		'tv$~number_1',
		'tv$~number_2',
		'tv$~number_3',
		'tv$~number_4',
		'tv$~number_5',
		'tv$~number_6',
		'tv$~number_7',
		'tv$~number_8',
		'tv$~number_9',
		'tv$~source',
		'tv$~sleep',
		'tv$~volume_up',
		'tv$~volume_down',
		'tv$~mute',
		'tv$~channel_up',
		'tv$~channel_down',
		'tv$~previous_channel',
		'tv$~menu',
		'tv$~tv',
		'tv$~info',
		'tv$~pip',
		'tv$~closed_captioning',
		'tv$~picture_mode_toggle',
		'tv$~audio_mode_toggle',
		'tv$~ttx_mix',
		'tv$~exit',
		'tv$~pip_channel_up',
		'tv$~pip_channel_down',
		'tv$~aspect_ratio_toggle',
		'tv$~rewind',
		'tv$~play',
		'tv$~stop',
		'tv$~fast_forward',
		'tv$~record',
		'tv$~pause',
		'tv$~tools',
		'tv$~guide',
		'tv$~return',
		'tv$~enter',
		'tv$~arrow_up',
		'tv$~arrow_up~$old',
		'tv$~arrow_down',
		'tv$~arrow_down~$old',
		'tv$~arrow_left',
		'tv$~arrow_right',
		'tv$~pc',
		'tv$~channel_list',
		'tv$~red',
		'tv$~green',
		'tv$~yellow',
		'tv$~blue',
		'tv$~hdmi_1',
		'tv$~hdmi_2',
		'tv$~hdmi_3',
		'tv$~hdmi_4',
		'tv$~content',
		'tv$~av1',
		'tv$~av2',
		'tv$~component_1',
		'tv$~component_2',
		'tv$~clock_set',
		'tv$~media_play',
		'tv$~internet_tv',
		'tv$~3d',
		'tv$~extra',
		'tv$~sports'
	]
};
const Driver = require(config.driver);
const driver = new Driver(config);
module.exports = Object.assign(
  {},
	driver.getExports(), 
	{ init: (devices, callback) => driver.init(module.exports, devices, callback) }
);
