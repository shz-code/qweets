<template>
  <h5 class="q-px-md text-bold">All Users</h5>
  <q-list>
    <div v-if="users.length">
      <div v-for="user in users" :key="user.dateCreated">
        <q-item>
          <UserItem :user="user" />
        </q-item>
      </div>
    </div>

    <div v-else>
      <div class="row justify-center">
        <q-spinner color="primary" size="3em" :thickness="5" />
      </div>
    </div>
  </q-list>
</template>

<script>
import { storeToRefs } from "pinia";
import userStore from "src/stores/user-store";
import { defineComponent } from "vue";
import UserItem from "./UserItem.vue";

const userInstance = userStore();
const { users } = storeToRefs(userInstance);

export default defineComponent({
  name: "AllUsers",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    userInstance.getAllUsers();
    this.users = users;
  },
  components: {
    UserItem,
  },
});
</script>
