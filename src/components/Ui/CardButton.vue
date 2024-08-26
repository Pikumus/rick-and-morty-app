<script setup lang="ts">
const props = defineProps({
  imageUrl: { type: String },
  text: { type: String },
});
</script>

<template>
  <div class="card-button">
    <img :src="props.imageUrl" alt="rick" class="card-button__image" />
  </div>
</template>

<style lang="scss">
.card-button {
  border: 1px solid whitesmoke;
  border-radius: 2px;
  width: 50%;
  height: 100%;

  &__image {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
}
</style>
