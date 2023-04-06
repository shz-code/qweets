<template>
  <q-page>
    <div class="row justify-center q-my-md">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOutUp"
      >
        <div v-if="showNewQweet">
          <q-btn
            push
            color="primary"
            rounded
            icon="fa-solid fa-tornado"
            label="Add New Qweet"
            @click="($event) => (showNewQweet = !showNewQweet)"
          />
        </div>
        <div v-else class="newQweet q-pa-md">
          <div v-if="username !== ''">
            <AddNewQweetForm />
          </div>
          <div v-else>
            <q-banner class="text-dark bg-amber-6 q-mb-md" rounded>
              Login to write a qweet.
              <router-link to="/register">Login here</router-link>
            </q-banner>
          </div>
        </div>
      </transition>
    </div>
    <q-separator size="10px" color="grey-2 separator" />

    <div class="q-pa-md q-gutter-md qweet-list">
      <QweetList />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import AddNewQweetForm from "../components/AddNewQweetForm.vue";
import QweetList from "src/components/QweetList.vue";
import qweetsStore from "src/stores/qweets-store";
import { storeToRefs } from "pinia";
import userStore from "src/stores/user-store";

const qweetsInstance = qweetsStore();
const userInstance = userStore();

const { username } = storeToRefs(userInstance);

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      showNewQweet: true,
      allQweets: [],
      username: username,
    };
  },
  created() {
    qweetsInstance.initialize();
  },
  components: {
    AddNewQweetForm,
    QweetList,
  },
});
</script>

<style lang="scss">
.newQweet {
  width: 100%;
}

.separator {
  border-top: 1px solid $grey-2;
  border-bottom: 1px solid $grey-2;
}
</style>
