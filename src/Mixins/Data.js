

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
		options: { 
			type: Object, 
			default: function () {
				return this.defaultOptions;
			}
		},
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
		'amount': {
			handler(newVal, oldVal) {
				this.input = newVal;
			}
		},
	},
}