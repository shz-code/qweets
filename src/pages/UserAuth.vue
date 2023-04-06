<template>
  <q-page class="q-pa-md">
    <div style="max-width: 800px; margin: auto">
      <SignupPic />
    </div>
    <div v-if="login">
      <UserLogin @register="toggleRegister" />
    </div>
    <div v-else>
      <UserSignup @login="toggleLogin" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import SignupPic from "../components/SignupPic.vue";
import UserSignup from "../components/UserSignup.vue";
import UserLogin from "../components/UserLogin.vue";

export default defineComponent({
  name: "UserAuth",
  data() {
    return {
      login: true,
    };
  },
  components: {
    SignupPic,
    UserLogin,
    UserSignup,
  },
  methods: {
    toggleRegister() {
      this.login = false;
    },
    toggleLogin() {
      this.login = true;
    },
  },
});
</script>
