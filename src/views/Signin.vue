<script setup lang="ts">
import type { User } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { getAuth, signInWithPopup, onAuthStateChanged, TwitterAuthProvider } from 'firebase/auth'

const currentUser = ref<User | null>(null)

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

const signIn = () => {
  const provider = new TwitterAuthProvider()
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
}
</script>

<template v-slot:append>
  <div v-if="currentUser">{{ currentUser.displayName }} さん、ようこそ！</div>

  <v-btn @click="signIn()">sign in</v-btn>
</template>
