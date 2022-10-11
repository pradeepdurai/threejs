import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene()
// scene.add(new THREE.AxesHelper(5))

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const loader = new GLTFLoader();

loader.load('3dModels/Vessel.glb',GLTF, XHR);
function GLTF(GLTF:any){
    let root = GLTF.scene;
    root.scale.set(0.2,0.2,0.2)
    scene.add(root);
}
function XHR(xhr:any){
    console.log('XHR ->', (xhr.loader / xhr.total) * 100 , "% Loader" )
}
const renderer = new THREE.WebGLRenderer()
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
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
//render()