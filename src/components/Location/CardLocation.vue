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

function handleResidentChange(value: number) {
  if (!isNaN(value)) {
    goToCharacterPage(value);
  }
}

const location = computed(() => locationStore.location);
const residents = computed(() => locationStore.residents);
onMounted(fetchLocationData);

watch(() => route.params.id, fetchLocationData);
</script>

<template>
  <div class="location-page">
    <div class="location-page__container" v-if="location">
      <h2>Название: {{ location.name }}</h2>
      <p>Тип: {{ location.type }}</p>
      <p>Измерение: {{ location.dimension }}</p>
    </div>
    <el-select
      v-if="residents.length"
      @change="handleResidentChange"
      class="card-residents-list"
      placeholder="Список резидентов"
    >
      <el-option
        v-for="resident in residents"
        :key="resident.id"
        :value="resident.id"
        class="card-residents-list__link"
      >
        <img
          class="card-residents-list__link__image"
          :src="resident.image"
          :alt="resident.name"
        />
        <p class="card-residents-list__link__text">{{ resident.name }}</p>
      </el-option>
    </el-select>
  </div>
</template>

<style lang="scss">
.location-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  gap: 1rem;
}

.card-residents-list {
  width: 60%;

  .el-select__wrapper {
    background-color: rgb(30, 32, 38);
  }

  &__link {
    height: 100%;
    max-width: 80%;
    display: flex;
    gap: 2rem;

    &__image {
      max-width: 20%;
    }

    &__text {
      color: black;
    }
  }
}
</style>
