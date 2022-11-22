const modelurl = "./models/border.glb";
const modelurl2 = "./models/dots.glb";
const line6 = "./models/line6.glb";

const loadModel = (url) => {
  return new Promise((resolve, reject) => {
    const manager = new THREE.LoadingManager();
    const loader = new THREE.GLTFLoader(manager);
    loader.load(
      url,
      function (gltf) {
        resolve(gltf.scene);
      }
    );
  });
}

window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
// if(isMobile){
//   document.getElementById('scroll').style.display = 'none';
// }

let shield1StartPosition = null;
let shield2StartPosition = null;
let shield3StartPosition = null;
const sceneMeshes = [];
window.modelDots = [];
let composer, shield1, shield2, shield3, line1, line2, line3, line4, plane1, plane2, plane3;
let shield1Pivot = new THREE.Object3D();
let shield2Pivot = new THREE.Object3D();
let shield3Pivot = new THREE.Object3D();
let lockShiled1 = isMobile;
let lockShiled2 = isMobile;
let lockShiled3 = isMobile;
let lockLookShieled = false;
let rotationPivot = true;

let scene = new THREE.Scene();

const loader = new THREE.TextureLoader();
const texture = loader.load('textures/NewSkyboxFace4.jpg');

scene.background = texture;

let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);

scene.add(camera);

let renderer = new THREE.WebGLRenderer({
  antialias: false
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = Math.pow(1.1, 1.1);

const canvasElement = document.getElementById('background').appendChild(renderer.domElement);
console.log('canvasElement', canvasElement)

const pointLight = new THREE.PointLight(0xffffff, 1.7);
camera.add(pointLight);

camera.position.z = 70;
camera.position.y = 10;

window.step = 1;
let pivot = new THREE.Object3D();
scene.add(pivot);

const renderScene = new THREE.RenderPass(scene, camera);

const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0;
bloomPass.strength = 1.1;
bloomPass.radius = 0;

composer = new THREE.EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

const effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
effectFXAA.uniforms['resolution'].value.x = 1 / (window.innerWidth * renderer.getPixelRatio());
effectFXAA.uniforms['resolution'].value.y = 1 / (window.innerHeight * renderer.getPixelRatio());
composer.addPass(effectFXAA);


let material = new THREE.MeshStandardMaterial({
  color: 0x00b3ff,
  side: THREE.DoubleSide
});
let materialGreen = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide
});

let customMaterial = new THREE.ShaderMaterial({
  uniforms: {
    "s": {
      type: "f",
      value: -1.0
    },
    "b": {
      type: "f",
      value: 1.0
    },
    "p": {
      type: "f",
      value: 2.0
    },
    glowColor: {
      type: "c",
      value: new THREE.Color('#00b3ff')
    }
  },
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent,
  side: THREE.DoubleSide,
  blending: THREE.AdditiveBlending,
  transparent: false
})

let customMaterialWhite = customMaterial.clone();
customMaterialWhite.uniforms.glowColor.value.set(new THREE.Color('#ffffff'));

let fixY = -12.5;
loadModel(modelurl).then((model) => {
  pivot.add(model);
  model.position.y = fixY;
  model.traverse((node) => {
    if (node.isMesh) {
      node.material = customMaterial;
    }
  });
});

loadModel(modelurl2).then((model) => {
  pivot.add(model);
  model.position.y = fixY;
  model.traverse((node) => {
    if (node.isMesh) {
      node.material = material;
    }
  });
  model.children[5].material = customMaterialWhite;
  model.children[4].material = customMaterialWhite;
  model.children[6].material = customMaterialWhite;
  model.children[5].visible = false;
  model.children[4].visible = false;
  model.children[6].visible = false;
  modelDots = model;
});

