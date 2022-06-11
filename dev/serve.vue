<script>
import Vue from "vue";
import ArcaptchaVue from "@/arcaptcha-vue.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    ArcaptchaVue,
  },
});
</script>

<template>
  <div id="app">
    <arcaptcha-vue site_key="0jgxzoib9c" />
  </div>
</template>
