(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.VueAmountChooser = {}));
}(this, function (exports) { 'use strict';

	var dataMixin = {
		created: function created() {
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
			inputChanged: function inputChanged(value) {
				if (value === this.amount) { return; }
				this.verify(value);
			},
			emit: function emit(value) {
				this.$emit('amount-change', value);
				this.input = value;
				this.setFocus();
			},
			setFocus: function setFocus() {
				var this$1 = this;

				this.$nextTick(function () {
					this$1.$refs.input.focus();
				});
			},
		},
		watch: {
			'input': {
				handler: function handler(newVal, oldVal) {
					this.inputChanged(newVal);
				}
			},
			'amount': {
				handler: function handler(newVal, oldVal) {
					this.input = newVal;
				}
			},
		},
	};

	var optionsMixin = {
	    methods: {
	        fillKeys: function fillKeys(data, prop) {
	            for (var key in data) {
	                if (typeof prop[key] === 'undefined') { continue; }
	                data[key] = prop[key];
	            }
	        }
	    },
	    computed: {
	        defaultOptions: function defaultOptions() {
	            return {
	                min: 1,
	                max: Number.MAX_SAFE_INTEGER,
	                classes: {
	                    'vue-amount-chooser': '',
	                    'vue-amount-chooser__input-block': '',
	                    'vue-amount-chooser__input': '',
	                    'vue-amount-chooser__button': '',
	                    'vue-amount-chooser__button_left': '',
	                    'vue-amount-chooser__button_right': '',
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
	        settings: function settings() {
	            var obj = JSON.parse(JSON.stringify(this.defaultOptions));
	            if (this.options) {
	                if (this.options.min) { obj.min = this.options.min; }
	                if (this.options.max) { obj.max = this.options.max; }
	                if (this.options.classes) { this.fillKeys(obj.classes, this.options.classes); }
	                if (this.options.buttons) {
	                    var buttons = this.options.buttons;
	                    if (buttons.left) { this.fillKeys(obj.buttons.left, buttons.left); }
	                    if (buttons.right) { this.fillKeys(obj.buttons.right, buttons.right); }
	                }
	            }
	            return obj;
	        }
	    },
	};

	//

	var script = {
		mixins: [dataMixin, optionsMixin],
		methods: {
			verify: function verify(value) {
				value = +value;
				if (!Number.isInteger(value)) { value = 0; }
				if (value < this.settings.min) { value = this.settings.min; }
				if (value > this.settings.max) { value = this.settings.max; }
				this.emit(value);
			},
		},
		computed: {
			leftButton: function leftButton() {
				return this.settings.buttons.left;
			},
			rightButton: function rightButton() {
				return this.settings.buttons.right;
			},
			classes: function classes() {
				var classes = this.settings.classes;
				var obj = {};
				for (var key in classes) {
					obj[key] = key + " " + (classes[key]);
				}
				return obj;
			},
		},
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
	/* server only */
	, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	  if (typeof shadowMode !== 'boolean') {
	    createInjectorSSR = createInjector;
	    createInjector = shadowMode;
	    shadowMode = false;
	  } // Vue.extend constructor export interop.


	  var options = typeof script === 'function' ? script.options : script; // render functions

	  if (template && template.render) {
	    options.render = template.render;
	    options.staticRenderFns = template.staticRenderFns;
	    options._compiled = true; // functional template

	    if (isFunctionalTemplate) {
	      options.functional = true;
	    }
	  } // scopedId


	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;

	  if (moduleIdentifier) {
	    // server build
	    hook = function hook(context) {
	      // 2.3 injection
	      context = context || // cached call
	      this.$vnode && this.$vnode.ssrContext || // stateful
	      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
	      // 2.2 with runInNewContext: true

	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      } // inject component styles


	      if (style) {
	        style.call(this, createInjectorSSR(context));
	      } // register component module identifier for async chunk inference


	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    }; // used by ssr in case component is cached and beforeCreate
	    // never gets called


	    options._ssrRegister = hook;
	  } else if (style) {
	    hook = shadowMode ? function () {
	      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
	    } : function (context) {
	      style.call(this, createInjector(context));
	    };
	  }

	  if (hook) {
	    if (options.functional) {
	      // register for functional component in vue file
	      var originalRender = options.render;

	      options.render = function renderWithStyleInjection(h, context) {
	        hook.call(context);
	        return originalRender(h, context);
	      };
	    } else {
	      // inject component registration as beforeCreate hook
	      var existing = options.beforeCreate;
	      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	    }
	  }

	  return script;
	}

	var normalizeComponent_1 = normalizeComponent;

	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
	function createInjector(context) {
	  return function (id, style) {
	    return addStyle(id, style);
	  };
	}
	var HEAD;
	var styles = {};

	function addStyle(id, css) {
	  var group = isOldIE ? css.media || 'default' : id;
	  var style = styles[group] || (styles[group] = {
	    ids: new Set(),
	    styles: []
	  });

	  if (!style.ids.has(id)) {
	    style.ids.add(id);
	    var code = css.source;

	    if (css.map) {
	      // https://developer.chrome.com/devtools/docs/javascript-debugging
	      // this makes source maps inside style tags work properly in Chrome
	      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

	      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
	    }

	    if (!style.element) {
	      style.element = document.createElement('style');
	      style.element.type = 'text/css';
	      if (css.media) { style.element.setAttribute('media', css.media); }

	      if (HEAD === undefined) {
	        HEAD = document.head || document.getElementsByTagName('head')[0];
	      }

	      HEAD.appendChild(style.element);
	    }

	    if ('styleSheet' in style.element) {
	      style.styles.push(code);
	      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
	    } else {
	      var index = style.ids.size - 1;
	      var textNode = document.createTextNode(code);
	      var nodes = style.element.childNodes;
	      if (nodes[index]) { style.element.removeChild(nodes[index]); }
	      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
	    }
	  }
	}

	var browser = createInjector;

	/* script */
	var __vue_script__ = script;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("div", { class: _vm.classes["vue-amount-chooser"] }, [
	    _c(
	      "div",
	      {
	        class:
	          _vm.classes["vue-amount-chooser__button"] +
	          " " +
	          _vm.classes["vue-amount-chooser__button_left"],
	        on: {
	          click: function($event) {
	            return _vm.verify(_vm.amount + _vm.leftButton.amount)
	          }
	        }
	      },
	      [_vm._v("\n\t\t" + _vm._s(_vm.leftButton.text) + "\n\t")]
	    ),
	    _vm._v(" "),
	    _c("div", { class: _vm.classes["vue-amount-chooser__input-block"] }, [
	      _c("input", {
	        directives: [
	          {
	            name: "model",
	            rawName: "v-model",
	            value: _vm.input,
	            expression: "input"
	          }
	        ],
	        ref: "input",
	        class: _vm.classes["vue-amount-chooser__input"],
	        attrs: { type: "text", autofocus: "" },
	        domProps: { value: _vm.input },
	        on: {
	          input: function($event) {
	            if ($event.target.composing) {
	              return
	            }
	            _vm.input = $event.target.value;
	          }
	        }
	      })
	    ]),
	    _vm._v(" "),
	    _c(
	      "div",
	      {
	        class:
	          _vm.classes["vue-amount-chooser__button"] +
	          " " +
	          _vm.classes["vue-amount-chooser__button_right"],
	        on: {
	          click: function($event) {
	            return _vm.verify(_vm.amount + _vm.rightButton.amount)
	          }
	        }
	      },
	      [_vm._v("\n\t\t" + _vm._s(_vm.rightButton.text) + "\n\t")]
	    )
	  ])
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  var __vue_inject_styles__ = function (inject) {
	    if (!inject) { return }
	    inject("data-v-dc1ef30a_0", { source: ".vue-amount-chooser {\n  display: flex;\n  justify-content: center;\n  height: 100%;\n}\n.vue-amount-chooser__button {\n  background-color: #555555;\n  width: 20%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: 0.2s;\n  cursor: pointer;\n  color: white;\n  font-size: 1em;\n  user-select: none;\n}\n.vue-amount-chooser__button:hover {\n  filter: brightness(1.1);\n}\n.vue-amount-chooser__input-block {\n  width: calc(100% - 40%);\n}\n.vue-amount-chooser__input {\n  height: 100%;\n  width: 100%;\n  background-color: white;\n  color: #555555;\n  font-weight: normal;\n  border: none;\n  text-align: center;\n  outline: none;\n  font-size: 1em;\n  padding: 0;\n  font-family: inherit;\n}\n\n/*# sourceMappingURL=vue-amount-chooser.vue.map */", map: {"version":3,"sources":["D:\\npm\\vue-amount-chooser\\src\\vue-amount-chooser.vue","vue-amount-chooser.vue"],"names":[],"mappings":"AAiDA;EACA,aAAA;EAAA,uBAAA;EAAA,YAAA;AC9CA;ADgDA;EACA,yBAAA;EAAA,UAAA;EAAA,aAAA;EAAA,mBAAA;EAAA,uBAAA;EACA,gBAAA;EAAA,eAAA;EAAA,YAAA;EAAA,cAAA;EAAA,iBAAA;ACtCA;ADwCA;EACA,uBAAA;ACtCA;ADyCA;EACA,uBAAA;ACvCA;ADyCA;EACA,YAAA;EAAA,WAAA;EAAA,uBAAA;EAAA,cAAA;EAAA,mBAAA;EAAA,YAAA;EAAA,kBAAA;EACA,aAAA;EAAA,cAAA;EAAA,UAAA;EAAA,oBAAA;AC9BA;;AAEA,iDAAiD","file":"vue-amount-chooser.vue","sourcesContent":["<template>\r\n\t<div :class=\"classes['vue-amount-chooser']\">\r\n\t\t<div :class=\"`${classes['vue-amount-chooser__button']} ${classes['vue-amount-chooser__button_left']}`\" @click=\"verify(amount + leftButton.amount)\">\r\n\t\t\t{{ leftButton.text }}\r\n\t\t</div>\r\n\t\t<div :class=\"classes['vue-amount-chooser__input-block']\">\r\n\t\t\t<input type=\"text\" :class=\"classes['vue-amount-chooser__input']\" v-model=\"input\" ref=\"input\" autofocus>\r\n\t\t</div>\r\n\t\t<div :class=\"`${classes['vue-amount-chooser__button']} ${classes['vue-amount-chooser__button_right']}`\" @click=\"verify(amount + rightButton.amount)\">\r\n\t\t\t{{ rightButton.text }}\r\n\t\t</div>\r\n\t</div>\r\n</template>\r\n\r\n<script>\r\nimport dataMixin from './Mixins/Data';\r\nimport optionsMixin from './Mixins/Options';\r\n\r\nexport default {\r\n\tmixins: [dataMixin, optionsMixin],\r\n\tmethods: {\r\n\t\tverify(value) {\r\n\t\t\tvalue = +value;\r\n\t\t\tif (!Number.isInteger(value)) value = 0;\r\n\t\t\tif (value < this.settings.min) value = this.settings.min;\r\n\t\t\tif (value > this.settings.max) value = this.settings.max;\r\n\t\t\tthis.emit(value);\r\n\t\t},\r\n\t},\r\n\tcomputed: {\r\n\t\tleftButton() {\r\n\t\t\treturn this.settings.buttons.left;\r\n\t\t},\r\n\t\trightButton() {\r\n\t\t\treturn this.settings.buttons.right;\r\n\t\t},\r\n\t\tclasses() {\r\n\t\t\tconst classes = this.settings.classes;\r\n\t\t\tconst obj = {};\r\n\t\t\tfor (const key in classes) {\r\n\t\t\t\tobj[key] = `${key} ${classes[key]}`;\r\n\t\t\t}\r\n\t\t\treturn obj;\r\n\t\t},\r\n\t},\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.vue-amount-chooser {\r\n\tdisplay: flex; justify-content: center; height: 100%;\r\n\r\n\t&__button {\r\n\t\tbackground-color: #555555; width: 20%; display: flex; align-items: center; justify-content: center; \r\n\t\ttransition: 0.2s; cursor: pointer; color: white; font-size: 1em; user-select: none;\r\n\r\n\t\t&:hover {\r\n\t\t\tfilter: brightness(1.1);\r\n\t\t}\r\n\t}\r\n\t&__input-block {\r\n\t\twidth: calc(100% - 40%);\r\n\t}\r\n\t&__input {\r\n\t\theight: 100%; width: 100%; background-color: white; color: #555555; font-weight: normal; border: none; text-align: center;\r\n    \toutline: none; font-size: 1em; padding: 0; font-family: inherit;\r\n\t}\r\n}\r\n</style>",".vue-amount-chooser {\n  display: flex;\n  justify-content: center;\n  height: 100%;\n}\n.vue-amount-chooser__button {\n  background-color: #555555;\n  width: 20%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: 0.2s;\n  cursor: pointer;\n  color: white;\n  font-size: 1em;\n  user-select: none;\n}\n.vue-amount-chooser__button:hover {\n  filter: brightness(1.1);\n}\n.vue-amount-chooser__input-block {\n  width: calc(100% - 40%);\n}\n.vue-amount-chooser__input {\n  height: 100%;\n  width: 100%;\n  background-color: white;\n  color: #555555;\n  font-weight: normal;\n  border: none;\n  text-align: center;\n  outline: none;\n  font-size: 1em;\n  padding: 0;\n  font-family: inherit;\n}\n\n/*# sourceMappingURL=vue-amount-chooser.vue.map */"]}, media: undefined });

	  };
	  /* scoped */
	  var __vue_scope_id__ = undefined;
	  /* module identifier */
	  var __vue_module_identifier__ = undefined;
	  /* functional template */
	  var __vue_is_functional_template__ = false;
	  /* style inject SSR */
	  

	  
	  var component = normalizeComponent_1(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    browser,
	    undefined
	  );

	// Импорт vue компонента

	// Объявление функции установки, выполняемой Vue.use()
	function install(Vue) {
		if (install.installed) { return; }
		install.installed = true;
		Vue.component('VueAmountChooser', component);
	}

	// Создание значения модуля для Vue.use()
	var plugin = {
		install: install
	};

	// Автоматическая установка, когда vue найден (например в браузере с помощью тега <script>)
	var GlobalVue = null;
	if (typeof window !== 'undefined') {
		GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
		GlobalVue = global.Vue;
	}
	if (GlobalVue) {
		GlobalVue.use(plugin);
	}

	exports.default = component;
	exports.install = install;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
