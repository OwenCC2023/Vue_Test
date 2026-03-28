<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Header Card -->
        <v-card class="mb-6 elevation-8" style="border-radius: 16px;">
          <div class="gradient-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 16px 16px 0 0;">
            <v-card-title class="text-white text-h4 font-weight-bold">
              <v-icon size="large" class="mr-3">mdi-information</v-icon>
              About This Project
            </v-card-title>
          </div>
          <v-card-text class="pa-6">
            <p class="text-subtitle1 mb-4">
              A modern, production-ready Vue 3 application demonstrating best practices with cutting-edge tools and frameworks.
            </p>
            <v-alert
              color="primary"
              icon="mdi-lightbulb"
              title="Built for Performance"
              text="This project combines Vue 3's reactivity, Vite's blazing-fast build times, and TypeScript's type safety for an optimal development experience."
              class="mb-4"
            ></v-alert>
          </v-card-text>
        </v-card>

        <!-- Tech Stack Cards -->
        <v-row class="mb-6">
          <v-col cols="12" md="6">
            <v-card class="elevation-6 h-100" style="border-radius: 12px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 12px 12px 0 0;">
                <v-card-title class="text-white text-h6 font-weight-bold">
                  <v-icon class="mr-2">mdi-hammer-wrench</v-icon>
                  Frontend Stack
                </v-card-title>
              </div>
              <v-card-text class="pa-6">
                <v-list>
                  <v-list-item
                    v-for="item in ['Vue 3 with Composition API', 'Vite Build Tool', 'TypeScript', 'Vue Router', 'Vuex State Management']"
                    :key="item"
                    class="pl-0"
                  >
                    <template v-slot:prepend>
                      <v-icon color="success" size="small">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="elevation-6 h-100" style="border-radius: 12px;">
              <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 12px 12px 0 0;">
                <v-card-title class="text-white text-h6 font-weight-bold">
                  <v-icon class="mr-2">mdi-palette</v-icon>
                  UI Framework
                </v-card-title>
              </div>
              <v-card-text class="pa-6">
                <v-list>
                  <v-list-item
                    v-for="item in ['Vuetify Material Design', 'Pre-built Components', 'Responsive Layout', 'Icon Library', 'Dark Mode Support']"
                    :key="item"
                    class="pl-0"
                  >
                    <template v-slot:prepend>
                      <v-icon color="info" size="small">mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Features Card -->
        <v-card class="elevation-8" style="border-radius: 16px;">
          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 16px 16px 0 0;">
            <v-card-title class="text-white text-h5 font-weight-bold">
              <v-icon class="mr-2" size="large">mdi-star</v-icon>
              Key Features
            </v-card-title>
          </div>
          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" md="4" v-for="(feature, i) in features" :key="i">
                <div class="text-center">
                  <v-icon :color="feature.color" size="40" class="mb-3">{{ feature.icon }}</v-icon>
                  <p class="font-weight-bold mb-2">{{ feature.title }}</p>
                  <p class="text-caption text-grey">{{ feature.desc }}</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'mdi-lightning-bolt',
    color: 'warning',
    title: 'Lightning Fast',
    desc: 'Powered by Vite with instant hot module replacement'
  },
  {
    icon: 'mdi-shield-check',
    color: 'success',
    title: 'Type Safe',
    desc: 'Full TypeScript support for better development'
  },
  {
    icon: 'mdi-responsive',
    color: 'info',
    title: 'Responsive',
    desc: 'Works perfectly on all devices and screen sizes'
  }
]
</script>
