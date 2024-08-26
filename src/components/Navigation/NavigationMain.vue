<script setup lang="ts">
import { appRoutes } from "@/router/appRoutes";
import CardButton from "@/components/Ui/CardButton.vue";
import rick from "@/assets/rick.png";
import location from "@/assets/location.png";
</script>

<template>
  <nav class="navigation-main">
    <div class="navigation-main-container">
      <router-link
        class="navigation-main-container__character"
        :to="appRoutes.CharacterSearchPageRoute.path"
      >
        <CardButton :image-url="rick" />
      </router-link>

      <router-link
        class="navigation-main-container__character"
        :to="appRoutes.LocationSearchPageRoute.path"
      >
        <CardButton :image-url="location" />
      </router-link>

      <router-link
        class="navigation-main-container__character"
        :to="appRoutes.EpisodeSearchPageRoute.path"
      >
        <CardButton :image-url="location"></CardButton>
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss">
.navigation-main {
  background-color: beige;

  .navigation-main-container {
    width: 100%;
    height: 50vh;
    background-image: url("@/assets/background.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &__character {
      display: flex;
      justify-content: center;
      width: 50%;
      height: 70%;
    }
  }
}
</style>
