<template>
<Suspense>
  <template #default>
  </template>
    <template #fallback>
        Loading article....
  </template>
  </Suspense>
</template>

<script>
import ArticleInfo from './ArticleInfo.vue'
export default {
    components: {
        ArticleInfo
    }

}
</script>

<style>

</style>