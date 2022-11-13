import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    // tasks: [
    //   { id: 1, title: "buy some milk", isFav: false },
    //   { id: 2, title: "play Gloomhaven", isFav: true },
    // ],
    tasks: [],
    loading: false
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
    async getTasks() {
      this.loading = true
      const res = await fetch('http://localhost:3000/tasks')
      const data = await res.json()

      this.tasks = data
      this.loading = false
    },
    async addTask(task) {
      this.loading = true
      this.tasks.push(task)

      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(res.error){
        console.log(res.error)
      }
      this.loading = false
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((task => task.id !== id))

      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'DELETE',
      })

      if(res.error){
        console.log(res.error)
        console.log(res.error.message)
      }
    },
    async toggleFav(id){
      this.loading = true
      const task = this.tasks.find(task => task.id === id)
      task.isFav = !task.isFav

      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'PATCH',
        body: JSON.stringify({isFav: task.isFav}),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(res.error){
        console.log(res.error)
      }

      this.loading = false
    },
    // addTask(task) {
    //   this.tasks.push(task)
    // },
    // deleteTask(id) {
    //   this.tasks = this.tasks.filter((task => task.id !== id))
    // },
    // toggleFav(id){
    //   const task = this.tasks.find(task => task.id === id)
    //   task.isFav = !task.isFav
    // }
  }
}) 