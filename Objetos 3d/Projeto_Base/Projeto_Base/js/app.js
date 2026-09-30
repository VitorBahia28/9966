import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// 1. Criar Scene
const scene = new THREE.Scene();    
scene.background = new THREE.Color(0x101827);

// 2. Criar Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 6);

// 3. Iluminação
// Luz Ambiente para evitar sombras totalmente pretas
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(luzAmbiente);

// Sol (PointLight com sombra)
const sol = new THREE.PointLight(0xffffff, 100);
sol.position.set(5, 8, 4);
sol.castShadow = true;
sol.shadow.mapSize.width = 1024;
sol.shadow.mapSize.height = 1024;
sol.shadow.camera.near = 0.5;    
sol.shadow.camera.far = 25;
scene.add(sol);

// 4. Criar Chão
const chaoGeo = new THREE.PlaneGeometry(15, 15);
const chaoMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 });
const chao = new THREE.Mesh(chaoGeo, chaoMat);
chao.position.y = -2;
chao.rotation.x = -Math.PI / 2;
chao.receiveShadow = true;
scene.add(chao);

// 5. Criar Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; // Permite o cálculo de sombras
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// 6. Criar Objetos
const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 1.5), 
  new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
);
cubo.position.x = -3;
cubo.castShadow = true;
scene.add(cubo);

const esfera = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32), 
  new THREE.MeshStandardMaterial({ color: 0xf43f5e })
);
esfera.position.x = 0;
esfera.castShadow = true;
scene.add(esfera);

const cone = new THREE.Mesh(
  new THREE.ConeGeometry(1, 2, 32), 
  new THREE.MeshStandardMaterial({ color: 0x34d399 })
);
cone.position.x = 3;
cone.castShadow = true;
scene.add(cone);

// 7. Controles de Animação
let velocidade = 1;
let pausado = false;

// 8. Interface de Usuário (UI)
const painelUI = document.createElement("div");
painelUI.style.position = "absolute";
painelUI.style.top = "20px";
painelUI.style.left = "20px";
painelUI.style.display = "flex";
painelUI.style.gap = "10px";
painelUI.style.zIndex = "10";
document.body.appendChild(painelUI);

const btnPausar = document.createElement("button");
btnPausar.innerText = "Pausar / Play";
painelUI.appendChild(btnPausar);

const btnAcelerar = document.createElement("button");
btnAcelerar.innerText = "Acelerar (+)";
painelUI.appendChild(btnAcelerar);

const btnDesacelerar = document.createElement("button");
btnDesacelerar.innerText = "Desacelerar (-)";
painelUI.appendChild(btnDesacelerar);

btnPausar.addEventListener("click", () => {
  pausado = !pausado;
});

btnAcelerar.addEventListener("click", () => {
  velocidade += 0.5;
});

btnDesacelerar.addEventListener("click", () => {
  velocidade = Math.max(0.1, velocidade - 0.5);
});

// 9. Loop de Renderização
function animar() {
    requestAnimationFrame(animar);

    if (!pausado) {
        cubo.rotation.x += 0.01 * velocidade;
        cubo.rotation.y += 0.01 * velocidade;

        esfera.rotation.x += 0.01 * velocidade;
        esfera.rotation.y += 0.01 * velocidade;

        cone.rotation.x += 0.01 * velocidade;
        cone.rotation.y += 0.01 * velocidade;
    }

    renderer.render(scene, camera); 
}

animar();

// Ajuste responsivo
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
