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
    closed_callback: {
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
      return arcaptcha.execute(this.widget_id);
    },
    reset() {
      return arcaptcha.reset(this.widget_id);
    },
    disableErrorPrint() {
      return arcaptcha.disableErrorPrint(this.widget_id);
    },
    loadCaptcha() {
      this.widget_id = arcaptcha.render(`#${this.id}`, {
        "site-key": this.site_key,
        size: this.invisible ? "invisible" : "",
        color: this.color,
        theme: this.theme,
        lang: this.lang,
        callback: this.callback,
        rendered_callback: this.rendered_callback,
        error_callback: this.error_callback,
        reset_callback: this.reset_callback,
        expired_callback: this.expired_callback,
        chlexpired_callback: this.chlexpired_callback,
        closed_callback: this.closed_callback
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
