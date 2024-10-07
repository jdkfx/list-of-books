<script setup lang="ts">
import type { RakutenBooksAPIResponse, RakutenBookItem } from '@/types/rakutenApi'
import { ref } from 'vue'
import BookItemCard from '@/components/BookItemCard.vue'

const keyword = ref('')
const searchResults = ref<RakutenBookItem[]>([])
const isLoading = ref(false)
const errorMessage = ref('')
const isSearchPage = ref(true)
const baseURL = `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&applicationId=${import.meta.env.VITE_RAKUTEN_API_APP_ID}`

const queryBuilder = (query: { keyword: string }) => {
  return Object.entries(query || {})
    .filter((value) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

const callSearchAPI = async (query: { keyword: string }): Promise<RakutenBooksAPIResponse> => {
  const getURL = `${baseURL}&${queryBuilder(query)}`
  console.log(getURL)
  try {
    const response = await fetch(getURL)
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`)
    }
    const data: RakutenBooksAPIResponse = await response.json()
    return data
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

const searchByKeyword = async (keyword: string) => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const data = await callSearchAPI({ keyword })
    searchResults.value = data.Items
  } catch (error) {
    errorMessage.value = 'API call failed'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <v-container class="mt-5">
    <v-text-field v-model="keyword" label="キーワード検索" />
    <v-btn
      @click="searchByKeyword(keyword)"
      color="teal"
      size="large"
      prepend-icon="mdi-magnify"
      block
      >検索</v-btn
    >

    <v-alert v-if="errorMessage" type="error" class="my-5" dismissible>
      {{ errorMessage }}
    </v-alert>

    <v-row v-if="searchResults.length > 0">
      <v-col v-for="(item, index) in searchResults" :key="index" cols="12" md="6" lg="4">
        <BookItemCard :isSearchPage :item="item.Item" />
      </v-col>
    </v-row>
  </v-container>
</template>
