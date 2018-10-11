import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import { ThenableWebDriver } from 'selenium-webdriver';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

let raycaster;
let INTERSECTED;
const mouse = new THREE.Vector2();
let seatGroup;
let camera;
let renderer;
let box;
const scene = new THREE.Scene();
let textGeometry;
const priceArray = [];
let cameraView: number;

@Component({
  selector: 'app-anders-map',
  templateUrl: './anders-map.component.html',
  styleUrls: ['./anders-map.component.scss']
})
export class AndersMapComponent implements OnInit {
  light: any;
  sunLight: any;
  controls: any;
  loader: any;

  outsideIndex = 0;

  text: any;

  legend1: any;
  legend2: any;
  legend3: any;
  legendGeometry: any;

  seatMaterials: Array<any>;
  sun: any;
  objects: Array<any>;

  selectedSeat: any;
  seatPrice: any;

  dxPerFrame = .01;

  planeBody: any;
  planeBodyGeometry: any;

  planeBelly: any;
  planeBellyGeometry: any;

  runway: any;
  runwayGeometry: any;

  planeCover: any;
  planeCoverGeometry: any;

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
  sunCloud1: any;
  sunCloud2: any;
  sunCloud3: any;
  sunCloud4: any;
  cloud1: any;
  cloud2: any;
  cloud3: any;
  cloud4: any;
  cloud5: any;
  cloud6: any;
  cloud7: any;
  cloud8: any;
  cloud9: any;


  geometry: any;
  material: any;

  mouse: any;
  intersects: any;
  intersected: any;
  currentHex: String;
  seat: String;

