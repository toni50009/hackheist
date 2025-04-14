//Array de números gerados
let numeros = [];


// Global Variables
let tentativas = 5;
let fase = 1;



//Iniciamos os Listeners aqui para os botões de incrementar e decrementar
function adicionarListeners(){
document.querySelectorAll('.btn-increment').forEach(btn => {
  btn.addEventListener('click', function () {
    const input = this.previousElementSibling; 
    let valor = parseInt(input.value);
    let max = parseInt(input.max);

    if (valor < max) {
      valor++;
      input.value = valor;
    }
  });
});


document.querySelectorAll('.btn-decrement').forEach(btn => {
  btn.addEventListener('click', function () {
    const input = this.nextElementSibling;
    let valor = parseInt(input.value);
    let min = parseInt(input.min);

    if (valor > min) {
      input.value = valor - 1;
    }
  });
});
}

//Começa o Jogo
adicionarListeners();
defNumeros();



//Função de tutorial
function mostrarTutorial(){
  const campoTutorial = document.querySelector('.main-tutorial');
  campoTutorial.innerHTML = `
                    <div class="tabela col-12 d-flex justify-content-center align-items-center flex-column">
                        <div class="w-100 border border-black rounded-3 p-3 d-flex justify-content-center align-items-center flex-column">
                            <div class="campo-boxes justify-content-center align-items-center row" style="gap: 20px;">
                            <h1><span class="text-primary d-flex justify-content-center align-items-center">Tutorial</span></h1>
                              <p class="text-center fs-4">Seu Hacking tools facilita para você , deixando somente o desafio de adivinhar os números dentro de 
                              cada cadeado. Você tem 3 fases para completar. Cada fase completada aumenta o número de cadeados necessários, até 4 cadeados .
                               O objetivo é descobrir o número correto em cada cadeado, com 5 tentativas para cada nível.</p>
                               <p class="text-center fs-4">Você deve clicar nos indicadores para aumentar ou diminuir o número de cada cadeado. Cada cadeado possui um intervalo de números possíveis 
                               que pode ser informado. O jogo lhe indicará os respectivos intervalos de números.</p>
                               <p class="text-center fs-4">Deixe cada cadeado com o número que julga ser o correto e acione o Hacking Tool para descobrir se acertou.</p>
                               <p class="text-center fs-4">Os cadeados do jogo são assim:</p>
                                <div class="campo-box small">

                                    <div class="campo-box-text">Cadeado 1</div>
                                    <i class="bi bi-lock-fill d-flex justify-content-center mb-2" style="font-size: 5rem;"></i>
                                    <label for="quantidade">Quantidade:</label>
                                        <div class="number-input">
                                            <button class="btn-decrement">−</button>
                                            <input type="number" id="quantidade-1" class="quantidade" value="1" min="1" max="10">
                                            <button class="btn-increment">+</button>
                                        </div>
                                </div>
                                <div class="campo-box small">
                                    <div class="campo-box-text">Cadeado 2</div>
                                    <i class="bi bi-lock-fill d-flex justify-content-center mb-2" style="font-size: 5rem;"></i>
                                    <label for="quantidade">Quantidade:</label>
                                    <div class="number-input">
                                        <button class="btn-decrement">−</button>
                                        <input type="number" id="quantidade-2" class="quantidade" value="15" min="15" max="30">
                                        <button class="btn-increment">+</button>
                                    </div>
                                </div>
                            </div>
                            <a href="inicio.html" class="btn btn-warning text-white d-flex justify-content-center align-items-center w-auto mt-4">Começar a Hackear</a>
                        </div>
                    </div>`;
                    // Chamo aqui para mostrar no tutorial os números mudando
                  adicionarListeners();
}



//Gerar os números dentro do range
function gerarNumeroAleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }


 //Definir quantos números serão gerados
