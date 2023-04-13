<template>
  <q-page class="q-pa-lg">
    <h4 class="q-mt-none q-mb-md text-weight-bold">
      About Qweets
      <q-icon
        name="fa-solid fa-tornado"
        class="q-pa-md text-primary"
        size="lg"
      />
    </h4>
    <div class="text-body1">
      <p>
        <span class="brand">Qweets</span> is a mini text sharing platform made
        with <a href="https://quasar.dev/" target="_blank">Quasar</a> a
        <a href="https://vuejs.org/" target="_blank">Vue Js</a> framework with
        <a href="https://pinia.vuejs.org/" target="_blank">Pinia</a> as the
        state management tool. <br />
        Users can register themselves and start sending messages (Dummy
        authentication with username) and also register as a new user.
      </p>

      <p>
        This mini project <span class="brand">Qweets</span> is inspired from
        <a href="https://youtu.be/la-0ulfn0_M" target="_blank">freecodecamp</a>
        and developed by
        <a href="https://github.com/shz-code" target="_blank">@shz-code</a>
      </p>
      <div class="icons flex-col items-center q-mt-lg">
        <span class="text-secondary text-bold">Connect with me!</span>
        <div class="row q-gutter-md q-pa-sm">
          <a
            href="https://www.facebook.com/fb.shahidul.alam"
            class="icon-link"
            target="_blank"
          >
            <q-icon name="fa-brands fa-facebook" color="primary" size="md" />
          </a>
          <a
            href="https://github.com/shz-code"
            class="icon-link"
            target="_blank"
          >
            <q-icon name="fa-brands fa-github" size="md" />
          </a>
          <a
            href="https://www.linkedin.com/in/in-shahidul-alam/"
            class="icon-link"
            target="_blank"
          >
            <q-icon name="fa-brands fa-linkedin" color="primary" size="md" />
          </a>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageAbout",
});
</script>

<style scoped lang="scss">
.icon-link {
  text-decoration: none;
  color: inherit;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.brand {
  color: $primary;
  font-weight: bold;
}
</style>
