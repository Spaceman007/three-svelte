<script>
  import { Scene, PerspectiveCamera, WebGLRenderer,
    BoxGeometry, MeshBasicMaterial, Mesh, Group, Box3, Sphere
  } from 'three'
  import { TrackballControls } from './utils/TrackballControls'
  import { onMount } from 'svelte'
  import Stats from 'three/examples/jsm/libs/stats.module.js'

  let canvas

  function makeObjects () {
    let cubeGeo = new BoxGeometry(9, 9, 9)
    let cubeMat = new MeshBasicMaterial({
      color: 0xff0000
    })
    let lineMat = new MeshBasicMaterial({
      color: 0x0000ff,
      wireframe: true
    })
    let cube = new Mesh(cubeGeo, cubeMat)
    let cubeWire = new Mesh(cubeGeo, lineMat)

    cube.position.set(-4, 3, 0)
    cubeWire.position.copy(cube.position)

    return [cube, cubeWire]
  }

  async function init () {

    let width = canvas.clientWidth
    let height = canvas.clientHeight
    let group = new Group()
    let stats = new Stats()

    stats.dom.style.right = '0px'
    stats.dom.style.width = '140px'
    stats.dom.style.left = ''
    window.document.body.prepend(stats.dom)

    let scene = new Scene()
    scene.add(group)

    let camera = new PerspectiveCamera(45, width / height, 0.1, 1000)
    let renderer = new WebGLRenderer({
      canvas,
      antialias: true
    })

    let objs = makeObjects()
    group.add(...objs)

    // set up bounding box for a proper view
    let bbox = new Box3()
    let bsphere = new Sphere()
    bbox.expandByObject(group)
    bbox.getBoundingSphere(bsphere)

    // init trackball controls
    let controls = new TrackballControls(camera, canvas)
    bbox.getCenter(controls.target)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.setClearColor(0xF1F7FE)

    // update camera
    camera.position.copy(bsphere.center.clone().addScalar(bsphere.radius * 2))
    camera.far = bsphere.radius * 50
    camera.near = camera.far / 10000
    camera.lookAt(bsphere.center.clone())
    camera.updateProjectionMatrix()

    function render () {
      renderer.render(scene, camera)
      controls.update()
      stats.update()
      requestAnimationFrame(render)
    }

    render()
  }

  onMount(async () => {
    await init()
  })

</script>

<style>
  canvas {
    width: 800px;
    height: 600px;
    background: aliceblue;
  }
  p {
    color: blueviolet;
  }
</style>

<p>you will see a cube with wireframe in the viewport!</p>
<canvas bind:this={canvas}>
  It seems that your browser does not support canvas!
</canvas>
