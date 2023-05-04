<template>
  <v-card
    class="mx-auto"
  >
    <v-card
      dark
      flat
    >    
      <v-img
        src="https://i.imgur.com/9i10xoh.png"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
        height="200px"
      >
        <v-container class="fill-height">
          <v-chip color="pink"
                          @click="$router.push('/')">
                    <v-icon>mdi-home</v-icon>
                  </v-chip>

          <v-row justify="center">
            <span class="text-h1 font-weight-regular mx-auto grade" :style="`font-family: 'Luckiest Guy', cursive !important; background-image: linear-gradient(to left, ${getScoreGradient()});`"
            >
              {{score}}/10</span>
            </v-row>
            <v-row justify="center">
              <div class="text-h5 font-weight-light">
                <i style="font-family: 'Solitreo', cursive !important;">יאללה קשה באימונים קל בקרב</i>
              </div>
              <div class="text-uppercase font-weight-light">
              </div>
          </v-row>
        </v-container>
      </v-img>
    </v-card>
    <v-card-text class="py-0" style="direction: rtl;">
      <v-timeline
        align-top
        dense
        
      >
      <v-timeline-item
          :color="`${item.correct ? '#2ed573' : '#ff4757'}`"
          small
          v-for="(item, i) in questions"
        >
          <v-row class="pt-1">
            <v-expansion-panels>

            <v-col cols="4">
              <strong>שאלה {{i+1}}</strong>
            </v-col>
            <v-col>
              <strong>{{ item.q.split(':')[0] }} : {{ item.q.split(':')[1] }}</strong>
              <div class="text-caption" :style="`color: ${item.correct ? '#2ed573' : '#ff4757'};font-weight:600;`">
                {{ responses[i] ? `${item.options[responses[i]-1].split(':')[0]} : ${item.options[responses[i]-1].split(':')[1]}` : '' }}
              </div>
            </v-col>
            <v-col>

            <v-expansion-panel :key="i">
              <v-expansion-panel-header>
                פירוט
              </v-expansion-panel-header>
              <v-expansion-panel-content v-html="item.explain" style="flex-direction: column;">
              </v-expansion-panel-content>
          </v-expansion-panel>
            </v-col>
          </v-expansion-panels>

          </v-row>
        </v-timeline-item>
    </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
const $ = window.$;


export default {
  data: () => ({
    id: null,
    subject: null,
    responses: [],
    questions: [],
    score: null
  }),
  async mounted() {
    this.subject = this.$route.params.subject;

    this.id = localStorage.getItem('id') === 'random' ? 'random' : Number(localStorage.getItem('id'));
    this.responses = JSON.parse(localStorage.getItem('responses'));
    this.questions = JSON.parse(localStorage.getItem('questions'));

    let correct = 0;

    this.questions.map((q, i) => {
      q.correct = this.responses[i] == q.answer;

      if (q.correct) correct++;

      let $v = $(`<p><strong>${q.q.replace(':', ' : ')}</strong><ol class="mr-4"><li>${q.options[0].replace(':', ' : ')}</li><li>${q.options[1].replace(':', ' : ')}</li><li>${q.options[2].replace(':', ' : ')}</li><li>${q.options[3].replace(':', ' : ')}</li></ol></p><br>`);
      if (this.responses[i]) $v.find('li').eq(Number(this.responses[i])-1).css({fontWeight: 'bold', color: 'red'});
      $v.find('li').eq(Number(q.answer)-1).css({fontWeight: 'bold', color: '#78e08f'})
      q.explain = $("<div />").append($v.clone()).html() + q.explain

      return q
    });

    this.score = Math.round(correct*(10/this.questions.length));

    // if not random - save score
    console.log(this.id)
    if (this.id !== 'random') {
      let scores = JSON.parse(localStorage.getItem(`${this.subject}.scores`)) || {};
      scores[this.id] = this.score;
      localStorage.setItem(`${this.subject}.scores`, JSON.stringify(scores));

      let dates = JSON.parse(localStorage.getItem(`${this.subject}.dates`)) || {};
      dates[this.id] = Date.now();
      localStorage.setItem(`${this.subject}.dates`, JSON.stringify(dates));
    }
  },
  methods: {
    getScoreGradient() {
      if (this.score === 10) return '#82ccdd, #079992'
      if (this.score > 8) return '#b8e994, #38ada9'
      if (this.score === 8) return '#4de78d, #35e9c5'
      if (this.score > 4) return '#fa983a, #f6b93b'
      if (this.score > 0) return '#e55039, #eb2f06'
      return '#0c2461, #1e3799'
    }
  }
}
</script>

<style>


.grade {
  font-size: 70px;
  font-weight: 600;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}

.v-timeline::before {
  right: calc(48px - 1px) !important;
  left: initial !important;
}
</style>