if (!isMobile) {
  loadModel(line6).then((model) => {
    model.traverse((node) => {
      if (node.isMesh) {
        node.material = material;
      }
    });

    let modelc = model.clone();
    modelc.scale.set(1.85, 1.85, 1.85);

    let linePivot = new THREE.Object3D();
    linePivot.add(modelc);
    linePivot.rotation.z = Math.PI / 4;
    line1 = modelc;
    scene.add(linePivot);

    modelc = model.clone();
    modelc.scale.set(1.85, 1.85, 1.85);
    linePivot = new THREE.Object3D();
    linePivot.add(modelc);
    linePivot.rotation.z = -Math.PI / 4;
    line2 = modelc;
    scene.add(linePivot);

    modelc = model.clone();
    modelc.scale.set(1.25, 1.25, 1.25);
    linePivot = new THREE.Object3D();
    linePivot.add(modelc);
    linePivot.rotation.z = Math.PI / 2;
    line3 = modelc;
    scene.add(linePivot);

    modelc = model.clone();
    modelc.scale.set(1.25, 1.25, 1.25);
    linePivot = new THREE.Object3D();
    linePivot.add(modelc);
    linePivot.position.y = 5;
    line4 = modelc;
    scene.add(linePivot);
  });
}

let shield1l = new THREE.Object3D();
shield1l.position.y = fixY;
shield1l.position.x = 16.5;
shield1l.position.z = 0.5;
shield1l.visible = false;

let shield2l = shield1l.clone();
let shield3l = shield1l.clone();

shield1 = shield1l;
shield2 = shield2l;
shield3 = shield3l;

shield2.position.x = -23.5;
shield2.position.y = 0;
shield3.position.y = 26;
shield3.position.x = 0;

shield1Pivot.add(shield1);
shield2Pivot.add(shield2);
shield3Pivot.add(shield3);

scene.add(shield1Pivot);
scene.add(shield2Pivot);
scene.add(shield3Pivot);

shield1StartPosition = {
  x: shield1.position.x,
  y: shield1.position.y,
  z: shield1.position.z,
}

shield2StartPosition = {
  x: shield2l.position.x,
  y: shield2l.position.y,
  z: shield2l.position.z,
}

shield3StartPosition = {
  x: shield3l.position.x,
  y: shield3l.position.y,
  z: shield3l.position.z,
}

let shieldPivotRotationZ = 0;

const animate = () => {
  requestAnimationFrame(animate);
  if (rotationPivot)
    pivot.rotation.y += 0.01;
  shieldPivotRotationZ += 0.01;
  if (shieldPivotRotationZ >= (Math.PI * 2)) {
    shieldPivotRotationZ = 0;
  }
  shieldPivotRotationZ += 0.01;
  if (line1) {
    line1.rotation.y += 0.026;
  }
  if (line2) {
    line2.rotation.y -= 0.016;
  }
  if (line3) {
    line3.rotation.y += 0.026;
    if (step == 1) {
      line3.scale.set(0, 0, 0);
    } else {
      line3.scale.set(1.25, 1.25, 1.25);
    }
  }
  if (line4) {
    line4.rotation.y -= 0.016;
  }
  if (!lockShiled1) {
    shield1Pivot.rotation.z = shieldPivotRotationZ;
  }
  if (!lockShiled2) {
    shield2Pivot.rotation.z = shieldPivotRotationZ;
  }
  if (!lockShiled3) {
    shield3Pivot.rotation.z = shieldPivotRotationZ;
  }
  composer.render();
  TWEEN.update();
};

animate();

let tasks = [];

const clearTasks = () => {
  TWEEN.removeAll();

  for (let i = -0; i < tasks.length; i++) {
    clearTimeout(tasks[i]);
  }
}

const cameraSetup = (point, duration) => {
  new TWEEN.Tween(camera.rotation).to(point, duration ? duration : 2000).start();
}


window.step1 = () => {
  rotationPivot = true;

  clearTasks();

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(cameraFrom)
    .to({
      x: 0,
      y: 15,
      z: 20
    }, 2000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    }).start();
}

window.step2 = () => {
  rotationPivot = true;
  modelDots.children[2].visible = true;
  modelDots.children[5].visible = false;

  clearTasks();
  cameraSetup({
    x: 0,
    y: 0,
    z: 0
  }, 1450);

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(cameraFrom)
    .to({
      x: -20,
      y: 0,
      z: 80
    }, 3000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onComplete(function () {})
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    }).start();

  lockShiled2 = false;
  lockLookShieled = false;
}

