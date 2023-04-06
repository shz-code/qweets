<template>
  <h4 class="text-bold text-center">Register as a new user</h4>

  <q-banner class="text-white bg-red q-mb-md" rounded v-if="error_msg">
    {{ error_msg }}
  </q-banner>

  <form style="width: 100%" @submit="handleSubmit">
    <q-input required v-model="username" label="Username" dense />
    <q-input required v-model="fullName" label="Full Name" dense />
    <q-input required v-model="avatar" label="Avatar Link" dense />
    <div class="q-mt-md row justify-between items-center">
      <q-btn color="secondary" flat dense @click="toggleBtn">
        Login to existing account
      </q-btn>
      <q-btn
        color="primary"
        icon="person_add"
        rounded
        label="Register"
        :loading="loading"
        type="submit"
        :disabled="username === '' || avatar === '' || fullName === ''"
      />
    </div>
  </form>
</template>

<script>
import userStore from "src/stores/user-store";
import { defineComponent } from "vue";

const userInstance = userStore();

export default defineComponent({
  name: "UserSignup",
  data() {
    return {
      username: "",
      fullName: "",
      avatar: "",
      loading: false,
      error_msg: "",
    };
  },
  emits: ["login"],
  methods: {
    toggleBtn() {
      this.$emit("login");
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      const res = await userInstance.addUser({
        username: this.username,
        fullName: this.fullName,
        avatar: this.avatar,
      });
      this.loading = false;
      if (res === 200) {
        this.$router.push({ name: "Home" });
      } else {
        this.error_msg = "Username already exists";
      }
    },
  },
});
</script>
