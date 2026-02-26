import './style.css';
//import LitBakeTexture from './imports/litBake.png';
import HighDefTexture from './imports/highDef-wobbleLines.png';
import BlackNWhiteTexture from './imports/black_and white- highdef Wobblelines.png';
import * as THREE from 'three';

//set up canvas elents and renderer
export const SetUpCanvas = () => {
  // Create a scene
  const myCanvas = document.getElementById('myCanvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, myCanvas.offsetWidth / myCanvas.offsetHeight, 0.1, 1000);
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
  renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0); // Set background to transparent

  // Crease objects
  const geometry = new THREE.SphereGeometry(4, 128, 128);
  const wiregeometry = new THREE.SphereGeometry(5, 64, 64);
  const texScale = 0.9;

  const Texturematerial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.5,
    map: (() => {
      const texture = new THREE.TextureLoader().load(HighDefTexture);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, texScale); // Slightly increase the texture size
      return texture;
    })(),
    metalnessMap: (() => {
      const texture = new THREE.TextureLoader().load(BlackNWhiteTexture);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, texScale); // Match the scaling
      return texture;
    })(),
    roughnessMap: (() => {
      const texture = new THREE.TextureLoader().load(BlackNWhiteTexture);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, texScale); // Match the scaling
      return texture;
    })(),

  });

  const wiresphere = new THREE.Mesh(wiregeometry, new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));
  const sphere = new THREE.Mesh(geometry, Texturematerial);
  const light = new THREE.PointLight(0xffffff, 200, 0);
  const backlight = new THREE.PointLight(0xffffff, 100, 200);
  const helperbacklight = new THREE.PointLightHelper(backlight);


  wiresphere.position.set(0, 0, 5);
  wiresphere.rotation.x = Math.PI / 2;
  wiresphere.renderOrder = 2;


  backlight.position.set(-4, 6, -10);

  sphere.position.set(0, 0, -1.55);

  sphere.rotateX(120);
  sphere.rotateY(180);
  sphere.renderOrder = 1;


  light.position.set(sphere.position.x + 5, sphere.position.y + 3, sphere.position.z + 5);

  //scene.add(wiresphere);
  scene.add(sphere);
  scene.add(light);
  //scene.add(backlight);
  //scene.add(helperbacklight);


  function animate() {
    requestAnimationFrame(animate);
    //wiresphere.rotation.y += 0.01;
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  animate();

}
