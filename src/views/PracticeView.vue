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
              <v-row>
                <v-col>
                  <v-chip color="primary" @click="paused=!paused">
                    <v-icon>{{ paused ? 'mdi-play' : 'mdi-pause' }}</v-icon>
                  </v-chip>
                </v-col>

                <v-spacer></v-spacer>

                <v-col style="direction: rtl;">
                  <v-chip color="#F97F51"
                          @click="responses.some(e => e!==null) ? exitDialog=true : $router.push(`/`)">
                    <v-icon>mdi-exit-run</v-icon>
                    <span class="mr-2">יציאה מהמבחן</span>
                  </v-chip>
                </v-col>
              </v-row>
              <v-row>
                <h2 class="mx-auto">{{ title }}{{ year ? ' '+year : '' }} - אנלוגיות</h2>
              </v-row>
              <v-row justify="center" class="my-2">
                <v-col cols="auto">
                  <v-chip class="ma-2 pa-5" label>
                    <v-icon left>mdi-clock</v-icon>
                    {{ minutes }}:{{ seconds }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-sheet>
      </v-col>

      <v-col
              cols="36"
              sm="12"
      >
        <v-sheet
                min-height="70vh"
                rounded="lg"
        >
          <!-- center -->
          <v-card style="direction: ltr">
            <template>
              <v-container fluid>
                <!-- Top row with two boxes in the middle separated by | -->
                
                
                <!-- run if this.$route.params.subject === 'analogia' -->
                <div v-if="subject === 'analogia'">
                  <template>
    <v-row class="my-4 d-flex align-center justify-center" style="direction: rtl;">
      <v-col cols="auto">
        <v-card class="mx-auto px-3" max-width="300" color="#6c5ce7">
          <v-card-text class="text-center" style="color: white;">
            <strong
              v-long-press="300"
              @long-press-start="onLongPressStart"
            >{{ questions[page - 1].q.split(':')[0] }}</strong>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <h2>:</h2>
      </v-col>
      <v-col cols="auto">
        <v-card class="mx-auto px-3" max-width="300" color="#6c5ce7">
          <v-card-text class="text-center" style="color: white;">
            <strong
              v-long-press="300"
              @long-press-start="onLongPressStart"
            >{{ questions[page - 1].q.split(':')[1] }}</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Four rows with one button in each, bordered on click -->
    <v-row class="my-4">
      <v-col cols="12" md="6" lg="3">
        <v-btn block @click="selected = selected === 1 ? null : 1"
               style="direction: rtl;" class="opt" :class="{ 'selected': selected === 1 }"
        >
          <span class="idx pl-1">1.</span>
          <span class="a"
              v-long-press="300"
              @long-press-start="onLongPressStart"
          >{{ questions[page - 1].options[0].split(':')[0] }}</span>
          <div class="sep px-1">:</div>
          <span class="b"
              v-long-press="300"
              @long-press-start="onLongPressStart"
          >{{ questions[page - 1].options[0].split(':')[1] }}</span>
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-btn block @click="selected = selected === 2 ? null : 2"
               style="direction: rtl;" class="opt" :class="{ 'selected': selected === 2 }"
        >
          <span class="idx pl-1">2.</span>
          <span class="a"
              v-long-press="300"
              @long-press-start="onLongPressStart"
          >{{ questions[page - 1].options[1].split(':')[0] }}</span>
          <div class="sep px-1">:</div>
          <span class="b"
              v-long-press="300"
              @long-press-start="onLongPressStart"
          >{{ questions[page - 1].options[1].split(':')[1] }}</span>
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-btn block @click="selected = selected === 3 ? null : 3"
               style="direction: rtl;" class="opt" :class="{ 'selected': selected === 3 }"
        >
          <span class="idx pl-1">3.</span>
          <span class="a"
              v-long-press="300"
              @long-press-start="onLongPressStart"
          >{{ questions[page - 1].options[2].split(':')[0] }}</span>
          <div class="sep px-1">:</div>
          <span class="b"
              v-long-press="300"
              @long-press-start="onLongPressStart"
          >{{ questions[page - 1].options[2].split(':')[1] }}</span>
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-btn block @click="selected = selected === 4 ? null : 4"
               style="direction: rtl;" class="opt" :class="{ 'selected': selected === 4 }"
        >
          <span class="idx pl-1">4.</span>
          <span class="a"
              v-long-press="300"
              @long-press-start="onLongPressStart"
          >{{ questions[page - 1].options[3].split(':')[0] }}</span>
          <div class="sep px-1">:</div>
          <span class="b"
              v-long-press="300"
              @long-press-start="onLongPressStart"
          >{{ questions[page - 1].options[3].split(':')[1] }}</span>
        </v-btn>
      </v-col>
    </v-row>
</template>

                </div>


                <!-- Continue button on bottom left -->
                <template>
                  <v-row class="my-4">
                    <v-col>
                      <v-btn color="primary" v-if="$vuetify.breakpoint.mdAndUp" @click="continueClicked">לשאלה הבאה
                      </v-btn>

                      <v-container v-else>
                        <v-row>
                          <v-col>
                            <v-btn
                                    class="pa-2"
                                    :color="`${page == questions.length ? (responses.some(e => e===null) ? '#eb3b5a' : '#20bf6b') : 'primary'}`"


                                    style="min-width: 100px"
                                    @click="nextClick"
                            >
                              {{ nextBtnText }}
                            </v-btn>
                          </v-col>

                          <v-spacer></v-spacer>

                          <v-col>
                            <v-btn
                                    class="pa-2"
                                    color="primary"

                                    @click="prevClick"
                                    v-if="page != 1"
                            >
                              שאלה קודמת
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>


                    </v-col>
                  </v-row>
                </template>

                <!-- Pagination on bottom center -->
                <v-row class="my-4" justify="center">
                  <v-pagination v-model="page" :length="questions.length"
                                v-if="$vuetify.breakpoint.mdAndUp"></v-pagination>
                  <span v-else>{{ page }}/{{ questions.length }}</span>
                </v-row>
              </v-container>
            </template>


          </v-card>

        </v-sheet>
      </v-col>
    </v-row>

    <template>
      <v-row justify="center">
        <v-dialog
                v-model="dialog"

                max-width="290"
        >
          <v-card>
            <v-card-title class="text-h5"
                          style="direction: rtl;">
              {{ responses.some(e => e === null) ? 'הגשה חלקית' : 'האם ברצונך להגיש' }}
            </v-card-title>
            <v-card-text style="direction: rtl;">
              {{
                responses.some(e => e === null) ? 'לא סיימת לענות על כל השאלות, האם אתה בטוח שתרצה להגיש?'
                    : remaining > 30 ? 'ישלך עוד זמן, תעבור על התשובות, לא?' : 'טוב, כמעט סיימנו, האם אתה מגיש?'
              }}
            </v-card-text>
            <v-card-actions>
              <!-- <v-spacer></v-spacer> -->
              <v-container>
                <v-row>
                  <v-col>
                    <v-btn
                            color="red darken-1"
                            text
                            @click="dialog = false"
                    >
                      לא משנה
                    </v-btn>
                  </v-col>

                  <v-spacer></v-spacer>

                  <v-col>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="submitExam"
                    >
                      הגשה
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template>
      <v-row justify="center">
        <v-dialog
                v-model="exitDialog"

                max-width="290"
        >
          <v-card>
            <v-card-title class="text-h5"
                          style="direction: rtl;">
              בטוח יוצאים?
            </v-card-title>
            <v-card-text style="direction: rtl;">
              ענית כבר על חלק, לא כדאי כבר להמשיך?
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col>
                    <v-btn
                            color="red darken-1"
                            text
                            @click="exitDialog = false"
                    >
                      לא משנה
                    </v-btn>
                  </v-col>

                  <v-spacer></v-spacer>

                  <v-col>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="$router.push('/')"
                    >
                      יציאה
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <v-bottom-sheet v-model="sheet">
      <v-sheet
        class="text-center overflow-y-auto"
        height="200px"

      >
        <div class="py-3">
          <span class=text-h4 style="font-family: 'Miriam Libre' !important; font-weight: 700 !important;">{{ meaningWord }}</span>
          <v-divider></v-divider>
          <span v-if="meaningType === 'bitui'" class="text-subtitle-1">{{ meaningExp }}</span>
          <template v-else>
            <v-card
            tile>
              <v-list-item
                v-for="(item, index) in meaningList"
                :key="index"
                :title="item.title"
              >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle style="white-space: break-spaces !important;">{{ item.meaning }}</v-list-item-subtitle>
              </v-list-item-content>
                
              </v-list-item>
            </v-card>
          </template>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>

</template>

<script>
import LongPress from 'vue-directive-long-press'


const $ = window.$;

import { jsMapping, timings } from './data.js'

import allMeanings from './meanings.json'


function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
window.onbeforeunload = function(){
    return "Are you sure you want to close the window?";
}
export default {
  data() {
    return {
      subject: null,

      // if moed
      id: null,
      title: null,
      year: null,

      selected: -1,
      buttonsDisabled: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 1,


      questions: [],
      responses: [],

      nextBtnText: 'שאלה הבאה',
      btnNextDisabled: false,
      btnPrevDisabled: false,

      remaining: 50,
      intervalId: null,
      paused: false,

      dialog: false,
      exitDialog: false,

      sheet: false,
      meaningWord: null,
      meaningExp: null,
      meaningType: null,
      meaningList: []
    }
  },
  async mounted() {
    this.subject = this.$route.params.subject

    const data = jsMapping[this.subject];

    console.table(this.$route.params)
    this.id = this.$route.params.id;

    if (this.id === 'random') {
      this.title = 'שאלות אקראיות';
      this.questions = shuffle(data.map(e => e.questions).flat()).slice(0, 12);
    } else {
      let moed = data.filter(e => e.id == this.id)[0];
      [this.title, this.year, this.questions] = [moed.title, moed.year, moed.questions];
    }

    this.remaining = timings[this.subject] * this.questions.length;

    this.responses = Array(this.questions.length).fill(null);

    // timer handler
    this.intervalId = setInterval(() => {
      if (this.paused) return;
      if (this.remaining > 0) this.remaining--;
      else {
        clearInterval(this.intervalId);
        this.submitExam()
      }
    }, 1000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    nextClick() {
      if (this.btnNextDisabled) return


      if (this.page + 1 > this.questions.length) {
        this.dialog = true;

        return
      }

      this.page++;

      this.nextBtnText = (this.page == this.questions.length) ? "הגשה" : "שאלה הבאה"
      this.btnNextDisabled = true;
      this.selected = this.responses[this.page - 1];
      setTimeout(() => this.btnNextDisabled = false, 100);
    },
    prevClick() {
      if (this.btnPrevDisabled) return

      this.page = Math.max(1, this.page - 1);
      this.nextBtnText = (this.page == this.questions.length) ? "הגשה" : "שאלה הבאה"
      this.btnPrevDisabled = true;
      this.selected = this.responses[this.page - 1];
      setTimeout(() => this.btnPrevDisabled = false, 100)
    },
    submitExam() {
      localStorage.setItem('id', this.id)
      localStorage.setItem('questions', JSON.stringify(this.questions))
      localStorage.setItem('responses', JSON.stringify(this.responses))
      this.$router.push({path: `/results/${this.subject}`, params: {subject: this.subject}})
    },
    onLongPressStart(ev) {
      let val = ev.target.textContent.replace(/"/g, '');
      
      // if val in allMeanings object
      if (!(val in allMeanings)) {
        alert('no sorry')
        return; 
      }
        
        
      this.sheet = true;
      this.meaningWord = val;

      let exp = allMeanings[val];

      this.meaningType = exp.type;

      if (this.meaningType === 'bitui') {
        this.meaningExp = exp.value;
      } else {
        this.meaningList = exp.values;
      }
    }
  },
  watch: {
    selected(curr, _) {
      this.responses[this.page - 1] = curr;
    },
    dialog(curr, _) {
      this.paused = curr;
    },
    exitDialog(curr, _) {
      this.paused = curr;
    }
  },
  computed: {
    minutes() {
      return ('0' + Math.floor(this.remaining / 60)).slice(-2);
    },
    seconds() {
      return ('0' + (this.remaining % 60)).slice(-2);
    }
  },
  directives: {
    'long-press': LongPress
  },
}

</script>

<style>
.selected {
    border: 3px solid;
    border-color: #6D214F !important;
}
</style>
