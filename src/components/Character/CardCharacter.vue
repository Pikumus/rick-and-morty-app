<script lang="ts" setup>
import { onMounted, watch, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCharacterStore } from "@/stores/useCharacterStore";
import { appRoutes } from "@/router/appRoutes";

const route = useRoute();
const router = useRouter();
const characterStore = useCharacterStore();
const value = ref<number | null>(null);

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

function handleEpisodeChange(value: number) {
  if (!isNaN(value)) {
    goToEpisodePage(value);
  }
}

// Данные из хранилища
const character = computed(() => characterStore.character);
const episodes = computed(() => characterStore.episodes);
const loading = computed(() => characterStore.loading);
const error = computed(() => characterStore.error);
</script>

<template>
  <div class="card-character-container">
    <div v-if="character" class="card-character">
      <img
        :src="character.image"
        :alt="character.name"
        class="card-character__image"
      />
      <div class="card-character-details">
        <h1>Имя Персонажа: {{ character.name }}</h1>
        <p>Статус: {{ character.status }}</p>
        <p>Пол: {{ character.gender }}</p>
        <p>Вид: {{ character.species }}</p>
        <p>Локация: {{ character.location.name }}</p>
        <p>{{ character.type }}</p>
      </div>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <h1 class="card-character-episode-title">Эпизоды</h1>
    <div class="card-character-episode">
      <el-select
        v-model="value"
        placeholder="Выбор эпизода для детального просмотра"
        class="card-character-episode-item"
        v-if="episodes.length"
        @change="handleEpisodeChange"
      >
        <el-option
          class="card-episode-list__link"
          v-for="episode in episodes"
          :key="episode.id"
          :value="episode.id"
        >
          {{ episode.name }} - {{ episode.air_date }} ({{ episode.episode }})
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<style lang="scss">
.card-character-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-character {
  margin-top: 3em;
  display: flex;
  gap: 3rem;

  &__image {
    max-width: 100%;
    height: 15em;
    border-radius: 10px;
  }
}

.card-character-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 5rem;
}

.card-character-episode {
  width: 60%;
  display: flex;
  flex-direction: column;
  height: 20vh;
  overflow-y: auto;

  .el-select__wrapper {
    background-color: rgb(30, 32, 38);
  }
}

.card-character-episode-item {
  font-size: 400px;
}

.card-character-episode-title {
  margin-bottom: 2rem;
  font-size: 3rem;
}
</style>
