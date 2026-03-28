<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
    <v-app-bar
      elevation="4"
      class="gradient-app-bar"
      style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);"
    >
      <v-app-bar-title class="font-weight-bold text-h5">
        <v-icon class="mr-2">mdi-vuetify</v-icon>
        Vue Test App
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" variant="text" class="text-white" size="large">Home</v-btn>
      <v-btn to="/chess" variant="text" class="text-white" size="large">
        <v-icon class="mr-1">mdi-chess-board</v-icon>
        Chess
      </v-btn>
      <v-btn to="/about" variant="text" class="text-white" size="large">About</v-btn>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center">
      <RouterView />
    </v-main>

    <v-footer class="bg-grey-darken-3 text-white text-center py-4">
      <p class="mb-0">© 2026 Vue Test App • Built with Vue 3, Vuetify & ❤️</p>
    </v-footer>
  </v-app>
</template>

<style scoped>
:deep(.v-app) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  min-height: 100vh;
}
</style>
