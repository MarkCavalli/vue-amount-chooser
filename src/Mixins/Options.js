

export default {
	methods: {
		fillKeys(data, prop) {
			for (const key in data) {
				if (!prop[key]) continue;
				data[key] = prop[key];
			}
		},
	},
	computed: {
		settings() {
			const obj = {
				min: 1,
				max: Number.MAX_SAFE_INTEGER,
				classes: {
					'main': '',
					'main__input-block': '',
					'main__input': '',
					'main__button': '',
					'main__button_left': '',
					'main__button_right': '',
				},
				buttons: {
					left: {
						amount: -1,
						text: '-',
					},
					right: {
						amount: -1,
						text: '-',
					},
				},
			};
			if (this.options) {
				if (typeof this.options.min === 'number') obj.min = this.options.min;
				if (typeof this.options.max === 'number') obj.max = this.options.max;
				if (this.options.classes) this.fillKeys(obj.classes, this.options.classes);
				if (this.options.buttons) {
					if (this.options.buttons.left) this.fillKeys(obj.buttons.left, this.options.buttons.left);
					if (this.options.buttons.right) this.fillKeys(obj.buttons.right, this.options.buttons.right);
				}
			}
			return obj;
		},
		classes() {
			const classes = this.settings.classes;
			const obj = {};
			for (const key in classes) {
				obj[key] = `${key} ${classes[key]}`;
			}
			return obj;
		},
	},
}