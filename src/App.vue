<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  padding: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

nav {
  display: flex;
  gap: 2rem;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

a.router-link-active {
  color: #42b983;
}

main {
  padding: 2rem;
}
</style>
