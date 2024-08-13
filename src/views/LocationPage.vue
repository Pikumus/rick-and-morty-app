<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useLocationStore } from "@/stores/useLocationStore";
import { useRoute, useRouter } from "vue-router";
import { appRoutes } from "@/router/appRoutes";

const router = useRouter();
const route = useRoute();
const locationStore = useLocationStore();

const fetchLocationData = async () => {
  const locationId = Number(route.params.id);
  if (!isNaN(locationId)) {
    await locationStore.fetchLocation(locationId);
  } else {
    console.error("Invalid location ID:", locationId);
  }
};

function goToCharacterPage(id: number) {
  router.push({
    name: appRoutes.CharacterDetailPageRoute.name,
    params: { id },
  });
}

const location = computed(() => locationStore.location);
const residents = computed(() => locationStore.residents);
onMounted(fetchLocationData);

watch(() => route.params.id, fetchLocationData);
</script>

<template>
  <div class="location-page">
    <div v-if="location">
      <p v-if="location">{{ location.type }}</p>
      <p v-if="location">{{ location.name }}</p>
      <p v-if="location">{{ location.dimension }}</p>
      <p v-if="location">{{ location.created }}</p>
    </div>
    <div v-if="residents.length">
      <div
        v-for="resident in residents"
        :key="resident.id"
        @click="goToCharacterPage(resident.id)"
      >
        <img :src="resident.image" :alt="resident.name" />
        <p>{{ resident.name }}</p>
        <p>{{}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
