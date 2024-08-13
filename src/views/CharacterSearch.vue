<script lang="ts" setup>
import { computed, watch } from "vue";
import { useCharacterSearchStore } from "@/stores/useCharacterSearchStore";
import { appRoutes } from "@/router/appRoutes";
import { useRouter } from "vue-router";

const characterSearchStore = useCharacterSearchStore();
const router = useRouter();

const searchQuery = computed({
  get: () => characterSearchStore.searchQuery,
  set: (value: string) => characterSearchStore.setSearchQuery(value),
});

const onSearch = () => {
  characterSearchStore.setSearchQuery(searchQuery.value);
};

const prevPage = () => {
  if (characterSearchStore.currentPage > 1) {
    characterSearchStore.setPage(characterSearchStore.currentPage - 1);
  }
};

const nextPage = () => {
  if (characterSearchStore.currentPage < characterSearchStore.totalPages) {
    characterSearchStore.setPage(characterSearchStore.currentPage + 1);
  }
};

function goToCharacterPage(id: number) {
  router.push({
    name: appRoutes.CharacterDetailPageRoute.name,
    params: { id },
  });
}

const characters = computed(() => characterSearchStore.characters);
const loading = computed(() => characterSearchStore.loading);
const error = computed(() => characterSearchStore.error);
const currentPage = computed(() => characterSearchStore.currentPage);
const totalPages = computed(() => characterSearchStore.totalPages);

// Автоматически загружаем персонажей при монтировании компонента
watch(
  () => characterSearchStore.searchQuery,
  characterSearchStore.fetchCharacters,
  { immediate: true }
);
</script>
<template>
  <div>
    <h1>Поиск персонажей</h1>

    <input
      v-model="searchQuery"
      @input="onSearch"
      type="text"
      placeholder="Введите имя персонажа"
    />

    <div v-if="loading">Загрузка...</div>
    <div v-if="error">{{ error }}</div>

    <ul v-if="characters.length">
      <li v-for="character in characters" :key="character.id">
        <img :src="character.image" :alt="character.name" />
        <div @click="goToCharacterPage(character.id)">
          <strong>{{ character.name }}</strong>
          <p>{{ character.species }} - {{ character.status }}</p>
        </div>
      </li>
    </ul>

    <div v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Вперед
      </button>
    </div>
  </div>
</template>

<style scoped>
input {
  margin-bottom: 20px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

li img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

button {
  padding: 5px 10px;
  margin: 5px;
}
</style>
