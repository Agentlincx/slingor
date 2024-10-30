import * as gg from './three.module.js';
import {
  ArcballControls
} from "./ArcballControls.js";
import {
  GLTFLoader
} from './GLTFLoader.js';

/*
(function() {
  var canvas = document.querySelector('#can1');

  var loading = document.querySelector('#loading');
  var prog = loading.querySelector('.progressbar');
  var prov = loading.querySelector('.pv');

  //render
  var rend = new gg.WebGLRenderer({
    canvas: canvas,
    antialiasing: true,
    logarithmicDepthBuffer: true,
    shadowMap: true,
    shadowMapType: gg.PCFSoftShadowMap
  });
  rend.shadowMap.enabled = true;
  rend.physicallyCorrectLights = true;


  //camera
  var fov = 75;
  var cam = new gg.PerspectiveCamera(fov, 1, 13, 900);
  cam.position.set(0, 0, 30);



  //scene
  var scene = new gg.Scene();
  //scene.fog=new gg.Fog('white',50,100);


  //loadermanager
  var lm = new gg.LoadingManager();


  //object
  var obj = new gg.Object3D();
  var sobj = new gg.Object3D();


  //light
  var light = new gg.PointLight('white', 50);
  light.position.set(0, 0, 0);
  light.castShadow = true;
  obj.add(light);


  var textu = new gg.TextureLoader(lm);


  var sh = new gg.Shape();
  sh.moveTo(-1, -2);
  sh.bezierCurveTo(-1, -2, -1, -5, -5, -5);
  sh.bezierCurveTo(-11, -5, -11, 2, -11, 2);
  sh.bezierCurveTo(-11, 6, -8, 10.4, 0, 14);
  sh.bezierCurveTo(7, 10.4, 11, 6, 11, 2);
  sh.bezierCurveTo(11, 2, 11, -5, 5, -5);
  sh.bezierCurveTo(2, -5, 1, -2, 1, -2);
  sh.lineTo(1, -7);
  sh.lineTo(-1, -7);


  var exs = {
    steps: 2,
    depth: 2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: .1,
    bevelOffset: 0,
    bevelSegments: 5
  };

  var geo = new gg.ExtrudeGeometry(sh, exs);
  var mes = new gg.Mesh(geo, new gg.MeshPhongMaterial({
    color: 'white'
  }));
  mes.scale.set(0.3, 0.3, 0.3);
  mes.position.set(0, 7, -30);
  obj.add(mes);



  //TextGeometry
  var lod = new FontLoader();

  function flod(url) {
    return new Promise((resolve, reject)=> {
      lod.load(url, resolve, undefined, reject);
    });
  }


  (async function ctxt() {
    var font = await flod('../font/fot1.json');
    var tit = "ACE";

    var txt = new gg.Mesh(new TextGeometry(tit, {
      font: font,
      size: 6.0,
      height: 10.0,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.15,
      bevelSize: .1,
      bevelSegments: 5,
    }), new gg.MeshPhongMaterial({
      color: 'white'
    }));

    txt.position.set(-19, -7, -30)
    txt.castShadow = true;
    txt.receiveShadow = true;

    obj.add(txt);
  })();


  function lmat(url) {
    return new Promise((resolve, reject)=> {
      textu.load(url, resolve, undefined, reject);
    });
  }


  (function loadmaterial() {
    var plane = new gg.Mesh(new gg.BoxGeometry(70, 40, 60), [new gg.MeshPhongMaterial({
      map: textu.load ('../img/a.webp'), side: gg.BackSide
    }), new gg.MeshPhongMaterial({
      map: textu.load('../img/d.webp'), side: gg.BackSide
    }), new gg.MeshPhongMaterial({
      color: 'white', side: gg.BackSide
    }), new gg.MeshPhongMaterial({
      map: textu.load('../img/c.webp'), side: gg.BackSide
    }), new gg.MeshPhongMaterial({
      map: textu.load('../img/e.webp'), side: gg.BackSide
    }), new gg.MeshPhongMaterial({
      map: textu.load('../img/b.webp'), side: gg.BackSide
    })]);
    plane.receiveShadow = true;
    obj.add(plane);
  })();


  (function sph() {
    var sp = new gg.Mesh(new gg.SphereGeometry(4, 50, 50), new gg.MeshPhongMaterial({
      map: textu.load('../img/ball.webp')
    }));
    sp.castShadow = true;
    sp.receiveShadow = true;
    sp.rotation.y = Math.PI*0.5;
    sobj.add(sp);
    obj.add(sobj);
  })();


  obj.rotation.y = 0.1*Math.PI;
  obj.position.set(0, 0, 0);
  scene.add(obj);

  //loader
  lm.onLoad = ()=> {
    loading.style.display = 'none';
  };

  lm.onProgress = (url, loaded, total)=> {
    var progv = loaded/total;
    prog.style.transform = 'scaleX('+progv+')';
    prov.innerText = Math.round(loaded/total*100)+'%';
  }



  //render
  var anim;
  var step = 0;
  var cnt = 0;


  (anim = ()=> {
    requestAnimationFrame(anim);
    var canvas = rend.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    cam.aspect = width/height;
    cam.updateProjectionMatrix();

    var needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      rend.setSize(width, height, false);
    }


    step += 0.04;
    sobj.position.x = 20+(10*(Math.cos(step)));
    sobj.position.y = -17 +(10*Math.abs(Math.sin(step)));

    cnt++;

    if (cnt < 2500) {
      ftran();
    } else {
      stran()
    }

    function ftran() {
      if (cnt < 1900) {
        cam.position.set(0, 0, 30);
        obj.rotation.y += 0.003;
        if (cnt > 1700) {
          cam.zoom += 0.003;
        }
      }

      if (cnt > 1900 && cnt < 2100) {
        obj.position.x += 0.03;
      }

      if (cnt > 2100 && cnt < 2500) {
        obj.position.x -= 0.01;
      }
    }

    function stran() {
      if (cnt == 2500) {
        obj.rotation.x = 0;
        obj.rotation.y = 0;
        cam.zoom = 1;
      }

      if (cnt > 2500) {
        obj.rotation.y += 0.001;
        cam.position.set(-10, 40, 10);
        cam.lookAt(obj.position);

        if (cnt < 2800) {
          obj.rotation.x -= 0.01;
        }

        if (cnt > 2800) {
          obj.rotation.x += 0.003;
        }

        if (cnt > 3200) {
          obj.rotation.x = 0;
          obj.rotation.y = 0.1*Math.PI;
          cam.position.set(0, 0, 30);
          cam.lookAt(obj.position);
          obj.position.x = 2;
          cnt = 0;
        }

      }
    }

    rend.render(scene, cam);
    //ec.render(anim);
  })();

})();
*/

