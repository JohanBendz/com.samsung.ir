'use strict';

const cmds = {
	tv: {
		onoff: 2,
		power_on: 153,
		power_off: 152,
		number_0: 17,
		number_1: 4,
		number_2: 5,
		number_3: 6,
		number_4: 8,
		number_5: 9,
		number_6: 10,
		number_7: 12,
		number_8: 13,
		number_9: 14,
		source: 1,
		sleep: 3,
		volume_up: 7,
		volume_down: 11,
		mute: 15,
		channel_up: 18,
		channel_down: 16,
		previous_channel: 19,
		menu: 26,
		tv: 27,
		info: 31,
		pip: 32,
		closed_captioning: 37,
		picture_mode_toggle: 40,
		audio_mode_toggle: 43,
		ttx_mix: 44,
		exit: 45,
		pip_channel_up: 50,
		pip_channel_down: 51,
		aspect_ratio_toggle: 62,
		rewind: 69,
		play: 71,
		stop: 70,
		fast_forward: 72,
		record: 73,
		pause: 74,
		tools: 75,
		guide: 79,
		return: 88,
		enter: 104,
		arrow_up: {
			default: 96,
			old: 95,
		},
		arrow_down: {
			default: 97,
			old: 95,
		},
		arrow_left: 101,
		arrow_right: 98,
		pc: 105,
		channel_list: 107,
		red: 108,
		green: 20,
		yellow: 21,
		blue: 22,
		hdmi_1: 233,
		hdmi_2: 190,
		hdmi_3: 194,
		hdmi_4: 197,
		content: 121,
		av1: 132,
		av2: 235,
		component_1: 134,
		component_2: 136,
		clock_set: 135,
		media_play: 140,
		internet_tv: 147,
		'3d': 159,
		extra: 175,
		sports: 184,
	},
};

const config = {
	devices: {
		remote: {
			// logLevel: 'verbose',
			// extends: 'generic_remote',
			name: 'samsung_remote',
			driver: './driver.js',
			class: 'tv',
			icon: './assets/remote.svg',
			images: {
				small: './assets/images/small.jpg',
				large: './assets/images/large.jpg',
			},
			capabilities: ['onoff', 'volume_mute', 'volume_up', 'volume_down', 'channel_up', 'channel_down'],
			capabilityToCommandMap: {
				onoff: ['power_on', 'power_off'],
				volume_mute: 'mute',
				volume_up: 'volume_up',
				volume_down: 'volume_down',
				channel_up: 'channel_up',
				channel_down: 'channel_down',
			},
			minTxInterval: 250,
			signal: {
				id: 'test',
				sof: [4535, 4465],
				eof: [590],
				carrier: 37900,
				words: [
					[590, 590],
					[590, 1690],
				],
				prefixData: [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
				interval: 5000,
				sensitivity: 0.5,
				repetitions: 5,
				minimalLength: 32,
				maximalLength: 32,
				parseCmd: id => {
					const command = `00000000${id.toString(2)}`
						.slice(-8)
						.split('')
						.reverse()
						.map(Number);
					return command.concat(command.map(bit => bit ? 0 : 1));
				},
				cmds,
			},
			cmdType: 'tv',
			triggers: [
				{
					id: 'cmd_received',
					title: 'ir_generator.flow.cmd_received',
					args: [
						{
							name: 'cmd',
							type: 'autocomplete',
						},
					],
				},
			],
			actions: [
				{
					id: 'send_cmd',
					title: 'ir_generator.flow.send_cmd',
					args: [
						{
							name: 'cmd',
							type: 'autocomplete',
						},
					],
				},
				{
					id: 'send_cmd_number',
					title: 'ir_generator.flow.send_cmd_number',
					args: [
						{
							name: 'number',
							type: 'number',
							min: '0',
							max: '999',
						},
					],
				},
				// {
				// 	id: 'send_cmd_sequence',
				// 	title: 'send_cmd_sequence',
				// 	args: [
				// 		{
				// 			type: 'dropdown',
				// 			name: 'cmds',
				// 			values: [
				// 				{ id: 'hdmi_1,number_0', label: 'hdmi_0' },
				// 			],
				// 		},
				// 	],
				// },
			],
			pair: {
				viewOrder: ['modelSelect', 'generic_done'],
				viewOptions: {
					modelSelect: {
						title: 'views.model_select.up_arrow.title',
						body: 'views.model_select.up_arrow.body',
						svg: './assets/remote_up_arrow.svg',
						type: 'command',
						options: [
							{
								command: ['tv$~arrow_up', 'tv$~arrow_down'],
								metadata: {},
							},
							{
								command: ['tv$~arrow_up~$old', 'tv$~arrow_down~$old'],
								metadata: { cmdSubType: 'old' },
							},
						],
						default: {
							metadata: {},
						},
					},
				},
			},
		},
	},
};

module.exports = config;
