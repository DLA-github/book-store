<template>
  <div class="portadas">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ShowBooks",
  data() {
    return {
      msg: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img {
  width: 240px;
  height: 370px;
}

.portadas {
  display: flex;
  flex-wrap: wrap;
}

.sample {
  background-color: transparent;
  flex-grow: 1;
  margin: 30px auto;
  max-width: 240px;
  max-height: 370px;
  perspective: 1000px;
  /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.portada {
  position: relative;
  width: 240px;
  height: 370px;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.sample:hover .portada {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.preview,
.info {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */

/* Style the back side */
.info {
  background-color: #bbb;
  color: black;
  transform: rotateY(180deg);
}

button {
  position: absolute;
  left: 60px;
  width: 120px;
}
</style>
