<template>
  <q-item class="items-start">
    <q-item-section avatar>
      <q-avatar>
        <img :src="qweet.avatar" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-grey text-overline text-subtitle1"
        >@{{ qweet.username }} &bull; {{ relativeDate }}
      </q-item-label>
      <q-item-label class="text-body1">
        <span class="text-weight-bold">{{ qweet.name }}</span>
        {{ qweet.qweet }}
      </q-item-label>
      <div>
        <div class="q-pa-md q-gutter-md">
          <q-btn
            flat
            dense
            icon="favorite_border"
            style="margin-left: -5px"
            v-if="!checked"
            @click="() => (checked = !checked)"
          />
          <q-btn
            flat
            dense
            icon="favorite"
            color="red"
            style="margin-left: -5px"
            v-if="checked"
            @click="() => (checked = !checked)"
          />
          <q-btn
            flat
            dense
            icon="delete"
            @click="deleteEvent"
            v-if="username === qweet.username"
          />
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import moment from "moment";
import qweetsStore from "src/stores/qweets-store";
import userStore from "src/stores/user-store";
import { storeToRefs } from "pinia";

const qweetInstance = qweetsStore();
const userInstance = userStore();
const { username } = storeToRefs(userInstance);

export default defineComponent({
  name: "QweetItem",
  data() {
    return {
      username: username,
      checked: false,
    };
  },
  props: {
    qweet: {
      type: Object,
      required: true,
    },
  },
  computed: {
    relativeDate() {
      return moment(this.qweet.dateCreated).fromNow();
    },
  },
  methods: {
    deleteEvent() {
      qweetInstance.deleteQweet(this.qweet);
    },
  },
});
</script>
