import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { tileMap } from "./tileMap";
import { Raycast } from "./raycast";

export class Render {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  constructor(canvasId: string, parent: string) {
    this.canvas = this.getCanvas(canvasId);
    this.resize(parent);
    this.renderer = this.createRenderer();
    this.scene = new THREE.Scene();
    this.camera = this.createCamera();
    this.init();
    this.animate();
  }

  getCanvas(id: string): HTMLCanvasElement {
    return document.getElementById(id) as HTMLCanvasElement;
  }

  createRenderer(): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(this.canvas.width, this.canvas.height);
    renderer.setClearColor(0x000000, 0);
    return renderer;
  }

  createCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
      25,
      this.canvas.width / this.canvas.height,
      0.1,
      1000
    );
    return camera;
  }

  init(): void {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 50, 0);
    tileMap(this.scene, 20);
    this.scene.add(light);
    this.camera.position.set(5, 5, 5);
    this.createControls();
    new Raycast(this.canvas, this.camera, this.scene);
  }

  createControls(): void {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  resize(parent: string): void {
    const element = document.getElementById(parent) as HTMLElement;
    this.canvas.width = element.clientWidth;
    this.canvas.height = element.clientHeight;

    const onWindowResize = () => {
      this.camera.aspect = element.clientWidth / element.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(element.clientWidth, element.clientHeight);
    };

    window.addEventListener("resize", () => onWindowResize(), false);
  }

  animate(): void {
    const frameUpdate = () => {
      requestAnimationFrame(frameUpdate);
      this.renderer.render(this.scene, this.camera);
    };
    frameUpdate();
  }
}
