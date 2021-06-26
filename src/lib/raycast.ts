import * as THREE from "three";
import {state} from "./actions"

export class Raycast {
  private canvas: HTMLCanvasElement;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  constructor(
    canvas: HTMLCanvasElement,
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
  ) {
    this.canvas = canvas;
    this.camera = camera;
    this.scene = scene;
    this.canvasInteractions();
  }
  canvasInteractions() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(1, 1);

    this.canvas.addEventListener("click", (event) => {
      event.preventDefault();
      this.handleRaycast(mouse, raycaster, true);
    });

    this.canvas.addEventListener("mousemove", (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / this.canvas.offsetWidth) * 2 - 1;
      mouse.y = -(event.clientY / this.canvas.offsetHeight) * 2 + 1;
    });

    this.frameUpdate(mouse, raycaster);
  }

  frameUpdate(mouse: THREE.Vector2, raycaster: THREE.Raycaster) {
    let lastRaycast = Date.now();
    let mousePrev = new THREE.Vector2(mouse.x, mouse.y);
    const raycastInterval = 100;
    const frameUpdate = () => {
      if (
        Date.now() - lastRaycast > raycastInterval &&
        this.checkMouseMoved(mouse, mousePrev)
      ) {
        lastRaycast = Date.now();
        mousePrev = new THREE.Vector2(mouse.x, mouse.y);
        this.handleRaycast(mouse, raycaster);
      }
      window.requestAnimationFrame(frameUpdate);
    };
    window.requestAnimationFrame(frameUpdate);
  }

  checkMouseMoved(current: THREE.Vector2, previous: THREE.Vector2) {
    return current.x !== previous.x || current.y !== previous.y;
  }

  handleRaycast(
    mouse: THREE.Vector2,
    raycaster: THREE.Raycaster,
    click = false
  ) {
    raycaster.setFromCamera(mouse, this.camera);
    const intersects = raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) {
      const hover = intersects.filter((item: any) => item.object.name === "tile")[0];
      if (hover) {
        console.log(hover);
        state();
      }
    }
    if (intersects.length === 0) {
      console.log("null");
    }
  }
}
