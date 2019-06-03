<template>
  <div id="bookstore">
    <headerStore></headerStore>
    <showbooks></showbooks>
  </div>
</template>

<script>
import showbooks from "./components/showbooks.vue";
import headerStore from "./components/headerStore.vue";

export default {
  name: "bookstore",
  components: {
    showbooks,
    headerStore
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
