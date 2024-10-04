<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <v-app>
    <header>
      <NavBar />
    </header>

    <body>
      <v-main>
        <RouterView />
      </v-main>
    </body>
  </v-app>
</template>

<style>
.body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
