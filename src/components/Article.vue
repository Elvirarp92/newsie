<template>
    <article>
        <header>
            <a :href="link">
                <h3>{{title}}</h3>
            </a>
            <address v-if="source || author">{{ source }} -- {{ author }}</address>
            <time :datetime="pubDate">
                {{ formattedDate }}
            </time>
        </header>
        <br>
        <div v-dompurify-html="description" />
    </article>
</template>

<script setup>
const props = defineProps({
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    source: {
        type: String
    },
    author: {
        type: String
    },
    pubdate: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})
const publishingDateObj = new Date(props.pubdate)


const dateFormat = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const formattedDate = dateFormat.format(publishingDateObj)

</script>

<style scoped>
article {
    background-color: var(--background);
    padding: 1.5rem;
    border-radius: 1rem;
    color: var(--foreground);
    border: 1px solid var(--secondary-light);
    line-height: 1.2;
}

header {
    text-align: start;
}

br {
    margin-bottom: 1rem;
    width: 100%;
    color: var(--foreground)
}

a {
    color: var(--accent);
    text-decoration: none;
}

a > h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.2;
    
}

a:hover {
    text-decoration: underline;
    color: var(--secondary-light);
}

</style>