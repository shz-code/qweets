<template>
  <q-item-section avatar>
    <q-avatar> <img :src="user.avatar" alt="Profile Picture" /></q-avatar>
  </q-item-section>
  <q-item-section>
    <q-item-label class="text-grey text-overline text-subtitle1"
      >@{{ user.username }} &bull;
      <span class="text-weight-bold">{{ user.fullName }}</span>
    </q-item-label>
    <span>Registered {{ relativeDate }}</span>
  </q-item-section>
</template>

<script>
import moment from "moment";
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserItem",
  props: {
    user: {
      type: Object,
    },
  },
  computed: {
    relativeDate() {
      return moment(this.user.dateCreated).fromNow();
    },
  },
});
</script>
