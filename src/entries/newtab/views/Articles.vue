<template>
  <section>
    <h2>Artículos</h2>

  </section>
</template>

<script setup>
import { onBeforeUnmount, useTemplateRef, onMounted, reactive } from 'vue'
import browser from "webextension-polyfill"

const articles = reactive([])
const frame = useTemplateRef('fetchIframe')

onMounted(() => {
  browser.runtime.sendMessage({ 
    type: "fetchRss",
    url: "https://www.eldiario.es/rss/"
  }).then(res => {
    console.log(res)
  })

})

onBeforeUnmount(() => {
})

</script>