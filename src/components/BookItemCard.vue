<script setup lang="ts">
import WishButton from '@/components/WishButton.vue'
import DoneButton from '@/components/DoneButton.vue'
import DeleteButton from '@/components/DeleteButton.vue'

interface BookItem {
  largeImageUrl: string
  title: string
  author: string
  isbn: string
}

const props = defineProps<{
  item: BookItem
}>()
</script>

<template>
  <v-container>
    <v-card class="mx-auto" max-width="344">
      <v-img :src="item.largeImageUrl" alt="Book thumbnail" height="200px" cover></v-img>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-subtitle>{{ item.author }}</v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>
        <WishButton :item="props.item" />
        <DoneButton :item="props.item" />
        <DeleteButton :item="props.item" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>
