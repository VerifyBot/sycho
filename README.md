# sycho -- Helps you study for the Psychometry!


## 🏡 Introduction

Imagine studying from books when you have technology. <br>
Then imagine paying for courses when the data is public. <br>
Then imagine printing the PDFs or writing answers on a notebook. <br> <br>

**passé** <br> <br>

> Why not code yourself an app that automatically parses the questions from the public PDFs
> and then spend time designing a UI for that, with cool features? <br> <br>

**That's right! 😂**


## 🪁 Usage
I coded the frontend using `🔰 Vue` (_just because I liked vuetify's components_) <br>
And the code for pulling all the data is written with `🐍 Python 3.9` <br> <br>

The app is available at [🔗 https://sycho-385420.web.app](https://sycho-385420.web.app) (thanks firebase). <br> <br>

Or you can do whatever: <br>

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


## ⌛ TODO
- [X] אנלוגיות
- [X] Keep previous scores
- [X] View meanings of words by long-pressing them in the אנלוגיה practice
- [ ] Support more stuff other than אנלוגיות...
- [ ] Create a logo