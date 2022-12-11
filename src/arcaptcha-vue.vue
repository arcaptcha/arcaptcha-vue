<script>
export default /*#__PURE__*/ {
  name: "ArcaptchaVue",
  props: {
    value: {},
    site_key: {},
    invisible: {
      default: false,
    },
    callback: {
      default: false,
    },
    rendered_callback: {
      default: false,
    },
    error_callback: {
      default: false,
    },
    reset_callback: {
      default: false,
    },
    expired_callback: {
      default: false,
    },
    chlexpired_callback: {
      default: false,
    },
    color: {
      type: String,
      default: "normal",
    },
    lang: {
      type: String,
      default: "fa",
    },
    theme: {
      type: String,
      default: "light",
    },
  },
  data() {
    return {
      widget_id: "",
      id: "",
      loadScriptPromise: "",
    };
  },
  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },
  created() {
    this.id = `arcaptcha-widget-${this.getRandomID()}`;
  },
  methods: {
    getRandomID() {
      return (
        new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
      );
    },
    setClasses(classes) {
      this.classes = classes;
    },
    resetClasses() {
      this.setClasses("");
    },
    execute() {
      arcaptcha.execute(this.widget_id);
    },
    reset() {
      arcaptcha.reset(this.widget_id);
    },
    registerCallback() {
      if (this.callback)
        window[`arcaptcha_callback_${this.id}`] = this.callback;
      if (this.rendered_callback)
        window[`arcaptcha_rendered_callback_${this.id}`] =
          this.rendered_callback;
      if (this.error_callback)
        window[`arcaptcha_error_callback_${this.id}`] = this.error_callback;
      if (this.reset_callback)
        window[`arcaptcha_reset_callback_${this.id}`] = this.reset_callback;
      if (this.expired_callback)
        window[`arcaptcha_expired_callback_${this.id}`] = this.expired_callback;
      if (this.chlexpired_callback)
        window[`arcaptcha_chlexpired_callback_${this.id}`] =
          this.chlexpired_callback;
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
        rendered_callback: this.rendered_callback
          ? `arcaptcha_rendered_callback_${this.id}`
          : null,
        error_callback: this.error_callback
          ? `arcaptcha_error_callback_${this.id}`
          : null,
        reset_callback: this.reset_callback
          ? `arcaptcha_reset_callback_${this.id}`
          : null,
        expired_callback: this.expired_callback
          ? `arcaptcha_expired_callback_${this.id}`
          : null,
        chlexpired_callback: this.chlexpired_callback
          ? `arcaptcha_chlexpired_callback_${this.id}`
          : null,
      });
    },
    loadScript(url) {
      //return new Promise(function (resolve) {
      var my_script = document.head.querySelector("#arcptcha-script");
      let script = my_script || document.createElement("script");
      script.src = url;
      script.id = "arcptcha-script";
      script.async = true;
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
          this.initialize();
          //resolve();
        });
      }
      if (!my_script) {
        document.head.appendChild(script);
      }
      //   });
    },
    initialize() {
      this.loadCaptcha();
      addEventListener(
        `arcaptcha-token-changed-${this.widget_id}`,
        (event, v) => {
          this._value = event.detail;
        }
      );
    },
  },
  mounted() {
    this.loadScript("https://widget.arcaptcha.ir/1/api.js");
    //.then((res) => { });
  },
};
</script>

<template>
  <div class="arcaptcha-vue" :id="this.id"></div>
</template>

<style scoped></style>
