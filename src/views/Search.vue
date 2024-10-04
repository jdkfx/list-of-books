<script setup lang="ts">
import { ref } from 'vue'
import firebase from 'firebase/app'
import { db } from '../plugins/firebase.js'
import WishButton from '@/components/WishButton.vue'
import DoneButton from '@/components/DoneButton.vue'

const keyword = ref('')
const searchResults = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')
const baseURL = `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&applicationId=${import.meta.env.VITE_RAKUTEN_API_APP_ID}`

const queryBuilder = (query: { keyword: string }) => {
  return Object.entries(query || {})
    .filter(([key, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

const callSearchAPI = async (query: { keyword: string }) => {
  const getURL = `${baseURL}&${queryBuilder(query)}`
  console.log(getURL)
  try {
    const response = await fetch(getURL)
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`)
    }
    const data = await response.json()
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
    searchResults.value = data
  } catch (error) {
    errorMessage.value = 'API call failed'
  } finally {
    isLoading.value = false
  }
}

// // 読みたい本のリストに追加
// async clickWishButton(item) {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       let self = this
//       let wishColRef = db.collection('users').doc(user.uid).collection('wishLists')
//       if (user) {
//         console.log(user.uid)
//         this.propsTitle = item.title

//         wishColRef
//           .where('isbn', '==', item.isbn)
//           .get()
//           .then(function (querySnapshot) {
//             if (querySnapshot.empty) {
//               self.propsWishFlag = true
//               wishColRef
//                 .add({
//                   imageUrl: item.largeImageUrl,
//                   title: item.title,
//                   author: item.author,
//                   isbn: item.isbn,
//                   addedAt: moment(new Date()).format('YYYY/MM/DD'),
//                   timestamp: firebase.firestore.FieldValue.serverTimestamp()
//                 })
//                 .then(function (docRef) {
//                   console.log('Document ID:', docRef.id, 'successfully written!')
//                   wishColRef.doc(docRef.id).update({
//                     docId: docRef.id
//                   })
//                 })
//                 .catch(function (error) {
//                   console.log('Error writing document: ', error)
//                 })
//             } else {
//               self.propsWishFlag = false
//               console.log("Document can't written!")
//             }
//           })
//           .catch(function (error) {
//             console.log('Error getting documents: ', error)
//           })
//       }
//     }
//   })
// },

// 読了した本のリストに追加
//   async clickDoneButton(item) {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         let self = this
//         let doneColRef = db.collection('users').doc(user.uid).collection('doneLists')
//         let wishColRef = db.collection('users').doc(user.uid).collection('wishLists')
//         if (user) {
//           console.log(user.uid)
//           this.propsTitle = item.title

//           doneColRef
//             .where('isbn', '==', item.isbn)
//             .get()
//             .then(function (querySnapshot) {
//               if (querySnapshot.empty) {
//                 self.propsDoneFlag = true
//                 doneColRef
//                   .add({
//                     imageUrl: item.largeImageUrl,
//                     title: item.title,
//                     author: item.author,
//                     isbn: item.isbn,
//                     addedAt: moment(new Date()).format('YYYY/MM/DD'),
//                     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//                   })
//                   .then(function (docRef) {
//                     console.log('Document ID:', docRef.id, 'successfully written!')
//                     doneColRef.doc(docRef.id).update({
//                       docId: docRef.id
//                     })

//                     wishColRef
//                       .where('isbn', '==', item.isbn)
//                       .get()
//                       .then((snapshot) => {
//                         snapshot.forEach((doc) => {
//                           wishColRef.doc(doc.id).update({
//                             doneFlag: true
//                           })
//                           console.log('The wishlist(ID:', doc.id, ') update is completed')
//                         })
//                       })
//                   })
//                   .catch(function (error) {
//                     console.log('Error writing document: ', error)
//                   })
//               } else {
//                 self.propsDoneFlag = false
//                 console.log("Document can't written!")
//               }
//             })
//             .catch(function (error) {
//               console.log('Error getting documents: ', error)
//             })
//         }
//       }
//     })
//   }
// }
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
  </v-container>
</template>
