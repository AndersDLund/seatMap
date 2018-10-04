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

  planeWing: any;
  planeWingGeometry: any;
  planeWingMaterial: any;
  v1: any;
  v2: any;
  v3: any;

  engine: any;
  engine1: any;
  engineGeometry: any;
  engineMaterial: any;

  sunGeometry: any;
  sunMaterial: any;
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
    this.camera.position.z = 16;
    this.camera.position.y = 5;
    this.camera.position.x = 7;
    // console.log(this.camera);
    this.scene.add(this.camera);
    this.geometry = new THREE.BoxGeometry(.5, .7, .3);
    this.material = new THREE.MeshNormalMaterial();

    this.sunGeometry = new THREE.SphereGeometry( 3, 20, 20 );
    this.sunMaterial = new THREE.MeshNormalMaterial({});

    this.engineGeometry = new THREE.CylinderGeometry(.5, .5, 4, 32);
    this.engineMaterial = new THREE.MeshNormalMaterial();

    this.planeWingGeometry = new THREE.Geometry( 200, 200, 200 );
    this.planeWingMaterial = new THREE.MeshNormalMaterial();
    this.v1 = new THREE.Vector3(10, 0, 0);
    this.v2 = new THREE.Vector3(-7, 0, 0);
    this.v3 = new THREE.Vector3(0, 7, 0);

    this.planeWingGeometry.vertices.push(this.v1);
    this.planeWingGeometry.vertices.push(this.v2);
    this.planeWingGeometry.vertices.push(this.v3);

    this.planeWingGeometry.faces.push(new THREE.Face3(0, 2, 1));

    this.planeWing = new THREE.Mesh(this.planeWingGeometry, this.planeWingMaterial);
    this.planeWing.position.x = 2.7;
    this.planeWing.position.y = -1;
    this.planeWing.position.z = 1;
   this.planeWing.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
    this.scene.add(this.planeWing);


    this.engine = new THREE.Mesh(this.engineGeometry, this.engineMaterial);
    this.engine.position.x = -4;
    this.engine.position.y = -2;
    this.engine.position.z = 3;
    this.engine.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
    this.scene.add(this.engine);

    this.engine1 = new THREE.Mesh(this.engineGeometry, this.engineMaterial);
    this.engine1.position.x = 8;
    this.engine1.position.y = -2.7;
    this.engine1.position.z = 1.5;
    this.engine1.rotation.set(-Math.PI / 2, Math.PI / 3000, Math.PI - .15);
    this.scene.add(this.engine1);

    // this.light = new THREE.pointLight(0xffffff);


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

    window.addEventListener('change', this.render);

    this.sun = new THREE.Mesh(this.sunGeometry, this.sunMaterial);
    this.sun.position.x = -20;
    this.sun.position.y = 11;
    this.sun.position.z = -7;
    this.scene.add(this.sun);

    // this.planeWing = new THREE.Mesh(this.planeWingGeometry, this.planeWingMaterial);
    // this.planeWing.position.x = -7;
    // this.planeWing.position.y = -3;
    // this.planeWing.position.z = -2;
    // this.planeWing.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
    // this.scene.add(this.planeWing);

    for (let i = 0; i <= 10; i++) {
      for (let j = 1; j <= 5; j++ ) {
        if (j === 3) {
          continue;
        } else {
      this.box = new THREE.Mesh(this.geometry, this.material);
      this.box.position.z = i;
      this.box.position.x = j;
      this.scene.add(this.box);
        }
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
    this.sun.rotation.y += 0.001;
    this.sun.rotation.x += 0.001;
    // this.renderer = this.renderer;
    // console.log(this.renderer, 'renderererer');


    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
    this.controls.update();
  }

  de2ra = function (degree) { return degree * (Math.PI / 180); };

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
