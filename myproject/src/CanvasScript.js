import './style.css';
//import LitBakeTexture from './imports/litBake.png';
import HighDefTexture from './imports/highDef-wobbleLines.png';
import BlackNWhiteTexture from './imports/black_and white- highdef Wobblelines.png';
import * as THREE from 'three';

//set up canvas elents and renderer
export const SetUpCanvas = () => {
  // Create a scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Crease objects
  const geometry = new THREE.SphereGeometry(4, 128, 128);
  const wiregeometry = new THREE.SphereGeometry(5, 64, 64);

  const Texturematerial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.5,
    map: new THREE.TextureLoader().load(HighDefTexture),
    metalnessMap: new THREE.TextureLoader().load(BlackNWhiteTexture),
    roughnessMap: new THREE.TextureLoader().load(BlackNWhiteTexture),
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
  const spherePosistion = (0, 0, 3);

  sphere.position.set(spherePosistion);

  sphere.rotateX(120);
  sphere.renderOrder = 1;


  light.position.set(spherePosistion + 5);

  scene.add(wiresphere);
  scene.add(sphere);
  scene.add(light);
  //scene.add(backlight);
  //scene.add(helperbacklight);


  function animate() {
    requestAnimationFrame(animate);
    wiresphere.rotation.y += 0.01;
    sphere.rotation.x += 0.001;
    sphere.rotation.y -= 0.001;
    renderer.render(scene, camera);
    console.log("Rendering")
  }

  animate();

}
