

export default {
	created() {
		this.input = this.amount;
	},
	data: function () {
		return {
			input: 100,
		}
	},
	props: {
		amount: { type: Number }, // v-model
		settings: { type: Object, default: () => ({
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
        }) },
	},
	model: {
		prop: 'amount',
		event: 'amount-change',
	},
	methods: {
		inputChanged(value) {
			if (value === this.amount) return;
			this.verify(value);
		},
		emit(value) {
			this.$emit('amount-change', value);
			this.input = value;
			this.setFocus();
		},
		setFocus() {
			this.$nextTick(() => {
				this.$refs.input.focus();
			});
		},
	},
	watch: {
		'input': {
			handler(newVal, oldVal) {
				this.inputChanged(newVal)
			}
		},
	},
}