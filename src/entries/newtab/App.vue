<template>
  <div>
    <aside>
      <nav>
        <RouterLink to="/">Artículos</RouterLink>
        <RouterLink to="/feeds">Suscripciones</RouterLink>
      </nav>
    </aside>
    <main>
      <h1>Newsie</h1>
      <p>All your news in every new tab</p>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useIndexedDatabaseStore } from './stores/indexedDatabaseStore.js'

// Stores
const indexedDatabaseStore = useIndexedDatabaseStore()

// Hooks
onMounted(() => {
  indexedDatabaseStore.readFeeds()
})
</script>

