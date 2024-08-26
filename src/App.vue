<script setup lang="ts">
import NavigationMain from "@/components/Navigation/NavigationMain.vue";
</script>
<template>
  <div class="app">
    <NavigationMain />
    <router-view />
  </div>
</template>

<style lang="scss">
.app {
  height: 100vh;
  overflow: auto;
  background-color: rgb(30, 32, 38);
}
</style>
