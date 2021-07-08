<template>
  <div class="side-nav">
      <div class="branding">
  <img src="../assets/invoice.svg" alt="" class="icon"/>
  </div>
  </div>
</template>

<script>
export default {
    name: "navigation"
}
</script>

<style lang="scss" scoped>
   .side-nav{
       z-index: 99;
       display: flex;
       flex-direction: row;
       background-color: #292d4e;

       @media (min-width: 900px) {
           min-height: 100vh;
        //    width: 60px;
        flex:.05;           
       }
   }

.icon{
    width: 30px;
    display: block;
    margin: 20px auto;
}
   .branding{
       border-radius: 0 20px 20px 0;
       background-color: #7c5dfa;
       justify-content: center;
    //    padding: 24px;

    
       @media (min-width: 900px) {
           height: 70px;
           width: 100%;
       }
   }
</style>