export const appRoutes = {
  CharacterDetailPageRoute: {
    path: `/character/:id`,
    name: "CharacterPage",
    component: () => import("@/views/CharacterPage.vue"),
    props: true,
  },
  CharacterSearchPageRoute: {
    path: "/",
    name: "Main",
    component: () => import("@/views/CharacterSearch.vue"),
    props: true,
  },
  LocationSearchPageRoute: {
    path: "/location",
    name: "Location",
    component: () => import("@/views/LocationSearch.vue"),
    props: true,
  },
  LocationDetailPageRoute: {
    path: "/location/:id",
    name: "LocationDetail",
    component: () => import("@/views/LocationPage.vue"),
    props: true,
  },
  EpisodeSearchPageRoute: {
    path: "/episode",
    name: "EpisodeSearchPage",
    component: () => import("@/views/EpisodeSearch.vue"),
    props: true,
  },
  EpisodeDetailPageRoute: {
    path: "/episode/:id",
    name: "EpisodePage",
    component: () => import("@/views/EpisodePage.vue"),
    props: true,
  },
};
