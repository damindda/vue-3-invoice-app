<template>
    <div class="container">
        <h2>TODO <span>{{newToDo}}</span></h2>
        <form @submit.prevent="addToDo">
            <input type="text" v-model="newToDo" />
            <button>ADD</button>
        </form>
         <button @click="removeAllDone"> REMOVE ALL DONE</button>
        <button @click="markAllDone"> MARK ALL DONE</button>
        <div v-for="(todo, index) in todos" :key="todo.id">
            <h2 :class="{ done : todo.done }" @click="toggleDone(todo)">{{todo.content}}</h2>
            <button @click="removeToDo(index)"> Remove</button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const newToDo = ref('');

const todos = ref([]);

// const data = reactive ({
//     newToDo: '',
//     todos: []
// });

const addToDo = () => {
    todos.value.push({
        id: Date.now(),
        done: false,
        content: newToDo.value,
    })

    newToDo.value = '';

    return {
        todos,
        newToDo,
        addToDo,
    }
}


const markAllDone = () => {
    todos.value.forEach((todo) => {
        todo.done = true;
    })

    return {
       markAllDone 
    }
}

const removeAllDone = () => {
    todos.value = [];

    return {
       removeAllDone 
    }
}

const toggleDone = (todo) => {
    todo.done = !todo.done;

    return {
        toggleDone
    }
}


const removeToDo = (index) => {
    todos.value.splice(index, 1);

console.log(index);
    return {
        removeToDo
    }
}


</script>

<style lang="scss" scoped>

.container {
  color: #fff;
  margin-bottom: 60px;
//   display: flex;
//   flex: 1;
}

.done{
    text-decoration: line-through;
    color: green;
    cursor: pointer;
}

</style>
