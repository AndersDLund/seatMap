import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
let camera, scene, renderer;

@Component({
  selector: 'app-anders-map',
  templateUrl: './anders-map.component.html',
  styleUrls: ['./anders-map.component.scss']
})
export class AndersMapComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    this.init();
    this.animate();
  }

  init() {

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.set(0, 5, 2);

  scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshNormalMaterial();

  // generate some boxes in a column

  for (let i = 0; i <= 10; i++) {

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = i;
    scene.add(mesh);

  }
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('wheel', this.onMouseWheel, false);
    window.addEventListener('resize', this.onWindowResize, false);

  }

 animate() {

  requestAnimationFrame(this.animate);
  renderer.render(scene, camera);
}

onMouseWheel(event) {

  event.preventDefault();

  camera.position.y -= event.deltaY * 0.005;

  // prevent scrolling beyond a min/max value

  camera.position.clampScalar(0, 10);

}

onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}

}
