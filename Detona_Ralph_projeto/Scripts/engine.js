const state = {
    View:{
        square: document.querySelectorAll(".square"),//'querySelectorAll' Pega todas as referancias da Class 'squere' no arquivo HTML
        enemy: document.querySelector(".enemy"),//'querySelector' Pega uma referancias da Class 'squere' no arquivo HTML
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    Values:{
        HitPosition: 0,
        result: 0,
        curretTime: 60,
        LivesPerson: 3
    },
    action:{
        countDownTimeID: setInterval(countDown, 1000),//'setInterval' Cria um intervalo pra executar a function dentro do '()' a cada tempo|1 seg. = 1000
        TimeID: setInterval(RandomSquare, 800),
    }
}

function countDown(){
    if(state.Values.LivesPerson <= 0){
        clearInterval(state.action.TimeID);
        clearInterval(state.action.countDownTimeID);
        alert("Game Over! O seu resultado foi: " + state.Values.result);
      }

    state.Values.curretTime--;
    state.View.time.textContent = state.Values.curretTime;

    if(state.Values.curretTime <= 0){
        clearInterval(state.action.TimeID)
        clearInterval(state.action.countDownTimeID)
        alert("O seu resultado é "+state.Values.result)
    }
}
function Som(){
    let audio = new Audio("./Audio/Hit.m4a");//'Audio' definir uma variável com um arquivo de audio
    audio.volume = 0.2;//'volume' volume do audio
    audio.play();//'play' reproduzir audio
}


function RandomSquare(){
    state.View.square.forEach((square)=>{
        square.classList.remove("enemy")//Remove a class 'enemy' nos squares
    })

    let NRandom = Math.floor(Math.random()*9);
    let SquareRandom = state.View.square[NRandom];//Registra [id] na square
    SquareRandom.classList.add("enemy")//Adiciona a class 'enemy' nos squares
    state.Values.HitPosition = SquareRandom.id
}

function HitBox(){
    let ganhaponto = 0;
    state.View.square.forEach((square)=>{
    
    square.addEventListener("mousedown",()=>{//'addEventListener' Cria um evento que ativa quando executar um inset do teclado ou mouse|"mousedown" no clicar do mouse nos squares executa algo
    if(square.id === state.Values.HitPosition){
        Som();
        ganhaponto = ganhaponto + 1;
        state.Values.result = state.Values.result + ganhaponto;
        state.View.score.textContent = state.Values.result;//'textContent' Colocar o valor no HTML, na parte do 'score'
        state.Values.HitPosition = null//Resetar a posição
    
    }else{
        state.Values.LivesPerson--;
        state.View.lives.textContent = state.Values.LivesPerson;
        state.Values.result = state.Values.result/2;
        state.View.score.textContent = state.Values.result.toFixed(0);
        ganhaponto = 0;
    }
    
   });
    
})
}

function main(){
   HitBox();
}

main();