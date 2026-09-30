const cidade=document.querySelector("#cidade");
let rotacaoX=-25;
let rotacaoY=25;
let zoom=1;
let auto=false;
let timer=null;

// Criar atualizarCidade()

function atualizarCidade(){
    cidade.style.transform=`rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) scale(${zoom})`;
}
// Programar os botões

document.querySelector("#esq").addEventListener("click",()=>{rotacaoX-=10;
    atualizarCidade()});

document.querySelector("#dir").addEventListener("click",()=>{rotacaoX+=10;
    atualizarCidade()});

document.querySelector("#acima").addEventListener("click",()=>{rotacaoY-=5;
    atualizarCidade()});

document.querySelector("#abaixo").addEventListener("click",()=>{rotacaoY+=5;
    atualizarCidade()});

document.querySelector("#mais").addEventListener("click",()=>{zoom+=.1;
    atualizarCidade()});

document.querySelector("#menos").addEventListener("click",()=>{zoom-=.1;
    atualizarCidade()});

document.querySelector("#auto").addEventListener("click",()=>{rotacaoX=-25;
    rotacaoY=25;    
    zoom=1;
    auto=false;
    clearInterval(timer);
    timer=null;
    atualizarCidade()
    document.getElementById(id='auto').textContent = "Auto";
});

// Extra: modo automático
document.querySelector("#auto").addEventListener("click",()=>{
    auto=!auto;
    document.getElementById(id='auto').textContent = auto ? "Parar" : "Auto";
    if(auto){
        timer=setInterval(()=>{
            rotacaoX+=2;
            rotacaoY+=2;
            atualizarCidade();
        },100);
    }
    else{
        clearInterval(timer);
    }


});