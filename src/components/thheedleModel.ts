import * as THREE from 'three'
import {
  botRegion,
  LabeledPoint,
  midRegion,
  regionContainsPoint,
  topRegion,
} from './thheedleVertices'
import { lerp } from 'three/src/math/MathUtils.js'

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
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  camera.position.z = 5

  handleResize()

  const clock = new THREE.Clock()
  let t = 0
  let velocity = 0
  let maxVelocity = 1 / 4

  function animate() {
    const delta = clock.getDelta()
    t += delta

    for (let i = 0; i < opacityMultipliers.length; i++) {
      opacityMultipliers[i] =
        0.5 * Math.cos(opacityPeriods[i] * t * 3 + 100) + 0.5
    }
    geometry2.attributes.opacityMultiplier.needsUpdate = true

    if (currMouseX && currMouseY && !shouldDrift) {
      points.rotation.y = lerp(points.rotation.y, currMouseX, 0.01)
      points.rotation.x = lerp(points.rotation.x, currMouseY, 0.01)
    }

    if (shouldDrift) {
      if (velocity < delta * maxVelocity) {
        velocity += delta * (delta / 20)
      }
      velocity = Math.min(velocity, delta * maxVelocity)
      points.rotation.y += velocity
    }

    if (points.rotation.y > Math.PI) {
      points.rotation.y -= 2 * Math.PI
    } else if (points.rotation.y < -Math.PI) {
      points.rotation.y += 2 * Math.PI
    }

    // console.log(points.rotation.y)

    renderer.render(scene, camera)
  }
  renderer.setAnimationLoop(animate)

  window.addEventListener('resize', handleResize)

  const initiateDrift = () => {
    shouldDrift = true
    velocity = 0
  }

  let currMouseX: number | undefined
  let currMouseY: number | undefined

  let shouldDrift: boolean = false
  let timeout = setTimeout(initiateDrift, 2000)

  window.addEventListener('mousemove', (e) => {
    // normalize x and y between -1 and 1
    const nx = (2 * (e.x - window.innerWidth)) / window.innerWidth + 1
    const ny = (2 * (e.y - window.innerHeight)) / window.innerHeight + 1

    currMouseX = nx / 3
    currMouseY = ny / 3

    shouldDrift = false
    clearTimeout(timeout)
    timeout = setTimeout(initiateDrift, 2000)
  })

  const vertices2: number[] = []
  // const labeledPoints: LabeledPoint[] = []

  for (let i = 0; i < 12000; i++) {
    const x = THREE.MathUtils.randFloatSpread(1.5 * 2)
    const y = THREE.MathUtils.randFloatSpread(2 * 2)
    const z = THREE.MathUtils.randFloatSpread(1)

    if (regionContainsPoint(topRegion, { x, y })) {
      // labeledPoints.push({ x, y, z, region: 'top' })
      vertices2.push(x, y, z)
    } else if (regionContainsPoint(midRegion, { x, y })) {
      // labeledPoints.push({ x, y, z, region: 'mid' })
      vertices2.push(x, y, z)
    } else if (regionContainsPoint(botRegion, { x, y })) {
      // labeledPoints.push({ x, y, z: z, region: 'bot' })
      vertices2.push(x, y, z)
    }
  }

  const sizes = new Float32Array(vertices2.length / 3)
  const opacityPeriods = new Float32Array(vertices2.length / 3)
  const opacityMultipliers = new Float32Array(vertices2.length / 3)

  for (let i = 0; i < sizes.length; i++) {
    sizes[i] = (Math.random() * 5 + 1) * devicePixelRatio
    opacityPeriods[i] = i % 4 === 0 ? 0 : Math.random()
    opacityMultipliers[i] = 2
  }

  const geometry2 = new THREE.BufferGeometry()
  geometry2.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices2, 3)
  )
  geometry2.setAttribute('customScale', new THREE.BufferAttribute(sizes, 1))
  geometry2.setAttribute(
    'opacityMultiplier',
    new THREE.BufferAttribute(opacityMultipliers, 1)
  )

  const shaderMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      size: { value: 2 },
      scale: { value: 1 },
    },
    vertexShader: `
      uniform float size;
      attribute float customScale;
      attribute float opacityMultiplier;
      varying float vMultiplier;

    	void main() {
        vMultiplier = opacityMultiplier;
    		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    		gl_PointSize = customScale;
    		gl_Position = projectionMatrix * mvPosition;
    	}
    `,
    fragmentShader: `
      varying float vMultiplier;

      void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        float opacity = step(ll, 0.55);
        gl_FragColor = vec4(1.0, 1, 1, 0.5 * opacity * vMultiplier);
      }
    `,
  })
  const material2 = new THREE.PointsMaterial({ color: 0xff0000 })
  material2.size = 0.1
  const points = new THREE.Points(geometry2, shaderMaterial)
  scene.add(points)

  canvas.classList.add('fadeIn')
  console.log('Model should be set up!')
  threeReady = true
  handleResize()
}
