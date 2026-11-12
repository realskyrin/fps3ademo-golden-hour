// app/bootstrap.js: recovered from the verified GOLDEN HOUR release.
import {
  Clock,
  CubeCamera,
  HalfFloatType,
  NormalBlending,
  PMREMGenerator,
  Scene,
  Vector3,
  WebGLCubeRenderTarget,
  WebGLRenderTarget,
} from "../vendor/three-r180.js";
import { audio } from "../audio/system.js";
import { GameHUD } from "../ui/hud.js";
import { GameRenderer } from "../render/renderer.js";
import { horizontalFov, settings } from "../core/settings.js";
import { InputController } from "../core/input.js";
import { A9, createMaterials } from "../scene/materials.js";
import { createPropLibrary } from "../scene/props/index.js";
import { CollisionWorld } from "../physics/world.js";
import { EffectsSystem } from "../render/effects/system.js";
import { GlassSystem } from "../physics/glass.js";
import { PropPhysics } from "../physics/props.js";
import { SUN_DIRECTION, createSky } from "../scene/sky.js";
import { createHotel } from "../scene/hotel.js";
import { createArchitecture } from "../scene/architecture.js";
import { dressHotelBase } from "../scene/dress/base.js";
import { dressHotel } from "../scene/dress/index.js";
import { bakeLighting } from "../scene/lighting.js";
import { PlanarReflections } from "../render/reflections.js";
import { buildNavigation } from "../ai/navigation.js";
import { PlayerController } from "../player/controller.js";
import { DEG_TO_RAD, damp, db, lerp, saturate } from "../core/math.js";
import { ViewModel } from "../weapons/viewmodel.js";
import { buildGun, createGrenade } from "../weapons/models/index.js";
import { FirstPersonBody } from "../player/first-person-body.js";
import { CombatSystem } from "../weapons/combat.js";
import { Arsenal } from "../weapons/arsenal.js";
import { createOperatorRig } from "../player/operator-rig.js";
import { MatchController } from "../ai/match.js";

