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

@Component({
  selector: 'app-plane-model',
  templateUrl: './plane-model.component.html',
  styleUrls: ['./plane-model.component.scss']
})
export class PlaneModelComponent implements OnInit {
  geometry: any;

  constructor() { }

  ngOnInit() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    this.geometry = new THREE.BoxGeometry(.5, .7, .3);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = -100;
    camera.position.y = 17.60;
    camera.position.x = 69.29;
    camera.rotation.y = 4;
    controls = new OrbitControls(camera);
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
      console.log(object3d);
      // object3d.position.y = 100;
      object3d.scale.set(.01, .01, .01);

      scene.add(object3d);

      for (let i = 0; i <= 30; i++) {
        for (let j = 1; j <= 5; j++) {
          box = new THREE.Mesh(new THREE.BoxGeometry(.5, .7, .3), new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors }));
          box.material.emissive.setHex(0x0b1963);
          // box.name = `Seat : ${i + 1}${this.seat}`;
          if (j === 3) {
            continue;
          } else {
            box.position.z = i - 12;
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
    this.render();

  }

  render() {
    renderer.render(scene, camera);
    requestAnimationFrame(this.render.bind(this));
    controls.update();
  }
}
