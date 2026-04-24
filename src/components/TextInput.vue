<template>
  <div class="text-input">
    <label :for="id">{{ label }}</label>
    <input :required="required" :type="type" :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }, 
    label: {
        type: String,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'text'
    },
    id: {
        type: String,
    }
})
</script>

<style>
.text-input {
    display: grid;
    gap: 0.5rem;
}

.text-input label {
    font-size: 12px;
    font-weight: 500;
}

.text-input input {
    background-color: var(--background);
    color: var(--foreground);
    appearance: none;
    padding: 0.5rem;
    border: 1px solid var(--secondary-light);
    border-radius: 50px;
}

.text-input input:focus {
    outline: none;
    border-color: var(--accent);
}
</style>