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
            timestamp: serverTimestamp()
          })
          console.log('Document successfully written to the wishlist!')
        } else {
          console.log("Document already exists in the wishlist, can't be written!")
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
  <v-btn prepend-icon="mdi-heart" @click="clickWishButton">
    <template v-slot:prepend>
      <v-icon color="pink-accent-1"></v-icon>
    </template>
    読みたい
  </v-btn>
</template>
