<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/plugins/firebase'
import { doc, setDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore'

interface BookItem {
  largeImageUrl: string
  title: string
  author: string
  isbn: string
}

const props = defineProps<{
  item: BookItem
}>()

const clickWishButton = async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const wishColRef = collection(db, 'users', user.uid, 'wishLists')
        const q = query(wishColRef, where('isbn', '==', props.item.isbn))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          await setDoc(doc(wishColRef), {
            imageUrl: props.item.largeImageUrl,
            title: props.item.title,
            author: props.item.author,
            isbn: props.item.isbn,
            addedAt: new Date().toISOString(),
            timestamp: serverTimestamp()
          })
          console.log('Document successfully written!')
        } else {
          console.log("Document already exists, can't be written!")
        }
      } catch (error) {
        console.error('Error getting documents: ', error)
      }
    } else {
      console.log('User is not logged in')
    }
  })
}
</script>

<template>
  <v-container>
    <v-card class="mx-auto" max-width="344">
      <v-img :src="item.largeImageUrl" alt="Book thumbnail" height="200px" cover></v-img>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-subtitle>{{ item.author }}</v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn prepend-icon="mdi-heart" @click="clickWishButton">
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
