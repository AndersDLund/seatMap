import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-anders-map',
  templateUrl: './anders-map.component.html',
  styleUrls: ['./anders-map.component.scss']
})
export class AndersMapComponent implements OnInit {
  scene: any = null;
  camera: any = null;
  renderer: any = null;
  geometry: any = null;
  material: any = null;

  constructor() {
    this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    this.material = new THREE.MeshNormalMaterial();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  ngOnInit() {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camera.position.set(0, 5, 2);
    console.log(this.camera.position, 'cool!');
    this.scene = new THREE.Scene();
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('touchstart', this.onMouseWheel, {passive: false});
    window.addEventListener('resize', this.onWindowResize, {passive: false});

    // generate some boxes in a column

    for (let i = 0; i <= 10; i++) {
      const mesh = new THREE.Mesh(this.geometry, this.material);
      mesh.position.y = i;
      this.scene.add(mesh);
    }

    this.animate();
    }


  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  onMouseWheel(event) {
    console.log(event);
    event.preventDefault();
    // console.log(this.scene);
    // console.log(this.renderer);
    console.log(this.camera);
    this.camera.position.y -= event.deltaY * 0.005;

    // prevent scrolling beyond a min/max value

    this.camera.position.clampScalar(0, 10);

  }
  onWindowResize() {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

  }
}