function defNumeros(){
  switch(fase) {
    case 1:
      const numero1 = gerarNumeroAleatorio(1, 10);
      const numero2 = gerarNumeroAleatorio(15, 30);
      numeros.push(numero1,numero2);
      console.log(numeros);
      break;
    case 2:
      const numero3 = gerarNumeroAleatorio(1, 10);
      const numero4 = gerarNumeroAleatorio(15, 30);
      const numero5 = gerarNumeroAleatorio(40, 50);
      numeros.push(numero3,numero4,numero5);
      console.log(numeros);
      break;
    case 3:
      const numero6 = gerarNumeroAleatorio(1, 10);
      const numero7 = gerarNumeroAleatorio(15, 30);
      const numero8 = gerarNumeroAleatorio(40, 50);
      const numero9 = gerarNumeroAleatorio(90, 100);
      numeros.push(numero6,numero7,numero8,numero9);
      console.log(numeros);
      break;
  }
}




  //Função Principal do Jogo
 function verificarChute(){
  const camposInput = document.querySelectorAll('.quantidade');
  camposInput.forEach(input => input.classList.remove('bordas-incorreto'));
  const valores = Array.from(camposInput).map(input => Number(input.value));
    for(let i = 0; i < numeros.length; i++){

      const elemento = document.getElementById(`quantidade-${i + 1}`);

        if(numeros[i] === valores[i]){
          if(!elemento.classList.contains("cadeado-aberto")){
            document.getElementById("somcadeado").play();
          }

          document.querySelector(`.campodicas${i + 1}`).innerHTML = `
          <p class="fs-4">Você descobriu o número do <span style="color: #00BCD4;">cadeado ${i + 1}</span></p>
          `
          const containerPai = elemento.parentElement;
          const containerAvo = containerPai.parentElement;
          containerAvo.innerHTML = `
          <div class="campo-box-text">Cadeado ${i + 1}</div>
                              <i class="bi bi-unlock-fill d-flex justify-content-center mb-2" style="font-size: 5rem;"></i>
                                  <label for="quantidade"></label>
                                  <div class="number-input align-items-center justify-content-center">
                                      <input id="quantidade-${i +1}" class="quantidade border-success cadeado-aberto" value="${numeros[i]}" style="width: 10%;">
                                  </div>
           </div>
          `;
        }else if(valores[i] > numeros[i]){
          document.querySelector(`.campodicas${i + 1}`).innerHTML = `
          <p class="fs-4 fade">O número do <span style="color: #00BCD4;">cadeado ${i + 1}</span> é MENOR.</p>
          `;
          elemento.classList.add('bordas-incorreto');
        }else{
          document.querySelector(`.campodicas${i + 1}`).innerHTML = `
          <p class="fs-4 fade">O número do <span style="color: #00BCD4;">cadeado ${i + 1}</span> é MAIOR.</p>
          `;
          elemento.classList.add('bordas-incorreto');
        }
    }
    if (numeros.every((num, i) => num === valores[i])){
      document.getElementById('tentativas').classList.add('invisivel');
      vencerFase();
    }else{
    tentativas--;
    const tentativasRestantes = document.getElementById('tentativas');
    tentativasRestantes.innerHTML = `
    <p class="fs-4 fade">Tentativas restantes: ${tentativas}</p>
    `;
    tentativasRestantes.classList.remove('fade');
    if(tentativas <= 0){
    perderJogo();
  }
 }
}



