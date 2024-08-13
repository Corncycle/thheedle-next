import * as THREE from 'three'
import { verts3d } from './thheedleVertices'

const md = 768
const lg = 1280

export let threeReady = false

export const setupModel = () => {
  const canvas: HTMLCanvasElement | undefined = document.querySelector(
    '#thheedle-model'
  ) as HTMLCanvasElement | undefined
  if (!canvas) {
    console.error('Failed to find canvas to bind thheedle model to!')
    return
  }
  const body = document.querySelector('body')
  if (!body) {
    console.error('Failed to find body to scale canvas to!')
    return
  }

  const handleResize = () => {
    if (body.clientWidth < md) {
      canvas.width = body.clientWidth
    } else {
      canvas.width = body.clientWidth * 2
    }
    canvas.height = body.clientHeight
    renderer.setSize(canvas.width, canvas.height)
    camera.aspect = canvas.width / canvas.height
    camera.updateProjectionMatrix()
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  )
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas,
  })
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  camera.position.z = 5

  const geometry = new THREE.BufferGeometry()
  const vertices = new Float32Array(verts3d)
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  const material = new THREE.MeshBasicMaterial({
    color: 0xdddddd,
    depthWrite: false,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  handleResize()

  function animate() {
    renderer.render(scene, camera)
  }
  renderer.setAnimationLoop(animate)

  window.addEventListener('resize', handleResize)

  window.addEventListener('mousemove', (e) => {
    // normalize x and y between -1 and 1
    const nx = (2 * (e.x - window.innerWidth)) / window.innerWidth + 1
    const ny = (2 * (e.y - window.innerHeight)) / window.innerHeight + 1

    mesh.rotation.y = nx / 5
    mesh.rotation.x = ny / 5
  })

  canvas.classList.add('fadeIn')
  console.log('Model should have been set up!')
  threeReady = true
  handleResize()
}
