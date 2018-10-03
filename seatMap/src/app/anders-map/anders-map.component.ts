import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
@Component({
  selector: 'app-anders-map',
  templateUrl: './anders-map.component.html',
  styleUrls: ['./anders-map.component.scss']
})
export class AndersMapComponent implements OnInit {
  scene: any = new THREE.Scene();
  renderer: any;
  camera: any;
  light: any;
  controls: any;
  box: any;
  sun: any;
  geometry: any;
  material: any;

  constructor() {

  }
  ngOnInit() {
    this.scene.background = new THREE.Color('lightblue');
    // window.addEventListener('scroll', this.onMouseWheel, false);
    // window.addEventListener('touchstart', this.touched, false);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    console.log(this.renderer);
    document.body.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 13;
    this.camera.position.y = 5;
    this.camera.position.x = 7;
    // console.log(this.camera);
    this.scene.add(this.camera);
    this.geometry = new THREE.BoxGeometry(.5, .5, .5);
    this.material = new THREE.MeshNormalMaterial();

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    console.log(this.controls);
    this.controls.rotateSpeed = 2.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;


    this.controls.maxDistance = 15;
    this.controls.minDistance = 10;
    this.controls.noPan = false;
    this.controls.noRotate = true;
    this.controls.noZoom = false;

    this.controls.staticMoving = false;
    this.controls.dynamicDampingFactor = 0.3;

    this.controls.keys = [65, 83, 68];

    this.controls.addEventListener('change', this.render);

    this.sun = new THREE.Mesh(this.geometry, this.material);
    this.sun.position.z = 12;
    this.sun.position.x = 12;
    this.sun.position.y = 12;
    this.scene.add(this.box);

    for (let i = 0; i <= 10; i++) {
      for (let j = 1; j <= 3; j++ ) {
      this.box = new THREE.Mesh(this.geometry, this.material);
      this.box.position.z = i;
      this.box.position.x = j;
      this.scene.add(this.box);
      }
    }

    this.render();
    // this.animate();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // this.scene.add(this.box);
    // this.renderer = this.renderer;
  }

  render() {
    // this.box.rotation.y += 0.01;
    // this.box.rotation.x += 0.01;
    // this.renderer = this.renderer;
    // console.log(this.renderer, 'renderererer');
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
    this.controls.update();
  }

  // animate() {

  // requestAnimationFrame(this.animate.bind(this));
  // this.controls.update();


// }



// render() {
//   console.log(this.renderer, 'renderererererere');
//   // this.renderer.bind(this);
//   this.renderer.render(this.scene, this.camera);
//   // this.stats.update();

// }

  // onMouseWheel(event) {
  //   this.camera = new THREE.PerspectiveCamera(700, window.innerWidth / window.innerHeight, 0.01, 10);
  //   event.preventDefault();
  //   this.camera.position.y -= event.deltaY * 0.005;
  //   this.camera.position.clampScalar(0, 10);

  // }

  // touched(event) {
  //   console.log(this.camera);
  //   this.camera.position.y -= event.deltaY * 0.005;
  // }

  // onWindowResize() {
  //   this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  //   this.camera.aspect = window.innerWidth / window.innerHeight;
  //   this.camera.updateProjectionMatrix();
  //   this.renderer.setSize(window.innerWidth, window.innerHeight);
  // }

  // public handleScroll(event: ScrollEvent ) {
  //   console.log('cool');
  //   this.camera.position.y -= event * 0.005;
  //   this.camera.position.clampScalar(0, 10);
  //   console.log(this.camera.position);
  // }
}
