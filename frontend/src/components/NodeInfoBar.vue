<template>
  <div class="info-container">
    <h2>{{ node.name }}</h2>
    <p>{{ node.description }}</p>
  </div>
</template>

<script>
export default {
  props: ['node']
}
</script>

<style>
.info-container {
  margin: 0px;
  padding: 20px;
  position: static;
  color: #17928c;
}
</style>
