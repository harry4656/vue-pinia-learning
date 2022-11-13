import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "play Gloomhaven", isFav: true },
    ],
  }),
  getters: {
    favs() {
      // this refers to state object.
      return this.tasks.filter(task => task.isFav)
    },
    favCount() {
      return this.tasks.reduce((acc,cur) => {
        return cur.isFav ? acc + 1 : acc
      }, 0)
    },
    totalCount: (state) => {
      // this key word not refer to state in arrow function.  state can be passed as argument.
      return state.tasks.length
    }
  },
  actions: {
    addTask(task) {
      this.tasks.push(task)
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task => task.id !== id))
    },
    toggleFav(id){
      const task = this.tasks.find(task => task.id === id)
      task.isFav = !task.isFav
    }
  }
}) 