<template>
    <main>
      <header class="app-header">
        <h1>Newsie</h1>
        <p>All your news in every new tab.</p>
      </header>
      <nav class="app-navbar">
        <RouterLink to="/" active-class="app-navbar__link--active">Articles</RouterLink>
        <RouterLink to="/feeds" active-class="app-navbar__link--active">Subscriptions</RouterLink>
      </nav>
      <RouterView />
    </main>
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
@import url('~/styles/reset.css');
@import url('~/styles/sr-only.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400;1,500&family=Shrikhand&display=swap');

:root {
  --white: hsl(192, 50%, 96%);
  --orange: hsl(32, 100%, 50%);
  --blue-light: hsl(193, 48%, 54%);
  --blue-dark: hsl(201, 47%, 24%);
  --blue-darker: hsl(200, 48%, 18%);
  --black: hsl(199, 51%, 12%);

  --foreground: var(--white);
  --background: var(--black);
  --accent: var(--orange);
  --secondary-light: var(--blue-light);
  --secondary: var(--blue-dark);
  --secondary-dark: var(--blue-darker);

}

body {
  background-color: var(--background);
  display: grid;
  justify-items: center;
  color: var(--foreground);
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
  padding: 2rem;
}

main {
  max-width: 90rem;
  display: grid;
  justify-items: center;
}

a {
    color: var(--foreground);
    transition: color 200ms ease-in;
}

a:visited {
    color: var(--secondary-light)
}

a:hover {
    color: var(--accent)
}

h3 {
  color: var(--accent);
  font-weight: 500;
  font-size: 18px;
}

.app-header {
  text-align: center;
  display: grid;
  place-items: center;
  gap: 0.5rem;
} 

.app-header > h1 {
  font-family: "Shrikhand", serif;
  color: var(--blue-light);
  font-weight: 400;
  font-size: 3rem;
  font-style: normal;
}

.app-navbar {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  text-decoration: none;
}

.app-navbar__link--active {
  color: var(--accent);
  text-decoration: underline;
}

.o-feeds {
  display: grid;
  gap: 2rem;
  max-width: 50rem;
}

.o-feeds__add-feed,
.o-feeds__subscriptions,
.o-feeds__subscriptions > div,
.o-feeds__add-feed > div {
  display: grid;
  gap: 1rem;
}

@media screen and (min-width: 770px) {
  .o-feeds__add-feed > div {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
  }
}
</style>

