import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as FBXLoader from 'three-fbx-loader';
import TrackballControls from 'three-trackballcontrols';
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

let skyGeometry;
let sky;

let roadGeometry;
let road;

let ground;
let groundGeomety;

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
    camera.position.z = -50;
    camera.position.y = 18;
    camera.position.x = 69.29;
    camera.rotation.y = 4;
    raycaster = new THREE.Raycaster();
    controls = new TrackballControls(camera, renderer.domElement);
    controls.noPan = false;
    controls.noRotate = false;
    controls.noZoom = false;
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


      roadGeometry = new THREE.PlaneGeometry(28, 175, 20);
      road = new THREE.Mesh(roadGeometry, new THREE.MeshLambertMaterial({ color: 'brown'}));
      road.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
      road.position.y = -7.5;
      // road.position.x = -20;
      road.position.z = 40;
      scene.add(road);

      for (let i = 0; i < 1000; i ++) {
        groundGeomety = new THREE.IcosahedronGeometry(4, 0);
        ground = new THREE.Mesh(groundGeomety, new THREE.MeshLambertMaterial({ color: 'brown' }));
        ground.rotation.y = Math.floor(Math.random() * 11);
        ground.rotation.x = Math.floor(Math.random() * 11);
        ground.position.y = -10.9;
        ground.position.z = Math.floor(Math.random() * -200) + 150;
        ground.position.x = Math.floor(Math.random() * 70) + 10;
        scene.add(ground);
      }

      for (let i = 0; i < 1000; i ++) {
        groundGeomety = new THREE.IcosahedronGeometry(4, 0);
        ground = new THREE.Mesh(groundGeomety, new THREE.MeshLambertMaterial({ color: 'brown' }));
        ground.rotation.y = Math.floor(Math.random() * 11);
        ground.rotation.x = Math.floor(Math.random() * 11);
        ground.position.y = -10.9;
        ground.position.z = Math.floor(Math.random() * 200) - 50;
        ground.position.x = Math.floor(Math.random() * -70) - 10;
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
