<template>
  <ul>
    <button @click="confrimInput">Confirm</button>
    <button @click="saveChanges">Save changes</button>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  data() {
    return {
      changesSaved: false,
    };
  },
  components: {
    UserItem,
  },
  inject: ['users'],
  methods: {
    confrimInput() {
      //do something
      this.$router.push('/teams');
    },
    saveChanges() {
      this.changesSaved = true;
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('UserList Cmp beforeRouteEnter');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UserList Cmp beforeRouteLeave');
    console.log(to, from);
    if (this.changesSaved) {
      next();
    } else {
      const userWantToLeave = confirm('Are you sure? You got unsaved changes!');
      next(userWantToLeave);
    }
  },
  unmounted() {
    console.log('unmounted');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
