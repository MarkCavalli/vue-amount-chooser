<template>
	<b :class="classes.main">
		<b :class="classes.main__button + classes.main__button_left" @click="verify(amount + leftButton.amount)">
			{{ leftButton.text }}
		</b>
		<b :class="classes['main__input-block']">
			<input type="text" :class="classes.main__input" v-model="input" ref="input" autofocus>
		</b>
		<b :class="classes.main__button + classes.main__button_right" @click="verify(amount + rightButton.amount)">
			{{ rightButton.text }}
		</b>
	</b>
</template>

<script>
import dataMixin from './Mixins/Data';
import optionsMixin from './Mixins/Options';

export default {
	mixins: [dataMixin, optionsMixin],
	methods: {
		verify(value) {
			value = +value;
			if (!Number.isInteger(value)) value = 0;
			if (value < this.settings.min) value = this.settings.min;
			if (value > this.settings.max) value = this.settings.max;
			this.emit(value);
		},
	},
	computed: {
		leftButton() {
			return this.settings.buttons.left;
		},
		rightButton() {
			return this.settings.buttons.right;
		},
	},
}
</script>

<style scoped lang="scss">
.main {
	display: flex; justify-content: center;

	&__button {
		background-color: grey; width: 5%; height: 0; display: flex; align-items: center; justify-content: center; 
		transition: 0.2s; cursor: pointer; padding-bottom: 100%; color: white; font-size: 1em;

		&:hover {
			filter: brightness(1.1);
		}
	}
	&__input-block {
		width: calc(100% - 10%);
	}
	&__input {
		height: 100%; width: 100%; background-color: grey; color: white; font-weight: normal; border: none; text-align: center;
    	outline: none; font-size: 1em; padding: 0;
	}
}
</style>