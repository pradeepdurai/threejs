import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene()
// scene.add(new THREE.AxesHelper(5))

const light = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1.5);
// light.position.set(2,2,4);

scene.add(light);


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2
camera.position.y = 1



const loader = new GLTFLoader();

loader.load('3dModels/Vesselv2.glb',GLTF, XHR);
let root:any
function GLTF(GLTF:any){
    root = GLTF.scene;
    root.scale.set(0.18,0.18,0.18);
    scene.add(root);
    console.log(GLTF)
}
function XHR(xhr:any){
    console.log('XHR ->', (xhr.loader / xhr.total) * 100)
}
const renderer = new THREE.WebGLRenderer();
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)


function animate() {
    requestAnimationFrame(animate)
    render()
    // root.rotation.x += 0.01;
    root.rotation.y += 0.01;

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
//render()