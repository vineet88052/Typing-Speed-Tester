'use strict';
// --------------------------- html elements --------------------------------//


const timerEl = document.querySelector(".timer");           // timer html element
const textAreaEl = document.querySelector(".typing-text");  // paragraph of random words generated 
const input = document.querySelector(".input");             // typing input text filed 
const restartButtonEl = document.querySelector(".restart");

// -------------------------------------------------------------------------//


// list of top 500 words
let timerIntervalID;

// list of random words that will be generated from words list
const words = ["the", "and", "to", "of", "a", "in", "is", "that", "for", "I", "you", "it", "with", "on", "as", "are", "be", "this", "was", "have", "or", "at", "not", "your", "from", "we", "by", "will", "can", "but", "they", "an", "he", "all", "has", "if", "their", "one", "do", "more", "not", "my", "his", "so", "there", "about", "which", "when", "what", "out", "up", "our", "who", "also", "had", "time", "some", "would", "were", "like", "been", "just", "her", "new", "other", "them", "she", "people", "these", "no", "get", "how", "me", "into", "than", "only", "its", "most", "may", "any", "many", "make", "then", "well", "first", "very", "over", "now", "could", "after", "even", "because", "us", "said", "good", "way", "two", "should", "work", "use", "through", "see", "know", "did", "much", "where", "years", "need", "him", "back", "such", "those", "being", "day", "take", "while", "here", "before", "does", "great", "year", "go", "help", "want", "really", "think", "best", "life", "each", "made", "right", "world", "business", "home", "own", "down", "still", "used", "find", "around", "going", "every", "both", "last", "off", "too", "same", "information", "little", "another", "look", "few", "long", "part", "since", "things", "place", "am", "between", "during", "different", "must", "come", "using", "however", "without", "high", "why", "something", "online", "system", "better", "three", "never", "always", "love", "say", "might", "next", "company", "state", "number", "again", "free", "lot", "under", "family", "found", "within", "give", "set", "school", "important", "water", "able", "keep", "got", "sure", "end", "money", "service", "small", "put", "experience", "having", "once", "available", "health", "support", "often", "including", "days", "away", "old", "area", "feel", "read", "show", "big", "against", "thing", "order", "program", "though", "city", "group", "services", "site", "making", "course", "point", "children", "times", "team", "game", "along", "let", "house", "today", "body", "working", "case", "man", "real", "provide", "care", "public", "top", "looking", "several", "start", "less", "process", "become", "actually", "local", "together", "person", "change", "book", "enough", "getting", "week", "power", "until", "market", "fact", "god", "food", "students", "full", "women", "community", "name", "second", "data", "government", "says", "others", "ever", "yet", "research", "done", "left", "far", "large", "called", "doing", "already", "development", "social", "open", "possible", "side", "play", "means", "needs", "try", "came", "can", "based", "hard", "thought", "products", "national", "quality", "level", "live", "design", "makes", "project", "line", "night", "least", "whether", "job", "car", "example", "include", "following", "given", "website", "past", "plan", "offer", "buy", "call", "went", "simply", "hand", "music", "easy", "problem", "men", "country", "took", "four", "members", "form", "personal", "control", "energy", "room", "head", "pay", "create", "run", "kind", "credit", "almost", "believe", "quite", "mind", "law", "early", "comes", "states", "usually", "companies", "web", "taking", "started", "later", "although", "story", "per", "future", "known", "someone", "across", "rather", "young", "whole", "special", "everything", "months", "anything", "training", "url", "bit", "seen", "product", "american", "please", "management", "cost", "either", "light", "university", "face", "due", "nothing", "human", "event", "history", "probably", "friends", "learn", "current", "tell", "general", "price", "list", "type", "building", "industry", "bad", "check", "everyone", "office", "idea", "internet", "news", "million", "video", "among", "air", "especially", "told", "results", "post", "hours", "international", "center", "understand", "above", "addition", "major", "education", "white", "particular", "problems", "media", "according", "upon", "page", "continue", "black", "study", "issues", "inside", "technology", "five", "value", "further", "access", "reason", "short", "true", "simple", "natural", "amount", "search", "result", "taken", "main", "heart", "space", "financial", "ago", "trying", "question", "living", "likely", "interest", "various", "insurance", "common", "move", "child", "yourself", "report", "certain", "share", "single", "close", "instead", "bring", "works", "age", "see", "season", "hope", "coming", "areas", "ask", "medical", "low", "games", "turn", "key", "party", "add", "month", "seems", "view", "fun", "matter", "words", "needed"];

