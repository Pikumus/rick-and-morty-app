<!-- src/components/CharacterSearch.vue -->
<template>
  <div class="card-search-characters">
    <div class="card-search-characters-container">
      <h1 class="card-search-characters-container__title">Поиск персонажа</h1>
      <input
        class="card-search-characters-container__input"
        v-model="searchQuery"
        @input="onSearch"
        type="text"
        placeholder="Введите имя персонажа"
      />
    </div>

    <div v-if="loading">Загрузка...</div>
    <div v-if="error">{{ error }}</div>

    <ul class="card-search-characters-list" v-if="characters.length">
      <li
        class="card-search-characters-list__item"
        v-for="character in characters"
        :key="character.id"
      >
        <CardProps
          :data="{
            image: character.image,
            id: character.id,
            name: character.name,
          }"
          :routeName="appRoutes.CharacterDetailPageRoute.name"
        />
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

<script lang="ts" setup>
import { computed, watch } from "vue";
import { useCharacterSearchStore } from "@/stores/useCharacterSearchStore";
import CardProps from "@/components/Elements/CardProps.vue";
import { appRoutes } from "@/router/appRoutes";

const characterSearchStore = useCharacterSearchStore();

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

const characters = computed(() => characterSearchStore.characters);
const loading = computed(() => characterSearchStore.loading);
const error = computed(() => characterSearchStore.error);
const currentPage = computed(() => characterSearchStore.currentPage);
const totalPages = computed(() => characterSearchStore.totalPages);

// Автоматически загружаем персонажей при монтировании компонента
watch(
  () => characterSearchStore.searchQuery,
  characterSearchStore.fetchCharacters,
  { immediate: true },
);
</script>

<style lang="scss">
.card-search-characters {
  height: 100vh;
  color: white;

  .card-search-characters-container {
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

  .card-search-characters-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;

    &__item {
      width: 60%;
    }
  }
}
</style>
