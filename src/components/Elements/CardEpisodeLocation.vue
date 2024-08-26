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
  <div class="card-episode-location" @click="goToCharacterPage">
    <img
      v-if="data.image"
      class="card-episode-location__img"
      :src="data.image"
      :alt="data.name"
    />
    <div class="card-episode-location-details">
      <strong>{{ data.name }}</strong>
      <p>{{ data.species }} {{ data.status }}</p>
      <p>{{ data.type }} {{ data.air_date }}</p>
    </div>
  </div>
</template>

<style scoped>
.card-episode-location {
  height: 80%;
  max-width: 100%;
  border: 1px solid black;
  border-radius: 10px;
  background-color: rgb(45, 47, 52);
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-episode-location:hover {
  transform: scale(1.05);
}

.card-episode-location__img {
  border-radius: 10px;
  max-width: 100%;
  object-fit: contain;
}

.card-episode-location-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* Равное расстояние между элементами */
  align-items: center; /* Центрирование текста по горизонтали */
  height: 100%; /* Занимает всю высоту контейнера */
  padding: 1rem;
}
</style>
