<script setup lang="ts">
defineProps({
  largeImageUrl: String,
  title: String,
  author: String
})
</script>

<template>
  <v-container>
    <v-card class="mx-auto" max-width="344">
      <v-img :src="largeImageUrl" alt="Book thumbnail" height="200px" cover></v-img>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ author }}</v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn prepend-icon="mdi-heart">
          <template v-slot:prepend>
            <v-icon color="pink-accent-1"></v-icon>
          </template>
          読みたい
        </v-btn>

        <v-btn prepend-icon="mdi-check-bold">
          <template v-slot:prepend>
            <v-icon color="green-accent-3"></v-icon>
          </template>
          読んだ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
