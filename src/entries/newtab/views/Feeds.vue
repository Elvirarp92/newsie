<template>
  <section class="o-feeds">
    <h2 class="sr-only">Your subscriptions</h2>
    <form class="o-feeds__add-feed" id="add-feed" action="index.html" @submit.prevent="createFeed">
      <h3>Add a new feed</h3>
      <div>
        <TextInput 
        required
        v-model="title"
        type="text"
        name="title"
        id="title"
        label="Title"
        />
        <TextInput
        required
        v-model="url"
        type="url"
        name="url"
        id="url"
        label="URL"
        />
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
    <section class="o-feeds__subscriptions">
      <h3>Your subscriptions</h3>
      <ul>
        <li v-for="feed in indexedDatabaseStore.$state.feeds" :key="feed.url">
          {{ feed.title }} ({{ feed.url }})
          <Button @click="indexedDatabaseStore.deleteFeed(feed)">Unsubscribe</Button>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIndexedDatabaseStore } from '../stores/indexedDatabaseStore.js'
import { permissions } from 'webextension-polyfill'
import TextInput from '~/components/TextInput.vue'
import Button from '~/components/Button.vue'

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
