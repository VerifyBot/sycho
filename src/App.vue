<template>
  <v-app>    
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [
        {name: 'Dashboard', route: '/'},
        {name: 'Analogies', route: '/analogia'},
      ],
    }),
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Solitreo&family=Secular+One&Miriam+Libre:wght@700&display=swap');

body::-webkit-scrollbar {
  display: none;
}
</style>