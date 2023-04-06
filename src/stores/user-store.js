import { defineStore } from "pinia";
import db from "boot/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const userStore = defineStore("user", {
  state: () => ({
    username: "",
    fullName: "",
    avatar: "",
    users: [],
  }),
  getters: {
    getUser() {
      return {
        username: this.username,
        fullName: this.fullName,
        avatar: this.avatar,
      };
    },
  },
  actions: {
    async getAllUsers() {
      this.users = [];
      const userRef = collection(db, "users");
      const userQuery = query(userRef);
      try {
        const snapshot = await getDocs(userQuery);
        snapshot.forEach((doc) => {
          this.users = [doc.data(), ...this.users];
        });
      } catch (err) {}
    },
    async addUser(data) {
      let flag = true;
      try {
        const userRef = collection(db, "users");
        const userQuery = query(
          userRef,
          where("username", "==", data.username)
        );
        const snapshot = await getDocs(userQuery);
        snapshot.forEach((doc) => {
          flag = false;
        });

        if (flag) {
          const newUser = {
            username: data.username,
            fullName: data.fullName,
            avatar: data.avatar,
            dateCreated: Date.now(),
          };
          await addDoc(collection(db, "users"), newUser);
          this.username = data.username;
          this.fullName = data.fullName;
          this.avatar = data.avatar;
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: this.username,
              fullName: this.fullName,
              avatar: this.avatar,
            })
          );
          this.users = [newUser, ...this.users];
          return 200;
        } else return 404;
      } catch (error) {
        console.log(error);
      }
    },
    async login(username) {
      const userRef = collection(db, "users");
      const userQuery = query(userRef, where("username", "==", username));
      try {
        const snapshot = await getDocs(userQuery);
        snapshot.forEach((doc) => {
          this.username = doc.data().username;
          this.fullName = doc.data().fullName;
          this.avatar = doc.data().avatar;
        });
        if (this.username !== "") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: this.username,
              fullName: this.fullName,
              avatar: this.avatar,
            })
          );
          return 200;
        } else return 404;
      } catch (error) {}
    },
    initialize() {
      const localAuth = localStorage.getItem("user");
      if (localAuth) {
        const auth = JSON.parse(localAuth);
        this.username = auth.username;
        this.fullName = auth.fullName;
        this.avatar = auth.avatar;
      }
    },
    logout() {
      localStorage.clear();
      this.username = "";
      this.fullName = "";
      this.avatar = "";
    },
  },
});

export default userStore;
