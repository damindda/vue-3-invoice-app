<template>
  <h3>ABOUT {{name}}</h3>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const name = computed(() => {
    return store.state.user.name
})

</script>

<style>

</style>