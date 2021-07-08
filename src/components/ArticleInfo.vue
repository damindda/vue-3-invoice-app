<template>
  <div>
      {{ article }}
  </div>
</template>

<script>
const getArticleInfo = async () => {
    //wait 3 sec to mimic the api call
    await new Promise(resolve => setTimeout(resolve, 3000))

    const article = {
        title: "vue 3 title",
        author: 'johnny deep'
    }

    return article;
}
export default {
    async setup() {
        const article = await getArticleInfo();

        return {
            article
        }
    }
}
</script>

<style>

</style>