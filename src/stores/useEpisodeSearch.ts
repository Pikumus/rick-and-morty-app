import { defineStore } from "pinia";
import axios from "axios";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  character: string[];
  created: string;
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

export const useEpisodeSearch = defineStore("episodeSearch", {
  state: () => ({
    episodes: [] as Episode[],
    loading: true,
    error: null as string | null,
    searchQuery: "",
    currentPage: 1,
    totalPages: 0,
  }),
  actions: {
    async fetchEpisodes() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await axios.get<APIResponse<Episode>>(
          `https://rickandmortyapi.com/api/episode?page=${this.currentPage}&name=${this.searchQuery}`
        );
        this.episodes = data.results;
        this.totalPages = data.info.pages;
      } catch (error) {
        this.error = "Error fetching episodes";
      } finally {
        this.loading = false;
      }
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.currentPage = 1;
      this.fetchEpisodes();
    },
    setPage(page: number) {
      this.currentPage = page;
      this.fetchEpisodes();
    },
  },
});
