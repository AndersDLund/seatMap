import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-boilerplate',
  templateUrl: './boilerplate.component.html',
  styleUrls: ['./boilerplate.component.scss']
})
export class BoilerplateComponent implements OnInit {
  scene: any = new THREE.Scene();
  renderer: any = new THREE.WebGLRenderer();
  camera: any;
  light: any;
  box: any;
  geometry: any;
  material: any;

  constructor() {

  }

  ngOnInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 5, 2);
    this.scene.add(this.camera);
    this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    this.material = new THREE.MeshBasicMaterial({color: 0xFF0000});
    for (let i = 0; i <= 10; i++) {
      this.box = new THREE.Mesh(this.geometry, this.material);
      this.box.position.y = i;
      this.scene.add(this.box);
    }
    // this.scene.add(this.box);
    this.render();
  }

  render() {
    // this.box.rotation.y += 0.01;
    // this.box.rotation.x += 0.01;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}
