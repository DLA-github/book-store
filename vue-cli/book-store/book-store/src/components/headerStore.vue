<template>
  <header>
    <h1>Book Store</h1>
  </header>
</template>

<script>
export default {
  name: "headerStore",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  background-color: #888;
  text-align: center;
}
</style>
