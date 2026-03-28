<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const count = computed(() => store.getters.count)

const increment = () => store.dispatch('increment')
const decrement = () => store.dispatch('decrement')

const textInput = ref('')
const notes = ref<string[]>([])

const addNote = () => {
  if (textInput.value.trim()) {
    notes.value.push(textInput.value)
    textInput.value = ''
  }
}

const removeNote = (index: number) => {
  notes.value.splice(index, 1)
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addNote()
  }
}
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
        <v-card class="mb-6 elevation-8" style="border-radius: 16px;">
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

        <!-- Text Input Card -->
        <v-card class="elevation-8" style="border-radius: 16px;">
          <div class="gradient-header" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 16px 16px 0 0;">
            <v-card-title class="text-white text-h5 font-weight-bold">
              <v-icon class="mr-2">mdi-pencil-box</v-icon>
              Notes
            </v-card-title>
          </div>
          <v-card-text class="pa-6">
            <v-row class="mb-4">
              <v-col cols="12">
                <v-text-field
                  v-model="textInput"
                  @keypress="handleKeyPress"
                  label="Type something..."
                  placeholder="Enter your note and press Enter"
                  variant="outlined"
                  prepend-inner-icon="mdi-pencil"
                  clearable
                  class="rounded-field"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              @click="addNote"
              color="info"
              block
              size="large"
              class="rounded-lg mb-4"
            >
              <v-icon class="mr-2">mdi-plus</v-icon>
              Add Note
            </v-btn>

            <!-- Notes List -->
            <div v-if="notes.length > 0">
              <v-divider class="mb-4"></v-divider>
              <p class="text-subtitle2 font-weight-bold mb-3">Your Notes ({{ notes.length }})</p>
              <v-list class="pa-0">
                <v-list-item
                  v-for="(note, index) in notes"
                  :key="index"
                  class="mb-2 rounded-lg pa-3"
                  style="background: #f5f5f5; border-left: 4px solid #4facfe;"
                >
                  <v-list-item-title>{{ note }}</v-list-item-title>
                  <template v-slot:append>
                    <v-btn
                      @click="removeNote(index)"
                      icon="mdi-delete"
                      variant="text"
                      color="error"
                      size="small"
                    ></v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </div>

            <v-empty-state
              v-else
              title="No notes yet"
              text="Start typing and add your first note!"
              icon="mdi-note-multiple"
              class="mt-4"
            ></v-empty-state>
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

:deep(.rounded-field .v-field) {
  border-radius: 12px !important;
}
</style>

