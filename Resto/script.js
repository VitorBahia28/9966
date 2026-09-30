//alert("Bem vindo ao laboratório de multimédia!");
//cria uma variável que seleciona o elemento com o id "titulo"
const titulo=document.querySelector("#titulo");
//altera a cor do título
titulo.style.color="yellow";
//altera o tamanho do título
titulo.style.fontSize="50px";
//altera o texto do título
titulo.innerHTML="Laboratório de Multimédia - Exercício 3";

//cria uma variável que seleciona o elemento com o id "imagem"
const imagem=document.querySelector("#imagem");

function rodar(){
    //altera a rotação da imagem
    imagem.style.transform="rotate(90deg)";
}

function crescer(){
    //altera o tamanho da imagem
    imagem.style.transform="scale(1.5)";
}

function encolher(){
    //altera o tamanho da imagem
    imagem.style.transform="scale(0.5)";
}

function mudarCor(){
    //altera a cor da imagem
    imagem.style.filter="invert(100%)";
}

function reiniciar(){
    //altera a rotação da imagem
    imagem.style.transform="rotate(0deg)";
    //altera o tamanho da imagem
    imagem.style.transform="scale(1)";
    //altera a cor da imagem
    imagem.style.backgroundColor="rgb(43, 40, 40)";
}