/*
1. install pinia -> npm install pinia.
2. Register Pinia in Main.js as a middleware in use function. 
  EG 
  import { createPinia } from 'pinia'
  createApp(App).use(createPinia()).mount('#app')
3. Create a store folder and define a global state. 
    Eg:
    import { defineStore } from 'pinia'
    export const useTaskStore = defineStore('taskStore', {
      state: () => ({
        tasks: []
      })
    })
*/