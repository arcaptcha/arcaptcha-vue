# ARCaptcha Vue

ARCaptcha Component Library for Vue.js which is Compatible with Vue 2. (Vue3 support is under development)

## Installation

You can install this library via npm with:

- vue2: `npm install arcaptcha-vue --save`

or via yarn:

- vue2: `yarn add arcaptcha-vue`

or via script tag (`Vue` must be globally available)

- vue2
  ```
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/arcaptcha-vue"></script>
  ```

#### Basic Usage

- vue2:

  ```
  <template>
      <arcaptcha-vue sitekey="site_key"></arcaptcha-vue>
  </template>

  <script>
    import ArcaptchaVue from 'arcaptcha-vue';
    export default {
      ...
      components: { ArcaptchaVue }
    };
  </script>
  ```

### JS API

#### Props

| Name        | Values/Type | Required | Default | Description                                                                                                    |
| ----------- | ----------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| `sitekey`   | String      | **Yes**  | `-`     | Your sitekey. Please visit [ARCaptcha](https://arcaptcha.ir) and sign up to get a sitekey.                     |
| `invisible` | Boolean     | No       | `false` | This specifies the visibility of the checkbox. To activate arcaptcha in invisible mode set this option to true |
| `callback`  | Function    | No       | `null`  | A function that will be called after successfull challenge solving.                                            |

### Methods

| Method      | Description                                  |
| ----------- | -------------------------------------------- |
| `execute()` | Programmatically trigger a challenge request |
| `reset()`   | Reset the current challenge                  |

### FAQ

#### How can I get a sitekey?

Sign up at [ARCaptcha](https://arcaptcha.ir) to get your sitekey. Check [documentation](https://docs.arcaptcha.ir) for more information.

### Demo

To run the demo:

1. clone this repo `git clone https://github.com/arcaptcha/arcaptcha-vue.git`
2. `cd example/`
3. `yarn && yarn serve`
   - it will start the demo app on localhost:8080