export async function orb() {
  var canvas = document.querySelector('#orb');

  var rend = new gg.WebGLRenderer({
    canvas: canvas,
    antialiasing: true,
    logarithmicDepthBuffer: true,
    shadowMap: true,
    alpha: true,
    shadowMapType: gg.PCFSoftShadowMap
  });
  rend.shadowMap.enabled = true;
  rend.setClearColor(0x000000,
    0);


  var fov = 75;
  var cam = new gg.PerspectiveCamera(fov,
    0.1,
    1,
    900);
  cam.position.set(-3,
    5.5,
    4);



  //scene
  var scene = new gg.Scene();

  var obj = new gg.Object3D();

  var light = new gg.DirectionalLight('white',
    2);
  light.position.set(-9,
    9,
    4);
  light.castShadow = true;
  scene.add(light);
  
  await losd("js/mod/d4.glb");
  
  var mixer;
  
  async function losd(a) {
    await flod(a).then(gltf => {

      var animations = gltf.animations;
      mixer = new gg.AnimationMixer(gltf.scene);

      var f = mixer.clipAction(animations[0]);
      f.setDuration(20);
      f.repetitions = "infinite";
      f.fadeIn(1);
      f.play();

      gltf.scene.position.set(0, 4, 0);
      gltf.scene.scale.set(1.5, 1.5, 1.5);
      obj.add(gltf.scene);
      obj.rotation.x = Math.PI * -0.1;
      
      scene.add(obj);

    },
      e => {
        console.log();
      });
  }

/*
  var contr = new ArcballControls(cam,
    rend.domElement,
    scene);
  contr.enableZoom = false;
  contr.enablePan = false;
  contr.autoAnimations = true;
  contr.rotateSpeed = 0.4;
  contr.setGizmosVisible(false);
*/

  var clock = new gg.Clock();


  function anim() {

    requestAnimationFrame(anim);
    //contr.update();

    var canvas = rend.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    cam.aspect = width / height;
    cam.updateProjectionMatrix();

    var needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      rend.setSize(width, height, false);
    }
    mixer.update(clock.getDelta());
    rend.render(scene, cam);

  }
  anim();
}

