<script setup lang="ts">
import { computed, watch } from "vue";
import { useEpisodeSearch } from "@/stores/useEpisodeSearch";
import { appRoutes } from "@/router/appRoutes";
import CardEpisodeLocation from "@/components/Elements/CardEpisodeLocation.vue";

const episodeSearchStore = useEpisodeSearch();

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
  <div class="card-search-episode">
    <div class="card-search-episode-container">
      <h1 class="card-search-episode-container__title">Поиск эпизода</h1>
      <input
        class="card-search-episode-container__input"
        v-model="searchQuery"
        @input="onSearch"
        type="text"
        placeholder="Введите название эпизода"
      />

      <div v-if="loading">Загрузка...</div>
      <div v-if="error">{{ error }}</div>
      <ul class="card-search-episode-list" v-if="episodes.length">
        <li
          class="card-search-episode-list__item"
          v-for="episode in episodes"
          :key="episode.id"
        >
          <CardEpisodeLocation
            :data="{
              id: episode.id,
              name: episode.name,
              air_date: episode.air_date,
            }"
            :route-name="appRoutes.EpisodeDetailPageRoute.name"
          />
        </li>
      </ul>
      <div v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
        <span>{{ currentPage }} - {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Вперёд
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card-search-episode {
  height: 100vh;
  color: white;

  .card-search-episode-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
      font-size: 3rem;
    }

    &__input {
      width: 60%;
      height: 2rem;
      border: 1px solid black;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
  }

  .card-search-episode-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;

    &__item {
      height: 8vh;
      width: 60%;
    }
  }
}
</style>
