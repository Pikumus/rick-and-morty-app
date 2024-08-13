import { createRouter, createWebHistory } from "vue-router";
import { appRoutes } from "@/router/appRoutes";

const routes = [
  appRoutes.CharacterSearchPageRoute,
  appRoutes.CharacterDetailPageRoute,
  appRoutes.LocationSearchPageRoute,
  appRoutes.LocationDetailPageRoute,
  appRoutes.EpisodeSearchPageRoute,
  appRoutes.EpisodeDetailPageRoute,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
