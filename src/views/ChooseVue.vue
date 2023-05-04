<template>
  <v-container>
        <v-row>
          <v-col
              sm="12"
      >
        <v-sheet
                rounded="lg"
                min-height="5vh"
        >
          <!-- right -->
          <template>
            <v-container>
              <v-row class="pa-5">
                  <v-chip color="pink" class="mr-3"
                          @click="$router.push('/')">
                    <v-icon>mdi-home</v-icon>
                  </v-chip>
                  <h2 class="mr-8">{{ subjectHeb }}</h2>
              </v-row>
            </v-container>
          </template>
        </v-sheet>
      </v-col>
          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!-- center -->
              <v-card style="direction: rtl">
    <v-card-title>
      
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        label="חיפוש"
        single-line
        hide-details
        
      ></v-text-field> <!-- reverse is for rtl -->
    </v-card-title>

    <!-- 
      TODO Expandable Table for history (https://v2.vuetifyjs.com/en/components/data-tables/#expandable-rows)
    -->
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"  

      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"

      multi-sort
    >
  
    <template #[`item.previousScore`]="{ item }">
      <v-chip :color="getColor(item.previousScore)" class="darken" v-if="item.hasDone">
        <strong>{{ item.previousScore }}/10</strong> <span class="mx-2">|</span> <i>{{ item.previousDate }}</i>
      </v-chip>
    </template>

    <template #[`item.practice`]="{ item }" >
      <v-btn :color="item.hasDone ? '#273c75' : '#8c7ae6'" :disabled="buttonsDisabled"  v-on:click="practiceButton(item.practice)">{{ item.hasDone ? 'לתרגול חוזר' : 'לתרגול' }}</v-btn>
    </template>

  </v-data-table>
    <div class="text-center pt-2" style="direction: rtl">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>

  </v-card>

            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
const $ = window.$;

import {jsMapping, subjectHebConv} from './data.js';


export default {
  data () {
    return {
      buttonsDisabled: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: '',
      subject: null,
      subjectHeb: null,
      headers: [
        {
          text: 'מועד',
          align: 'start',
          sortable: true,
          value: 'title'
        },
        {text: 'שנה', value: 'year'},
        {text: 'ביצועים אחרונים', value: 'previousScore'},
        {text: 'תרגל', sortable: false, value: 'practice'}
      ],
      desserts: []
    }
  },
  mounted() {
    $('[class^="v-data-table"] th label').text('מיין לפי'); // modern problems require modern solutions

    this.subject = this.$route.params.subject;
    this.subjectHeb = subjectHebConv[this.subject];

    var data = jsMapping[this.subject];
    
    function tsToDate(ts) {
      if (!ts) return;
      var date = new Date(ts);
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    data = data.map(e => ({
      title: e.title,
      year: parseInt(e.year),
      previousScore: JSON.parse(localStorage.getItem(`${this.subject}.scores`) || '{}')[e.id],
      previousDate: tsToDate(JSON.parse(localStorage.getItem(`${this.subject}.dates`) || '{}')[e.id]),
      practice: e.id,
    })).map(e => {
      e.hasDone = (Boolean(e.previousScore)||e.previousScore===0);
      return e;
    });

    console.log(data)

    this.desserts = data;
  },
  methods: {
    getColor (score) {
      if (score > 7)
        return '#66BB6A';
      if (score > 4)
        return '#FF9100'

      return '#FF5252'
    },
    practiceButton (id) {
    this.buttonsDisabled = true;
    console.log(`sending with params of id:${id}`)
    this.$router.push({
      path: `/practice/${this.subject}/${id}`,
      params: {id: id}
    })
  }
  },
  
}
</script>
<style>
  th label {
    float: right !important;
    font-weight: 500 !important;
    right: 25px !important;
    left: auto !important;
  }
  th{
    direction: ltr !important;
  }


</style>