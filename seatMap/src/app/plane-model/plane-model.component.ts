import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as FBXLoader from 'three-fbx-loader';
import OrbitControls from 'three-orbitcontrols';

let scene;
let camera;
let light;
let loader;
let renderer;
let controls;
let box;
const mouse = new THREE.Vector2();
let raycaster;
let INTERSECTED;
let geometry;

let roadGeometry;
let road;

let ground;
let groundGeomety;

let pyramid;
let pyramidGeometry;

let sun;
let sunGeometry;

let sunlight;

let cloud1;
let cloud2;
let cloud3;
let cloud4;
let cloudGeometry;

@Component({
  selector: 'app-plane-model',
  templateUrl: './plane-model.component.html',
  styleUrls: ['./plane-model.component.scss']
})
export class PlaneModelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    geometry = new THREE.BoxGeometry(.5, .7, .3);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = -53.48;
    camera.position.y = 6.497;
    camera.position.x = 24.172;
    camera.rotation.y = 4;
    raycaster = new THREE.Raycaster();
    controls = new OrbitControls(camera, renderer.domElement);
    controls.noPan = false;
    controls.noRotate = false;
    controls.noZoom = false;
    controls.maxDistance = 65;
    controls.minDistance = 15;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    light = new THREE.AmbientLight(0x404040, 3);
    loader = new FBXLoader();
    scene.add(camera);
    scene.add(light);
    scene.background = new THREE.Color('lightblue');
    loader.load('assets/a380.fbx', function (object3d) {
      object3d.children.splice(10, 1);
      object3d.scale.set(.01, .01, .01);

      scene.add(object3d);


      roadGeometry = new THREE.PlaneGeometry(28, 425, 20);
      road = new THREE.Mesh(roadGeometry, new THREE.MeshLambertMaterial({ color: 'grey'}));
      road.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
      road.position.y = -7.8;
      road.position.z = 160;
      scene.add(road);

      pyramidGeometry = new THREE.TetrahedronGeometry(60, 0);
      pyramidGeometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, -1).normalize(), Math.atan(Math.sqrt(2))));
      pyramid = new THREE.Mesh(pyramidGeometry, new THREE.MeshLambertMaterial({color: 'grey'}));
      pyramid.position.x = -52;
      pyramid.position.y = -4.8;
      pyramid.position.z = 160;
      // pyramid.rotation.x = 6.7;s
      scene.add(pyramid);

      sunGeometry = new THREE.SphereGeometry(15, 20, 20);
      sun = new THREE.Mesh(sunGeometry, new THREE.MeshLambertMaterial({color: 'orange'}));
      sun.position.x = -68;
      sun.position.y = 50;
      sun.position.z = 200;
      scene.add(sun);

      sunlight = new THREE.PointLight('orange', 1, 150);
      // sunlight.position.set(-58, 60, 180);
      sunlight.position.x = -68;
      sunlight.position.y = 50;
      sunlight.position.z = 200;
      scene.add(sunlight);


      cloudGeometry = new THREE.SphereGeometry(10, 20, 20);
      cloud1 = new THREE.Mesh(cloudGeometry, new THREE.MeshLambertMaterial({color: 'white'}));
      cloud2 = new THREE.Mesh(cloudGeometry, new THREE.MeshLambertMaterial({color: 'white'}));
      cloud3 = new THREE.Mesh(cloudGeometry, new THREE.MeshLambertMaterial({color: 'white'}));
      cloud4 = new THREE.Mesh(cloudGeometry, new THREE.MeshLambertMaterial({color: 'white'}));
      cloud1.position.x = -300;
      cloud1.position.y = 60;
      cloud1.position.z = 200;

      cloud2.position.x = -330;
      cloud2.position.y = 60;
      cloud2.position.z = 200;

      cloud3.position.x = -315;
      cloud3.position.y = 70;
      cloud3.position.z = 200;

      cloud4.position.x = -345;
      cloud4.position.y = 70;
      cloud4.position.z = 200;

      scene.add(cloud1, cloud2, cloud3, cloud4);

      for (let i = 0; i < 1500; i ++) {
        groundGeomety = new THREE.IcosahedronGeometry(4, 0);
        ground = new THREE.Mesh(groundGeomety, new THREE.MeshLambertMaterial({ color: 'grey' }));
        ground.rotation.y = Math.floor(Math.random() * 11);
        ground.rotation.x = Math.floor(Math.random() * 11);
        ground.position.y = -10.9;
        ground.position.z = Math.floor(Math.random() * -425) + 375;
        ground.position.x = Math.floor(Math.random() * 75) + 10;
        scene.add(ground);
      }

      for (let i = 0; i < 4000; i ++) {
        groundGeomety = new THREE.IcosahedronGeometry(4, 0);
        ground = new THREE.Mesh(groundGeomety, new THREE.MeshLambertMaterial({ color: 'grey' }));
        ground.rotation.y = Math.floor(Math.random() * 11);
        ground.rotation.x = Math.floor(Math.random() * 11);
        ground.position.y = -10.9;
        ground.position.z = Math.floor(Math.random() * 425) - 50;
        ground.position.x = Math.floor(Math.random() * -250) - 10;
        scene.add(ground);
      }

      for (let i = 0; i <= 34; i++) {
        for (let j = 1; j <= 5; j++) {
          box = new THREE.Mesh(new THREE.BoxGeometry(.5, .7, .3), new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors }));

          // box.name = `Seat : ${i + 1}${this.seat}`;
          if (j === 3) {
            continue;
          } else if (i === 6 || i === 7 || i === 22 || i === 23 || i === 30 || i === 31) {
            continue;
          } else if (i === 1 && j === 5) {
            box.material.emissive.setHex(0x0b1963);
            box.position.z = i - 14.1;
            box.position.y = 1;
            box.position.x = j - 3;
            scene.add(box);
          } else if ((i === 10 && j === 4) || (i === 20 && j === 2) || (i === 8 && j === 1) || (i === 14 && j === 5) ||
            (i === 10 && j === 2) || (i === 24 && j === 1) || (i === 1 && j === 2) || (i === 28 && j === 4) || (i === 34 && j === 2)
            || (i === 32 && j === 5)) {
            box.material.emissive.setHex(0x414203);
            box.position.z = i - 14.1;
            box.position.y = 1;
            box.position.x = j - 3;
            scene.add(box);
          } else {
            box.position.z = i - 14.1;
            box.position.y = 1;
            box.position.x = j - 3;
            scene.add(box);
          }
        }
      }
      for (let i = 0; i <= 37; i++) {
        for (let j = 1; j <= 5; j++) {
          box = new THREE.Mesh(new THREE.BoxGeometry(.5, .7, .3), new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors }));
          // box.material.emissive.setHex(0x0b1963);
          // box.name = `Seat : ${i + 1}${this.seat}`;
          if (j === 3) {
            continue;
          } else if (i === 7 || i === 8 || i === 20 || i === 21 || i === 30 || i === 31) {
            continue;
          } else if ((i === 10 && j === 4) || (i === 20 && j === 2) || (i === 8 && j === 1) || (i === 14 && j === 5) ||
            (i === 10 && j === 2) || (i === 24 && j === 1) || (i === 1 && j === 2) || (i === 28 && j === 4) || (i === 34 && j === 2)
            || (i === 32 && j === 5)) {
            box.material.emissive.setHex(0x414203);
            box.position.z = i - 18.3;
            box.position.y = -1.6;
            box.position.x = j - 3;
            scene.add(box);
          } else {
            box.position.z = i - 18.3;
            box.position.y = -1.6;
            box.position.x = j - 3;
            scene.add(box);
          }
        }
      }
    },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '%loaded');
      },
      function (error) {
        console.log(error);
      });
    document.addEventListener('click', this.onMouseMove, false);
    this.render();

  }

  render() {
    // ground.rotation.x += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(this.render.bind(this));
    controls.update();
  }

  onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    const currentHex = intersects[0].object.material.emissive.getHex();
    if (currentHex !== 727395 && currentHex !== 4276739 && currentHex !== 434205) {
      return;
    }
    if (intersects.length > 0) {
      if (intersects[0].object !== INTERSECTED) {
        if (INTERSECTED) {
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        }
        INTERSECTED = intersects[0].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        if (currentHex === 727395) {
          // intersects[0].object.callback(INTERSECTED.name);
          return;
        }
        INTERSECTED.material.emissive.setHex(0x123d1e);
        // intersects[0].object.callback(INTERSECTED.name, intersects[0].object.uuid);
      }
    } else {
      if (INTERSECTED) {
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
      }
    }
  }
}
