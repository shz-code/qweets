<template>
  <q-list class="rounded-borders">
    <div v-if="loading">
      <div class="row justify-center">
        <q-spinner color="primary" size="3em" :thickness="5" />
      </div>
    </div>
    <transition-group
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-if="qweets.length && !loading">
        <div v-for="qweet in qweets" :key="qweet.id">
          <QweetItem :qweet="qweet" />
        </div>
      </div>
      <div v-else-if="!qweets.length && !loading">
        <q-banner class="text-dark bg-amber-6 q-mb-md" rounded>
          No Qweets Found
        </q-banner>
      </div>
    </transition-group>
  </q-list>
</template>

<script>
import { defineComponent } from "vue";
import qweetsStore from "../stores/qweets-store";
import QweetItem from "../components/QweetItem.vue";
import { storeToRefs } from "pinia";

const qweetsInstance = qweetsStore();

const { qweets, loading } = storeToRefs(qweetsInstance);

export default defineComponent({
  name: "QweetList",
  data() {
    return {
      qweets: [],
      loading: loading,
    };
  },
  components: {
    QweetItem,
  },
  mounted() {
    this.qweets = qweets;
  },
});
</script>
