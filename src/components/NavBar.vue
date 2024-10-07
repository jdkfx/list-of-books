<script setup lang="ts">
import type { User } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  TwitterAuthProvider,
  signOut
} from 'firebase/auth'
import db from '@/plugins/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const currentUser = ref<User | null>(null)

const saveUserToFirestore = async (user: User) => {
  const userRef = doc(db, 'users', user.uid)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      uid: user.uid
    })
    console.log('A new user has been registered in Firestore.')
  } else {
    console.log('The user already exists in Firestore.')
  }
}

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user
    } else {
      currentUser.value = null
    }
  })
})

const login = () => {
  const provider = new TwitterAuthProvider()
  const auth = getAuth()

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user
      currentUser.value = user

      await saveUserToFirestore(user)
    })
    .catch((error) => {
      console.error(`${error.code} - ${error.message}`)
    })
}

const logOut = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      currentUser.value = null
    })
    .catch((error) => {
      console.error(error.message)
    })
}
</script>

<template>
  <v-navigation-drawer class="bg-teal-darken-2" theme="dark" permanent>
    <v-list>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" link to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-book-search" title="Search" link to="/search"></v-list-item>
      <v-list-item prepend-icon="mdi-book-heart" title="Wish List" link to="/wish"></v-list-item>
      <v-list-item prepend-icon="mdi-book-check" title="Done List" link to="/done"></v-list-item>
    </v-list>

    <template v-slot:append>
      <div v-if="!currentUser" class="pa-2">
        <v-btn prepend-icon="mdi-login" color="primary" block @click="login">Login</v-btn>
      </div>

      <div v-else class="pa-2">
        <v-list-item
          class="pa-2"
          :prepend-avatar="currentUser?.providerData[0]?.photoURL || undefined"
          :title="currentUser?.providerData[0]?.displayName || ''"
          nav
        />
        <v-btn prepend-icon="mdi-logout" color="warning" block @click="logOut">Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
