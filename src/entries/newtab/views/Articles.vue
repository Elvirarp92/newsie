<template>
  <section>
    <h2 class="sr-only">Articles</h2>
    <ul>
      <li v-for="article in sortedArticles">
        <Article 
          :link="article.link"
          :title="article.title"
          :source="article.source"
          :author="article.author"
          :pubdate="article.pubDate"
          :description="article.description"
        />
      </li>
    </ul>
  </section>
</template>

<script setup>
import Article from '~/components/Article.vue'
import { onBeforeUnmount, onMounted, reactive, computed } from 'vue'
import { useIndexedDatabaseStore } from '../stores/indexedDatabaseStore.js'
import browser from "webextension-polyfill"
const indexedDatabaseStore = useIndexedDatabaseStore()

const articles = reactive([])
const sortedArticles = computed(() => articles.sort((a, b) => {
    return new Date(b.pubDate) - new Date(a.pubDate)
  }))

onMounted(async () => {
  await indexedDatabaseStore.readFeeds()
  const feeds = indexedDatabaseStore.feeds
  for (const feed of feeds) {
    browser.runtime.sendMessage({ 
      type: "fetchRss",
      url: feed.url
    }).then(res => {
      if (res.ok) {
        articles.push(...res.items.slice(0, 20))
      }
    })
  }

})

onBeforeUnmount(() => {
})

</script>

<style scoped>
ul {
    list-style: none;
    display: grid;
    gap: 1rem;
}

@media screen and (min-width: 770px) {
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem
  }
}
</style>