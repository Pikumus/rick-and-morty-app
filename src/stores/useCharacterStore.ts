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
  episode: string[];
  location: { name: string; url: string };
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  character: string[];
}

export const useCharacterStore = defineStore("character", {
  state: () => ({
    character: null as Character | null,
    episodes: [] as Episode[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchCharacter(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await axios.get<Character>(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        this.character = data;

        // Получение эпизодов
        const episodePromises = data.episode.map((url) =>
          axios.get<Episode>(url)
        );
        const episodesResponses = await Promise.all(episodePromises);
        this.episodes = episodesResponses.map((response) => response.data);
      } catch (error) {
        this.error = "Error fetching character data";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
