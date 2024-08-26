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

function handleCharacterChange(value: number) {
  if (!isNaN(value)) {
    goToCharacterPage(value);
  }
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
    <div class="episode-page__container">
      <h2>Название: {{ episode.name }}</h2>
      <p>Дата выхода: {{ episode.air_date }}</p>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <el-select
      v-if="characters.length"
      @change="handleCharacterChange"
      class="card-characters-list"
      placeholder="Список персонажей"
    >
      <el-option
        class="card-characters-list__link"
        v-for="character in characters"
        :key="character.id"
        :value="character.id"
      >
        <img
          class="card-characters-list__link__image"
          :src="character.image"
          :alt="character.name"
        />
        <h3 class="card-characters-list__link__text">{{ character.name }}</h3>
      </el-option>
    </el-select>
  </div>
</template>

<style lang="scss">
.episode-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  gap: 1rem;
}

.card-characters-list {
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
