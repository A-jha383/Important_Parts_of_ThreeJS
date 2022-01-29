import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
//buffer geometry
const geometry = new THREE.BufferGeometry()
// store buffer geometry data using Float32Array

const count = 100
const positionsArray = new Float32Array(count*3*3)
for(let i =0;i<count*9;i++){
    positionsArray[i]=(Math.random()-0.5)*4
}

const positionAttribute = new THREE.BufferAttribute(positionsArray,3)


geometry.setAttribute('position',positionAttribute)



//const geometry = new THREE.BoxBufferGeometry(1, 1, 1,8,8,8)

//TWO WAYS TO CREATE EDGES AND FACES
// const geometry=new THREE.Geometry()

// for(let i=0;i<50;i++){

//     for(let j=0;j<3;j++){
//         geometry.vertices.push(new THREE.Vector3(
//             (Math.random() -0.5)*4,
//             (Math.random() -0.5)*4,
//             (Math.random() -0.5)*4))
//     }
//     const verticesIndex = i*3
//     geometry.faces.push(new THREE.Face3(
//         verticesIndex,verticesIndex+1,verticesIndex+2
//     ))
// }

// const vertex1 = new THREE.Vector3(0, 0, 0)
// geometry.vertices.push(vertex1);
// const vertex2 = new THREE.Vector3(0, 1, 0)
// geometry.vertices.push(vertex2);
// const vertex3 = new THREE.Vector3(1, 0, 0)
// geometry.vertices.push(vertex3);
// const vertex4 = new THREE.Vector3(0, 0, 1)
// geometry.vertices.push(vertex4);
// const vertex5 = new THREE.Vector3(1, 1, 1)
// geometry.vertices.push(vertex5);
 
// const face = new THREE.Face3(0,1,2)
// geometry.faces.push(face);
// const face1 = new THREE.Face3(0,2,3)
// geometry.faces.push(face1);
// const face2 = new THREE.Face3(1,2,3)
// geometry.faces.push(face2);
// const face3 = new THREE.Face3(1,2,4)
// geometry.faces.push(face3);
// const face4 = new THREE.Face3(1,3,4)
// geometry.faces.push(face4);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 ,
wireframe:true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()