<template>
  <section>
    <h2>Tus suscripciones</h2>
    <form id="add-feed" action="index.html" @submit.prevent="createFeed">
      <h3>Introduce un nuevo feed a tu lista</h3>
      <label for="title">Título</label>
      <input 
        required
        v-model="title"
        type="text"
        name="title"
        id="title"
      />
      <label for="url">URL</label>
      <input
        required
        v-model="url"
        type="url"
        name="url"
        id="url"
      />
      <button type="submit">Añadir</button>
    </form>
    <section>
      <h3>Tus suscripciones</h3>
      <ul>
        <li v-for="feed in indexedDatabaseStore.$state.feeds" :key="feed.url">
          {{ feed.title }} ({{ feed.url }})
          <button @click="indexedDatabaseStore.deleteFeed(feed)">Desuscribirse</button>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIndexedDatabaseStore } from '../stores/indexedDatabaseStore.js'
import { permissions } from 'webextension-polyfill'

// Stores
const indexedDatabaseStore = useIndexedDatabaseStore()

// Data
const title = ref('')
const url = ref('')

// Functions
async function createFeed (){
  // We already have them as 'required' in the form but just in case
  if (!title.value || !url.value) return
  const permissionsToRequest = {
    origins: [url.value]
  }

  const req = await permissions.request(permissionsToRequest)

  if (req) {
    indexedDatabaseStore.createFeed(
      {
        title: title.value,
        url: url.value
      }
    )
    
    title.value = ''
    url.value = ''
  }
}

</script>
