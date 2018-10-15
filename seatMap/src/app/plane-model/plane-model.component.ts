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
    camera.position.z = -100;
    camera.position.y = 17.60;
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
    loader.load('assets/a380.fbx', function (object3d) {
      object3d.children.splice(10, 1);
      object3d.scale.set(.01, .01, .01);

      scene.add(object3d);

      for (let i = 0; i <= 34; i++) {
        for (let j = 1; j <= 5; j++) {
          box = new THREE.Mesh(new THREE.BoxGeometry(.5, .7, .3), new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors }));
          box.material.emissive.setHex(0x06a01d);
          // box.name = `Seat : ${i + 1}${this.seat}`;
          if (j === 3) {
            continue;
          } else if (i === 6 || i === 7 || i === 22 || i === 23 || i === 30 || i === 31) {
            continue;
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
          box.material.emissive.setHex(0x0b1963);
          // box.name = `Seat : ${i + 1}${this.seat}`;
          if (j === 3) {
            continue;
          } else if (i === 7 || i === 8 || i === 20 || i === 21 || i === 30 || i === 31) {
            continue;
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