window.step3 = () => {
  rotationPivot = false;
  modelDots.children[1].visible = true;
  modelDots.children[4].visible = false;

  modelDots.children[0].visible = true;
  modelDots.children[6].visible = false;

  clearTasks();
  cameraSetup({
    x: 0,
    y: 0,
    z: 0
  }, 1450);
  new TWEEN.Tween(pivot.rotation).to({
    x: 0,
    y: 0,
    z: 0
  }, 1500).start();

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  pivot.rotation.x = 0;
  pivot.rotation.y = 0;
  pivot.rotation.z = 0;

  new TWEEN.Tween(cameraFrom)
    .to({
      x: -10,
      y: 0,
      z: 35
    }, 1500)
    .easing(TWEEN.Easing.Cubic.Out)
    .onComplete(function () {})
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    }).onComplete(function () {
      modelDots.children[2].visible = false;
      modelDots.children[5].visible = true;
      new TWEEN.Tween(pivot.rotation).to({
        x: 0,
        y: 1.3,
        z: 0.8
      }, 1500).start();
    }).start();

  shield2.position.copy(shield2StartPosition);
  lockShiled2 = false;
  lockLookShieled = false;
}

window.step4 = () => {
  rotationPivot = true;
  modelDots.children[2].visible = true;
  modelDots.children[5].visible = false;
  modelDots.children[1].visible = true;
  modelDots.children[4].visible = false;

  clearTasks();
  cameraSetup({
    x: 0,
    y: 0,
    z: 0
  }, 1450);

  lockShiled2 = false;
  lockLookShieled = false;

  shield1.position.z = 0
  shield1.position.x = 6;
  shield1.position.y = 20;

  shield2Pivot.rotation.z = 0;
  lockShiled2 = false;
  shield2.position.z = 0.5;
  shield2.position.x = 20;
  shield2.position.y = 12;

  lockShiled3 = false;
  shield3.position.z = 0;
  shield3.position.x = 25.8;
  shield3.position.y = -3;

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(cameraFrom)
    .to({
      x: 30,
      y: 10,
      z: 80
    }, 3000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    }).start();
}

window.step5 = () => {
  rotationPivot = false;

  clearTasks();

  let cloneCamera = camera.clone();
  const start = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);

  const point = sphere(modelDots.children[1]).center.normalize();
  const camDistance = cloneCamera.position.length() * 0.28;
  cloneCamera.position.copy(point).normalize().multiplyScalar(camDistance);

  const end = new THREE.Vector3(cloneCamera.position.x, cloneCamera.position.y, cloneCamera.position.z);

  shield2.position.x = 24;
  shield2.position.y = 0;
  shield2.position.z = 0.7;
  lockShiled2 = true;
  lockLookShieled = true;

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(camera.rotation)
    .to({
      x: 0,
      y: -0.2,
      z: 0
    }, 500)
    .onComplete(function () {
      new TWEEN.Tween(cameraFrom)
        .to({
          z: 2,
          x: 58,
          y: 0
        }, 1500)
        .delay(500)
        .onUpdate(function () {
          camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
          shield2.lookAt(camera.position)
          camera.lookAt(shield2.position)
        }).onComplete(function () {
          new TWEEN.Tween(camera.position)
            .to(end, 500)
            .onUpdate(function () {
              shield2.lookAt(camera.position)
              //camera.lookAt(shield2.position)
              camera.lookAt(point);
            })
            .onComplete(function () {
              modelDots.children[1].visible = false;
              modelDots.children[4].visible = true;
            }).start()
        }).start();
    }).start();

  cameraSetup({
    x: -0.2347317536273475,
    y: 0.07404189755525604,
    z: 0.017688367787720344
  }, 1000);

  new TWEEN.Tween(shield2Pivot.rotation)
    .onUpdate(function () {
      shield2.lookAt(camera.position);
    })
    .to({
      z: 0
    }, 500)
    .start();
}

window.step6 = () => {
  rotationPivot = true;
  modelDots.children[1].visible = true;
  modelDots.children[4].visible = false;

  modelDots.children[0].visible = true;
  modelDots.children[6].visible = false;

  clearTasks();
  cameraSetup({
    x: 0,
    y: 0,
    z: 0
  }, 1450);

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(cameraFrom)
    .to({
      x: -20,
      y: 0,
      z: 80
    }, 3000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onComplete(function () {})
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    }).start();

  shield2.position.copy(shield2StartPosition);
  lockShiled2 = false;
  lockLookShieled = false;
}

