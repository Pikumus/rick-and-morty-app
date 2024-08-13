import { defineStore } from "pinia";
import axios from "axios";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string[];
  residents: string[];
  url: string;
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

export const useLocationSearchStore = defineStore("locationSearch", {
  state: () => ({
    locations: [] as Location[],
    loading: false,
    error: null as string | null,
    searchQuery: "",
    currentPage: 1,
    totalPages: 0,
  }),
  actions: {
    async fetchLocations() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await axios.get<APIResponse<Location>>(
          `https://rickandmortyapi.com/api/location/?page=${this.currentPage}&name=${this.searchQuery}`
        );
        this.locations = data.results;
        this.totalPages = data.info.pages;
      } catch (error) {
        this.error = "Error fetching location data";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.currentPage = 1;
      this.fetchLocations();
    },
    setPage(page: number) {
      this.currentPage = page;
      this.fetchLocations();
    },
  },
});