/*
export async function bitc() {
  var canvas = document.querySelector('#bitc');

  var rend = new gg.WebGLRenderer({
    canvas: canvas,
    antialiasing: true,
    logarithmicDepthBuffer: true,
    shadowMap: true,
    alpha: true,
    shadowMapType: gg.PCFSoftShadowMap
  });
  rend.shadowMap.enabled = true;
  rend.setClearColor(0x000000,
    0);


  var fov = 75;
  var cam = new gg.PerspectiveCamera(fov,
    0.1,
    1,
    900);
  cam.position.set(0,
    20,
    1);



  //scene
  var scene = new gg.Scene();

  var obj = new gg.Object3D();

  var light = new gg.DirectionalLight('white',
    2);
  light.position.set(-9,
    9,
    4);
  light.castShadow = true;
  scene.add(light);
  
  await losd("js/bitc/scene.gltf");
  
  var mixer;
  
  async function losd(a) {
    await flod(a).then(gltf => {

      var animations = gltf.animations;
      mixer = new gg.AnimationMixer(gltf.scene);

      var f = mixer.clipAction(animations[0]);
      f.setDuration(4);
      f.repetitions = "infinite";
      f.fadeIn(1);
      f.play();

      gltf.scene.position.set(3, -4, 1);
      gltf.scene.scale.set(2.5, 2.5, 2.5);
      obj.add(gltf.scene);
      obj.rotation.x = Math.PI * -.4;
      
      scene.add(obj);

    },
      e => {
        console.log();
      });
  }

  var contr = new ArcballControls(cam,
    rend.domElement,
    scene);
  contr.enableZoom = false;
  contr.enablePan = false;
  contr.autoAnimations = true;
  contr.rotateSpeed = 0.4;
  contr.setGizmosVisible(false);


  var clock = new gg.Clock();


  function anim() {

    requestAnimationFrame(anim);
    contr.update();

    var canvas = rend.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    cam.aspect = width / height;
    cam.updateProjectionMatrix();

    var needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      rend.setSize(width, height, false);
    }
    mixer.update(clock.getDelta());
    rend.render(scene, cam);

  }
  anim();
}


export async function and() {
  var canvas = document.querySelector('#and');

  var rend = new gg.WebGLRenderer({
    canvas: canvas,
    antialiasing: true,
    logarithmicDepthBuffer: true,
    shadowMap: true,
    alpha: true,
    shadowMapType: gg.PCFSoftShadowMap
  });
  rend.shadowMap.enabled = true;
  rend.setClearColor(0x000000,
    0);


  var fov = 75;
  var cam = new gg.PerspectiveCamera(fov,
    0.1,
    1,
    900);
  cam.position.set(0,
    5,
    1);



  //scene
  var scene = new gg.Scene();

  var obj = new gg.Object3D();

  var light = new gg.DirectionalLight('white',
    2);
  light.position.set(-9,
    9,
    4);
  light.castShadow = true;
  scene.add(light);
  
  await losd("js/and/scene.gltf");
  
  var mixer;
  
  async function losd(a) {
    await flod(a).then(gltf => {

      var animations = gltf.animations;
      mixer = new gg.AnimationMixer(gltf.scene);

      var f = mixer.clipAction(animations[0]);
      f.setDuration(10);
      f.repetitions = "infinite";
      f.fadeIn(1);
      f.play();

      gltf.scene.position.set(0,0,0);
      gltf.scene.scale.set(2.5, 2.5, 2.5);
      obj.add(gltf.scene);
      obj.rotation.x = Math.PI * -.4;
      
      scene.add(obj);

    },
      e => {
        console.log();
      });
  }

  var contr = new ArcballControls(cam,
    rend.domElement,
    scene);
  contr.enableZoom = false;
  contr.enablePan = false;
  contr.autoAnimations = true;
  contr.rotateSpeed = 0.4;
  contr.setGizmosVisible(false);


  var clock = new gg.Clock();


  function anim() {

    requestAnimationFrame(anim);
    contr.update();

    var canvas = rend.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    cam.aspect = width / height;
    cam.updateProjectionMatrix();

    var needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      rend.setSize(width, height, false);
    }
    mixer.update(clock.getDelta());
    rend.render(scene, cam);

  }
  anim();
}


export async function lap() {
  var canvas = document.querySelector('#lap');

  var rend = new gg.WebGLRenderer({
    canvas: canvas,
    antialiasing: true,
    logarithmicDepthBuffer: true,
    shadowMap: true,
    alpha: true,
    shadowMapType: gg.PCFSoftShadowMap
  });
  rend.shadowMap.enabled = true;
  rend.setClearColor(0x000000,
    0);


  var fov = 75;
  var cam = new gg.PerspectiveCamera(fov,
    0.1,
    1,
    900);
  cam.position.set(0,
    9,
    1);



  //scene
  var scene = new gg.Scene();

  var obj = new gg.Object3D();

  var light = new gg.DirectionalLight('white',
    2);
  light.position.set(-9,
    9,
    4);
  light.castShadow = true;
  scene.add(light);
  
  await losd("js/lapp/scene.gltf");
  
  var mixer;
  
  async function losd(a) {
    await flod(a).then(gltf => {

      var animations = gltf.animations;
      mixer = new gg.AnimationMixer(gltf.scene);

      var f = mixer.clipAction(animations[0]);
      f.setDuration(10);
      f.repetitions = "infinite";
      f.fadeIn(1);
      f.play();

      gltf.scene.position.set(0,-2,0);
      gltf.scene.scale.set(2.5, 2.5, 2.5);
      obj.add(gltf.scene);
      obj.rotation.x = Math.PI * -.4;
      
      scene.add(obj);

    },
      e => {
        console.log();
      });
  }

  var contr = new ArcballControls(cam,
    rend.domElement,
    scene);
  contr.enableZoom = false;
  contr.enablePan = false;
  contr.autoAnimations = true;
  contr.rotateSpeed = 0.4;
  contr.setGizmosVisible(false);


  var clock = new gg.Clock();


  function anim() {

    requestAnimationFrame(anim);
    contr.update();

    var canvas = rend.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    cam.aspect = width / height;
    cam.updateProjectionMatrix();

    var needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      rend.setSize(width, height, false);
    }
    mixer.update(clock.getDelta());
    rend.render(scene, cam);

  }
  anim();
}



export async function cont() {
  var canvas = document.querySelector('#fir');

  var rend = new gg.WebGLRenderer({
    canvas: canvas,
    antialiasing: true,
    logarithmicDepthBuffer: true,
    shadowMap: true,
    alpha: true,
    shadowMapType: gg.PCFSoftShadowMap
  });
  rend.shadowMap.enabled = true;
  rend.setClearColor(0x000000,
    0);


  var fov = 75;
  var cam = new gg.PerspectiveCamera(fov,
    0.1,
    1,
    900);
  cam.position.set(0,
    9,
    1);



  //scene
  var scene = new gg.Scene();

  var obj = new gg.Object3D();

  var light = new gg.DirectionalLight('white',
    2);
  light.position.set(-9,
    9,
    4);
  light.castShadow = true;
  scene.add(light);
  
  await losd("js/fir/scene.gltf");
  
  var mixer;
  
  async function losd(a) {
    await flod(a).then(gltf => {

      var animations = gltf.animations;
      mixer = new gg.AnimationMixer(gltf.scene);

      var f = mixer.clipAction(animations[0]);
      f.setDuration(10);
      f.repetitions = "infinite";
      f.fadeIn(1);
      f.play();

      gltf.scene.position.set(0,-2,0);
      gltf.scene.scale.set(2.5, 2.5, 2.5);
      obj.add(gltf.scene);
      obj.rotation.x = Math.PI * -.4;
      
      scene.add(obj);

    },
      e => {
        console.log();
      });
  }

  var contr = new ArcballControls(cam,
    rend.domElement,
    scene);
  contr.enableZoom = false;
  contr.enablePan = false;
  contr.autoAnimations = true;
  contr.rotateSpeed = 0.4;
  contr.setGizmosVisible(false);


  var clock = new gg.Clock();


  function anim() {

    requestAnimationFrame(anim);
    contr.update();

    var canvas = rend.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    cam.aspect = width / height;
    cam.updateProjectionMatrix();

    var needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      rend.setSize(width, height, false);
    }
    mixer.update(clock.getDelta());
    rend.render(scene, cam);

  }
  anim();
}
*/


function flod(url) {
    return new Promise((resolve, reject) => {
      var ld = new GLTFLoader();
      ld.load(url, resolve, undefined, reject);
    });
  }
