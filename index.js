const quotes = [
	'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
	'There is nothing more deceptive than an obvious fact.',
	'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
	'I never make exceptions. An exception disproves the rule.',
	'What one man can invent another can discover.',
	'Nothing clears up a case so much as stating it to another person.',
	'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

//for storing the words in the array named words
let words=[];
let wordIndex = 0;//initialize the counter of words

let startTime= Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedvalueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click',function(){

    //to get a quote
    const quoteIndex = Math.floor(Math.random()*quotes.length);
    const quote = quotes[quoteIndex];

    //to put quote in array of words
    words = quote.split(' ');

    // reset the wordindex for tracking
    wordIndex = 0;

    // UI updates
	// Create an array of span elements so we can set a class
	const spanWords = words.map(function(word) { return `<span>${word} </span>`});
	// Convert into string and set as innerHTML on quote display
	quoteElement.innerHTML = spanWords.join('');
	// Highlight the first word
	quoteElement.childNodes[0].className = 'highlight';
	// Clear any prior messages
	messageElement.innerText = '';

	// Setup the textbox
	// Clear the textbox
	typedValueElement.value = '';
	// set focus
	typedValueElement.focus();
	// set the event handler

	// Start the timer
	startTime = new Date().getTime();
});


typedvalueElement.addEventListener('input',(e)=>{

    const currentWord = words[wordIndex];
    const typedvalue = typedvalueElement.value;

    if (typedvalue === currentWord && wordIndex === words.length - 1) {
        // for display success if it is
        const finishTime = new Date().getTime() - startTime;
        const message = `Congrats!! You finished in ${finishTime/1000} seconds.`;
        messageElement.innerText =message;
    }
    else if(typedvalue.endsWith(' ') && typedvalue.trim()===currentWord){
        // to  check word is ended with ' '(space) & clean the textbox for next word
        typedvalueElement.value = '';
        wordIndex++;
        for(const wordElement of quoteElement.childNodes){
            wordElement.className ='';
            quoteElement.childNodes[wordIndex].className = 'highlight';
        }
    }
    else if(currentWord.startsWith(typedvalue)){
        // to highlight next word 
        typedvalueElement.className = '';
    }
    else{
        // to display error state
        typedvalueElement.className = 'error';
    }
});