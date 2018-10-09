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
let box;
const scene = new THREE.Scene();
// let selectedSeat = '7-4';
// let textGeometry;

@Component({
  selector: 'app-anders-map',
  templateUrl: './anders-map.component.html',
  styleUrls: ['./anders-map.component.scss']
})
export class AndersMapComponent implements OnInit {
  // scene: any = new THREE.Scene();
  otherCamera: any;
  light: any;
  controls: any;
  loader: any;

  text: any;
  // textGeometry: any;
  // textMaterial: any;
  // box: any;
  seatMaterials: Array<any>;
  sun: any;
  objects: Array<any>;

  selectedSeat: any;

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

  mouse: any;
  intersects: any;
  intersected: any;
  currentHex: String;

  constructor() {
  }
  ngOnInit() {
    this.selectedSeat = '7-4';

    scene.background = new THREE.Color('lightblue');
    this.mouse = new THREE.Vector2();
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
    scene.add(camera);
    scene.add(this.otherCamera);

    setTimeout(() => {
      scene.activeCamera = this.otherCamera;
    }, 5000);

    this.geometry = new THREE.BoxGeometry(.5, .7, .3);
    this.material = new THREE.MeshLambertMaterial();

    this.sunGeometry = new THREE.SphereGeometry(3, 20, 20);
    this.sunMaterial = new THREE.MeshNormalMaterial();

    this.cloudGeometry = new THREE.SphereGeometry(1, 10, 10);
    this.cloudMaterial = new THREE.MeshNormalMaterial();

    this.engineGeometry = new THREE.CylinderGeometry(.5, .5, 4, 32);
    this.engineMaterial = new THREE.MeshNormalMaterial();

    // this.planeFrontGeometry = new THREE.Geometry(100, 100, 100);
    // this.fv1 = new THREE.Vector3(5, 0, 0);
    // this.fv2 = new THREE.Vector3(-7, 0, 0);
    // this.fv3 = new THREE.Vector3(0, 7, 0);

    // this.planeFrontGeometry.vertices.push(this.fv1);
    // this.planeFrontGeometry.vertices.push(this.fv2);
    // this.planeFrontGeometry.vertices.push(this.fv3);

    // this.planeFrontGeometry.faces.push(new THREE.Face3(0, 2, 1));

    this.planeFrontGeometry = new THREE.CircleGeometry(4, 50, 0, Math.PI * 2);

    this.planeWingGeometry = new THREE.Geometry(200, 200, 200);
    this.planeWingMaterial = new THREE.MeshNormalMaterial();
    this.v1 = new THREE.Vector3(10, 0, 0);
    this.v2 = new THREE.Vector3(-7, 0, 0);
    this.v3 = new THREE.Vector3(0, 7, 0);

    this.planeWingGeometry.vertices.push(this.v1);
    this.planeWingGeometry.vertices.push(this.v2);
    this.planeWingGeometry.vertices.push(this.v3);

    this.planeWingGeometry.faces.push(new THREE.Face3(0, 2, 1));

    this.planeWing = new THREE.Mesh(this.planeWingGeometry, new THREE.MeshLambertMaterial({ color: 'gray' }));
    this.planeWing.position.x = 2.7;
    this.planeWing.position.y = -1;
    this.planeWing.position.z = 1;
    this.planeWing.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
    scene.add(this.planeWing);



    this.planeFront = new THREE.Mesh(this.planeFrontGeometry, new THREE.MeshLambertMaterial({color: 'gray'}));
    this.planeFront.position.x = 2.7;
    this.planeFront.position.y = -1;
    this.planeFront.position.z = -1;
    this.planeFront.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI * 2);
    this.planeFront.rotation.z = 90;
    scene.add(this.planeFront);

    this.cloud1 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud1.position.x = -4.5;
    this.cloud1.position.y = 6.2;
    this.cloud1.position.z = -20;
    this.cloud2 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud2.position.x = -5.2;
    this.cloud2.position.y = 5;
    this.cloud2.position.z = -20;
    this.cloud3 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud3.position.x = -3.8;
    this.cloud3.position.y = 5;
    this.cloud3.position.z = -20;
    scene.add(this.cloud1, this.cloud2, this.cloud3);


    this.engine = new THREE.Mesh(this.engineGeometry, this.engineMaterial);
    this.engine.position.x = -4;
    this.engine.position.y = -2;
    this.engine.position.z = 3;
    this.engine.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
    scene.add(this.engine);

    this.engine1 = new THREE.Mesh(this.engineGeometry, this.engineMaterial);
    this.engine1.position.x = 8;
    this.engine1.position.y = -2.7;
    this.engine1.position.z = 1.5;
    this.engine1.rotation.set(-Math.PI / 2, Math.PI / 3000, Math.PI - .15);
    scene.add(this.engine1);

