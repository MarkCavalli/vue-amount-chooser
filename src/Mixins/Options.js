

export default {
    methods: {
        fillKeys(data, prop) {
            for (const key in data) {
                if (typeof prop[key] === 'undefined') continue;
                data[key] = prop[key];
            }
        }
    },
    computed: {
        defaultOptions() {
            return {
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
                        amount: 1,
                        text: '+',
                    },
                },
            }
        },
        settings() {
            const obj = JSON.parse(JSON.stringify(this.defaultOptions));
            if (this.options) {
                if (this.options.min) obj.min = this.options.min;
                if (this.options.max) obj.max = this.options.max;
                if (this.options.classes) this.fillKeys(obj.classes, this.options.classes);
                if (this.options.buttons) {
                    const buttons = this.options.buttons;
                    if (buttons.left) this.fillKeys(obj.buttons.left, buttons.left);
                    if (buttons.right) this.fillKeys(obj.buttons.right, buttons.right);
                }
            }
            return obj;
        }
    },
}