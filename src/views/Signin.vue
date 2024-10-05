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
    console.log('Firestoreに新しいユーザーが登録されました')
  } else {
    console.log('ユーザーは既にFirestoreに存在しています')
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

<template v-slot:append>
  <v-col>
    <div v-if="!currentUser">
      <v-btn color="primary" variant="tonal" @click="login">Login</v-btn>
    </div>

    <div v-else>
      <p>ようこそ、{{ currentUser.providerData[0].displayName }} さん！</p>
      <v-btn color="warning" variant="tonal" @click="logOut">Logout</v-btn>
    </div>
  </v-col>
</template>
