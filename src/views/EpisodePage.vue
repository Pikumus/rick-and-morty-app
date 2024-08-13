<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useEpisodeStore } from "@/stores/useEpisodeStore";
import { useRoute, useRouter } from "vue-router";
import { appRoutes } from "@/router/appRoutes";

const route = useRoute();
const router = useRouter();
const episodeStore = useEpisodeStore();

const fetchEpisodeData = async () => {
  const episodeId = Number(route.params.id);
  if (!isNaN(episodeId)) {
    await episodeStore.fetchEpisode(episodeId);
  } else {
    console.error("Invalid episode ID:", episodeId);
  }
};

function goToCharacterPage(id: number) {
  router.push({
    name: appRoutes.CharacterDetailPageRoute.name,
    params: { id },
  });
}

onMounted(fetchEpisodeData);
watch(() => route.params.id, fetchEpisodeData);

const episode = computed(() => episodeStore.episode);
const characters = computed(() => episodeStore.characters);
const loading = computed(() => episodeStore.loading);
const error = computed(() => episodeStore.error);
</script>

<template>
  <div class="episode-page" v-if="episode">
    <h2>{{ episode.name }}</h2>
    <p>{{ episode.air_date }}</p>
    <p>{{ episode.created }}</p>
  </div>
  <div v-else-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>

  <ul>
    <li
      @click="goToCharacterPage(character.id)"
      v-for="character in characters"
      :key="character.id"
    >
      <img :src="character.image" :alt="character.name" />
      <h3>{{ character.name }}</h3>
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
