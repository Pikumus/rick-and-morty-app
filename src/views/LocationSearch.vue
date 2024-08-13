<script setup lang="ts">
import { useLocationSearchStore } from "@/stores/useLocationSearchStore";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import { appRoutes } from "@/router/appRoutes";

const locationSearchStore = useLocationSearchStore();
const router = useRouter();
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
const goToLocationPage = (id: number) => {
  router.push({
    name: appRoutes.LocationDetailPageRoute.name,
    params: { id },
  });
};

const locations = computed(() => locationSearchStore.locations);
const loading = computed(() => locationSearchStore.loading);
const error = computed(() => locationSearchStore.error);
const totalPages = computed(() => locationSearchStore.totalPages);
const currentPage = computed(() => locationSearchStore.currentPage);
watch(
  () => locationSearchStore.searchQuery,
  locationSearchStore.fetchLocations,
  { immediate: true }
);
</script>

<template>
  <div class="location-search">
    <h1>Поиск локаций</h1>

    <input
      v-model="searchQuery"
      @input="onSearch"
      type="text"
      placeholder="Введите имя локации"
    />

    <div v-if="loading"></div>
    <div v-if="error"></div>

    <ul v-if="locations.length">
      <li v-for="location in locations" :key="location.id">
        <div @click="goToLocationPage(location.id)" class="location">
          <strong>{{ location.name }}</strong>
          <p>{{ location.type }}</p>
        </div>
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
</template>

<style scoped lang="scss"></style>
