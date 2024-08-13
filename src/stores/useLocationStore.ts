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

interface Residents {
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

export const useLocationStore = defineStore("locationStore", {
  state: () => ({
    location: null as Location | null,
    residents: [] as Residents[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchLocation(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await axios.get<Location>(
          `https://rickandmortyapi.com/api/location/${id}`
        );
        this.location = data;

        // Получаем персонажей с помощью метода map который к каждому элементу применяет описанную инструкцию axios get резидентс это тип который должный получить
        const residentsPromises = data.residents.map((url) =>
          axios.get<Residents>(url)
        );
        // Дожидаемся всех персонажей
        const residentsResponses = await Promise.all(residentsPromises);
        // Устанавливаем персонажей в состояние residents
        this.residents = residentsResponses.map((response) => response.data);
      } catch (error) {
        this.error = "Error fetching residents data";
      } finally {
        this.loading = false;
      }
    },
  },
});
