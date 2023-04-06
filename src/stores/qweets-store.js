import { defineStore, storeToRefs } from "pinia";
import userStore from "./user-store";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import db from "src/boot/firebase";

const qweetsStore = defineStore({
  id: "qweetsStore",
  state: () => ({
    qweets: [],
    loading: false,
  }),
  getters: {
    getQweets() {
      return this.qweets;
    },
  },
  actions: {
    async initialize() {
      this.qweets = [];
      this.loading = true;
      try {
        const qweetsRef = collection(db, "qweets");
        const q = query(qweetsRef, orderBy("dateCreated", "desc"));
        const initialQweets = await getDocs(q);
        initialQweets.forEach((doc) => {
          let qweet = doc.data();
          qweet.docId = doc.id;
          this.qweets = [...this.qweets, qweet];
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async addQweet(value) {
      const nextId = this.qweets.reduce(
        (maxId, item) => Math.max(item.id, maxId),
        0
      );
      const userInstance = userStore();
      try {
        let newQweetObj = {
          id: nextId + 1,
          username: userInstance.username,
          fullName: userInstance.fullName,
          avatar: userInstance.avatar,
          qweet: value,
          dateCreated: Date.now(),
        };
        const res = await addDoc(collection(db, "qweets"), newQweetObj);
        newQweetObj.docId = res.id;
        this.qweets = [newQweetObj, ...this.qweets];
      } catch (error) {
        console.log(error);
      }
    },
    async deleteQweet(qweet) {
      try {
        await deleteDoc(doc(db, "qweets", qweet.docId));
        this.qweets = this.qweets.filter((item) => item !== qweet);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default qweetsStore;
