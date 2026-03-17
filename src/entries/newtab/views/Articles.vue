<template>
  <section>
    <h2>Artículos</h2>
    <ul>
      <li v-for="article in sortedArticles">
        <article>
          <a href="{{ article.link }}">
            <h3>{{article.title}}</h3>
          </a>
          <time datetime="{{ article.pubDate }}">
            {{ Date(article.pubDate).toLocaleString('es-ES') }}
          </time>
          <div v-html="article.description" />
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, computed } from 'vue'
import { useIndexedDatabaseStore } from '../stores/indexedDatabaseStore.js'
import browser from "webextension-polyfill"
const indexedDatabaseStore = useIndexedDatabaseStore()

const articles = reactive([])
const sortedArticles = computed(() => articles.sort((a, b) => {
    return new Date(b.pubDate) - new Date(a.pubDate);
  }))

onMounted(async () => {
  await indexedDatabaseStore.readFeeds()
  const feeds = indexedDatabaseStore.feeds
  for (const feed of feeds) {
    browser.runtime.sendMessage({ 
      type: "fetchRss",
      url: feed.url
    }).then(res => {
      console.log(res)
      if (res.ok) {
        console.log(res.items)
        articles.push(...res.items.slice(0, 20))
      }
    })
  }

})

onBeforeUnmount(() => {
})

</script>