# sycho

<p>Study for the Psychometry conveniently!</p>

**Head over to https://sycho-385420.web.app/ to start studying!**

**`💡 NOTE`** Keep in mind that this project is designed to be used as a mobile PWA, so it won't look good (or might not work properly) on larger screens.

## 🏡 Introduction

_(written by ChatGPT 😉)_

Introducing **_sycho_**: Your Passport to Effortless Psychometric Exam Success!

Say goodbye to tedious book and PDF study sessions! Enter the world of **_sycho_**, where psychometric exam preparation transforms into an exciting, on-the-go adventure right from your phone. With a vast question bank sourced from https://www.nite.org.il/psychometric-entrance-test/preparation/hebrew-practice-tests/, this app lets you practice randomly or target specific moed questions.

Whether you thrive under pressure or prefer a relaxed pace, **_sycho_** adapts to your style. Practice with or without time limits, and if you stumble upon unfamiliar words, a simple tap reveals their meanings. After your quiz, receive a score and in-depth explanations to master every question. Elevate your study experience with **_sycho_** and embark on your path to psychometric exam success."

## 🪟 Images

## Home Page

<img src="https://i.imgur.com/4BfcN8W.png" alt="home page" height="500px">

## Select Questions Source

<img src="https://i.imgur.com/MhjajMu.png" alt="select type" height="500px">

## Quiz Page

<img src="https://i.imgur.com/gV5XYGO.png" alt="quiz page" height="500px">

## Word Meaning

<img src="https://i.imgur.com/L5pfoPt.png" alt="word meaning" height="500px">

## Submit Quiz

<img src="https://i.imgur.com/wcdzVUJ.png" alt="submit quiz" height="500px">

## Quiz Results

<img src="https://i.imgur.com/gCz0pYu.png" alt="quiz results" height="500px">

## Correct Answer Explanation

<img src="https://i.imgur.com/FiVj13J.png" alt="correct explain" height="500px"> 

## Choose Moed: Specific Psychometric Exam Questions

<img src="https://i.imgur.com/GN3m9Pq.png" alt="choose moed" height="500px">





## 🪁 Usage
I coded the frontend using `🔰 Vue`, but in future projects I plan to use `🧡 Svelte` <br>
The code for pulling all the data (questions, answers, explanations, words meanings) is written using `🐍 Python 3.9` <br>
My biggest flex is that no data collection was done manually. Everything is scraped automatically using tools that I wrote. <br>

The app is available at [🔗 https://sycho-385420.web.app](https://sycho-385420.web.app) (thanks firebase for statically hosting my). <br> <br>

Or get it running locally: <br>

### Project setup
```bash
npm install
```

### Compiles and hot-reloads for development
```bash
npm run serve
```

### Upload to firebase
```bash
# first time conf
firebase login
firebase init

# then every upload
npm run build
firebase deploy
```


## 🛣️ Roadmap
- [X] Analogies
- [X] Sentence Completions
- [X] Store previous scores
- [X] View meanings of words by long-pressing them
- [X] Quiz Timer
- [X] Explanations
- [ ] Support more types of questions 😴
- [ ] Create a logo 🍭
