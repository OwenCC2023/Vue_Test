<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const count = computed(() => store.getters.count)

const increment = () => store.dispatch('increment')
const decrement = () => store.dispatch('decrement')
</script>

<template>
  <div class="home">
    <h1>Home</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<style scoped>
button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
