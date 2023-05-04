<template>
  <v-card>
    <v-app-bar
      dark
      color="pink">

      <v-card class="pa-2 mr-7 rounded" color="red darken-4" outlined tile style="font-family: Luckiest Guy,  'Secular One';">
        היום {{ (new Date()).toLocaleDateString('he-IL').replaceAll('.', '/') }}
      </v-card>

      <v-spacer></v-spacer>      

      <v-card class="pa-2 ml-7 rounded" color="pink darken-4" outlined tile style="font-family: Luckiest Guy,  'Secular One';">
        בחינה 04/09/2023
      </v-card>

      
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
          class="homepage-btn"
          @click="sheet = !sheet; it=item"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h4"
                  style="font-family: 'Miriam Libre' !important; font-weight: 700 !important; word-break: break-word !important"
                  v-text="item.title"
                ></v-card-title>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-bottom-sheet v-model="sheet">
      <v-sheet
        class="text-center"
        height="200px"
      >
        <div class="py-3">
          <span class=text-h4 style="font-family: 'Miriam Libre' !important; font-weight: 700 !important;">{{ it?.title }}</span>
          <v-divider class="my-2"></v-divider>
          <v-col><v-btn
            color="red darken-4" class="text-h6" style="font-family: 'Secular One' !important;"
            @click="toRandomQuestions()"
            > שאלות אקראיות </v-btn></v-col>
          <v-col><v-btn
            color="red darken-4" class="text-h6" style="font-family: 'Secular One' !important;"
            @click="toDateSelection()"
            > לפי מועד </v-btn></v-col>
    
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      sheet: false,
      it: null,
      items: [
        {
          color: '#952175',
          src: 'https://i.imgur.com/p9VD6zc.png',
          title: 'אנלוגיות מילוליות',
          name: "analogia"
        },
      ],
    }),
    methods: {
      toDateSelection() {
        this.$router.push({path: `/choose/${this.it.name}`, params: {subject: this.it.name}});
      },
      toRandomQuestions() {
        this.$router.push({path: `/practice/${this.it.name}/random`, params: {subject: this.it.name}});
      }
    }
  }
</script>

<style>
.homepage-btn {
  cursor: pointer !important;
}

.homepage-btn:hover {
  filter: brightness(1.1);
  transform: scale(1.01);
}

</style>