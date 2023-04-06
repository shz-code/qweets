<template>
  <q-layout view="lHr LpR lFr">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="fa-solid fa-tornado"
          class="lt-md text-primary"
          size="lg"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="gt-sm text-bold">
          {{ $route.name }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="350"
    >
      <q-img
        src="https://images.unsplash.com/photo-1528804431125-842f17de657b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80"
        height="200px"
      >
        <q-icon
          name="fa-solid fa-tornado"
          class="q-pa-md text-white"
          size="xl"
        />
      </q-img>

      <q-list class="q-mt-lg">
        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section class="text-bold">Home</q-item-section>
        </q-item>

        <div v-if="username === ''">
          <q-item clickable v-ripple to="/register" exact>
            <q-item-section avatar>
              <q-icon name="verified_user" />
            </q-item-section>
            <q-item-section class="text-bold">Authentication</q-item-section>
          </q-item>
        </div>

        <div v-if="username !== ''">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section class="text-bold" @click="handleLogout"
              >Logout</q-item-section
            >
          </q-item>
        </div>
        <div class="absolute-bottom q-pa-md">
          <router-link to="/about">
            <span class="text-primary text-bold"> About </span></router-link
          >
        </div>
      </q-list>
    </q-drawer>

    <q-page-container class="">
      <router-view />
    </q-page-container>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-img
        src="https://images.unsplash.com/photo-1528804431125-842f17de657b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80"
        height="200px"
      >
      </q-img>
      <AllUsers />
    </q-drawer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import userStore from "src/stores/user-store";
import { storeToRefs } from "pinia";
import AllUsers from "src/components/AllUsers.vue";

const userInstance = userStore();

const { username } = storeToRefs(userInstance);

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      username: "",
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  created() {
    userInstance.initialize();
    this.username = username;
  },
  methods: {
    handleLogout() {
      userInstance.logout();
    },
  },
  components: {
    AllUsers,
  },
});
</script>
