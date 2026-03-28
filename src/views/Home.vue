<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const count = computed(() => store.getters.count)

const increment = () => store.dispatch('increment')
const decrement = () => store.dispatch('decrement')
</script>

<template>
  <v-container class="pa-4">
    <v-card>
      <v-card-title>Home</v-card-title>
      <v-card-text>
        <v-row class="mt-2">
          <v-col cols="12">
            <p class="text-h6">Counter: {{ count }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-btn color="success" @click="increment" block>
              Increment
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn color="error" @click="decrement" block>
              Decrement
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

