var script = {
  name: "ArcaptchaVue",
  props: {
    value: {},
    site_key: {},
    invisible: {
      default: false
    },
    callback: {
      default: false
    },
    rendered_callback: {
      default: false
    },
    error_callback: {
      default: false
    },
    reset_callback: {
      default: false
    },
    expired_callback: {
      default: false
    },
    chlexpired_callback: {
      default: false
    },
    color: {
      type: String,
      default: "normal"
    },
    lang: {
      type: String,
      default: "fa"
    },
    theme: {
      type: String,
      default: "light"
    }
  },

  data() {
    return {
      widget_id: "",
      id: "",
      loadScriptPromise: ""
    };
  },

  computed: {
    _value: {
      get() {
        return this.value;
      },

      set(v) {
        this.$emit("input", v);
      }

    }
  },

  created() {
    this.id = `arcaptcha-widget-${this.getRandomID()}`;
  },

  methods: {
    getRandomID() {
      return new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
    },

    setClasses(classes) {
      this.classes = classes;
    },

    resetClasses() {
      this.setClasses("");
    },

    execute() {
      return arcaptcha.execute(this.widget_id);
    },

    reset() {
      return arcaptcha.reset(this.widget_id);
    },

    disableErrorPrint() {
      return arcaptcha.disableErrorPrint(this.widget_id);
    },

    registerCallback() {
      if (this.callback) window[`arcaptcha_callback_${this.id}`] = this.callback;
      if (this.rendered_callback) window[`arcaptcha_rendered_callback_${this.id}`] = this.rendered_callback;
      if (this.error_callback) window[`arcaptcha_error_callback_${this.id}`] = this.error_callback;
      if (this.reset_callback) window[`arcaptcha_reset_callback_${this.id}`] = this.reset_callback;
      if (this.expired_callback) window[`arcaptcha_expired_callback_${this.id}`] = this.expired_callback;
      if (this.chlexpired_callback) window[`arcaptcha_chlexpired_callback_${this.id}`] = this.chlexpired_callback;
    },

    loadCaptcha() {
      this.registerCallback();
      this.widget_id = arcaptcha.render(`#${this.id}`, {
        "site-key": this.site_key,
        size: this.invisible ? "invisible" : "",
        color: this.color,
        theme: this.theme,
        lang: this.lang,
        callback: this.callback ? `arcaptcha_callback_${this.id}` : null,
        rendered_callback: this.rendered_callback ? `arcaptcha_rendered_callback_${this.id}` : null,
        error_callback: this.error_callback ? `arcaptcha_error_callback_${this.id}` : null,
        reset_callback: this.reset_callback ? `arcaptcha_reset_callback_${this.id}` : null,
        expired_callback: this.expired_callback ? `arcaptcha_expired_callback_${this.id}` : null,
        chlexpired_callback: this.chlexpired_callback ? `arcaptcha_chlexpired_callback_${this.id}` : null
      });
    },

    loadScript(url) {
      //return new Promise(function (resolve) {
      var my_script = document.head.querySelector("#arcptcha-script");
      let script = my_script || document.createElement("script");
      script.src = url;
      script.id = "arcptcha-script";
      script.defer = true;

      if (!my_script) {
        window.arcaptchaWidgetLoading = new Promise((resolve, reject) => {
          script.onload = () => {
            resolve();
            this.initialize();
          };
        });
      }

      if (my_script) {
        window.arcaptchaWidgetLoading.then(() => {
          this.initialize(); //resolve();
        });
      }

      if (!my_script) {
        document.head.appendChild(script);
      } //   });

    },

    initialize() {
      this.loadCaptcha();
      addEventListener(`arcaptcha-token-changed-${this.widget_id}`, (event, v) => {
        this._value = event.detail;
      });
    }

  },

  mounted() {
    this.loadScript("https://widget.arcaptcha.ir/1/api.js"); //.then((res) => { });
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "arcaptcha-vue",
    attrs: {
      "id": this.id
    }
  });
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = "data-v-5de17572";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var component = __vue_component__;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = component; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('ArcaptchaVue', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