window.step7 = () => {
  clearTasks();

  rotationPivot = false;
  shield2.position.x = 23.5;
  shield2.position.y = 0;
  shield2.position.z = 0.5;
  lockShiled2 = true;
  lockLookShieled = true;

  let cloneCamera = camera.clone();
  const start = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);

  const point = sphere(modelDots.children[0]).center.normalize();
  const camDistance = cloneCamera.position.length() * 0.38;
  cloneCamera.position.copy(point).normalize().multiplyScalar(camDistance);

  const end = new THREE.Vector3(cloneCamera.position.x, cloneCamera.position.y, cloneCamera.position.z);

  new TWEEN.Tween(camera.position)
    .to({
      z: 80,
      x: 28,
      y: 0
    }, 500)
    .onComplete(function () {
      new TWEEN.Tween(camera.position)
        .to({
          z: 0.5,
          x: 48,
          y: 0
        }, 500)
        .onUpdate(function () {
          shield2.lookAt(camera.position);
          camera.lookAt(shield2.position);
        })
        .onComplete(function () {
          new TWEEN.Tween(camera.position)
            .to(end, 2000)
            .easing(TWEEN.Easing.Cubic.Out)
            .onUpdate(function () {
              shield2.lookAt(camera.position);
              camera.lookAt(shield2.position);
              camera.lookAt(point);
            })
            .onComplete(function () {
              modelDots.children[0].visible = false;
              modelDots.children[6].visible = true;
            }).start()
        }).start();
    }).start();

  new TWEEN.Tween(shield2Pivot.rotation)
    .onUpdate(function () {
      shield2.lookAt(camera.position);
    })
    .to({
      z: 0
    }, 1000)
    .start();
}

window.step8 = () => {
  rotationPivot = true;
  modelDots.children[0].visible = true;
  modelDots.children[6].visible = false;

  clearTasks();
  cameraSetup({
    x: -0.2,
    y: 0,
    z: 0
  }, 1050);

  lockShiled2 = false;
  lockLookShieled = false;

  shield1.position.z = 0
  shield1.position.x = 6;
  shield1.position.y = 20;

  shield2Pivot.rotation.z = 0;
  lockShiled2 = false;
  shield2.position.z = 0.5;
  shield2.position.x = 20;
  shield2.position.y = 12;

  lockShiled3 = false;
  shield3.position.z = 1;
  shield3.position.x = 25.8;
  shield3.position.y = -3;

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(cameraFrom)
    .to({
      x: 30,
      y: 10,
      z: 80
    }, 3000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    }).start();

  new TWEEN.Tween(shield1Pivot.scale).to({
    x: 1,
    y: 1,
    z: 1
  }, 1000).start();
  new TWEEN.Tween(shield2Pivot.scale).to({
    x: 1,
    y: 1,
    z: 1
  }, 1000).start();
  new TWEEN.Tween(shield3Pivot.scale).to({
    x: 1,
    y: 1,
    z: 1
  }, 1000).start();
}

window.step9 = () => {
  rotationPivot = true;

  clearTasks();
  cameraSetup({
    x: 0,
    y: 0,
    z: 0
  }, 1050);

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(cameraFrom)
    .to({
      x: -23,
      y: 5,
      z: 75
    }, 3000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    }).start();

  new TWEEN.Tween(shield1Pivot.scale).to({
    x: 10,
    y: 10,
    z: 10
  }, 1000).start();
  new TWEEN.Tween(shield2Pivot.scale).to({
    x: 10,
    y: 10,
    z: 10
  }, 1000).start();
  new TWEEN.Tween(shield3Pivot.scale).to({
    x: 10,
    y: 10,
    z: 10
  }, 1000).start();
}



window.mobileStep1 = () => {
  rotationPivot = true;
  clearTasks();

  // modelDots.children[1].visible = false;
  // modelDots.children[2].visible = false;
  // modelDots.children[4].visible = false;
  // modelDots.children[5].visible = false;
  // line1.visible = false;
  // line2.visible = false;
  // line3.visible = false;
  // line4.visible = false;

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(cameraFrom)
    .to({
      x: 0,
      y: 15,
      z: 20
    }, 2000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    }).start();
}

