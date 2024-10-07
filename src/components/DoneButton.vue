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

const clickDoneButton = async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const doneColRef = collection(db, 'users', user.uid, 'doneLists')
        const q = query(doneColRef, where('isbn', '==', props.item.isbn))
        const querySnapshot = await getDocs(q)

        // TODO: doneListsに追加したwishListsのアイテムを削除する処理を追加

        if (querySnapshot.empty) {
          await setDoc(doc(doneColRef), {
            imageUrl: props.item.largeImageUrl,
            title: props.item.title,
            author: props.item.author,
            isbn: props.item.isbn,
            timestamp: serverTimestamp()
          })
          console.log('Document successfully written to the donelist!')
        } else {
          console.log("Document already exists in the donelist, can't be written!")
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
  <v-btn prepend-icon="mdi-check-bold" @click="clickDoneButton">
    <template v-slot:prepend>
      <v-icon color="green-accent-3"></v-icon>
    </template>
    読んだ
  </v-btn>
</template>