  constructor(public breakPointObserver: BreakpointObserver) {
  }
  ngOnInit() {
    this.seatPrice = '';
    this.selectedSeat = 'Seat : 8C';
    this.breakPointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          cameraView = 110;
        } else {
          cameraView = 75;
        }
      });

    scene.background = new THREE.Color('lightgrey');
    this.mouse = new THREE.Vector2();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(cameraView, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 16;
    camera.position.y = 5;
    camera.position.x = 7;
    raycaster = new THREE.Raycaster();
    scene.add(camera);

    this.geometry = new THREE.BoxGeometry(.5, .7, .3);
    this.material = new THREE.MeshLambertMaterial();

    this.legendGeometry = new THREE.BoxGeometry(.2, .2, .3);
    this.legendGeometry.faces[0].color.setHex(0xe6e6e6);
    this.legendGeometry.faces[1].color.setHex(0xe6e6e6);
    this.legendGeometry.faces[2].color.setHex(0xf2f2f2);
    this.legendGeometry.faces[3].color.setHex(0xf2f2f2);
    this.legendGeometry.faces[4].color.setHex(0xf2f2f2);
    this.legendGeometry.faces[5].color.setHex(0xf2f2f2);

    this.sunGeometry = new THREE.SphereGeometry(3, 20, 20);
    this.sunMaterial = new THREE.MeshLambertMaterial({ color: '#FF8C00'});

    this.cloudGeometry = new THREE.SphereGeometry(1, 10, 10);
    this.cloudMaterial = new THREE.MeshLambertMaterial({ color: 'white'});

    this.engineGeometry = new THREE.CylinderGeometry(.5, .5, 4, 32);
    this.engineMaterial = new THREE.MeshLambertMaterial({ color: 'gray' });

    this.planeFrontGeometry = new THREE.ConeGeometry(3, 10, 30, Math.PI * 2, false);

    this.planeBodyGeometry = new THREE.PlaneGeometry(5, 20, 32);

    this.planeBellyGeometry = new THREE.CylinderGeometry(1.85, 2.25, 10, 32, 32);

    this.runwayGeometry = new THREE.PlaneGeometry(1, 20, 32);

    this.loader = new THREE.FontLoader();

    this.planeWingGeometry = new THREE.Geometry(200, 200, 200);
    this.planeWingMaterial = new THREE.MeshLambertMaterial();
    this.v1 = new THREE.Vector3(12, 0, 0);
    this.v2 = new THREE.Vector3(-12, 0, 0);
    this.v3 = new THREE.Vector3(0, 7, 0);

    this.planeWingGeometry.vertices.push(this.v1);
    this.planeWingGeometry.vertices.push(this.v2);
    this.planeWingGeometry.vertices.push(this.v3);

    this.planeWingGeometry.faces.push(new THREE.Face3(0, 2, 1));

    this.planeBody = new THREE.Mesh(this.planeBodyGeometry, new THREE.MeshLambertMaterial({color: 'gray'}));
    this.planeBody.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
    this.planeBody.position.x = 3;
    this.planeBody.position.y = -.4;
    this.planeBody.position.z = 10;
    scene.add(this.planeBody);

    this.runway = new THREE.Mesh(this.runwayGeometry, new THREE.MeshLambertMaterial({color: 'black'}));
    this.runway.position.x = 3;
    this.runway.position.y = -.35;
    this.runway.position.z = 10;
    this.runway.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
    scene.add(this.runway);


    this.planeBelly = new THREE.Mesh(this.planeBellyGeometry, new THREE.MeshLambertMaterial({color: 'gray'}));
    this.planeBelly.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
    this.planeBelly.position.x = 3;
    this.planeBelly.position.y = -3;
    this.planeBelly.position.z = 7;
    this.planeBelly.rotation.y = 180;
    scene.add(this.planeBelly);


    this.planeWing = new THREE.Mesh(this.planeWingGeometry, new THREE.MeshLambertMaterial({ color: 'gray' }));
    this.planeWing.position.x = 2.8;
    this.planeWing.position.y = -.4;
    this.planeWing.position.z = 1;
    this.planeWing.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
    scene.add(this.planeWing);



    this.planeFront = new THREE.Mesh(this.planeFrontGeometry, new THREE.MeshLambertMaterial({color: 'gray'}));
    this.planeFront.thetaLength = Math.PI;
    this.planeFront.position.x = 3;
    this.planeFront.position.y = -2;
    this.planeFront.position.z = -5.5;
    this.planeFront.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI * 2);
    this.planeFront.rotation.y = 45;
    scene.add(this.planeFront);

    this.legend1 = new THREE.Mesh(this.legendGeometry, new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors}));
    this.legend1.material.emissive.setHex(0x0b1963);
    this.legend1.position.x = 6.4;
    this.legend1.position.y = -2.7;
    this.legend1.position.z = 6;
    scene.add(this.legend1);

    this.loader.load('/node_modules/three/examples/fonts/Cardo_Bold.json', function (font) {
      const textMaterial = new THREE.MeshBasicMaterial({ color: 'white' });

      textGeometry = new THREE.TextGeometry('Your Seat', {
        font: font,
        size: 0.2,
        height: 0.1,
        curveSegments: 12,
        // bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = 6.7;
      textMesh.position.y = -2.7;
      textMesh.position.z = 6;
      textMesh.rotation.x = -.3;
      scene.add(textMesh);
    });

    this.legend2 = new THREE.Mesh(this.legendGeometry, new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors}));
    this.legend2.material.emissive.setHex(0x414203);
    this.legend2.position.x = 6.4;
    this.legend2.position.y = -1.7;
    this.legend2.position.z = 6;
    scene.add(this.legend2);

    this.loader.load('/node_modules/three/examples/fonts/Cardo_Bold.json', function (font) {
      const textMaterial = new THREE.MeshBasicMaterial({ color: 'white' });

      textGeometry = new THREE.TextGeometry('Available', {
        font: font,
        size: 0.2,
        height: 0.1,
        curveSegments: 12,
        // bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = 6.7;
      textMesh.position.y = -1.7;
      textMesh.position.z = 6;
      // textMesh.rotation.y = Math.PI / 7;
      textMesh.rotation.x = -.3;
      scene.add(textMesh);
    });

    this.legend3 = new THREE.Mesh(this.legendGeometry, new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors}));
    this.legend3.position.x = 6.4;
    this.legend3.position.y = -0.7;
    this.legend3.position.z = 6;
    scene.add(this.legend3);

    this.loader.load('/node_modules/three/examples/fonts/Cardo_Bold.json', function (font) {
      const textMaterial = new THREE.MeshBasicMaterial({ color: 'white' });

      textGeometry = new THREE.TextGeometry('Taken', {
        font: font,
        size: 0.2,
        height: 0.1,
        curveSegments: 12,
        // bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = 6.7;
      textMesh.position.y = -0.7;
      textMesh.position.z = 6;
      // textMesh.rotation.y = Math.PI / 7;
      textMesh.rotation.x = -.3;
      // textMesh.rotation.y = Math.PI / 7;
      scene.add(textMesh);
    });

    this.cloud1 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud1.position.x = -4.5;
    this.cloud1.position.y = 2;
    this.cloud1.position.z = -20;
    this.cloud2 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud2.position.x = -5.2;
    this.cloud2.position.y = 1;
    this.cloud2.position.z = -20;
    this.cloud3 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud3.position.x = -3.8;
    this.cloud3.position.y = 1;
    this.cloud3.position.z = -20;
    scene.add(this.cloud1, this.cloud2, this.cloud3);

    this.cloud4 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud4.position.x = 9.5;
    this.cloud4.position.y = -9;
    this.cloud4.position.z = -40;
    this.cloud5 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud5.position.x = 10.2;
    this.cloud5.position.y = -10;
    this.cloud5.position.z = -40;
    this.cloud6 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud6.position.x = 8.8;
    this.cloud6.position.y = -10;
    this.cloud6.position.z = -40;
    scene.add(this.cloud4, this.cloud5, this.cloud6);

    this.cloud7 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud7.position.x = 4.5;
    this.cloud7.position.y = 11;
    this.cloud7.position.z = -60;
    this.cloud8 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud8.position.x = 5.2;
    this.cloud8.position.y = 10;
    this.cloud8.position.z = -60;
    this.cloud9 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.cloud9.position.x = 3.8;
    this.cloud9.position.y = 10;
    this.cloud9.position.z = -60;
    scene.add(this.cloud7, this.cloud8, this.cloud9);

    this.sunCloud1 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.sunCloud1.position.x = -17.5;
    this.sunCloud1.position.y = 10;
    this.sunCloud1.position.z = -4.5;
    this.sunCloud2 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.sunCloud2.position.x = -14;
    this.sunCloud2.position.y = 9;
    this.sunCloud2.position.z = -4.5;
    this.sunCloud3 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.sunCloud3.position.x = -15;
    this.sunCloud3.position.y = 10;
    this.sunCloud3.position.z = -4.5;
    this.sunCloud4 = new THREE.Mesh(this.cloudGeometry, this.cloudMaterial);
    this.sunCloud4.position.x = -16.6;
    this.sunCloud4.position.y = 9;
    this.sunCloud4.position.z = -4.5;
    scene.add(this.sunCloud1, this.sunCloud2, this.sunCloud3, this.sunCloud4);


    this.engine = new THREE.Mesh(this.engineGeometry, this.engineMaterial);
    this.engine.position.x = -4;
    this.engine.position.y = -.6;
    this.engine.position.z = 3;
    this.engine.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
    scene.add(this.engine);

    this.engine1 = new THREE.Mesh(this.engineGeometry, this.engineMaterial);
    this.engine1.position.x = 9.5;
    this.engine1.position.y = -.6;
    this.engine1.position.z = 3;
    this.engine1.rotation.set(-Math.PI / 2, Math.PI / 3000, Math.PI);
    scene.add(this.engine1);

    // this.light = new THREE.AmbientLight(0xffffff, .5);
    this.light = new THREE.AmbientLight(0x404040, 3);
    this.sunLight = new THREE.PointLight(0xFF8C00, 2, 53);
    this.sunLight.position.x = -20;
    this.sunLight.position.y = 45;
    this.sunLight.position.z = -7;

    scene.add(this.sunLight);
    scene.add(this.light);


    this.controls = new TrackballControls(camera, renderer.domElement);
    this.controls.rotateSpeed = 2.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;


    this.controls.maxDistance = 15;
    this.controls.minDistance = 10;
    this.controls.noPan = false;
    this.controls.noRotate = false;
    this.controls.noZoom = false;

    this.controls.staticMoving = false;
    this.controls.dynamicDampingFactor = 0.3;

    this.controls.keys = [65, 83, 68];

    window.addEventListener('change', this.render);
    renderer.domElement.addEventListener('resize', this.onWindowResize, false);
    document.addEventListener('click', this.onMouseMove, false);

    this.sun = new THREE.Mesh(this.sunGeometry, this.sunMaterial);
    this.sun.material.emissive.setHex(0xFF4500);
    this.sun.position.x = -20;
    this.sun.position.y = 11;
    this.sun.position.z = -7;
    scene.add(this.sun);

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

    const selectedSeat = document.getElementsByClassName('selectedSeat');
    const seatPrice = document.getElementsByClassName('seatPrice');
    for (let i = 0; i <= 10; i++) {
      for (let j = 1; j <= 5; j++) {
        if (j === 1) {this.seat = 'A'; }
        if (j === 2) { this.seat = 'B'; }
        if (j === 4) { this.seat = 'C'; }
        if (j === 5) { this.seat = 'D'; }
        if (j === 3) {
          continue;
        } else if (j === 4 && i === 7) {
          box = new THREE.Mesh(this.geometry, new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors }));
          box.material.emissive.setHex(0x0b1963);
          box.name = `Seat : ${i + 1}${this.seat}`;
          box.position.z = i;
          box.position.x = j;
          box.callback = function (name) {
            selectedSeat[0].innerHTML = name;
            seatPrice[0].innerHTML = '';
          };
          seatGroup.children.push(box);
          scene.add(box);
        } else if ((j === 2 && i === 5) || (j === 1 && i === 8) || (j === 5 && i === 1) || (j === 4 && i === 3)) {
          box = new THREE.Mesh(this.geometry, new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors }));
          box.material.emissive.setHex(0x414203);
          box.name = `Seat : ${i + 1}${this.seat}`;
          box.uuid = this.outsideIndex;
          box.position.z = i;
          box.position.x = j;
          this.loader.load('/node_modules/three/examples/fonts/Cardo_Bold.json', function (font) {
            const textMaterial = new THREE.MeshBasicMaterial({ color: 'white' });

            textGeometry = new THREE.TextGeometry('$' + Math.floor(Math.random() * 101).toString() + '.00', {
              font: font,
              size: 0.3,
              height: 0.1,
              curveSegments: 12,
              // bevelEnabled: true,
              bevelThickness: 10,
              bevelSize: 8,
              bevelSegments: 5
            });

            priceArray.push('Price:' + ' ' + textGeometry.parameters.text);
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.x = j - .6;
            textMesh.position.y = 1;
            textMesh.position.z = i;
            textMesh.rotation.y = Math.PI / 7;
            scene.add(textMesh);
          });

          box.callback = function (name, index) {
            selectedSeat[0].innerHTML = name;
            seatPrice[0].innerHTML = priceArray[index];
          };
          seatGroup.children.push(box);
          scene.add(box);

          this.outsideIndex++;
        } else {
          box = new THREE.Mesh(this.geometry, new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors}));
          box.name = i + '-' + j;
          box.uuid = 'notSelected';
          box.position.z = i;
          box.position.x = j;
          box.callback = function(name, index) {
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
    this.cloud4.position.z += this.dxPerFrame;
    this.cloud5.position.z += this.dxPerFrame;
    this.cloud6.position.z += this.dxPerFrame;
    this.cloud7.position.z += this.dxPerFrame + 0.02;
    this.cloud8.position.z += this.dxPerFrame + 0.02;
    this.cloud9.position.z += this.dxPerFrame + 0.02;
    this.dxPerFrame = 0.004;
    this.sun.rotation.y += 0.001;
    this.sun.rotation.x += 0.001;
    this.legend1.rotation.y += 0.01;
    this.legend1.rotation.x += 0.01;
    this.legend2.rotation.y += 0.01;
    this.legend2.rotation.x += 0.01;
    this.legend3.rotation.y += 0.01;
    this.legend3.rotation.x += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(this.render.bind(this));
    this.controls.update();
  }


  onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    const currentHex = intersects[0].object.material.emissive.getHex();
    if (currentHex !== 727395 && currentHex !== 4276739) {
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
          intersects[0].object.callback(INTERSECTED.name);
          return; }
        INTERSECTED.material.emissive.setHex(0x123d1e);
        intersects[0].object.callback(INTERSECTED.name, intersects[0].object.uuid);
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
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

  }

}
