'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = {
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
  data: function data() {
    return {
      widget_id: "",
      id: "",
      loadScriptPromise: ""
    };
  },
  computed: {
    _value: {
      get: function get() {
        return this.value;
      },
      set: function set(v) {
        this.$emit("input", v);
      }
    }
  },
  created: function created() {
    this.id = "arcaptcha-widget-".concat(this.getRandomID());
  },
  methods: {
    getRandomID: function getRandomID() {
      return new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
    },
    setClasses: function setClasses(classes) {
      this.classes = classes;
    },
    resetClasses: function resetClasses() {
      this.setClasses("");
    },
    execute: function execute() {
      return arcaptcha.execute(this.widget_id);
    },
    reset: function reset() {
      return arcaptcha.reset(this.widget_id);
    },
    disableErrorPrint: function disableErrorPrint() {
      return arcaptcha.disableErrorPrint(this.widget_id);
    },
    registerCallback: function registerCallback() {
      if (this.callback) window["arcaptcha_callback_".concat(this.id)] = this.callback;
      if (this.rendered_callback) window["arcaptcha_rendered_callback_".concat(this.id)] = this.rendered_callback;
      if (this.error_callback) window["arcaptcha_error_callback_".concat(this.id)] = this.error_callback;
      if (this.reset_callback) window["arcaptcha_reset_callback_".concat(this.id)] = this.reset_callback;
      if (this.expired_callback) window["arcaptcha_expired_callback_".concat(this.id)] = this.expired_callback;
      if (this.chlexpired_callback) window["arcaptcha_chlexpired_callback_".concat(this.id)] = this.chlexpired_callback;
    },
    loadCaptcha: function loadCaptcha() {
      this.registerCallback();
      this.widget_id = arcaptcha.render("#".concat(this.id), {
        "site-key": this.site_key,
        size: this.invisible ? "invisible" : "",
        color: this.color,
        theme: this.theme,
        lang: this.lang,
        callback: this.callback ? "arcaptcha_callback_".concat(this.id) : null,
        rendered_callback: this.rendered_callback ? "arcaptcha_rendered_callback_".concat(this.id) : null,
        error_callback: this.error_callback ? "arcaptcha_error_callback_".concat(this.id) : null,
        reset_callback: this.reset_callback ? "arcaptcha_reset_callback_".concat(this.id) : null,
        expired_callback: this.expired_callback ? "arcaptcha_expired_callback_".concat(this.id) : null,
        chlexpired_callback: this.chlexpired_callback ? "arcaptcha_chlexpired_callback_".concat(this.id) : null
      });
    },
    loadScript: function loadScript(url) {
      var _this = this;

      //return new Promise(function (resolve) {
      var my_script = document.head.querySelector("#arcptcha-script");
      var script = my_script || document.createElement("script");
      script.src = url;
      script.id = "arcptcha-script";
      script.defer = true;

      if (!my_script) {
        window.arcaptchaWidgetLoading = new Promise(function (resolve, reject) {
          script.onload = function () {
            resolve();

            _this.initialize();
          };
        });
      }

      if (my_script) {
        window.arcaptchaWidgetLoading.then(function () {
          _this.initialize(); //resolve();

        });
      }

      if (!my_script) {
        document.head.appendChild(script);
      } //   });

    },
    initialize: function initialize() {
      var _this2 = this;

      this.loadCaptcha();
      addEventListener("arcaptcha-token-changed-".concat(this.widget_id), function (event, v) {
        _this2._value = event.detail;
      });
    }
  },
  mounted: function mounted() {
    this.loadScript("https://widget.arcaptcha.ir/1/api.js"); //.then((res) => { });
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "arcaptcha-vue",
    attrs: {
      "id": this.id
    }
  }, []);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-5de17572";
/* module identifier */

var __vue_module_identifier__ = "data-v-5de17572";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var component$1 = __vue_component__;// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = component$1; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('ArcaptchaVue', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;