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

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = -238;
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
    loader.load('assets/a380.fbx', function(object3d) {
      object3d.children.splice(10, 1);
      console.log(object3d);
      // object3d.position.y = 100;
      object3d.scale.set(.05, .05, .05);

      scene.add(object3d);
    },
    function(xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '%loaded');
    },
    function(error) {
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
