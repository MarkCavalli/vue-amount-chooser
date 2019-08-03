<template>
	<b class="main">
		<b class="main__button" @click="verify(amount - 1)">-</b>
		<b class="main__input-block">
			<input type="text" class="main__input" v-model="input" ref="input" autofocus>
		</b>
		<b class="main__button" @click="verify(amount + 1)">+</b>
	</b>
</template>

<script>

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
		min: { type: Number, default: 1 },
		max: { type: Number, default: Number.MAX_SAFE_INTEGER },
	},
	model: {
		prop: 'amount',
		event: 'amount-change'
	},
	methods: {
		inputChanged(value) {
			if (value === this.amount) return;
			this.verify(value);
		},
		verify(value) {
			value = +value;
			if (!Number.isInteger(value)) value = 0;
			if (value < this.min) value = this.min;
			if (value > this.max) value = this.max;
			this.emit(value);
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
</script>

<style scoped lang="scss">
.main {
	display: flex; justify-content: center; color: white;

	&__button {
		background-color: grey; width: 4vh; height: 4vh; display: flex; align-items: center; justify-content: center; transition: 0.2s; cursor: pointer; padding-bottom: 0.1vh;

		&:hover {
			filter: brightness(1.1);
		}
	}
	&__input-block {
		width: calc(100% - 8vh);
	}
	&__input {
		height: 100%; width: 100%; background-color: grey; color: white; font-weight: normal
	}
}
</style>