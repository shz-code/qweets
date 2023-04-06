<template>
  <h4 class="text-bold text-center">Login to existing account</h4>

  <q-banner class="text-white bg-red q-mb-md" rounded v-if="error_msg !== ''">
    {{ error_msg }}
  </q-banner>

  <form style="width: 100%" @submit="handleSubmit">
    <q-input v-model="username" label="Username" dense />
    <div class="q-mt-md row justify-between items-center">
      <q-btn color="secondary" flat dense @click="toggleBtn"
        >Register as new user</q-btn
      >
      <q-btn
        color="primary"
        icon="login"
        rounded
        label="Login"
        :disabled="username == ''"
        :loading="loading"
        type="submit"
      />
    </div>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import userStore from "src/stores/user-store";

const userStoreInstance = userStore();

export default defineComponent({
  name: "UserLogin",
  data() {
    return {
      username: "",
      loading: false,
      error_msg: "",
    };
  },
  emits: ["register"],
  methods: {
    toggleBtn() {
      this.$emit("register");
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.error_msg = "";
      this.loading = true;

      const res = await userStoreInstance.login(this.username);
      this.loading = false;
      if (res === 200) {
        this.$router.push({ name: "Home" });
      } else {
        this.error_msg = "User Not Found";
      }
    },
  },
});
</script>
