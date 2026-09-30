import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// CENA, CÂMARA E RENDERER (Ambiente Noturno / Ficção Científica)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050515);

const camera = new THREE.PerspectiveCamera(
  55, innerWidth / innerHeight, 0.1, 100
);
camera.position.set(6, 4, 8);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// MATERIAIS
const azul = new THREE.MeshStandardMaterial({
  color: 0x00d2ff,
  roughness: 0.05,
  metalness: 0.95
});

const rosa = new THREE.MeshStandardMaterial({
  color: 0xff0055,
  roughness: 0.90,
  metalness: 0.00
});

const verde = new THREE.MeshStandardMaterial({
  color: 0x10b981,
  roughness: 0.30,
  metalness: 0.60
});

// OBJETOS
const cubo = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.6), azul);
cubo.position.set(-2.2, 1, 0);

const esfera = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), rosa);
esfera.position.set(0, 1, 0);

const toro = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.3, 20, 64), verde);
toro.position.set(2.3, 1.1, 0);
toro.rotation.x = Math.PI / 2;

scene.add(cubo, esfera, toro);

// CHÃO
const chao = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 8),
  new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 })
);
chao.rotation.x = -Math.PI / 2;
chao.receiveShadow = true;
scene.add(chao);

// SOMBRAS NOS OBJETOS
[cubo, esfera, toro].forEach(obj => {
  obj.castShadow = true;
  obj.receiveShadow = true;
});

// LUZ AMBIENTE
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(luzAmbiente);

// LUZ DIRECIONAL
const luz = new THREE.DirectionalLight(0x00f0ff, 2.5);
luz.position.set(-5, 6, 3);
luz.castShadow = true;
luz.shadow.mapSize.set(1024, 1024);
scene.add(luz);

let rodar = true;
let sombras = true;
let intensidadeAmbiente = 0.15;
let focoDireita = false;

function animar() {
  requestAnimationFrame(animar);

  if (rodar) {
    cubo.rotation.y += 0.008;
    esfera.rotation.y += 0.006;
    toro.rotation.z += 0.008;
  }

  renderer.render(scene, camera);
}
animar();

// BOTÕES DE CONTROLE
document.querySelector("#ambiente").onclick = () => {
  intensidadeAmbiente = intensidadeAmbiente === 0.15 ? 1.0 : 0.15;
  luzAmbiente.intensity = intensidadeAmbiente;
};

document.querySelector("#foco").onclick = () => {
  focoDireita = !focoDireita;
  luz.position.x = focoDireita ? 4 : -5;
  luz.position.z = focoDireita ? 5 : 3;
};

document.querySelector("#sombras").onclick = () => {
  sombras = !sombras;
  renderer.shadowMap.enabled = sombras;
  luz.castShadow = sombras;
  [cubo, esfera, toro].forEach(obj => obj.castShadow = sombras);
};

document.querySelector("#rodar").onclick = () => {
  rodar = !rodar;
};

document.querySelector("#reset").onclick = () => {
  azul.color.set(0x00d2ff);
  rosa.color.set(0xff0055);
  verde.color.set(0x10b981);
  azul.roughness = 0.05; azul.metalness = 0.95;
  rosa.roughness = 0.90; rosa.metalness = 0.00;
  verde.roughness = 0.30; verde.metalness = 0.60;
  luzAmbiente.intensity = 0.15;
  intensidadeAmbiente = 0.15;
  luz.intensity = 2.5;
  luz.position.set(-5, 6, 3);
  focoDireita = false;
  sombras = true;
  renderer.shadowMap.enabled = true;
  luz.castShadow = true;
  [cubo, esfera, toro].forEach(obj => obj.castShadow = true);
  rodar = true;
};

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});