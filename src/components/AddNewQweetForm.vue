<template>
  <!-- New Qweet Input -->
  <q-input
    bottom-slots
    v-model="localQweet"
    placeholder="What's on your mind"
    counter
    maxlength="220"
    autogrow
    class="items-end"
  >
    <template v-slot:before>
      <q-avatar size="xl">
        <img :src="avatar" />
      </q-avatar>
    </template>
    <!-- Input Buttons -->
    <template v-slot:after>
      <q-icon
        v-if="localQweet !== ''"
        name="close"
        @click="localQweet = ''"
        class="cursor-pointer q-mr-sm"
      />
      <q-btn color="primary" rounded label="Add" @click="addQweet" />
    </template>
    <!-- Input Buttons End -->
  </q-input>
  <!-- New Qweet Input End -->
</template>

<script>
import { defineComponent } from "vue";
import qweetsStore from "src/stores/qweets-store";
import userStore from "src/stores/user-store";
import { storeToRefs } from "pinia";

const qweetsInstance = qweetsStore();
const userInstance = userStore();

const { avatar } = storeToRefs(userInstance);

export default defineComponent({
  name: "AddNewQweetForm",
  data() {
    return {
      localQweet: "",
      avatar: avatar,
    };
  },
  methods: {
    addQweet() {
      qweetsInstance.addQweet(this.localQweet);
      this.localQweet = "";
    },
  },
});
</script>