    this.light = new THREE.AmbientLight(0x404040, 3);
    scene.add(this.light);


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
    document.addEventListener('mousemove', this.onMouseMove, false);

    this.sun = new THREE.Mesh(this.sunGeometry, this.sunMaterial);
    this.sun.position.x = -20;
    this.sun.position.y = 11;
    this.sun.position.z = -7;
    scene.add(this.sun);

    // this.loader = new THREE.FontLoader();
    // this.loader.load('/node_modules/three/examples/fonts/helvetiker_bold.typeface.json', function (font) {
    //   const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    //   const textGeometry = new THREE.TextGeometry(selectedSeat, {
    //     font: font,
    //     size: 20,
    //     height: 12,
    //     curveSegments: 12,
    //     // bevelEnabled: true,
    //     bevelThickness: 10,
    //     bevelSize: 8,
    //     bevelSegments: 5
    //   });
    //   const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    //   textMesh.position.x = -70;
    //   textMesh.position.y = -10;
    //   textMesh.position.z = -100;
    //   textMesh.rotation.y = Math.PI / 7;
    //   scene.add(textMesh);
    // });

    this.seatMaterials = [
      new THREE.MeshLambertMaterial({ color: 0xff0000}),
      new THREE.MeshLambertMaterial({ color: 0x00ff00}),
      new THREE.MeshLambertMaterial({ color: 0x0000ff}),
      new THREE.MeshLambertMaterial({ color: 0xffff00}),
      new THREE.MeshLambertMaterial({ color: 0xff00ff}),
      new THREE.MeshLambertMaterial({ color: 0x00ffff}),
  ];

    seatGroup = new THREE.Object3D();
    this.geometry = new THREE.BoxGeometry(.5, .7, .3);
    this.geometry.faces[0].color.setHex(0xe6e6e6);
    this.geometry.faces[1].color.setHex(0xe6e6e6);
    this.geometry.faces[2].color.setHex(0xf2f2f2);
    this.geometry.faces[3].color.setHex(0xf2f2f2);
    this.geometry.faces[4].color.setHex(0xf2f2f2);
    this.geometry.faces[5].color.setHex(0xf2f2f2);

    const col = document.getElementsByClassName('col-12');
    for (let i = 0; i <= 10; i++) {
      for (let j = 1; j <= 5; j++) {
        if (j === 3) {
          continue;
        } else if (j === 4 && i === 7) {
          box = new THREE.Mesh(this.geometry, new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors }));
          box.material.emissive.setHex(0x0b1963);
          box.name = i + '-' + j;
          box.position.z = i;
          box.position.x = j;
          box.callback = function () {
          };
          seatGroup.children.push(box);
          scene.add(box);
        } else if ((j === 2 && i === 5) || (j === 1 && i === 8) || (j === 5 && i === 1) || (j === 4 && i === 3)) {
          box = new THREE.Mesh(this.geometry, new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors }));
          box.material.emissive.setHex(0xb2279b);
          box.name = i + '-' + j;
          box.position.z = i;
          box.position.x = j;
          box.callback = function (name) {
            col[0].innerHTML = name;
          };
          seatGroup.children.push(box);
          scene.add(box);
        } else {
          box = new THREE.Mesh(this.geometry, new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors}));
          box.name = i + '-' + j;
          box.uuid = 'notSelected';
          box.position.z = i;
          box.position.x = j;
          box.callback = function(name) {
            col[0].innerHTML = name;
          };
          seatGroup.children.push(box);
          scene.add(box);
        }
      }
    }
    this.render();
  }

  render() {
    this.cloud1.position.z += this.dxPerFrame;
    this.cloud2.position.z += this.dxPerFrame;
    this.cloud3.position.z += this.dxPerFrame;
    this.dxPerFrame = .01;
    // if (this.cloud1.position.x < -40 || this.cloud2.position.x < -40 || this.cloud3.position.x < -40) { this.dxPerFrame = .01; }
    this.sun.rotation.y += 0.001;
    this.sun.rotation.x += 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(this.render.bind(this));
    this.controls.update();
  }


  onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(seatGroup.children);
    if (intersects.length > 0) {
      if (intersects[0].object !== INTERSECTED) {
        if (INTERSECTED) {
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        }
        INTERSECTED = intersects[0].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        if (INTERSECTED.currentHex === 0 || INTERSECTED.currentHex === 727395) { return; }
        INTERSECTED.material.emissive.setHex(0x123d1e);
        intersects[0].object.callback(INTERSECTED.name);
      }
    } else {
      if (INTERSECTED) {
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
      }
    }
  }

  de2ra = function (degree) { return degree * (Math.PI / 180); };

  onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
}

}