//Caso vença a fase
 function vencerFase(){
  document.querySelector('.campodicas').classList.add('invisivel');
  if(fase === 3) {
    document.querySelector('.campochute').innerHTML = `
                                    <p id="tentativas" class="fs-4"></p>
    <p class="fs-4 fade">Você descobriu todos os números da <span style="color: #00BCD4;">última porta</span>!</p>
    <button class="btn btn-warning mt-3 text-white" onclick="final()">Abrir Cofre</button>
`;
  }else{
    document.querySelector('.campochute').innerHTML = `
                                    <p id="tentativas" class="fs-4"></p>
                                    <p class="fs-4 fade">Você descobriu todos os números da <span style="color: #00BCD4;">porta ${fase}</span>!</p>
                                <button class="btn btn-warning mt-3 text-white fade" onclick="proximaFase()">Proxima Porta</button>
    `;
  }
 }



 //Caso perca o jogo
 function perderJogo(){
  document.querySelector('.main').innerHTML = `
  <h1 class="text-center text-white fade"><i class="bi bi-exclamation-diamond-fill"></i> Você foi Pego!</h1>
  <div class="campo-tabelas w-100 border border-black rounded-3 p-3 d-flex flex-column justify-content-center align-items-center fade">
  <img src="/assets/img/lose.png" alt="Fim de Jogo" class="img-fluid mb-3" style="max-width: 300px;">
  <p class="fs-4 text-white">Essa não, você foi pego! Mais sorte na próxima vez!</p>
  <button class="btn btn-warning mt-3 text-white" onclick="recarregaPagina()">Clique para tentar novamente</button>
  </div>
`;
  
 }


 //Recomeçar o jogo
 function recarregaPagina(){
  numeros = [];
  tentativas = 5;
  window.location.href = window.location.href;
 }



 //Passar para próxima fase
 function proximaFase(){
  window.scrollTo({ top: 0, behavior: 'smooth' });
  tentativas = 5;
  const campoDicas = document.querySelector('.campodicas');
  campoDicas.classList.remove('invisivel');
  campoDicas.innerHTML = `
                                <div class="campodicas1"></div>
                                <div class="campodicas2"></div>
                                <div class="campodicas3"></div>
                                <div class="campodicas4"></div>`;
  const campoChute = document.querySelector('.campochute');
  campoChute.innerHTML = `
                              <div class="campochute fade d-flex flex-column justify-content-center align-items-center">
                                <p id="tentativas" class="fs-4 fade">Tentativas restantes: ${tentativas}</p>
                                <p class="fs-4">Clique para hackear e abrir a porta</p>
                                <button class="btn btn-warning mt-3 text-white" onclick="verificarChute()">Hackear</button>`;
  

    fase ++;
    numeros = [];
    if(fase == 2){
    
    resetarInputsFase2();
    }else if(fase === 3){
    resetarInputsFase3();
    }

    defNumeros();
    resetarListeners();

 }



 //Precisamos retirar e implementar os listeners novamente para não dar problema de listeners duplicados
 function resetarListeners(){
      //Para tirar os listeners antigos
      document.querySelectorAll('.btn-increment').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.replaceWith(newBtn);
      });
      document.querySelectorAll('.btn-decrement').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.replaceWith(newBtn);
      });
  
      //E adicionar novos
      adicionarListeners();
 }




 //Reseta os inputs e informações para a fase 2
 function resetarInputsFase2(){
  const campoInfo = document.querySelector('.info-jogo');
  campoInfo.innerHTML = `
    <p class="fs-4 fade ">3 Números necessários para destravar a porta guardados nos <span style="color: #00BCD4;">cadeados</span></p>
                            <p class="fs-4 fade">No <span style="color: #00BCD4;">cadeado 1</span>, há um número entre 1 e 10</p>
                            <p class="fs-4 fade">No <span style="color: #00BCD4;">cadeado 2</span>, há um número entre 15 e 30</p>
                            <p class="fs-4 fade">No <span style="color: #00BCD4;">cadeado 3</span>, há um número entre 40 e 50</p>
  `;

  const cadeado1 = document.getElementById("quantidade-1");
  const containerPai1 = cadeado1.parentElement;
  const containerAvo1 = containerPai1.parentElement;
  containerAvo1.innerHTML = `
  <div class="campo-box-text fade">Cadeado 1</div>
  <i class="bi bi-lock-fill d-flex justify-content-center mb-2 fade" style="font-size: 5rem;"></i>
                                  <label for="quantidade">Entre 1 - 10:</label>
                                      <div class="number-input fade">
                                          <button class="btn-decrement">−</button>
                                          <input type="number" id="quantidade-1" class="quantidade" value="1" min="1" max="10" style="width: 10%;">
                                          <button class="btn-increment">+</button>
                                      </div>
  `;
  const cadeado2 = document.getElementById("quantidade-2");
  const containerPai2 = cadeado2.parentElement;
  const containerAvo2 = containerPai2.parentElement;
  containerAvo2.innerHTML= `
  <div class="campo-box-text fade">Cadeado 2</div>
  <i class="bi bi-lock-fill d-flex justify-content-center mb-2 fade" style="font-size: 5rem;"></i>
                                  <label for="quantidade">Entre 15 - 30:</label>
                                  <div class="number-input fade">
                                      <button class="btn-decrement">−</button>
                                      <input type="number" id="quantidade-2" class="quantidade" value="15" min="15" max="30" style="width: 10%;">
                                      <button class="btn-increment">+</button>
                                  </div>
  `;
  const cadeado3 = document.getElementById("quantidade-3");
  const containerPaiNew = cadeado3.parentElement;
  const containerAvoNew = containerPaiNew.parentElement;
  containerAvoNew.classList.remove('invisivel');
  containerAvoNew.classList.add('fade');
 }



 //Aproveita o reset da fase 2 e acrescenta mais
 function resetarInputsFase3(){
  resetarInputsFase2();
  const campoInfo = document.querySelector('.info-jogo');
  campoInfo.innerHTML = `
    <p class="fs-4 fade">4 Números necessários para destravar a porta guardados nos <span style="color: #00BCD4;">cadeados</span></p>
                            <p class="fs-4 fade">No <span style="color: #00BCD4;">cadeado 1</span>, há um número entre 1 e 10</p>
                            <p class="fs-4 fade">No <span style="color: #00BCD4;">cadeado 2</span>, há um número entre 15 e 30</p>
                            <p class="fs-4 fade">No <span style="color: #00BCD4;">cadeado 3</span>, há um número entre 40 e 50</p>
                            <p class="fs-4 fade">No <span style="color: #00BCD4;">cadeado 4</span>, há um número entre 90 e 100</p>
  `;

  const cadeado3 = document.getElementById("quantidade-3");
  const containerPai3 = cadeado3.parentElement;
  const containerAvo3 = containerPai3.parentElement;
  containerAvo3.innerHTML = `
  <div class="campo-box-text fade">Cadeado 3</div>
  <i class="bi bi-lock-fill d-flex justify-content-center mb-2 fade" style="font-size: 5rem;"></i>
                                    <label for="quantidade">Entre 40 - 50:</label>
                                    <div class="number-input fade">
                                        <button class="btn-decrement">−</button>
                                        <input type="number" id="quantidade-3" class="quantidade" value="40" min="40" max="50" style="width: 10%;">
                                        <button class="btn-increment">+</button>
                                    </div>
  `;
  const cadeado4 = document.getElementById("quantidade-4");
  const containerPaiNew = cadeado4.parentElement;
  const containerAvoNew = containerPaiNew.parentElement;
  containerAvoNew.classList.remove('invisivel');
  containerAvoNew.classList.add('fade');

 }



 //Página final do jogo, redireciona para a página inicial
 function final(){
    document.querySelector('.main').innerHTML = `
            <h1 class="text-center text-white fade"><i class="bi bi-cash"></i> Colete a Recompensa!</h1>
            <div class="campo-tabelas w-100 border border-black rounded-3 p-3 d-flex flex-column justify-content-center align-items-center fade">
            <img src="/assets/img/pilha.png" alt="Pilha de Dinheiro" class="img-fluid mb-3" style="max-width: 300px;">
            <p class="fs-4 text-white">Bom trabalho, você descobriu a senha do cofre e pode desfrutar do seu roubo!</p>
            <a href="index.html"><button class="btn btn-warning mt-3 text-white">Clique para voltar ao Início</button></a>
            </div>
    `;
 }