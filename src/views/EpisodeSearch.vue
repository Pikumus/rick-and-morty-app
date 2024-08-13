<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useEpisodeSearch } from "@/stores/useEpisodeSearch";
import { useRouter } from "vue-router";
import { appRoutes } from "@/router/appRoutes";

const episodeSearchStore = useEpisodeSearch();
const router = useRouter();

const searchQuery = computed({
  get: () => episodeSearchStore.searchQuery,
  set: (value: string) => episodeSearchStore.setSearchQuery(value),
});
const onSearch = () => {
  episodeSearchStore.setSearchQuery(searchQuery.value);
};
const prevPage = () => {
  if (episodeSearchStore.currentPage > 1) {
    episodeSearchStore.setPage(episodeSearchStore.currentPage - 1);
  }
};
const nextPage = () => {
  if (episodeSearchStore.currentPage < episodeSearchStore.totalPages) {
    episodeSearchStore.setPage(episodeSearchStore.currentPage + 1);
  }
};

const goToEpisodePage = (id: number) => {
  router.push({
    name: appRoutes.EpisodeDetailPageRoute.name,
    params: { id },
  });
};

const loading = computed(() => episodeSearchStore.loading);
const error = computed(() => episodeSearchStore.error);
const episodes = computed(() => episodeSearchStore.episodes);
const totalPages = computed(() => episodeSearchStore.totalPages);
const currentPage = computed(() => episodeSearchStore.currentPage);

watch(() => episodeSearchStore.searchQuery, episodeSearchStore.fetchEpisodes, {
  immediate: true,
});
</script>

<template>
  <div class="episode-search">
    <h1>Поиск эпизода</h1>
    <input
      v-model="searchQuery"
      @input="onSearch"
      type="text"
      placeholder="Введите название эпизода"
    />

    <div v-if="loading">Загрузка...</div>
    <div v-if="error">{{ error }}</div>

    <div v-for="episode in episodes" :key="episode.id">
      <div @click="goToEpisodePage(episode.id)">
        <h2>{{ episode.name }}</h2>
        <p>{{ episode.air_date }}</p>
      </div>
    </div>
    <button @click="prevPage">Назад</button>
    <span>{{ currentPage }} - {{ totalPages }}</span>
    <button @click="nextPage">Вперёд</button>
  </div>
</template>

<style scoped lang="scss"></style>
