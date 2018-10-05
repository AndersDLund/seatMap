import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import { ThenableWebDriver } from 'selenium-webdriver';

let raycaster;
let INTERSECTED;
const mouse = new THREE.Vector2();
let seatGroup;
let camera;
let renderer;

@Component({
  selector: 'app-anders-map',
  templateUrl: './anders-map.component.html',
  styleUrls: ['./anders-map.component.scss']
})
export class AndersMapComponent implements OnInit {
  scene: any = new THREE.Scene();
  // renderer: any;
  // camera: any;
  otherCamera: any;
  light: any;
  controls: any;
  box: any;
  sun: any;
  objects: Array<any>;

  dxPerFrame: number = .01;

  planeFront: any;
  planeFrontGeometry: any;
  fv1: any;
  fv2: any;
  fv3: any;

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

  cloudGeometry: any;
  cloudMaterial: any;
  cloud1: any;
  cloud2: any;
  cloud3: any;
  cloud4: any;

  geometry: any;
  material: any;

  // raycaster: any;
  mouse: any;
  intersects: any;

  constructor() {
  }
  ngOnInit() {
    this.scene.background = new THREE.Color('lightblue');
    // this.scene.fog = new THREE.Fog('black', 1, 2);
    // window.addEventListener('scroll', this.onMouseWheel, false);
    // window.addEventListener('touchstart', this.touched, false);
    // this.raycaster = new THREE.Raycaster(), INTERSECTED;
    this.mouse = new THREE.Vector2();
    // this.mouse = { x: 0, y: 0 };
    // this.intersects = this.raycaster.intersectObjects(this.scene.children);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 16;
    camera.position.y = 5;
    camera.position.x = 7;

    raycaster = new THREE.Raycaster();

    this.otherCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.otherCamera.position.z = 100;
    this.otherCamera.position.y = 5;
    this.otherCamera.position.x = 7;
    // console.log(this.camera);
    this.scene.add(camera);
    this.scene.add(this.otherCamera);

    setTimeout(() => {
      this.scene.activeCamera = this.otherCamera;
    }, 5000);
    this.geometry = new THREE.BoxGeometry(.5, .7, .3);
    this.material = new THREE.MeshLambertMaterial();

    this.sunGeometry = new THREE.SphereGeometry(3, 20, 20);
    this.sunMaterial = new THREE.MeshNormalMaterial();

    this.cloudGeometry = new THREE.SphereGeometry(1, 10, 10);
    this.cloudMaterial = new THREE.MeshNormalMaterial();

    this.engineGeometry = new THREE.CylinderGeometry(.5, .5, 4, 32);
    this.engineMaterial = new THREE.MeshNormalMaterial();

    this.planeFrontGeometry = new THREE.Geometry(100, 100, 100);
    this.fv1 = new THREE.Vector3(5, 0, 0);
    this.fv2 = new THREE.Vector3(-7, 0, 0);
    this.fv3 = new THREE.Vector3(0, 7, 0);

    this.planeFrontGeometry.vertices.push(this.fv1);
    this.planeFrontGeometry.vertices.push(this.fv2);
    this.planeFrontGeometry.vertices.push(this.fv3);

    this.planeFrontGeometry.faces.push(new THREE.Face3(0, 2, 1));

    this.planeWingGeometry = new THREE.Geometry(200, 200, 200);
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

    this.planeFront = new THREE.Mesh(this.planeFrontGeometry, this.planeWingMaterial);
    this.planeFront.position.x = 2.7;
    this.planeFront.position.y = -1;
    this.planeFront.position.z = -1;
    this.planeFront.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI * 2);
    //  this.planeFront.rotation.z = 90;
    this.scene.add(this.planeFront);

    this.cloud1 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud1.position.x = -4.5;
    this.cloud1.position.y = 6.2;
    // this.cloud1.position.z = 12;
    this.cloud2 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud2.position.x = -5.2;
    this.cloud2.position.y = 5;
    // this.cloud2.position.z = 12;
    this.cloud3 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud3.position.x = -3.8;
    this.cloud3.position.y = 5;
    // this.cloud3.position.z = 12;
    this.scene.add(this.cloud1, this.cloud2, this.cloud3);


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


    this.controls = new TrackballControls(camera, renderer.domElement);
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
    window.addEventListener('resize', this.onWindowResize, false);
    document.addEventListener('click', this.onDocumentMouseDown, false);
    // window.addEventListener('click', this.onClick);
    // this.renderer.domElement.addEventListener('click', this.raycast, false);

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
    seatGroup = new THREE.Object3D();
    for (let i = 0; i <= 10; i++) {
      for (let j = 1; j <= 5; j++) {
        if (j === 3) {
          continue;
        } else {
          this.box = new THREE.Mesh(this.geometry, this.material);
          this.box.position.z = i;
          this.box.position.x = j;
          seatGroup.children.push(this.box);
          this.scene.add(this.box);
        }
      }
    }
    console.log(seatGroup, 'seatGroup');
    this.render();
    // this.animate();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // this.scene.add(this.box);
    // this.renderer = this.renderer;
  }

  render() {
    this.cloud1.position.x += this.dxPerFrame;
    this.cloud2.position.x += this.dxPerFrame;
    this.cloud3.position.x += this.dxPerFrame;
    if (this.cloud1.position.x > 40 || this.cloud2.position.x > 40 || this.cloud3.position.x > 40) { this.dxPerFrame = -.01; }
    if (this.cloud1.position.x < -40 || this.cloud2.position.x < -40 || this.cloud3.position.x < -40) { this.dxPerFrame = .01; }
    this.sun.rotation.y += 0.001;
    this.sun.rotation.x += 0.001;
    // this.renderer = this.renderer;
    // console.log(this.renderer, 'renderererer');

    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(seatGroup.children);
    // count and look after all objects in the diamonds group
    if (intersects.length > 0) {
      if (INTERSECTED !== intersects[0].object) {
        if (INTERSECTED) { INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex); }
        INTERSECTED = intersects[0].object;
        console.log(INTERSECTED.material);
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        // setting up new material on hover
        INTERSECTED.material.emissive.setHex(Math.random() * 0xff00000 - 0xff00000);
      }
    } else {
      if (INTERSECTED) { INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      }
      INTERSECTED = null;
    }


    renderer.render(this.scene, camera);
    requestAnimationFrame(this.render.bind(this));
    this.controls.update();
  }

//  raycast(e) {
//   //  this.mouse = { x: 0, y: 0 };
//    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
//    this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

//      this.raycaster.setFromCamera(this.mouse, this.camera);

//     for (let i = 0; i < this.intersects.length; i++) {

//       this.intersects[i].object.material.color.set(0xff0000);

//     }
//  }

  onMouseMove(event) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

     this.intersects = raycaster.intersectObjects(this.scene.children);

    for (let i = 0; i < this.intersects.length; i++) {
      console.log(this.intersects[i]);
    }
}

onDocumentMouseDown(event) {
console.log(seatGroup.children);

  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(seatGroup.children);
  console.log(intersects);

  // if (intersects.length > 0) {
  //   // get a link from the userData object
  //   window.open(intersects[0].object.userData.URL);
  // }
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

  onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
}

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
