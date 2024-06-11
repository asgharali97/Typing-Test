// APi Of quotes
const quoteApi =  'https://api.quotable.io/random?minLenght=80&maxLength=100'

// Selecting Variable
const quoteSection = document.getElementById('quote');
const userInput = document.getElementById('quote-input');

// Global variables
let quote = '';
let time = 60;
let timer = "";
let mistake = 0;

// Functions
const renderNewQuote = async()=>{
    const response = await fetch(quoteApi)
    const data = await response.json();
    quote = data.content

    let arr = quote.split('').map(function(value){
        return '<span class="quote-chars">'+ value +'</span>'
    })
   
    quoteSection.innerHTML += arr.join('')
}
// Event Listeners
userInput.addEventListener('input',()=>{
    let quoteChars = document.querySelectorAll('.quote-chars');
    // 
    quoteChars = Array.from(quoteChars);
    let userInputChars = userInput.value.split('');

    quoteChars.forEach(function (char,index) {
        if(char.innerText == userInputChars[index]){
            char.classList.add('success')
        }else if(userInputChars[index] == null){
            if(char.classList.contains('success')){
                char.classList.remove('success')
            }else{
                char.classList.remove('fail')
            }
        }else{
            if(!char.classList.contains('fail')){
                mistake += 1
                char.classList.add('fail')
        }
        document.getElementById('mistake').innerHTML = mistake
        }
    });

    let check = quoteChars.every(function (char) {
        return char.classList.contains('success')
    })
    if(check){
        displayResult()
    }
    
})

const timeReduce = ()=>{
    time = 60
    timer = setInterval(updateTime,1000)
}

function updateTime() {
    if(time == 0){
        displayResult();
    }
    document.getElementById('time').innerHTML = time-- + 's'
}

const displayResult = ()=>{
     document.querySelector('.result').style.display = 'block';
     document.querySelector('#stop-test').style.display = 'none';
    clearInterval(timer);
    userInput.disabled = true
    let timeTaken = 1
    if(time != 0){
        timeTaken = (60 - time) / 100
    }
    document.getElementById('wpm').innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + 'wpm';
    document.getElementById('accuracy').innerText = userInput.value !== '' ? Math.round(((userInput.value.length - mistake) / userInput.value.length)*100) + '%' : '0%';
}


const startTest = () =>{
    timer = '';
    mistake = 0;
    userInput.disabled = false;
    timeReduce();
    document.getElementById('start-test').style.display = 'none'
    document.getElementById('stop-test').style.display = 'block'
}


window.onload= ()=>{
  userInput.value = ''
  document.getElementById('start-test').style.display = 'block'
  document.getElementById('stop-test').style.display = 'none'
  userInput.disabled = true
  renderNewQuote();
}