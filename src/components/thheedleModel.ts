import * as THREE from 'three'
import {
  botRegion,
  LabeledPoint,
  midRegion,
  regionContainsPoint,
  topRegion,
  verts3d,
} from './thheedleVertices'

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

  const geometry = new THREE.BufferGeometry()
  const vertices = new Float32Array(verts3d)
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  const material = new THREE.MeshBasicMaterial({
    color: 0xdddddd,
    // depthWrite: false,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material)
  // scene.add(mesh)
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

    // mesh.rotation.y = nx / 5
    // mesh.rotation.x = ny / 5

    // points.rotation.y = nx / 5
    // points.rotation.x = ny / 5

    mesh.rotation.y = nx
    mesh.rotation.x = ny

    points.rotation.y = nx / 3
    points.rotation.x = ny / 3
  })

  const vertices2: number[] = []
  const labeledPoints: LabeledPoint[] = []

  for (let i = 0; i < 30000; i++) {
    const x = THREE.MathUtils.randFloatSpread(1.5 * 2)
    const y = THREE.MathUtils.randFloatSpread(2 * 2)
    const z = THREE.MathUtils.randFloatSpread(1)

    if (regionContainsPoint(topRegion, { x, y })) {
      labeledPoints.push({ x, y, z: z + 0.5, region: 'top' })
      vertices2.push(x, y, z + 0.5)
    } else if (regionContainsPoint(midRegion, { x, y })) {
      labeledPoints.push({ x, y, z: z + 0.5, region: 'mid' })
      vertices2.push(x, y, z + 0.5)
    } else if (regionContainsPoint(botRegion, { x, y })) {
      labeledPoints.push({ x, y, z: z + 0.5, region: 'bot' })
      vertices2.push(x, y, z + 0.5)
    }
  }

  const sizes = new Float32Array(vertices2.length / 3)

  console.log(`verts2: ${vertices2.length}`)
  console.log(`siezs: ${sizes.length}, verts2 / 3: ${vertices2.length / 3}`)
  for (let i = 0; i < sizes.length; i++) {
    sizes[i] = Math.random() * 2 + 0.5
  }

  const geometry2 = new THREE.BufferGeometry()
  geometry2.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices2, 3)
  )
  geometry2.setAttribute('customScale', new THREE.BufferAttribute(sizes, 1))

  const shaderMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      size: { value: 2 },
      scale: { value: 1 },
      color: { value: new THREE.Color('red') },
    },
    vertexShader: `
      uniform float size;

      attribute float customScale;

    	varying vec3 vColor;

    	void main() {
    		vColor = vec3(1.0);
    		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    		gl_PointSize = customScale;
    		gl_Position = projectionMatrix * mvPosition;

    	}
    `,
    // fragmentShader: `
    //   uniform vec3 color;

    // 	varying vec3 vColor;

    // 	void main() {

    // 		gl_FragColor = vec4( color * vColor, 1.0 );

    // 		gl_FragColor = gl_FragColor;

    // 		if ( gl_FragColor.a < 0.1 ) discard;

    // 	}
    // `,
    fragmentShader: `
      uniform vec3 color;
      void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        gl_FragColor = vec4(xy, 0.5, step(ll, 0.5));

        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.7);
      }
    `,
  })
  const material2 = new THREE.PointsMaterial({ color: 0xff0000 })
  material2.size = 0.1
  const points = new THREE.Points(geometry2, shaderMaterial)
  scene.add(points)

  canvas.classList.add('fadeIn')
  console.log('Model should have been set up!')
  threeReady = true
  handleResize()
}
