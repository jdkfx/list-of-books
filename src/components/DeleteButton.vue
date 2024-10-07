<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from '@/plugins/firebase'
import { deleteDoc, collection, query, where, getDocs } from 'firebase/firestore'

interface BookItem {
  largeImageUrl: string
  title: string
  author: string
  isbn: string
}

const props = defineProps<{
  item: BookItem
}>()

const clickDeleteButton = async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const wishColRef = collection(db, 'users', user.uid, 'wishLists')
        const q = query(wishColRef, where('isbn', '==', props.item.isbn))
        const querySnapshot = await getDocs(q)

        // TODO: doneColRefに対して削除する処理を追加

        const deletePromises = querySnapshot.docs.map(async (doc) => {
          await deleteDoc(doc.ref)
          console.log('Document successfully deleted:', doc.id)
        })

        await Promise.all(deletePromises)
        console.log('All documents deleted successfully.')
      } catch (error) {
        console.error('Error removing document: ', error)
      }
    } else {
      console.log('User is not logged in')
    }
  })
}
</script>

<template>
  <v-btn prepend-icon="mdi-trash-can" @click="clickDeleteButton">
    <template v-slot:prepend>
      <v-icon color="gray"></v-icon>
    </template>
    削除
  </v-btn>
</template>
