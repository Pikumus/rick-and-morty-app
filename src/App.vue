<template>
  <nav>
    <router-link :to="appRoutes.CharacterSearchPageRoute.path"
      >Character
    </router-link>
    |
    <router-link :to="appRoutes.LocationSearchPageRoute.path"
      >Location
    </router-link>
    |
    <router-link :to="appRoutes.EpisodeSearchPageRoute.path"
      >Episode
    </router-link>
  </nav>
  <router-view />
</template>

<style lang="scss"></style>
<script setup lang="ts">
import { appRoutes } from "@/router/appRoutes";
</script>
