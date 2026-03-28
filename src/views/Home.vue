<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const count = computed(() => store.getters.count)

const increment = () => store.dispatch('increment')
const decrement = () => store.dispatch('decrement')
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <!-- Welcome Card -->
        <v-card class="mb-6 elevation-8" style="border-radius: 16px;">
          <div class="gradient-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 16px 16px 0 0;">
            <v-card-title class="text-white text-h4 font-weight-bold">
              <v-icon size="large" class="mr-3">mdi-rocket-launch</v-icon>
              Welcome to Vue Test
            </v-card-title>
          </div>
          <v-card-text class="pa-6">
            <p class="text-subtitle1 mb-6">
              A modern Vue 3 application built with Vite, TypeScript, Vue Router, Vuex, and Vuetify.
            </p>
            <v-row>
              <v-col cols="6">
                <div class="text-center">
                  <v-icon color="primary" size="32" class="mb-2">mdi-speedometer</v-icon>
                  <p class="font-weight-bold">Fast</p>
                  <p class="text-caption">Powered by Vite</p>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="text-center">
                  <v-icon color="success" size="32" class="mb-2">mdi-shield-check</v-icon>
                  <p class="font-weight-bold">Type Safe</p>
                  <p class="text-caption">Full TypeScript</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Counter Card -->
        <v-card class="elevation-8" style="border-radius: 16px;">
          <div class="gradient-header" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 16px 16px 0 0;">
            <v-card-title class="text-white text-h5 font-weight-bold">
              <v-icon class="mr-2">mdi-counter</v-icon>
              Counter Demo
            </v-card-title>
          </div>
          <v-card-text class="pa-8">
            <div class="text-center">
              <p class="text-subtitle2 mb-4">Current Count</p>
              <div class="display-count">
                <v-icon size="48" color="primary" class="mb-3">mdi-numeric-{{ count > 9 ? '9-plus' : count === 0 ? '0' : count === 1 ? '1' : count === 2 ? '2' : count === 3 ? '3' : count === 4 ? '4' : count === 5 ? '5' : count === 6 ? '6' : count === 7 ? '7' : count === 8 ? '8' : '9' }}</v-icon>
                <p class="text-h1 font-weight-bold" style="color: #667eea;">{{ count }}</p>
              </div>
              <v-divider class="my-6"></v-divider>
              <v-row class="mt-4">
                <v-col cols="6">
                  <v-btn
                    @click="decrement"
                    color="error"
                    size="x-large"
                    block
                    class="rounded-lg"
                  >
                    <v-icon class="mr-2">mdi-minus</v-icon>
                    Decrease
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    @click="increment"
                    color="success"
                    size="x-large"
                    block
                    class="rounded-lg"
                  >
                    <v-icon class="mr-2">mdi-plus</v-icon>
                    Increase
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.display-count {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rounded-lg {
  border-radius: 12px !important;
}
</style>

