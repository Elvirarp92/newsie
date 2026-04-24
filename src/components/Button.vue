<template>
  <button :type="type" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

function handleClick(event) {
  emit('click', event)
}
</script>

<style scoped>
button {
    appearance: none;
    background-color: var(--accent);
    color: var(--background);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
    height: min-content;
}

button:hover {
    background-color: var(--secondary-light);
}
</style>