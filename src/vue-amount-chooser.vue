<template>
	<b :class="classes['vue-amount-chooser']">
		<b :class="classes['vue-amount-chooser__button'] + classes['vue-amount-chooser__button_left']" @click="verify(amount + leftButton.amount)">
			{{ leftButton.text }}
		</b>
		<b :class="classes['vue-amount-chooser__input-block']">
			<input type="text" :class="classes['vue-amount-chooser__input']" v-model="input" ref="input" autofocus>
		</b>
		<b :class="classes['vue-amount-chooser__button'] + classes['vue-amount-chooser__button_right']" @click="verify(amount + rightButton.amount)">
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
</script>

<style lang="scss">
.vue-amount-chooser {
	display: flex; justify-content: center; height: 100%;

	&__button {
		background-color: #555555; width: 20%; display: flex; align-items: center; justify-content: center; 
		transition: 0.2s; cursor: pointer; color: white; font-size: 1em; user-select: none;

		&:hover {
			filter: brightness(1.1);
		}
	}
	&__input-block {
		width: calc(100% - 40%);
	}
	&__input {
		height: 100%; width: 100%; background-color: white; color: #555555; font-weight: normal; border: none; text-align: center;
    	outline: none; font-size: 1em; padding: 0; font-family: inherit;
	}
}
</style>