import { defineStore } from "pinia";
import axios from "axios";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: string[];
  location: { name: string; url: string };
}

export const useEpisodeStore = defineStore("episode", {
  state: () => ({
    loading: true,
    error: null as string | null,
    episode: null as Episode | null,
    characters: [] as Character[],
  }),
  actions: {
    async fetchEpisode(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await axios.get<Episode>(
          `https://rickandmortyapi.com/api/episode/${id}`,
        );
        this.episode = data;

        const characterPromises = data.characters.map((url) =>
          axios.get<Character>(url),
        );
        const characterResponses = await Promise.all(characterPromises);
        this.characters = characterResponses.map((response) => response.data);
      } catch {
        this.error = "Error fetching data";
      } finally {
        this.loading = false;
      }
    },
  },
});
