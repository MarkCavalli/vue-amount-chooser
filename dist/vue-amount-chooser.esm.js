//
//
//
//
//
//
//
//
//
//


var script = {
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
		min: { type: Number, default: 1 },
		max: { type: Number, default: Number.MAX_SAFE_INTEGER },
	},
	model: {
		prop: 'amount',
		event: 'amount-change'
	},
	methods: {
		inputChanged: function inputChanged(value) {
			if (value === this.amount) { return; }
			this.verify(value);
		},
		verify: function verify(value) {
			value = +value;
			if (!Number.isInteger(value)) { value = 0; }
			if (value < this.min) { value = this.min; }
			if (value > this.max) { value = this.max; }
			this.emit(value);
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
  return _c("b", { staticClass: "main" }, [
    _c(
      "b",
      {
        staticClass: "main__button",
        on: {
          click: function($event) {
            return _vm.verify(_vm.amount - 1)
          }
        }
      },
      [_vm._v("-")]
    ),
    _vm._v(" "),
    _c("b", { staticClass: "main__input-block" }, [
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
        staticClass: "input main__input",
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
      "b",
      {
        staticClass: "main__button",
        on: {
          click: function($event) {
            return _vm.verify(_vm.amount + 1)
          }
        }
      },
      [_vm._v("+")]
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-4c13417e_0", { source: ".main[data-v-4c13417e] {\n  display: flex;\n  justify-content: center;\n  color: white;\n}\n.main__button[data-v-4c13417e] {\n  background-color: grey;\n  width: 4vh;\n  height: 4vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: 0.2s;\n  cursor: pointer;\n  padding-bottom: 0.1vh;\n}\n.main__button[data-v-4c13417e]:hover {\n  filter: brightness(1.1);\n}\n.main__input-block[data-v-4c13417e] {\n  width: calc(100% - 8vh);\n}\n.main__input[data-v-4c13417e] {\n  height: 100%;\n  width: 100%;\n  background-color: grey;\n  color: white;\n  font-weight: normal;\n}\n\n/*# sourceMappingURL=vue-amount-chooser.vue.map */", map: {"version":3,"sources":["D:\\npm\\vue-amount-chooser\\src\\vue-amount-chooser.vue","vue-amount-chooser.vue"],"names":[],"mappings":"AAgEA;EACA,aAAA;EAAA,uBAAA;EAAA,YAAA;AC7DA;AD+DA;EACA,sBAAA;EAAA,UAAA;EAAA,WAAA;EAAA,aAAA;EAAA,mBAAA;EAAA,uBAAA;EAAA,gBAAA;EAAA,eAAA;EAAA,qBAAA;ACrDA;ADuDA;EACA,uBAAA;ACrDA;ADwDA;EACA,uBAAA;ACtDA;ADwDA;EACA,YAAA;EAAA,WAAA;EAAA,sBAAA;EAAA,YAAA;EAAA,mBAAA;AClDA;;AAEA,iDAAiD","file":"vue-amount-chooser.vue","sourcesContent":["<template>\r\n\t<b class=\"main\">\r\n\t\t<b class=\"main__button\" @click=\"verify(amount - 1)\">-</b>\r\n\t\t<b class=\"main__input-block\">\r\n\t\t\t<input type=\"text\" class=\"input main__input\" v-model=\"input\" ref=\"input\" autofocus>\r\n\t\t</b>\r\n\t\t<b class=\"main__button\" @click=\"verify(amount + 1)\">+</b>\r\n\t</b>\r\n</template>\r\n\r\n<script>\r\n\r\nexport default {\r\n\tcreated() {\r\n\t\tthis.input = this.amount;\r\n\t},\r\n\tdata: function () {\r\n\t\treturn {\r\n\t\t\tinput: 100,\r\n\t\t}\r\n\t},\r\n\tprops: {\r\n\t\tamount: { type: Number }, // v-model\r\n\t\tmin: { type: Number, default: 1 },\r\n\t\tmax: { type: Number, default: Number.MAX_SAFE_INTEGER },\r\n\t},\r\n\tmodel: {\r\n\t\tprop: 'amount',\r\n\t\tevent: 'amount-change'\r\n\t},\r\n\tmethods: {\r\n\t\tinputChanged(value) {\r\n\t\t\tif (value === this.amount) return;\r\n\t\t\tthis.verify(value);\r\n\t\t},\r\n\t\tverify(value) {\r\n\t\t\tvalue = +value;\r\n\t\t\tif (!Number.isInteger(value)) value = 0;\r\n\t\t\tif (value < this.min) value = this.min;\r\n\t\t\tif (value > this.max) value = this.max;\r\n\t\t\tthis.emit(value);\r\n\t\t},\r\n\t\temit(value) {\r\n\t\t\tthis.$emit('amount-change', value);\r\n\t\t\tthis.input = value;\r\n\t\t\tthis.setFocus();\r\n\t\t},\r\n\t\tsetFocus() {\r\n\t\t\tthis.$nextTick(() => {\r\n\t\t\t\tthis.$refs.input.focus();\r\n\t\t\t});\r\n\t\t},\r\n\t},\r\n\twatch: {\r\n\t\t'input': {\r\n\t\t\thandler(newVal, oldVal) {\r\n\t\t\t\tthis.inputChanged(newVal)\r\n\t\t\t}\r\n\t\t},\r\n\t},\r\n}\r\n</script>\r\n\r\n<style scoped lang=\"scss\">\r\n.main {\r\n\tdisplay: flex; justify-content: center; color: white;\r\n\r\n\t&__button {\r\n\t\tbackground-color: grey; width: 4vh; height: 4vh; display: flex; align-items: center; justify-content: center; transition: 0.2s; cursor: pointer; padding-bottom: 0.1vh;\r\n\r\n\t\t&:hover {\r\n\t\t\tfilter: brightness(1.1);\r\n\t\t}\r\n\t}\r\n\t&__input-block {\r\n\t\twidth: calc(100% - 8vh);\r\n\t}\r\n\t&__input {\r\n\t\theight: 100%; width: 100%; background-color: grey; color: white; font-weight: normal\r\n\t}\r\n}\r\n</style>",".main {\n  display: flex;\n  justify-content: center;\n  color: white;\n}\n.main__button {\n  background-color: grey;\n  width: 4vh;\n  height: 4vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: 0.2s;\n  cursor: pointer;\n  padding-bottom: 0.1vh;\n}\n.main__button:hover {\n  filter: brightness(1.1);\n}\n.main__input-block {\n  width: calc(100% - 8vh);\n}\n.main__input {\n  height: 100%;\n  width: 100%;\n  background-color: grey;\n  color: white;\n  font-weight: normal;\n}\n\n/*# sourceMappingURL=vue-amount-chooser.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-4c13417e";
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

export default component;
export { install };
