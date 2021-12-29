<template>
    <div>
        <arcaptcha-vue
            site_key="21smftb02t"
            :callback="onSuccess"
            ref="widget"
        ></arcaptcha-vue>

        <button @click="testReset">click</button>
    </div>
</template>

<script>
import ArcaptchaVue from "arcaptcha-vue";

export default {
    methods: {
        onSuccess(token) {
            console.log(token);
        },
        testReset() {
            this.$refs.widget.resetCaptcha();
        },
    },
    name: "App",
    components: {
        ArcaptchaVue,
    },
};
</script>