import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// 1. Criar Cena e Câmera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 8);

// 2. Criar Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 3. Criar Grupo Principal
const robo = new THREE.Group();
scene.add(robo);

// Função utilitária para criar malhas rapidamente
function mesh(geometria, cor) {
  return new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ color: cor }));
}

// ==========================================
// ESTRUTURA DO ROBÔ
// ==========================================

// CORPO (vermelho)
const corpo = mesh(new THREE.BoxGeometry(1.6, 2, 0.9), 0xdc2626);
robo.add(corpo);

// CABEÇA (verde)
const cabeca = mesh(new THREE.BoxGeometry(1.9, 1.05, 1), 0x22c55e);
cabeca.position.y = 1.65;
robo.add(cabeca);

// BRAÇOS
const bracoE = mesh(new THREE.BoxGeometry(0.35, 1.8, 0.4), 0xe2e8f0);
bracoE.position.set(-1.3, 0.05, 0);
const bracoD = bracoE.clone();
bracoD.position.x = 1.3;
robo.add(bracoE, bracoD);

// PERNAS (Calça roxa)
const pernaE = mesh(new THREE.BoxGeometry(0.5, 1.9, 0.55), 0x7c3aed);
pernaE.position.set(-0.48, -1.75, 0);
const pernaD = pernaE.clone();
pernaD.position.x = 0.48;
robo.add(pernaE, pernaD);

// OLHOS
const olhoE = mesh(new THREE.SphereGeometry(0.25, 20, 15), 0x111111);
olhoE.position.set(-0.5, 1.75, 0.51);
const olhoD = olhoE.clone();
olhoD.position.x = 0.5;
robo.add(olhoE, olhoD);

// ANTENA (Com acessório Vermelho na ponta)
const haste = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 12), 0xe2e8f0);
haste.position.y = 2.55;
const ponta = mesh(new THREE.SphereGeometry(0.14, 16, 8), 0xef4444);
ponta.position.y = 2.95;
robo.add(haste, ponta);

// ------------------------------------------
// ITEM 6 DA FICHA: A BOCA
// ------------------------------------------
const boca = mesh(new THREE.BoxGeometry(0.5, 0.1, 0.05), 0x1e293b);
boca.position.set(0, 1.4, 0.51);
robo.add(boca);

// ------------------------------------------
// ACESSÓRIOS DO TEMA 
// ------------------------------------------
// Chapéu de Soldado (base e topo preto)
const chapeuBase = mesh(new THREE.CylinderGeometry(0.90, 0.90, 0.3, 16), 0x111111);
chapeuBase.position.y = 2.40;
const chapeuTopo = mesh(new THREE.CylinderGeometry(0.50, 0.80, 0.6, 16), 0x111111);
chapeuTopo.position.y = 2.75;
robo.add(chapeuBase, chapeuTopo);

// Espada na mão direita
const caboEspada = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.9, 3), 0x111111);
caboEspada.position.set(1.1, -0.9, -0.1);
caboEspada.rotation.x = Math.PI / 4;

const laminaEspada = mesh(new THREE.BoxGeometry(0.10, 1.4, 0.30), 0x94a3b8);
laminaEspada.position.set(1.1, -0.1, 0.7);
laminaEspada.rotation.x = Math.PI / 4;

robo.add(caboEspada, laminaEspada);

// ==========================================
// INTERFACE E CONTROLES (DOM)
// ==========================================
const painel = document.createElement("div");
painel.style.cssText = "position:absolute;top:20px;left:20px;display:flex;gap:8px;z-index:10;";
document.body.appendChild(painel);

const btnPausa = document.createElement("button"); btnPausa.id = "pausa"; btnPausa.textContent = "Pausar";
const btnLento = document.createElement("button"); btnLento.id = "lento"; btnLento.textContent = "Lento";
const btnNormal = document.createElement("button"); btnNormal.id = "normal"; btnNormal.textContent = "Normal";
const btnRapido = document.createElement("button"); btnRapido.id = "rapido"; btnRapido.textContent = "Rápido";
const btnAcenar = document.createElement("button"); btnAcenar.id = "acenar"; btnAcenar.textContent = "Acenar";
const btnReset = document.createElement("button"); btnReset.id = "reset"; btnReset.textContent = "Reset";

painel.append(btnPausa, btnLento, btnNormal, btnRapido, btnAcenar, btnReset);

// ==========================================
// LÓGICA DE ANIMAÇÃO E EVENTOS
// ==========================================
let velocidade = 1;
let pausado = false;
let acenar = false;
let tempo = 0;

function animar() {
  requestAnimationFrame(animar);

  if (!pausado) {
    robo.rotation.y += 0.009 * velocidade;
    tempo += 0.05 * velocidade;

    if (acenar) {
      bracoD.rotation.z = Math.sin(tempo) * 0.8;
    }
  }

  renderer.render(scene, camera);
}
animar();

// Eventos da Interface
btnPausa.onclick = function() {
  pausado = !pausado;
  this.textContent = pausado ? "Continuar" : "Pausar";
};

btnLento.onclick = () => velocidade = 0.4;
btnNormal.onclick = () => velocidade = 1;
btnRapido.onclick = () => velocidade = 2.5;

btnAcenar.onclick = function() {
  acenar = !acenar;
  this.textContent = acenar ? "Parar braço" : "Acenar";
  if (!acenar) bracoD.rotation.z = 0;
};

btnReset.onclick = () => {
  velocidade = 1; 
  pausado = false; 
  acenar = false; 
  tempo = 0;
  robo.rotation.set(0, 0, 0); 
  bracoD.rotation.set(0, 0, 0);
  btnPausa.textContent = "Pausar";
  btnAcenar.textContent = "Acenar";
};

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
