const marteloNormal = document.querySelector('#hammer_normal');
const marteloClick = document.querySelector('#hammer_after_click');
const game = document.querySelector('.box_game');
const pontos = document.querySelector('#score');
const toupeira = `<img class="img_toupeira" src="./img/toupeira.png">`;
const barraDeProgresso = document.querySelector('.progress_bar');

//Adicionando os buracos ao game.
criandoGame = () => {
    game.innerHTML = `
    <div class="buraco_style" id="buraco_0"></div>
    <div class="buraco_style" id="buraco_1"></div>
    <div class="buraco_style" id="buraco_2"></div>
    <div class="buraco_style" id="buraco_3"></div>
    <div class="buraco_style" id="buraco_4"></div>
    <div class="buraco_style" id="buraco_5"></div>
    <div class="buraco_style" id="buraco_6"></div>
    <div class="buraco_style" id="buraco_7"></div>
    <div class="buraco_style" id="buraco_8"></div>
    <div class="buraco_style" id="buraco_9"></div>
    <div class="buraco_style" id="buraco_10"></div>
    <div class="buraco_style" id="buraco_11"></div>
    `
}

//Zerando os pontos do placar.
let pontuacao = 0;

//Intervalo que faz com que a toupeira apareça no game.
setInterval(apareceToupeira = () => {
    const buraco = document.querySelectorAll(`.buraco_style`);
    const imgToupeira = document.querySelectorAll('.img_toupeira');
    const selecionarBuraco = Math.floor(Math.random() * (11 - 0 + 1) *1);

    buraco[selecionarBuraco].innerHTML = toupeira;

}, 1000);

//Intervalo que faz com que a toupeira desapareça no game.
 setInterval(desapareceToupeira = () => {
     const buraco = document.querySelectorAll(`.buraco_style`);
     const imgToupeira = document.querySelectorAll('.img_toupeira');
     const selecionarBuraco = Math.floor(Math.random() * (11 - 0 + 1) *1);

     for (let contador = 0; contador < buraco.length; contador ++) {
        buraco[contador].innerHTML = '';
     }
 }, 2000);

 //Fazendo com que o player ganhe pontos ao acerta a toupeira.
 //Exibindo os pontos do player no placar.
 //Essa função também faz com que a toupeira desapareça após ser acertada.
contadorDePontos = () => {
    const buraco = document.querySelectorAll(`.buraco_style`);
    for (let contador = 0; contador < buraco.length; contador ++) {
        buraco[contador].addEventListener('click', () => {
            if (buraco[contador].innerHTML != '') {
                pontuacao += 20;
                console.log('+20 Pontos!');
                pontos.innerHTML = pontuacao;
                buraco[contador].innerHTML = '';
            }
        })
    }
}

//Função responsável por fazer com que o martelo se mova conforme a seta do mouse move no game.
moverMartelo = () => {
    window.addEventListener('mousemove', (event => {
        let x = event.clientX;
        let y = event.clientY;

        marteloNormal.style.top = `${y - 120}px`;
        marteloNormal.style.left = `${x - 80}px`;
        marteloClick.style.top = `${y - 120}px`;
        marteloClick.style.left = `${x - 80}px`;
    }))
}

//Intervalo para o click mais hide martelo normal e rotate marteloClick.
clickMartelo = () => {
    window.addEventListener('click', (event) => {
        marteloClick.classList.remove('hide');
        marteloNormal.classList.add('hide');
        marteloClick.style.transform = "rotate(-40deg)";
    } )
}

//Intervalo para o  return martelo normal e hide marteloClick depois de 500 milesegundos
setInterval(comportamentoClickMartelo = () => {
    clickMartelo();
    marteloNormal.classList.remove('hide');
    marteloClick.classList.add('hide');
},500);

//Intervalo responsável por contar o tempo restante de jogo pela barra.
//Também exibe o tempo atual do jogo através do console.
//Esse intervalo também finaliza o jogo e exibe a pontuação.
let time = 30;
let realtime = 0;
let widthBar = 410;
let subtraiWidth = 0; 
var contTempo = setInterval(contadorDeTempo = () => {
    if (realtime < time) {
        subtraiWidth += widthBar / time;
        barraDeProgresso.style.width = (widthBar - subtraiWidth) + 'px';
        realtime++;
    }
    else {
        barraDeProgresso.style.width = '0px';
        alert(`Tempo esgotado!\nSua pontuação foi de ${pontuacao} pontos.\nParabéns!`);
        location.reload();
        clearInterval(contTempo);
    }
    console.log(realtime);
}, 1000);


//EXECUTE
criandoGame();
moverMartelo();
contadorDePontos();
