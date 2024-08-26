<script setup lang="ts">
import { useLocationSearchStore } from "@/stores/useLocationSearchStore";
import { computed, watch } from "vue";
// import { useRouter } from "vue-router";
import { appRoutes } from "@/router/appRoutes";
import CardEpisodeLocation from "@/components/Elements/CardEpisodeLocation.vue";

const locationSearchStore = useLocationSearchStore();
// const router = useRouter();
const searchQuery = computed({
  get: () => locationSearchStore.searchQuery,
  set: (value: string) => locationSearchStore.setSearchQuery(value),
});
const onSearch = () => {
  locationSearchStore.setSearchQuery(searchQuery.value);
};

const prevPage = () => {
  if (locationSearchStore.currentPage > 1) {
    locationSearchStore.setPage(locationSearchStore.currentPage - 1);
  }
};
const nextPage = () => {
  if (locationSearchStore.currentPage < locationSearchStore.totalPages) {
    locationSearchStore.setPage(locationSearchStore.currentPage + 1);
  }
};
// const goToLocationPage = (id: number) => {
//   router.push({
//     name: appRoutes.LocationDetailPageRoute.name,
//     params: { id },
//   });
// };

const locations = computed(() => locationSearchStore.locations);
const loading = computed(() => locationSearchStore.loading);
const error = computed(() => locationSearchStore.error);
const totalPages = computed(() => locationSearchStore.totalPages);
const currentPage = computed(() => locationSearchStore.currentPage);
watch(
  () => locationSearchStore.searchQuery,
  locationSearchStore.fetchLocations,
  { immediate: true },
);
</script>

<template>
  <div class="card-search-location">
    <div class="card-search-location-container">
      <h1 class="card-search-location-container__title">Поиск локаций</h1>

      <input
        class="card-search-location-container__input"
        v-model="searchQuery"
        @input="onSearch"
        type="text"
        placeholder="Введите имя локации"
      />

      <div v-if="loading"></div>
      <div v-if="error"></div>

      <ul class="card-search-location-list" v-if="locations.length">
        <li
          class="card-search-location-list__item"
          v-for="location in locations"
          :key="location.id"
        >
          <CardEpisodeLocation
            :data="{
              id: location.id,
              name: location.name,
              type: location.type,
            }"
            :route-name="appRoutes.LocationDetailPageRoute.name"
          />
        </li>
      </ul>
      <div v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Вперёд
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card-search-location {
  height: 100vh;
  color: white;

  .card-search-location-container {
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

  .card-search-location-list {
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