window.mobileStep2 = () => {
  rotationPivot = true;
  // modelDots.children[0].visible = false;
  modelDots.children[1].visible = false;
  modelDots.children[2].visible = false;
  modelDots.children[4].visible = false;
  modelDots.children[5].visible = false;
  modelDots.children[6].visible = false;

  clearTasks();
  cameraSetup({
    x: 0,
    y: 0,
    z: 0
  }, 1450);

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(pivot.rotation)
    .to({
      y: 0,
      x: 0
    }, 2000)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();

  new TWEEN.Tween(cameraFrom)
    .to({
      x: 0,
      y: 20,
      z: 100
    }, 2000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onComplete(function () {})
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    }).start();

  lockShiled2 = false;
  lockLookShieled = false;
}

window.mobileStep3 = () => {

  rotationPivot = false;
  modelDots.children[0].visible = false;
  modelDots.children[1].visible = false;
  modelDots.children[2].visible = false;
  modelDots.children[4].visible = false;
  modelDots.children[5].visible = false;
  modelDots.children[6].visible = false;

  clearTasks();

  lockShiled2 = true;
  lockLookShieled = true;

  shield2.position.copy(shield2StartPosition);
  cameraSetup({
    x: 0,
    y: 0,
    z: 0
  }, 2000);

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(cameraFrom)
    .to({
      x: 0,
      y: 10,
      z: 80
    }, 2000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    })
    .onComplete(function () {
      new TWEEN.Tween(pivot.rotation)
        .to({
          y: 1.6,
          x: 0.5
        }, 2000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onComplete(function () {
          modelDots.children[2].visible = false;
          modelDots.children[5].visible = true;
        }).start();
    }).start();
}

window.mobileStep4 = () => {

  rotationPivot = false;
  modelDots.children[0].visible = false;
  modelDots.children[1].visible = false;
  modelDots.children[2].visible = false;
  modelDots.children[4].visible = false;
  modelDots.children[5].visible = false;
  modelDots.children[6].visible = false;

  clearTasks();

  lockShiled2 = true;
  lockLookShieled = true;

  shield2.position.copy(shield2StartPosition);
  cameraSetup({
    x: 0,
    y: 0,
    z: 0
  }, 2000);

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(cameraFrom)
    .to({
      x: 0,
      y: 10,
      z: 80
    }, 2000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    })
    .onComplete(function () {
      new TWEEN.Tween(pivot.rotation)
        .to({
          y: 3.9,
          x: 0.5
        }, 2000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onComplete(function () {
          modelDots.children[1].visible = false;
          modelDots.children[4].visible = true;
        }).start();
    }).start();
}

window.mobileStep5 = () => {

  rotationPivot = false;
  modelDots.children[0].visible = false;
  modelDots.children[1].visible = false;
  modelDots.children[2].visible = false;
  modelDots.children[4].visible = false;
  modelDots.children[5].visible = false;
  modelDots.children[6].visible = false;

  clearTasks();

  lockShiled2 = true;
  lockLookShieled = true;

  shield2.position.copy(shield2StartPosition);
  cameraSetup({
    x: 0,
    y: 0,
    z: 0
  }, 2000);

  let cameraFrom = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  new TWEEN.Tween(cameraFrom)
    .to({
      x: 0,
      y: 10,
      z: 80
    }, 2000)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(function () {
      camera.position.set(cameraFrom.x, cameraFrom.y, cameraFrom.z);
    })
    .onComplete(function () {
      new TWEEN.Tween(pivot.rotation)
        .to({
          y: 2.9,
          x: 2
        }, 2000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onComplete(function () {
          modelDots.children[0].visible = false;
          modelDots.children[6].visible = true;
        }).start();
    }).start();
}

function sphere(object) {
  let sphere;
  object.updateMatrixWorld();
  object.geometry.computeBoundingSphere();
  sphere = object.geometry.boundingSphere.clone();
  sphere.applyMatrix4(object.matrixWorld);
  return sphere;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);