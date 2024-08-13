<script lang="ts" setup>
import { onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCharacterStore } from "@/stores/useCharacterStore";
import { appRoutes } from "@/router/appRoutes";

const route = useRoute();
const router = useRouter();
const characterStore = useCharacterStore();

const fetchCharacterData = async () => {
  const characterId = Number(route.params.id);
  if (!isNaN(characterId)) {
    await characterStore.fetchCharacter(characterId);
  } else {
    console.error("Invalid character ID:", route.params.id);
  }
};

// Загружаем данные при монтировании компонента
onMounted(fetchCharacterData);

// Отслеживаем изменение ID персонажа и подгружаем новые данные
watch(() => route.params.id, fetchCharacterData);

function goToEpisodePage(id: number) {
  router.push({
    name: appRoutes.EpisodeDetailPageRoute.name,
    params: { id },
  });
}

// Данные из хранилища
const character = computed(() => characterStore.character);
const episodes = computed(() => characterStore.episodes);
const loading = computed(() => characterStore.loading);
const error = computed(() => characterStore.error);
</script>

<template>
  <div v-if="character">
    <h1>{{ character.name }}</h1>
    <img :src="character.image" :alt="character.name" />
    <p>{{ character.location.name }}</p>

    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <ul v-if="episodes.length">
      <li
        @click="goToEpisodePage(episode.id)"
        v-for="episode in episodes"
        :key="episode.id"
      >
        <strong>{{ episode.name }}</strong> - {{ episode.air_date }} ({{
          episode.episode
        }})
      </li>
    </ul>
  </div>
</template>
