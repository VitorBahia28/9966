const cubo=document.querySelector("#cubo");
const cenario=document.querySelector("#cenario");
const pausa=document.querySelector("#pausa");
const mais=document.querySelector("#mais");
const menos=document.querySelector("#menos");
const rapido=document.querySelector("#rapido");
const lento=document.querySelector("#lento");
const normal=document.querySelector("#normal");
const reset=document.querySelector("#reset");

//definir e inicializar as variáveis
let parado=false;
let pp=800; //perspectiva

pausa.addEventListener("click",function(){
    parado=!parado;
    cubo.style.animationPlayState=parado?"paused":"running";
    pausa.textContent=parado?"Continuar":"Pausar";
});
mais.addEventListener("click",function(){
    pp+=100;
    cenario.style.perspective=`${pp}px`;
});
menos.addEventListener("click",function(){
    pp=Math.max(200,pp-100); /*evitar valor negativo e sair do ecra*/
    cenario.style.perspective=`${pp}px`;
});
rapido.addEventListener("click",function(){
    cubo.style.animationDuration="1s";
});
lento.addEventListener("click",function(){
    cubo.style.animationDuration="12s";
});
normal.addEventListener("click",function(){
    cubo.style.animationDuration="8s";
});
reset.addEventListener("click",function(){
    pp=800;
    cenario.style.perspective=`${pp}px`;
    parado=false;
    cubo.style.animationPlayState="running";
    pausa.textContent="Pausar";
    cubo.style.animationDuration="8s";
});