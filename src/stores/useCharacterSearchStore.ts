import { defineStore } from "pinia";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

interface APIResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export const useCharacterSearchStore = defineStore("characterSearch", {
  state: () => ({
    characters: [] as Character[],
    loading: false,
    error: null as string | null,
    searchQuery: "",
    currentPage: 1,
    totalPages: 0,
  }),
  actions: {
    async fetchCharacters() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await axios.get<APIResponse<Character>>(
          `https://rickandmortyapi.com/api/character/?page=${this.currentPage}&name=${this.searchQuery}`,
        );
        this.characters = data.results;
        this.totalPages = data.info.pages;
      } catch (error) {
        this.error = "Error fetching characters";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.currentPage = 1; // сбрасываем на первую страницу при новом поиске
      this.fetchCharacters();
    },
    setPage(page: number) {
      this.currentPage = page;
      this.fetchCharacters();
    },
  },
});