var ZU = new URLSearchParams(location.search);
var Y7 = ZU.has("nolock");
var i3 = new Vector3();
var a3 = new Vector3();
var d20 = new Vector3(0, 1, 0);
var yieldToBrowser = () => new Promise((o) => setTimeout(o, 20));
function Rs0(o, t, e, s) {
  let n = [],
    i = e.clone();
  (i.layers.enableAll(),
    t.traverse((r) => {
      (r.isMesh || r.isPoints || r.isLine) &&
        r.frustumCulled &&
        ((r.frustumCulled = !1), n.push(r));
    }));
  let a = o.getRenderTarget();
  try {
    (o.setRenderTarget(s), o.render(t, i));
  } catch (r) {
    console.warn("[boot] upload warm-up skipped", r);
  }
  o.setRenderTarget(a);
  for (let r of n) r.frustumCulled = !0;
}
async function VC(o, t, e, s) {
  let n = o.getRenderTarget();
  try {
    (o.setRenderTarget(s), await o.compileAsync(t, e));
  } catch (i) {
    console.warn("[boot] shader warm-up skipped", i);
  }
  o.setRenderTarget(n);
}
window.addEventListener("error", (o) => {
  let t = document.getElementById("err");
  (t ||
    ((t = document.createElement("div")),
    (t.id = "err"),
    document.body.appendChild(t)),
    (t.textContent = `${o.message}
${o.filename || ""}:${o.lineno || ""}`));
});
var gameState = {
  state: "loading",
  time: 0,
  timeScale: 1,
  freeCam: null,
  fps: 60,
};
window.GH = {
  ready: !1,
  G: gameState,
};
async function startGame() {
  let canvas = document.getElementById("c"),
    hud,
    callbacks = {
      onDeploy: () => F(),
      onResume: () => P(),
      onQuit: () => z(),
      onAgain: () => F(),
      onSetting: (f0) => H(f0),
      sound: (f0) => audio.ui(f0),
      hitSound: (f0) => audio.hitmarker(f0),
      onMatchEnd: () => {
        ((gameState.state = "over"), input.unlock(), hud.show("end"));
      },
    };
  hud = new GameHUD(callbacks);
  let bootTimings = [];
  {
    let f0 = performance.now(),
      _0 = null,
      F0 = hud.loading.bind(hud);
    hud.loading = (m0, S0) => {
      let T0 = performance.now();
      return (
        _0 && bootTimings.push([_0, Math.round(T0 - f0)]),
        (_0 = S0),
        (f0 = T0),
        F0(m0, S0)
      );
    };
  }
  (hud.loading(0.05, "INITIALISING RENDERER"), await yieldToBrowser());
  let gfx = new GameRenderer(canvas);
  (gfx.setQuality(settings.quality), gfx.setMotionBlur(settings.motionBlur));
  let { scene: scene, camera: camera, renderer: renderer } = gfx,
    input = new InputController(canvas);
  (hud.loading(0.03, "PAINTING MATERIALS"), await yieldToBrowser());
  let materials = createMaterials({
    anisotropy: Math.min(8, renderer.capabilities.getMaxAnisotropy()),
  });
  (hud.loading(0.11, "BUILDING FURNITURE"),
    await yieldToBrowser(),
    (materials.lampShade.emissiveIntensity = Math.min(
      materials.lampShade.emissiveIntensity,
      1.05,
    )),
    (materials.onyx.emissiveIntensity *= 0.8));
  let propLibrary = createPropLibrary(materials);
  (hud.loading(0.12, "RAISING THE HOTEL"), await yieldToBrowser());
  let world = new CollisionWorld(),
    fx = new EffectsSystem(scene),
    glass = new GlassSystem(scene, world, {
      audio: audio,
      fx: fx,
    }),
    combat,
    physics = new PropPhysics(scene, world, {
      audio: audio,
      fx: fx,
      glass: glass,
      onExplode: (f0, _0) => combat.explode(f0, _0),
    });
  fx.physics = physics;
  let sky = createSky(scene),
    hotel = createHotel({
      scene: scene,
      world: world,
      glass: glass,
      fx: fx,
      M: materials,
      SURF_OF: A9,
    });
  (hud.loading(0.14, "DRESSING THE LOBBY"), await yieldToBrowser());
  let match,
    dressContext = {
      scene: scene,
      world: world,
      glass: glass,
      physics: physics,
      fx: fx,
      M: materials,
      P: propLibrary,
      audio: audio,
      onChandelier: (f0, _0) => O(f0, _0),
    };
  ((dressContext.K = createArchitecture(world, materials)),
    dressHotelBase(dressContext, hotel),
    hud.loading(0.21, "DETAILING"),
    await yieldToBrowser(),
    dressHotel(dressContext, hotel),
    hotel.finishDress(),
    world.finalize(scene),
    glass.build(),
    fx.buildShafts(hotel.shafts, SUN_DIRECTION.clone().negate()),
    fx.buildGlows(),
    bakeLighting(
      {
        scene: scene,
        world: world,
        fx: fx,
        gfx: gfx,
      },
      hotel,
    ),
    scene.traverse((f0) => {
      let _0 = f0.material;
      _0 &&
        (f0.isMesh || f0.isPoints || f0.isSprite) &&
        !Array.isArray(_0) &&
        (_0.transparent ||
          _0.blending !== NormalBlending ||
          _0.depthWrite === !1) &&
        f0.layers.set(1);
    }));
  let reflections = new PlanarReflections(scene, camera);
  (reflections.hide.push(sky.flare),
    reflections.add(materials.marbleFloor, {
      k: 1,
      blur: 0,
      rough: 6.5,
    }),
    reflections.add(materials.oakFloor, {
      k: 0.6,
      blur: 1.4,
      rough: 7.5,
    }),
    reflections.add(materials.kitchenFloor, {
      k: 0.55,
      blur: 1,
      rough: 7.5,
    }),
    reflections.add(materials.terraceStone, {
      k: 0.22,
      blur: 2.4,
      rough: 7,
    }),
    (gfx.preRender = (f0) => reflections.render(f0)));
  let M = () => {
    let f0 = gfx.q.shadow;
    hotel.sun.shadow.mapSize.x !== f0 &&
      (hotel.sun.shadow.mapSize.set(f0, f0),
      hotel.sun.shadow.map &&
        (hotel.sun.shadow.map.dispose(), (hotel.sun.shadow.map = null)));
  };
  (M(),
    (gfx.onQuality = (f0) => {
      (reflections.setSize(gfx.size.x, gfx.size.y, f0.refl), M());
    }),
    gfx.onQuality(gfx.q),
    hud.loading(0.28, "CAPTURING LIGHT"),
    await yieldToBrowser());
  {
    let f0 = new WebGLCubeRenderTarget(256, {
        type: HalfFloatType,
        generateMipmaps: !1,
      }),
      _0 = new CubeCamera(0.1, 2600, f0);
    for (let j0 of _0.children) j0.layers.enable(1);
    _0.position.set(0, 2.6, 5.2);
    let F0 = new PMREMGenerator(renderer),
      m0 = F0.fromScene(new Scene()).texture,
      S0 = [
        materials.marbleFloor,
        materials.oakFloor,
        materials.kitchenFloor,
        glass.material,
        materials.exterior,
        materials.poolTile,
      ];
    ((scene.environment = m0),
      (scene.environmentIntensity = 0),
      (gfx.vmScene.environment = m0));
    for (let j0 of S0) ((j0.envMap = m0), (j0.needsUpdate = !0));
    (await VC(renderer, scene, camera, f0),
      (renderer.shadowMap.needsUpdate = !0),
      _0.update(renderer, scene));
    let T0 = F0.fromCubemap(f0.texture).texture;
    ((scene.environment = T0),
      (scene.environmentIntensity = 0.24),
      (gfx.vmScene.environment = T0),
      (gfx.vmScene.environmentIntensity = 1.5));
    for (let [j0, Z0] of [
      [materials.marbleFloor, 0.3],
      [materials.oakFloor, 0.5],
      [materials.kitchenFloor, 0.5],
    ])
      ((j0.envMap = T0), (j0.envMapIntensity = Z0), (j0.needsUpdate = !0));
    (_0.position.set(0, 1.9, 12.6),
      _0.update(renderer, scene),
      (gameState.envIn = T0),
      (gameState.envOut = F0.fromCubemap(f0.texture).texture),
      (glass.material.envMap = gameState.envOut),
      (glass.material.envMapIntensity = 1.25),
      (glass.material.needsUpdate = !0));
    for (let j0 of [materials.exterior, materials.poolTile])
      ((j0.envMap = gameState.envOut), (j0.needsUpdate = !0));
    (f0.dispose(), F0.dispose(), m0.dispose());
  }
  (hud.loading(0.37, "MAPPING ROUTES"), await yieldToBrowser());
  let navigation = buildNavigation(world);
  navigation.islands.length &&
    console.warn("[nav] unreachable nodes:", navigation.islands.join(" "));
  let gameTime = () => gameState.time,
    player = new PlayerController({
      world: world,
      glass: glass,
      physics: physics,
      audio: audio,
      fx: fx,
      hotel: hotel,
      input: input,
      camera: camera,
      time: gameTime,
      onPlayerHurt: (f0, _0) => {
        if (
          ((gfx.uniforms.uDamage.value = Math.min(
            1,
            gfx.uniforms.uDamage.value + 0.35 + f0 / 60,
          )),
          audio.hurt(saturate(f0 / 60)),
          fx.playerHurt && fx.playerHurt(f0),
          _0)
        ) {
          let F0 = _0.x - player.pos.x,
            m0 = _0.z - player.pos.z,
            S0 = Math.sin(player.yaw),
            T0 = Math.cos(player.yaw);
          hud.damageFrom(Math.atan2(F0 * T0 - m0 * S0, -F0 * S0 - m0 * T0));
        }
      },
      onPlayerDeath: (f0, _0, F0) => {
        (hud.died(f0, F0 || (f0 ? "" : "fell")),
          audio.death(),
          audio.slideStop(),
          match._dmg ||
            match._kill(player, null, {
              weapon: "fell",
            }));
      },
      onPlayerStep: () => {},
      onGlassCrash: () => {},
    });
  ((player.hit = [
    {
      part: "head",
      a: new Vector3(),
      b: new Vector3(),
      r: 0.15,
    },
    {
      part: "torso",
      a: new Vector3(),
      b: new Vector3(),
      r: 0.3,
    },
  ]),
    hud.loading(0.38, "ASSEMBLING WEAPONS"),
    await yieldToBrowser());
  let viewModel = new ViewModel({
    gfx: gfx,
    buildGun: buildGun,
    input: input,
    world: world,
    hotel: hotel,
    audio: audio,
  });
  viewModel.build([settings.primary, "pistol"]);
  let grenadePrototype = createGrenade(),
    cloneGrenade = () => grenadePrototype.clone(),
    firstPersonBody = new FirstPersonBody({
      scene: scene,
      gfx: gfx,
      world: world,
      hotel: hotel,
      player: player,
      buildGun: buildGun,
      vm: viewModel,
    }),
    context = {
      world: world,
      glass: glass,
      physics: physics,
      fx: fx,
      audio: audio,
      hotel: hotel,
      player: player,
      input: input,
      vm: viewModel,
      time: gameTime,
      buildGrenade: cloneGrenade,
      settings: settings,
      gfx: gfx,
      onNearMiss: (f0) => {
        (player.addShake(0.12), fx.nearMiss && fx.nearMiss(f0 || player.eye));
      },
    };
  ((combat = new CombatSystem(context)), (context.combat = combat));
  let arsenal = new Arsenal(context);
  ((context.arsenal = arsenal),
    (context.hud = hud),
    (context.resetWorld = () => hotel.resetDress()),
    (context.setTimeScale = (f0) => {
      ((gameState.timeScale = f0), audio.setTimeScale(f0));
    }),
    (context.botCtx = {
      scene: scene,
      world: world,
      physics: physics,
      glass: glass,
      hotel: hotel,
      audio: audio,
      fx: fx,
      nav: navigation,
      combat: combat,
      time: gameTime,
      createCharacter: createOperatorRig,
      buildGrenade: cloneGrenade,
      worldGun: (f0, _0 = null) =>
        buildGun(f0, {
          detail: "world",
          build: _0,
        }),
    }),
    (match = new MatchController(context)),
    (context.match = match),
    (context.botCtx.match = match),
    hud.loading(0.47, "PREPARING THE ARMOURY"),
    await yieldToBrowser(),
    fx.attach &&
      fx.attach({
        gfx: gfx,
        world: world,
        physics: physics,
        glass: glass,
        hotel: hotel,
        player: player,
        match: match,
        audio: audio,
        time: gameTime,
      }),
    hud.attach &&
      hud.attach({
        world: world,
        nav: navigation,
        hotel: hotel,
        match: match,
        player: player,
        arsenal: arsenal,
        gfx: gfx,
        physics: physics,
        glass: glass,
        fx: fx,
        buildGun: buildGun,
        buildGrenade: createGrenade,
        settings: settings,
        audio: audio,
        input: input,
        time: gameTime,
      }),
    hud.loading(0.8, "BRIEFING OPERATORS"),
    await yieldToBrowser(),
    match.createBots(5));
  for (let f0 of match.bots) for (let _0 of f0.rigs) _0.root.visible = !1;
  function O(f0, _0) {
    let F0 = _0 && _0.team !== void 0 ? _0 : player;
    for (let m0 of match.actors)
      !m0.alive ||
        Math.hypot(m0.pos.x - f0.x, m0.pos.z - f0.z) > 2.7 ||
        Math.abs(m0.pos.y - f0.y) > 2.5 ||
        match.damage(m0, 160, m0.team === F0.team ? m0 : F0, {
          weapon: "chandelier",
          dir: i3.set(0, -1, 0),
          point: f0,
          blast: !0,
        });
    player.eye.distanceTo(f0) < 18 && player.addShake(0.6);
  }
  function H(f0) {
    (f0 === "quality" && gfx.setQuality(settings.quality),
      f0 === "motionBlur" && gfx.setMotionBlur(settings.motionBlur),
      f0 === "fov" &&
        gameState.state === "paused" &&
        ((camera.fov = horizontalFov(settings.fov, camera.aspect)),
        camera.updateProjectionMatrix(),
        viewModel.setFov(player.adsK)),
      (f0 === "master" || f0 === "music" || f0 === "sfx") &&
        audio.setVolumes({
          master: settings.master,
          sfx: settings.sfx,
          music: settings.music,
        }));
  }
  audio.setOcclusionTester((f0, _0) => !world.clear(f0, _0));
  function F() {
    (audio.init(),
      H("master"),
      audio.music.menu(!1),
      audio.ui("deploy"),
      (gameState.timeScale = 1),
      audio.setTimeScale(1),
      hud.show(null),
      fx.reset && fx.reset(),
      match.start(),
      (gameState.state = "playing"),
      Y7 || input.lock());
  }
  function P() {
    if (Y7) {
      ((gameState.state = "playing"), hud.show(null));
      return;
    }
    let f0 = Math.max(
      0,
      1300 - (performance.now() - (gameState.pausedAt || 0)),
    );
    (setTimeout(() => {
      gameState.state === "paused" && input.lock();
    }, f0),
      setTimeout(() => {
        gameState.state === "paused" && !input.locked && input.lock();
      }, f0 + 500));
  }
  function pauseGame() {
    if (gameState.state !== "playing") return;
    gameState.state = "paused";
    gameState.pausedAt = performance.now();
    hud.show("pause");
    audio.slideStop();
    match.k9.pause();
  }
  function z() {
    ((gameState.state = "menu"),
      (gameState.timeScale = 1),
      audio.setTimeScale(1),
      input.unlock(),
      hud.show("menu"),
      (match.state = "idle"),
      (match.live = !1));
    for (let f0 of match.bots) {
      f0.alive = !1;
      for (let _0 of f0.rigs) _0.root.visible = !1;
    }
    (match.k9.clear(),
      audio.init(),
      audio.music.menu(!0),
      audio.lounge.kill(),
      (gameState.shot = -1),
      (gameState.shotT = 99));
  }
  ((input.onLockChange = (f0) => {
    f0
      ? gameState.state === "paused" &&
        ((gameState.state = "playing"), hud.show(null))
      : !Y7 && pauseGame();
  }),
    addEventListener("keydown", (event) => {
      if (
        event.code !== "KeyP" ||
        event.repeat ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        event.defaultPrevented ||
        gameState.state !== "playing"
      )
        return;
      event.preventDefault();
      pauseGame();
      input.unlock();
    }),
    canvas.addEventListener("click", () => {
      gameState.state === "playing" && !input.locked && !Y7 && input.lock();
    }),
    addEventListener(
      "pointerdown",
      () => {
        gameState.state === "menu" &&
          (audio.init(), H("master"), audio.music.menu(!0));
      },
      {
        once: !1,
      },
    ));
  let k = [
    {
      p0: [-9.5, 1.5, 8.6],
      p1: [-5.5, 1.8, 6.2],
      l0: [4, 2.6, -3],
      l1: [2, 3.2, -6],
      d: 10,
    },
    {
      p0: [-17.5, 1.4, 20.6],
      p1: [-11, 1.7, 21.2],
      l0: [-2, 1, 15],
      l1: [5, 2.6, 10],
      d: 10,
    },
    {
      p0: [-10.6, 5.5, -3.5],
      p1: [-10.6, 5.5, 4.5],
      l0: [3, 2.2, 2],
      l1: [3, 1.6, 6],
      d: 10,
    },
    {
      p0: [-13.6, 1.5, 7.4],
      p1: [-17.5, 1.45, 2.4],
      l0: [-22, 1.5, -6],
      l1: [-21, 1.6, -7],
      d: 9,
    },
    {
      p0: [1.5, 0.5, 8.8],
      p1: [-1.5, 0.6, 4.6],
      l0: [0, 4.6, -8],
      l1: [0, 5.2, -8],
      d: 9,
    },
    {
      p0: [18, 1.6, 12.6],
      p1: [12.5, 1.7, 13.4],
      l0: [0, 1.4, 17],
      l1: [-6, 1.2, 18],
      d: 9,
    },
  ];
  ((gameState.shot = -1), (gameState.shotT = 99));
  function I(f0) {
    ((gameState.shotT += f0),
      (gameState.shot < 0 || gameState.shotT > k[gameState.shot].d) &&
        ((gameState.shot = (gameState.shot + 1) % k.length),
        (gameState.shotT = 0)));
    let _0 = k[gameState.shot],
      F0 = gameState.shotT / _0.d,
      m0 = db(F0) * 0.6 + F0 * 0.4;
    (camera.position.set(
      lerp(_0.p0[0], _0.p1[0], m0),
      lerp(_0.p0[1], _0.p1[1], m0),
      lerp(_0.p0[2], _0.p1[2], m0),
    ),
      i3.set(
        lerp(_0.l0[0], _0.l1[0], m0),
        lerp(_0.l0[1], _0.l1[1], m0),
        lerp(_0.l0[2], _0.l1[2], m0),
      ),
      camera.up.set(0, 1, 0),
      camera.lookAt(i3),
      (camera.fov = 46),
      camera.updateProjectionMatrix(),
      (gfx.uniforms.uFade.value = Math.max(
        saturate(1 - gameState.shotT / 0.8),
        saturate((gameState.shotT - (_0.d - 0.8)) / 0.8),
      )));
  }
  let G = new Clock(),
    K = 0,
    $ = 1,
    n0 = 1,
    e0 = 0,
    p0 = 0,
    t0 = {
      head: player.hit[0].a,
      a: player.hit[1].a,
      b: player.hit[1].b,
    };
  function M0() {
    let f0 = Math.min(G.getDelta(), 0.05555555555555555);
    ((e0 += f0),
      p0++,
      e0 > 0.5 && ((gameState.fps = p0 / e0), (e0 = 0), (p0 = 0)));
    let _0 = gameState.state === "playing",
      F0 = _0 ? f0 * gameState.timeScale : 0;
    if (((gameState.time += F0), _0)) {
      if (
        ((input.enabled =
          match.state !== "countdown" && match.state !== "over"),
        player.update(F0, arsenal),
        player.getHit(t0),
        player.hit[0].b.copy(player.hit[0].a),
        arsenal.update(F0),
        combat.frame(),
        match.state === "countdown")
      )
        for (let Y0 of match.bots) Y0.idle(F0);
      else for (let Y0 of match.bots) Y0.update(F0);
      (match.update(F0, f0),
        physics.update(F0),
        glass.update(F0),
        viewModel.update(F0, player, arsenal),
        (gfx.vmPass.enabled = player.alive && !gameState.freeCam));
    } else
      ((gfx.vmPass.enabled = !1),
        (gameState.state === "menu" || gameState.state === "loading") &&
          (gameState.freeCam || I(f0), physics.update(f0), glass.update(f0)));
    let m0 = _0
      ? F0
      : gameState.state === "paused" || gameState.state === "over"
        ? 0
        : f0;
    for (let Y0 of hotel.update) Y0(m0);
    if (
      (fx.update(
        m0,
        gameState.time + performance.now() * 1e-4,
        renderer.domElement.height,
      ),
      gameState.freeCam)
    ) {
      let Y0 = gameState.freeCam;
      (camera.position.set(Y0.x, Y0.y, Y0.z),
        camera.rotation.set(
          Y0.pitch * DEG_TO_RAD,
          Y0.yaw * DEG_TO_RAD,
          0,
          "YXZ",
        ),
        (camera.fov = Y0.fov || 65),
        camera.updateProjectionMatrix(),
        (gfx.uniforms.uFade.value = 0));
    }
    (camera.updateMatrixWorld(!0),
      firstPersonBody.update(F0, {
        state: gameState.state,
        freeCam: !!gameState.freeCam,
        arsenal: arsenal,
      }));
    let S0 = camera.position,
      T0 = world.raycast(
        S0.x,
        S0.y,
        S0.z,
        SUN_DIRECTION.x,
        SUN_DIRECTION.y,
        SUN_DIRECTION.z,
        300,
        null,
      )
        ? 0
        : 1;
    K = damp(K, T0, 10, f0);
    let j0 = hotel.indoor(S0.x, S0.z);
    ((n0 = damp(n0, j0, 2.5, f0)), camera.getWorldDirection(i3));
    let Z0 = saturate((i3.dot(SUN_DIRECTION) - 0.2) / 0.8);
    ((gfx.uniforms.uExposure.value = 1),
      (viewModel.sunK = K),
      (viewModel.amb = lerp(1, 0.55, n0)));
    {
      let Y0 = j0 ? gameState.envIn : gameState.envOut;
      Y0 && gfx.vmScene.environment !== Y0 && (gfx.vmScene.environment = Y0);
    }
    ((fx.tint = lerp(1, 0.5, n0) * (0.75 + 0.5 * K)),
      sky.update(camera, f0, T0));
    {
      let Y0 = i3.dot(SUN_DIRECTION);
      a3.copy(S0).addScaledVector(SUN_DIRECTION, 1e3).project(camera);
      let et = Math.max(Math.abs(a3.x), Math.abs(a3.y));
      (gfx.sunUv.set(a3.x * 0.5 + 0.5, a3.y * 0.5 + 0.5),
        (gfx.rayK =
          Y0 > 0.05 ? 0.3 * saturate((2 - et) / 0.9) * saturate(Y0 * 3) : 0));
    }
    let lt = gfx.uniforms;
    lt.uDamage.value = damp(lt.uDamage.value, 0, 2.6, f0);
    let H0 =
      _0 && player.alive
        ? saturate((45 - player.health) / 45)
        : !player.alive && _0
          ? 0.8
          : 0;
    ((lt.uLowHealth.value = damp(lt.uLowHealth.value, H0, 5, f0)),
      gameState.state !== "menu" &&
        gameState.state !== "loading" &&
        !gameState.freeCam &&
        (lt.uFade.value = damp(lt.uFade.value, 0, 6, f0)),
      (lt.uCA.value =
        0.0018 +
        (player.mode === "slide" && _0 ? 0.0022 : 0) +
        player.shake * 0.004),
      lt.uAds && (lt.uAds.value = _0 && player.alive ? player.adsK : 0),
      a3.set(0, 1, 0).applyQuaternion(camera.quaternion),
      audio.setListener(S0, i3, a3),
      audio.setEnvironment({
        indoor: n0,
      }),
      audio.setLowHealth(_0 ? H0 : 0),
      audio.update(f0),
      gameState.state !== "menu" &&
        gameState.state !== "loading" &&
        hud.update(f0, {
          player: player,
          ars: arsenal,
          match: match,
          camera: camera,
          world: world,
          showBoard: input.keys.has("Tab") && _0,
          physics: physics,
        }),
      gfx.render(f0),
      input.endFrame());
  }
  (renderer.setAnimationLoop(M0),
    (window.GH.debug = {
      stats: () => ({
        state: gameState.state,
        fps: Math.round(gameState.fps),
        calls: renderer.info.render.calls,
        tris: renderer.info.render.triangles,
        cols: world.cols.length,
        panes: glass.panes.length,
        nodes: navigation.nodes.length,
        islands: navigation.islands,
        links: navigation.nodes.reduce((f0, _0) => f0 + _0.links.length, 0) / 2,
        match: match.state,
        scores: match.scores,
        pos: [player.pos.x, player.pos.y, player.pos.z].map(
          (f0) => +f0.toFixed(2),
        ),
        hp: player.health,
        props: physics.props.length,
      }),
      start: () => F(),
      view: (f0, _0, F0, m0 = 0, S0 = 0, T0 = 65) => {
        gameState.freeCam =
          f0 === null
            ? null
            : {
                x: f0,
                y: _0,
                z: F0,
                yaw: m0,
                pitch: S0,
                fov: T0,
              };
      },
      tp: (f0, _0, F0, m0 = 0, S0 = 0) => {
        ((player.e.x = f0),
          (player.e.y = _0),
          (player.e.z = F0),
          (player.yaw = m0 * DEG_TO_RAD),
          (player.pitch = S0 * DEG_TO_RAD),
          player.vel.set(0, 0, 0));
      },
      key: (f0, _0 = !0) => {
        _0 ? (input.keys.add(f0), input.down.add(f0)) : input.keys.delete(f0);
      },
      look: (f0, _0) => {
        ((player.yaw = f0 * DEG_TO_RAD), (player.pitch = _0 * DEG_TO_RAD));
      },
      hud: (f0) => {
        document.getElementById("hud").style.visibility = f0 ? "" : "hidden";
      },
      navCheck: () => {
        let f0 = [];
        for (let _0 of navigation.nodes)
          world.overlap(
            _0.x - 0.3,
            _0.y + 0.45,
            _0.z - 0.3,
            _0.x + 0.3,
            _0.y + 1.7,
            _0.z + 0.3,
            !0,
          )
            ? f0.push("blocked node " + _0.i + " @" + [_0.x, _0.y, _0.z])
            : _0.links.length < 1 &&
              f0.push("orphan node " + _0.i + " @" + [_0.x, _0.y, _0.z]);
        return {
          links:
            navigation.nodes.reduce((_0, F0) => _0 + F0.links.length, 0) / 2,
          islands: navigation.islands.length,
          bad: f0,
          calls: renderer.info.render.calls,
          tris: renderer.info.render.triangles,
          fps: Math.round(gameState.fps),
        };
      },
      ctx: context,
      hotel: hotel,
      nav: navigation,
      gfx: gfx,
      match: match,
      player: player,
      arsenal: arsenal,
      physics: physics,
      glass: glass,
      fx: fx,
      vm: viewModel,
      input: input,
      world: world,
      boot: bootTimings,
      k9: match.k9.debug,
    }),
    (window.GH.debug.fpbody = firstPersonBody),
    hud.loading(0.93, "FINAL CHECKS"),
    await yieldToBrowser());
  {
    let f0 = new WebGLRenderTarget(4, 4, {
      type: HalfFloatType,
    });
    (await VC(renderer, scene, camera, f0),
      await VC(renderer, gfx.vmScene, gfx.vmCamera, f0));
    let _0 = [];
    for (let F0 of match.bots)
      for (let m0 of F0.rigs)
        m0.root.visible || ((m0.root.visible = !0), _0.push(m0.root));
    for (let F0 of match.k9.rigs())
      F0.root.visible || ((F0.root.visible = !0), _0.push(F0.root));
    Rs0(renderer, scene, camera, f0);
    for (let F0 of _0) F0.visible = !1;
    f0.dispose();
  }
  (hud.loading(1, "READY"),
    await yieldToBrowser(),
    (gameState.state = "menu"),
    hud.show("menu"),
    (window.GH.ready = !0),
    ZU.has("autostart") && F());
}
startGame().catch((o) => {
  console.error(o);
  let t = document.createElement("div");
  ((t.id = "err"),
    (t.textContent = String((o && o.stack) || o)),
    document.body.appendChild(t));
});
