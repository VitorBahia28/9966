const imagem=document.querySelector("#imagem");
const titulo=document.querySelector("#titulo");
const rodar=document.querySelector("#rodar");
const crescer=document.querySelector("#crescer");
const encolher=document.querySelector("#encolher");
const mudarCor=document.querySelector("#mudarCor");
const reiniciar=document.querySelector("#reiniciar");

//definir e inicializar as variáveis
let angulo=0;
let tamanho=1;
let cor=0;

function atualiza_imagem(){
    imagem.style.transform=`rotateX(${angulo/4}deg) rotateY(${angulo/2}deg) scale(${tamanho})`;
}

//rodar o objeto
rodar.addEventListener("click",()=>{
    angulo +=90;
    atualiza_imagem();
});

//crescer o objeto
crescer.addEventListener("click",()=>{
    tamanho +=0.2;
    atualiza_imagem();
});

//encolher o objeto
encolher.addEventListener("click",()=>{
    tamanho -=0.2;
    atualiza_imagem();
});

//mudar cor do objeto
mudarCor.addEventListener("click",()=>{
    cor +=10;
    imagem.style.filter=`invert(${cor}%)`;
});

//reiniciar o objeto
reiniciar.addEventListener("click",()=>{
    angulo=0;
    tamanho=1;
    cor=0;
    atualiza_imagem();
});