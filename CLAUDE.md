# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment

- Platform: Windows 11, bash shell available
- Node.js: Required (v18+ recommended)
- Primary languages: Vue 3, TypeScript

## Development Commands

### Getting Started
```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Type Checking
```bash
npm run build        # Runs vue-tsc type checking before building
```

## Project Architecture

### Technology Stack
- **Vue 3**: Latest Vue framework with Composition API
- **Vite**: Lightning-fast build tool and dev server with HMR
- **TypeScript**: Full type safety across the application
- **Vue Router**: Client-side routing with typed routes
- **Vuex**: Centralized state management with TypeScript support

### Directory Structure
```
src/
├── components/      # Reusable Vue components
├── views/          # Page-level components (routed)
├── router/         # Vue Router configuration (index.ts)
├── store/          # Vuex store configuration (index.ts)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.vue         # Root component
└── main.ts         # Application entry point
```

### Key Files
- **src/main.ts**: Application entry point - integrates Router and Store with Vue app
- **src/router/index.ts**: Route definitions with typed components
- **src/store/index.ts**: Vuex store with state, mutations, actions, and getters
- **vite.config.ts**: Vite configuration with Vue plugin
- **tsconfig.json**: TypeScript compiler configuration with strict mode enabled
- **index.html**: HTML entry point loaded by Vite

## Development Workflow

### Creating New Components
1. Create `.vue` file in `src/components/` or `src/views/`
2. Use `<script setup lang="ts">` for Composition API with TypeScript
3. Define props/emits with type annotations
4. Template uses standard Vue syntax with type-safe component references

Example component (`src/components/Counter.vue`):
```vue
<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  initial?: number
}

const props = withDefaults(defineProps<Props>(), { initial: 0 })
const count = ref(props.initial)

const increment = () => count.value++
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
</template>
```

### Adding Routes
1. Create view component in `src/views/`
2. Add route entry to `src/router/index.ts` in the `routes` array
3. Use `<RouterLink>` for navigation in templates
4. Access current route with `useRoute()` and router with `useRouter()`

### Managing State with Vuex
1. Define state shape in `src/store/index.ts` using TypeScript interface
2. Add mutations for state changes (synchronous)
3. Add actions for async operations or complex logic
4. Access state in components:
   - `useStore()` to get the store instance
   - `store.state.property` for direct state access
   - `store.getters.name` for computed state
   - `store.dispatch('action')` to dispatch actions

Example state usage:
```typescript
import { useStore } from 'vuex'
const store = useStore()
const myValue = computed(() => store.getters.myGetter)
store.dispatch('myAction')
```

### TypeScript Best Practices
- Use `<script setup lang="ts">` in Vue components for cleaner syntax
- Define prop types with `withDefaults(defineProps<Props>(), {...})`
- Use `computed()` for reactive properties instead of methods when possible
- Type function parameters and return values explicitly
- Create `src/types/` directory for shared type definitions
- Enable strict mode in `tsconfig.json` for maximum type safety

## Hot Module Replacement (HMR)
Vite provides instant HMR during development. Changes to `.vue` files, `.ts` files, and styles are reflected immediately in the browser without full page reload.

## Building for Production
```bash
npm run build
```
Output goes to `dist/` directory. Files are minified and optimized. Type checking runs automatically before bundling.
