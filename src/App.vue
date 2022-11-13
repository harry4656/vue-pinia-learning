<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>


    <!--  new task form-->
    <div class="new-task-form">
      <NewTaskForm />
    </div>
      <!-- Filter -->
      <nav class="filter">
        <button @click="filter = 'all'" >All tasks</button>
        <button @click="filter = 'favs'" >Fav tasks</button>
      </nav>

      <!-- Loading -->

      <div class="loading" v-if="loading">Loading tasks</div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{totalCount}} tasks left to do </p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- Fav Tasks -->
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{favCount}} favs left to do </p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset State</button>
  </main>
</template>

<script>
import { useTaskStore } from './stores/TaskStore'
import TaskDetails from './components/TaskDetails.vue'
import NewTaskForm from './components/TaskForm.vue'
import { ref } from '@vue/reactivity'
import { storeToRefs } from 'pinia'

export default {
  components: { TaskDetails, NewTaskForm },
  setup () {
    const taskStore = useTaskStore()

    // This storeToRefs function from pinia allow us to get the variables from state and we can use it in our component as ref's
    // Getters and state can be destructed by using storeToRefs function, and We can get actions from storeToRefs() functions.
    const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore)

    // Fetch tasks
    taskStore.getTasks()

    const filter = ref('all')

    return { taskStore , filter , tasks, loading, favs, totalCount, favCount}
  }
}
</script>