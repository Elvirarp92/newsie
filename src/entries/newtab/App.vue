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
      <p>All your news in every new tab.</p>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital@0;1&family=Shrikhand&display=swap');

:root {
  --white: hsl(192, 50%, 96%);
  --orange: hsl(32, 100%, 50%);
  --blue-light: hsl(193, 48%, 54%);
  --blue-dark: hsl(201, 47%, 24%);
  --blue-darker: hsl(200, 48%, 18%);
  --black: hsl(199, 51%, 12%)
}

body {
  background-color: var(--white);
  color: var(--black);
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
}

h1 {
  font-family: "Shrikhand", serif;
  color: var(--blue-light);
  font-weight: 400;
  font-style: normal;
}
</style>