let randomWord = [];
let timerFlag = false;          // global variable that tells if time is started or not
let wordIndex = 0;              // index of current word in randomWord 
let typedEntries = 0;           // total no of characters typed
let wrongWords = 0;

function init() {               
    input.disabled = true;
    randomWord = [];
    timerFlag = false;
    typedEntries = 0;
    wrongWords = 0;
    wordIndex = 0;
    textAreaEl.style.top = `0px`;
    clearText();
    clearInput();
    timer.reset();
    generateRandomText();
    input.disabled = false;
    input.focus();
    input.setAttribute("placeholder", randomWord[wordIndex]);
}

// -----------------------------timer------------------------------------

let min = 1;
let sec = 0;

const timer = {
    minutes: min,
    seconds: sec,
    totalTime: min * 60 + sec, // total time in seconds
    timerOn: false,
    display() {
        timerEl.innerText = `${this.minutes < 10 ? '0' + this.minutes : this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;
    },
    countDown(endFunction) {        // endFunction is function that will be called when timer ends
        if (this.minutes === 0 && this.seconds === 0) {
            endFunction();
            timer.stop();
            return;
        }
        this.totalTime--;
        this.minutes = Math.floor(this.totalTime / 60);
        this.seconds = this.totalTime % 60;
        this.display();
    },
    start() {
        if (this.timerOn === false) {
            timerIntervalID = setInterval(timer.countDown.bind(timer, calculateSpeed), 1000); // 1000 ms = 1 s 
            // setInterval returns an ID of interval which can be passed to clearInterval to stop function from being called in a set interval
            this.timerOn = true;
        }
    },
    stop() {
        if (this.timerOn === true) {
            clearInterval(timerIntervalID);
            this.timerOn = false;
        }
    },
    reset() {               // reinitialising timer 
        timer.stop();
        this.minutes = min;
        this.seconds = sec;
        this.totalTime = min * 60 + sec;
        timer.display();
    }
}

// -----------------------------------------------------------------------------

function generateRandomText() {
    for (let i = 0; i < 500; i++) {
        let randomNo = Math.trunc(Math.random() * 500);
        randomWord.push(words[randomNo]);
        textAreaEl.innerHTML += `<span class="_${i} word">${randomWord[i]}</span> `;
    }
}

document.querySelector('.close-result-window').addEventListener("click", function () {
    init();
    document.querySelector('.result-window').classList.add('hidden');
})
function clearText() {
    textAreaEl.innerHTML = "";
}

function clearInput() {
    input.value = "";
}

function calculateSpeed() {
    const typingSpeed = (typedEntries/5 - wrongWords)/(min+sec/60);
    document.querySelector('.result-window').classList.remove('hidden'); 
    document.querySelector('.net-speed').innerText = `${Math.trunc(typingSpeed)}WPM`;
}

init();

document.querySelector('.overlay').addEventListener("click", function() {
    init();
    document.querySelector('.result-window').classList.add("hidden");
})

restartButtonEl.addEventListener("click", function() {
    init();
})

let topLineY;      // word y axis
let heightWord;

input.addEventListener('keyup', function (e) {
    if (!timerFlag) {
        timer.start();
        timerFlag = true;
        document.querySelector(`._${wordIndex}`).classList.add('highlight');    // NO . in classList methods
        topLineY = document.querySelector(`._${wordIndex}`).getBoundingClientRect().top;
        heightWord = document.querySelector(`.word`).offsetHeight;    // NO . in classList methods
        // console.log("heightWord", heightWord);
    }
    if (e.key === ' ') {
        if(input.value.trim() === randomWord[wordIndex])
        {
            document.querySelector(`._${wordIndex}`).classList.add('correct');
            typedEntries += (randomWord[wordIndex].length+1);
        }
        else 
        {
            document.querySelector(`._${wordIndex}`).classList.add('wrong');
            if (input.value.length < randomWord[wordIndex])
            {
                typedEntries += input.value.length;
            }
            else
            {
                typedEntries += (randomWord[wordIndex].length + 1);             
            }
            wrongWords++;
        }
        input.value = "";
        document.querySelector(`._${wordIndex}`).classList.remove('highlight');
        wordIndex++;
        input.setAttribute("placeholder", randomWord[wordIndex]);
        document.querySelector(`._${wordIndex}`).classList.add('highlight');    // NO . in classList methods
        let wordY = document.querySelector(`._${wordIndex}`).getBoundingClientRect().top;
        // console.log(wordY);
        if (wordY != topLineY) {
            textAreaEl.style.top = `${document.querySelector('.typing-text').offsetTop - (2 + heightWord)}px`;
        }
    }
})


