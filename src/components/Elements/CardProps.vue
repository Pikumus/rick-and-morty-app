<script lang="ts" setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  data: {
    id: number;
    name: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
    image?: string;
    air_date?: string;
  };
  routeName: string;
}>();

const router = useRouter();

function goToCharacterPage() {
  router.push({
    name: props.routeName,
    params: { id: props.data.id },
  });
}
</script>
<!-- src/components/CharacterCard.vue -->
<template>
  <div class="character-card" @click="goToCharacterPage">
    <img
      v-if="data.image"
      class="character-card__img"
      :src="data.image"
      :alt="data.name"
    />
    <div class="character-card__details">
      <strong>{{ data.name }}</strong>
      <p>{{ data.species }} {{ data.status }}</p>
      <p>{{ data.air_date }}</p>
    </div>
  </div>
</template>

<style scoped>
.character-card {
  height: 80%;
  max-width: 100%;
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  background-color: rgb(45, 47, 52);
  cursor: pointer;
  transition: transform 0.2s;
}

.character-card:hover {
  transform: scale(1.05);
}

.character-card__img {
  border-radius: 10px;
  max-width: 50%;
  object-fit: contain;
}

.character-card__details {
  padding-top: 10%;
  color: white;
  margin: 0 auto;
}
</style>
