const sentences = [
    "Nice to meet you!",
    "I am Noé",
    "I am a software engineer",
    "I am a Kotlin Multiplatform developer",
    "I am an Android developer",
    "I am an iOS developer",
    "I am a software libre developer",
    "I am a Flutter developer",
];

const sentenceFinalEmojis = [
    " 👋 ",
    " 🤝 ",
    " 🧑‍💻 ",
    " 🎯 ",
    " 🤖 ",
    " 🍎 ",
    " 🚀 ",
    " 🐦 ",
];

// Frames to wait before start erasing
const framesToWait = [
    30,
    30,
    40,
    30,
    40,
    30,
    40,
    30,
    40,
    30,
    30
];

// Frames to perform a blink (show/hide cursor)
const framesPerBlink = 7;

// Writing/Erasing Frequency (in millis)
const frequency = 60;

// Cursor  html
const cursor = '<span style="color:#1E90FF">|</span>'
const hiddenCursor = '&nbsp'

function bootConsole() {
    var consoleText = document.getElementById('header-console-text');

    // state
    var currentSentenceIndex = 0;
    var currentSentence = sentences[currentSentenceIndex];
    var cursorOn = false;
    var counter = 0;
    var reverseCounter = 0;
    var framesCounter = 0;

    setInterval(consoleLoop, frequency);

    function consoleLoop() {
        var isWriting = counter < currentSentence.length;
        if (isWriting == true) {
            writeSentence();
        } else {
            framesCounter++;
            var isWaiting = framesCounter < framesToWait[currentSentenceIndex];
            if (isWaiting == false) {
                deleteSentence();
            } else {
                blinkCursor();
            }
        }
    }

    function writeSentence() {
        counter++;
        if (counter >= currentSentence.length) {
            consoleText.innerHTML = currentSentence.substring(0, counter) + sentenceFinalEmojis[currentSentenceIndex] + hiddenCursor;
            cursorOn = false;
            reverseCounter = currentSentence.length;
            framesCounter = 0;
        } else {
            consoleText.innerHTML = currentSentence.substring(0, counter) + cursor
        }
    }

    function deleteSentence() {
        reverseCounter--;
        if (reverseCounter <= 0) {
            // if it is the last character to remove, change the sentence and set flags
            currentSentenceIndex++;
            if (currentSentenceIndex == sentences.length) {
                currentSentenceIndex = 0;
            }
            currentSentence = sentences[currentSentenceIndex];
            counter = 0;
        } else {
            consoleText.innerHTML = currentSentence.substring(0, reverseCounter) + cursor;
        }
    }

    function blinkCursor() {
        var hasToBlink = framesCounter % framesPerBlink == 0;
        if (hasToBlink == true) {
            if (cursorOn == true) {
                // hide cursor
                cursorOn = false;
                consoleText.innerHTML = sentences[currentSentenceIndex] + sentenceFinalEmojis[currentSentenceIndex] + hiddenCursor;
            } else {
                // show cursor
                cursorOn = true;
                consoleText.innerHTML = sentences[currentSentenceIndex] + sentenceFinalEmojis[currentSentenceIndex] + cursor;
            }
        }
    }
}

// Boot
window.addEventListener("DOMContentLoaded", function() {
    // Do not show the console if it is not index page
    if (window.location.pathname != '/index.html' && window.location.pathname != '/') {
        return;
    }

    bootConsole();
});