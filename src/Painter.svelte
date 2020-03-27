<script>
  import { Scene, PerspectiveCamera, WebGLRenderer,
    BoxGeometry, MeshBasicMaterial, Mesh
  } from 'three'
  import { TrackballControls } from './utils/TrackballControls'
  import { onMount } from 'svelte'

  let canvas

  async function init () {

    let width = canvas.clientWidth
    let height = canvas.clientHeight

    let scene = new Scene()
    let camera = new PerspectiveCamera(45, width / height, 0.1, 1000)
    let renderer = new WebGLRenderer({
      canvas,
      antialias: true
    })

    let controls = new TrackballControls(camera, canvas)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.setClearColor(0xF1F7FE)

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
    scene.add(cube, cubeWire)

    camera.position.set(-30, 40, 30)
    camera.lookAt(cube)

    function render () {
      renderer.render(scene, camera)
      controls.update()
      requestAnimationFrame(render)
    }

    render()
  }

  onMount(() => {
    init()
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
