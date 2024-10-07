<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/plugins/firebase'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import BookItemCard from '@/components/BookItemCard.vue'

interface BookItem {
  largeImageUrl: string
  title: string
  author: string
  isbn: string
}

const doneItems = ref<BookItem[]>([])

onMounted(() => {
  fetchDoneListItems()
})

const fetchDoneListItems = async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const wishColRef = collection(db, 'users', user.uid, 'doneLists')
        const wishQuery = query(wishColRef, orderBy('timestamp', 'desc'))
        const querySnapshot = await getDocs(wishQuery)

        if (querySnapshot.empty) {
          console.log('Document data not exist!')
        } else {
          doneItems.value = querySnapshot.docs.map((doc) => ({
            largeImageUrl: doc.data().imageUrl,
            title: doc.data().title,
            author: doc.data().author,
            isbn: doc.data().isbn
          }))
        }
      } catch (error) {
        console.error('Error getting document:', error)
      }
    } else {
      console.log('User is not logged in')
    }
  })
}
</script>

<template>
  <v-container class="mt-5">
    <v-row v-if="doneItems.length > 0">
      <v-col v-for="(item, index) in doneItems" :key="index" cols="12" md="6" lg="4">
        <BookItemCard :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>
