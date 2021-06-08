const field = document.querySelector('.game__field');
//defer필수 

const gameBtn = document.querySelector('.game__button');
const playBtn = document.querySelector('.fa-play');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popup = document.querySelector('.pop-up');
const replayBtn = document.querySelector('.pop-up__refresh');
const popup_message = document.querySelector('.pop-up__message');
let count = 10; //10초부터 카운트다운
let time = 0; 
let score = 5;



function init() {
    

     let carrot = new Image();
     carrot.src = 'img/carrot.png';
     carrot.setAttribute('class', 'carrot');


     let bug = new Image();
     bug.src = 'img/bug.png';
     bug.setAttribute('class', 'bug');

     //1.당근, 벌레 5개씩
     for(let i = 0; i < 5; i++) {
     const carrots = field.appendChild(carrot.cloneNode());
     const bugs = field.appendChild(bug.cloneNode());

     //2.랜덤
     const fieldRect = field.getBoundingClientRect();
    //  console.log(fieldRect);
     const carrotsX = Math.floor(Math.random() * (fieldRect.width-80));
     const carrotsY = Math.floor(Math.random() * (fieldRect.height-80));
     const bugsX = Math.floor(Math.random() * (fieldRect.width-50));
     const bugsY = Math.floor(Math.random() * (fieldRect.height-50));
    //  console.log(carrotsX, carrotsY);
    //  console.log(bugsX, bugsY);
     carrots.style.transform = `
     translate(${carrotsX}px, ${carrotsY}px)
     `;
     bugs.style.transform = `
     translate(${bugsX}px, ${bugsY}px)
     `;

     field.addEventListener('click', getCarrots);
    }
 }


playBtn.addEventListener('click', e => {
    init();
    showTimerAndScore();
    e.target.setAttribute('class', 'fas fa-stop');
    time = setInterval('myTimer()', 1000);
    const stopBtn = document.querySelector('.fa-stop');
    stopBtn.addEventListener('click', () => {
        popup.classList.remove('pop-up--hide'); //replay pop-up
        popup_message.innerText = 'replay';
        clearInterval(time);
        field.removeEventListener('click', getCarrots);
    });
}, {once: true});



function myTimer() {
    count = count - 1;
    console.log(count);
    gameTimer.innerText = `0:${count}`;
    
    if(count == 0) {
        clearInterval(time);
        popup.classList.remove('pop-up--hide'); //lose pop-up
        popup_message.innerText = 'YOU LOSE!';
        field.removeEventListener('click', getCarrots);
        
    } else if (count !== 0 && score == 0 ) {
        clearInterval(time);
        popup.classList.remove('pop-up--hide'); //win pop-up
        popup_message.innerText = 'YOU WON!';
    }
}

function getCarrots(e) {
    if(e.target.className == 'carrot') {
        score -= 1;
         gameScore.innerText = score;
         console.log(`carrot! ${score}`);
         e.target.remove();
     } else if(e.target.className == 'bug') {
        clearInterval(time);
        popup.classList.remove('pop-up--hide'); //lose pop-up
        popup_message.innerText = 'YOU LOSE!';
        field.removeEventListener('click', getCarrots);
     }
}
replayBtn.addEventListener('click', clickReplay);
function clickReplay() {
    popup.classList.add('pop-up--hide');
    field.innerText = ''; //자식들 삭제 
    score = 5;
    gameScore.innerText = score;
    count = 10;
    gameTimer.innerText = `0:${count}`;
    time = setInterval('myTimer()', 1000);
    init();
    showTimerAndScore();
    
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}