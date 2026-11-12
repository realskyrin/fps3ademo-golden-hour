// audio/system.js: recovered from the verified GOLDEN HOUR release.
import {
  $$,
  Ai,
  B$,
  Cg,
  Dw,
  Fb,
  Fl,
  G$,
  Gc,
  J$,
  J9,
  JD,
  K$,
  Lw,
  Nb,
  Q$,
  U$,
  V$,
  W$,
  X$,
  Xd,
  Y$,
  Yd,
  Z$,
  aI,
  eR,
  fl,
  gu,
  iI,
  j$,
  nI,
  oI,
  q$,
  qt,
  rh,
  s2,
  tI,
  tR,
  tZ,
  zw,
} from "./synthesis.js";

function createAudio() {
  let o = {
      ctx: null,
      vol: {
        master: 1,
        sfx: 1,
        music: 0.7,
      },
      ts: 1,
      indoor: 1,
      indoorT: 1,
      space: null,
      lx: 0,
      ly: 0,
      lz: 0,
      fx: 0,
      fy: 0,
      fz: -1,
      rx: 1,
      ry: 0,
      rz: 0,
      lvec: {
        x: 0,
        y: 0,
        z: 0,
      },
      occl: null,
      occCache: new Map(),
      occTmp: {
        x: 0,
        y: 0,
        z: 0,
      },
      voices: [],
      active: 0,
      cats: {},
      bus: {},
      buf: {},
      abuf: {},
      errors: [],
      curves: {},
      acc: 0,
      clock: 0,
      nyq: 2e4,
      lowHealth: 0,
      nextBeat: 0,
      lastShot: null,
      lastVar: {},
      slide: null,
      foot: !1,
      bakeQ: null,
      ducks: {},
      laser: null,
      stats: {
        created: 0,
        live: 0,
        persistent: 0,
        voicePeak: 0,
        stolen: 0,
        bakeMs: 0,
        bakeMax: 0,
        k9Steps: 0,
        k9StepCalls: 0,
      },
      bakeTick: 0,
      menu: {
        on: !1,
        want: !1,
        bar: 0,
        next: 0,
        nextSwell: 0,
        root: 38,
      },
      lounge: {
        active: !1,
        dying: !1,
        want: null,
        oscs: [],
        beat: 0,
        next: 0,
        killT: 0,
        occT: 0,
        phrase: null,
      },
      life: {
        next: 14,
        heli: 40,
      },
      k9: {
        loops: new Map(),
        steps: new Map(),
      },
    },
    t = (J) => fl(J, 20, o.nyq);
  function e(J, Q) {
    (o.errors.length < 50 &&
      o.errors.push(`${J}: ${Q && Q.message ? Q.message : Q}`),
      e.seen[J] || ((e.seen[J] = 1), console.warn("[audio]", J, Q)));
  }
  e.seen = {};
  let s = (J) => (o.stats.created++, o.stats.live++, J),
    n = (J) => {
      try {
        J.disconnect();
      } catch {}
      o.stats.live--;
    },
    i = (J = 1) => {
      let Q = s(o.ctx.createGain());
      return ((Q.gain.value = J), Q);
    },
    a = (J, Q, i0 = 0.7, A0 = 0) => {
      let N0 = s(o.ctx.createBiquadFilter());
      return (
        (N0.type = J),
        (N0.frequency.value = t(Q)),
        (N0.Q.value = i0),
        A0 && (N0.gain.value = A0),
        N0
      );
    },
    r = (J, Q) => {
      let i0 = s(o.ctx.createOscillator());
      return ((i0.type = J || "sine"), (i0.frequency.value = t(Q)), i0);
    },
    l = (J, Q) => {
      let i0 = s(o.ctx.createBufferSource());
      return ((i0.buffer = J), (i0.loop = !!Q), i0);
    },
    c = (J, ...Q) => {
      J.onended = () => {
        n(J);
        for (let i0 of Q) n(i0);
      };
    };
  function h(J, Q) {
    let i0 = r("sine", 30),
      A0 = i(0);
    (i0.connect(A0),
      A0.connect(o.master),
      (i0.onended = () => {
        (n(i0), n(A0));
        try {
          Q();
        } catch (N0) {
          e("after", N0);
        }
      }),
      i0.start(),
      i0.stop(Math.max(J, o.ctx.currentTime + 0.01)));
  }
  function f(J) {
    let Q = Math.round(J * 10);
    if (o.curves[Q]) return o.curves[Q];
    let i0 = 2048,
      A0 = new Float32Array(i0),
      N0 = Math.tanh(J);
    for (let mt = 0; mt < i0; mt++)
      A0[mt] = Math.tanh(J * ((mt / (i0 - 1)) * 2 - 1)) / N0;
    return (o.curves[Q] = A0);
  }
  function u(J, Q, i0, A0, N0, mt) {
    (J.setValueAtTime(0, Q),
      J.linearRampToValueAtTime(mt, Q + i0),
      A0 > 0 && J.setValueAtTime(mt, Q + i0 + A0));
    let xt = Q + i0 + A0 + N0;
    return (J.exponentialRampToValueAtTime(Math.max(mt * 0.001, 1e-6), xt), xt);
  }
  function d(J, Q) {
    J.positionX
      ? ((J.positionX.value = Q.x),
        (J.positionY.value = Q.y),
        (J.positionZ.value = Q.z))
      : J.setPosition(Q.x, Q.y, Q.z);
  }
  function m(J) {
    let Q = o.ctx.createBuffer(J.length, J[0].length, o.ctx.sampleRate);
    for (let i0 = 0; i0 < J.length; i0++) Q.getChannelData(i0).set(J[i0]);
    return Q;
  }
  function p(J, Q) {
    let i0 = J + (Q ? "|s" : "|m"),
      A0 = o.abuf[i0];
    if (A0) return A0;
    let N0 = typeof performance < "u" ? performance.now() : 0,
      mt = Nb(o.ctx.sampleRate, J);
    return (
      typeof performance < "u" && (o.stats.bakeMs += performance.now() - N0),
      mt ? (o.abuf[i0] = m(Q && mt.st ? mt.st : mt.mono || mt.st)) : null
    );
  }
  function x(J, Q) {
    let i0 = Dw(o.ctx.sampleRate).d,
      A0 = [];
    for (let mt = 0; mt < Q; mt++) i0[J + mt] && A0.push(mt);
    if (!A0.length) return J + 0;
    let N0 = zw(A0);
    return (
      A0.length > 1 &&
        N0 === o.lastVar[J] &&
        (N0 = A0[(A0.indexOf(N0) + 1 + Fl(0, A0.length - 2)) % A0.length]),
      (o.lastVar[J] = N0),
      J + N0
    );
  }
  function g(J, Q, i0) {
    if (!o.occl || Q < 1.5) return 0;
    let A0 =
        ((Math.round(J.x * 2) & 1023) << 20) |
        ((Math.round(J.y * 2) & 1023) << 10) |
        (Math.round(J.z * 2) & 1023),
      N0 = o.clock,
      mt = o.occCache.get(A0);
    if (
      mt &&
      N0 - mt.t < 0.12 &&
      Math.abs(mt.lx - o.lx) + Math.abs(mt.lz - o.lz) < 0.4
    )
      return mt.v;
    let xt = 0;
    try {
      let Mt = (St) => (o.occl(o.lvec, St) ? 1 : 0);
      if (((xt = Mt(J)), i0 > 1)) {
        let St = J.x - o.lx,
          Rt = J.z - o.lz,
          Ot = Math.hypot(St, Rt) || 1,
          Jt = (-Rt / Ot) * 0.7,
          ee = (St / Ot) * 0.7,
          Nt = o.occTmp;
        ((Nt.x = J.x + Jt), (Nt.y = J.y + 0.35), (Nt.z = J.z + ee));
        let ge = Mt(Nt);
        ((Nt.x = J.x - Jt), (Nt.z = J.z - ee));
        let Le = Mt(Nt);
        xt = xt * 0.5 + (ge + Le) * 0.25;
      }
    } catch {
      xt = 0;
    }
    let yt = mt && N0 - mt.t < 1.2 ? mt.v + (xt - mt.v) * 0.6 : xt;
    return (
      mt
        ? ((mt.v = yt), (mt.t = N0), (mt.lx = o.lx), (mt.lz = o.lz))
        : o.occCache.set(A0, {
            v: yt,
            t: N0,
            lx: o.lx,
            lz: o.lz,
          }),
      yt
    );
  }
  function b(J) {
    for (let Q of J.srcs) n(Q);
    for (let Q of J.nodes) n(Q);
    J.dying || (o.active--, o.cats[J.cat]--);
  }
  function v() {
    let J = o.ctx.currentTime,
      Q = o.voices,
      i0 = 0;
    for (let A0 = 0; A0 < Q.length; A0++) {
      let N0 = Q[A0];
      J > N0.end ? b(N0) : (Q[i0++] = N0);
    }
    Q.length = i0;
  }
  function y(J, Q = 0.01, i0 = 0) {
    let A0 = o.ctx.currentTime,
      N0 = J.out.gain;
    try {
      (N0.cancelScheduledValues(A0), N0.setTargetAtTime(J.level * i0, A0, Q));
    } catch {}
  }
  function M(J, Q = 0.008) {
    if (J.dying) return;
    let i0 = o.ctx.currentTime;
    y(J, Q, 0);
    for (let A0 of J.srcs)
      try {
        A0.stop(i0 + Q * 7);
      } catch {}
    ((J.end = Math.min(J.end, i0 + Q * 7 + 0.03)),
      (J.dying = !0),
      o.active--,
      o.cats[J.cat]--);
  }
  function w(J) {
    let Q = null,
      i0 = 1 / 0;
    for (let A0 of o.voices) {
      if (A0.dying || A0.own || (J && A0.cat !== J)) continue;
      let N0 = (J ? 0 : A0.prio * 1e3) + A0.t;
      N0 < i0 && ((i0 = N0), (Q = A0));
    }
    Q && (M(Q), o.stats.stolen++);
  }
  class T {
    constructor(Q, i0 = {}) {
      let A0 = o.ctx,
        N0 = i0.cat || "misc";
      ((o.cats[N0] || 0) >= (G$[N0] || 12) && w(N0),
        o.active >= 56 && (v(), o.active >= 56 && w(null)),
        (this.cat = N0),
        (this.prio = i0.prio ?? 5),
        (this.own = !!i0.own),
        (this.dying = !1),
        (this.rate = o.ts * (i0.pitch ?? 1)),
        (this.st = 1 / Math.sqrt(o.ts)),
        (this.nodes = []),
        (this.srcs = []),
        (this.dist = 0),
        (this.occ = 0));
      let mt = A0.currentTime + 0.003,
        xt = i0.gain ?? 1,
        yt = 1,
        Mt = (this.out = i(1)),
        St = Mt;
      if (Q && isFinite(Q.x + Q.y + Q.z)) {
        let Rt = Q.x - o.lx,
          Ot = Q.y - o.ly,
          Jt = Q.z - o.lz,
          ee = (this.dist = Math.sqrt(Rt * Rt + Ot * Ot + Jt * Jt)),
          Nt = 1 / Math.max(ee, 1e-4),
          ge = 22e3;
        i0.lpDist && (ge = 2e4 * Math.pow(0.07, Ai((ee - 8) / 70)));
        let Le = (this.occ = i0.noOcc ? 0 : g(Q, ee, i0.rays ?? 3));
        Le > 0.01 &&
          ((ge = Math.min(ge, 2e4 * Math.pow((i0.occF ?? 1e3) / 2e4, Le))),
          (xt *= Gc(1, 0.5, Le)));
        let xn = ee > 0.7 ? Ai(-(Rt * o.fx + Ot * o.fy + Jt * o.fz) * Nt) : 0;
        if (
          (xn > 0.05 && (ge = Math.min(ge, 2e4 * Math.pow(Y$, xn))),
          i0.maxDist && (xt *= 1 - Lw(i0.maxDist * 0.7, i0.maxDist, ee)),
          ge < 18e3)
        ) {
          let re = a("lowpass", ge, 0.5);
          (St.connect(re), this.nodes.push(re), (St = re));
        }
        let js = i0.ref ?? 3,
          Un = i0.roll ?? 1;
        if (i0.dyn) {
          let re = s(A0.createPanner());
          ((re.panningModel = "equalpower"),
            (re.distanceModel = "inverse"),
            (re.refDistance = js),
            (re.rolloffFactor = Un),
            (re.maxDistance = 400),
            d(re, Q),
            St.connect(re),
            this.nodes.push(re),
            (St = re));
        } else {
          xt *= js / (js + Un * Math.max(0, ee - js));
          let re =
              ee > 0.5
                ? fl((Rt * o.rx + Ot * o.ry + Jt * o.rz) * Nt, -1, 1)
                : 0,
            Ae = Math.abs(re),
            ws = (Math.PI / 4) * (1 + nI * Ae),
            Zo = s(A0.createChannelMerger(2)),
            so = i(Math.sin(ws)),
            Os = i(Math.cos(ws));
          if ((St.connect(so), so.connect(Zo, 0, re >= 0 ? 1 : 0), Ae > 0.04)) {
            let va = s(A0.createDelay(0.005)),
              r3 = a("lowpass", 18e3 * Math.pow(iI, Ae), 0.5);
            ((va.delayTime.value = oI * Ae),
              St.connect(va),
              va.connect(r3),
              r3.connect(Os),
              this.nodes.push(va, r3));
          } else St.connect(Os);
          (Os.connect(Zo, 0, re >= 0 ? 0 : 1),
            this.nodes.push(so, Os, Zo),
            (St = Zo));
        }
        (i0.sos && (mt += Math.min(ee / 343, 0.3)),
          (yt = (1 + Math.min(ee, 60) / 30) * (1 + 0.6 * Le)));
      }
      if (
        ((this.level = xt),
        (Mt.gain.value = xt),
        St.connect(o.bus[i0.bus] || o.bus.sfx),
        i0.rev)
      ) {
        let Rt = i(i0.rev * yt);
        (St.connect(Rt), Rt.connect(o.revIn), this.nodes.push(Rt));
      }
      (this.nodes.push(Mt),
        (this.t = mt),
        (this.end = mt + 0.1),
        (this.sum = Mt),
        o.voices.push(this),
        o.active++,
        (o.cats[N0] = (o.cats[N0] || 0) + 1),
        o.active > o.stats.voicePeak && (o.stats.voicePeak = o.active));
    }
    shaper(Q) {
      let i0 = i(1),
        A0 = s(o.ctx.createWaveShaper());
      return (
        (A0.curve = f(Q)),
        i0.connect(A0),
        A0.connect(this.out),
        this.nodes.push(i0, A0),
        i0
      );
    }
    filter(Q, i0, A0 = 0.7, N0) {
      let mt = a(Q, i0 * this.rate, A0);
      return (mt.connect(N0 || this.out), this.nodes.push(mt), mt);
    }
    play(Q, i0 = {}) {
      if (!Q) return null;
      let A0 = l(Q, i0.dur > 0),
        N0 = fl((i0.rate ?? 1) * this.rate, 0.05, 8),
        mt = i0.g ?? 1,
        xt = i(mt);
      A0.playbackRate.value = N0;
      let yt = this.t + (i0.t || 0) * this.st,
        Mt = yt + Q.duration / N0;
      if ((A0.connect(xt), xt.connect(i0.dest || this.sum), i0.dur > 0)) {
        let St = i0.dur * this.st,
          Rt = (i0.rel ?? 0.05) * this.st;
        (xt.gain.setValueAtTime(0, yt),
          xt.gain.linearRampToValueAtTime(mt, yt + 0.004),
          xt.gain.setValueAtTime(mt, yt + St),
          xt.gain.linearRampToValueAtTime(0, yt + St + Rt),
          (Mt = yt + St + Rt),
          A0.start(yt, (i0.off || 0) % Q.duration),
          A0.stop(Mt + 0.02));
      } else A0.start(yt, i0.off || 0);
      return (
        this.nodes.push(xt),
        this.srcs.push(A0),
        Mt + 0.05 > this.end && (this.end = Mt + 0.05),
        xt
      );
    }
    glide(Q) {
      let i0 = Q.g ?? 1;
      if (!(i0 > 1e-5)) return null;
      let A0 = this.st,
        N0 = this.rate,
        mt = this.t + (Q.t || 0) * A0,
        xt = (Q.a ?? 0.005) * A0,
        yt = (Q.s || 0) * A0,
        Mt = (Q.r ?? 0.03) * A0,
        St = r(Q.type, Q.f[0][1] * N0),
        Rt = i(0);
      St.frequency.setValueAtTime(t(Q.f[0][1] * N0), mt);
      for (let Jt = 1; Jt < Q.f.length; Jt++)
        St.frequency.exponentialRampToValueAtTime(
          t(Q.f[Jt][1] * N0),
          mt + Q.f[Jt][0] * A0,
        );
      (Rt.gain.setValueAtTime(0, mt),
        Rt.gain.linearRampToValueAtTime(i0, mt + xt),
        Rt.gain.setValueAtTime(i0, mt + xt + yt),
        Rt.gain.linearRampToValueAtTime(0, mt + xt + yt + Mt));
      let Ot = mt + xt + yt + Mt;
      return (
        St.connect(Rt),
        Rt.connect(Q.dest || this.sum),
        St.start(mt),
        St.stop(Ot + 0.02),
        this.nodes.push(Rt),
        this.srcs.push(St),
        Ot + 0.08 > this.end && (this.end = Ot + 0.08),
        Rt
      );
    }
    noise(Q) {
      let i0 = Q.g ?? 1;
      if (!(i0 > 1e-5)) return null;
      let A0 = this.st,
        N0 = this.rate,
        mt = this.t + (Q.t || 0) * A0,
        xt = Q.a ?? 0.001,
        yt = (Q.hold || 0) * A0,
        Mt = (Q.d ?? 0.1) * A0,
        St = o.buf[Q.buf || "white"],
        Rt = l(St, !0);
      Rt.playbackRate.value = fl((Q.rate ?? 1) * N0, 0.05, 8);
      let Ot = Rt;
      if (Q.type) {
        let Nt = a(Q.type, Q.f * N0, Q.q ?? 0.7);
        (Nt.frequency.setValueAtTime(t(Q.f * N0), mt),
          Q.f1 &&
            Nt.frequency.exponentialRampToValueAtTime(
              t(Q.f1 * N0),
              mt + (Q.ft != null ? Q.ft * A0 : Mt),
            ),
          Ot.connect(Nt),
          (Ot = Nt),
          this.nodes.push(Nt));
      }
      if (Q.hp) {
        let Nt = a("highpass", Q.hp * N0);
        (Ot.connect(Nt), (Ot = Nt), this.nodes.push(Nt));
      }
      if (Q.lp) {
        let Nt = a("lowpass", Q.lp * N0);
        (Ot.connect(Nt), (Ot = Nt), this.nodes.push(Nt));
      }
      let Jt = i(0),
        ee = u(Jt.gain, mt, xt, yt, Mt, i0);
      return (
        Ot.connect(Jt),
        Jt.connect(Q.dest || this.sum),
        Rt.start(mt, Math.random() * Math.max(0, St.duration - 0.1)),
        Rt.stop(ee + 0.03),
        this.nodes.push(Jt),
        this.srcs.push(Rt),
        ee + 0.08 > this.end && (this.end = ee + 0.08),
        Jt
      );
    }
    tone(Q) {
      let i0 = Q.g ?? 1;
      if (!(i0 > 1e-5)) return null;
      let A0 = this.st,
        N0 = this.rate,
        mt = this.t + (Q.t || 0) * A0,
        xt = Q.a ?? 0.001,
        yt = (Q.hold || 0) * A0,
        Mt = (Q.d ?? 0.1) * A0,
        St = r(Q.type, Q.f * N0);
      (St.frequency.setValueAtTime(t(Q.f * N0), mt),
        Q.f1 &&
          St.frequency.exponentialRampToValueAtTime(
            t(Q.f1 * N0),
            mt + (Q.ft != null ? Q.ft * A0 : Mt),
          ),
        Q.detune && (St.detune.value = Q.detune));
      let Rt = i(0),
        Ot = u(Rt.gain, mt, xt, yt, Mt, i0);
      return (
        St.connect(Rt),
        Rt.connect(Q.dest || this.sum),
        St.start(mt),
        St.stop(Ot + 0.03),
        this.nodes.push(Rt),
        this.srcs.push(St),
        Ot + 0.08 > this.end && (this.end = Ot + 0.08),
        Rt
      );
    }
    fm(Q) {
      let i0 = Q.g ?? 1;
      if (!(i0 > 1e-5)) return null;
      let A0 = this.st,
        N0 = this.rate,
        mt = this.t + (Q.t || 0) * A0,
        xt = (Q.d ?? 0.1) * A0,
        yt = t(Q.f * N0),
        Mt = Q.ratio ?? 1.41,
        St = r("sine", yt),
        Rt = r("sine", yt * Mt),
        Ot = i(0),
        Jt = i(0),
        ee = (Q.index ?? 2) * yt * Mt;
      (Ot.gain.setValueAtTime(ee, mt),
        Ot.gain.exponentialRampToValueAtTime(
          Math.max(0.001, ee * 0.02),
          mt + (Q.id ?? xt * 0.4) * A0,
        ),
        Rt.connect(Ot),
        Ot.connect(St.frequency));
      let Nt = u(Jt.gain, mt, Q.a ?? 5e-4, 0, xt, i0);
      return (
        St.connect(Jt),
        Jt.connect(Q.dest || this.sum),
        St.start(mt),
        Rt.start(mt),
        St.stop(Nt + 0.03),
        Rt.stop(Nt + 0.03),
        this.nodes.push(Ot, Jt),
        this.srcs.push(St, Rt),
        Nt + 0.08 > this.end && (this.end = Nt + 0.08),
        Jt
      );
    }
    partials(Q, i0, A0, N0, mt = 0, xt) {
      for (let yt = 0; yt < i0.length; yt++)
        this.tone({
          t: mt,
          f: Q * i0[yt] * qt(0.995, 1.005),
          a: 6e-4,
          d: N0 / (1 + yt * 0.55),
          g: A0 / (1 + yt * 0.7),
          dest: xt,
        });
    }
  }
  function S(J, Q = 1) {
    let i0 = l(J, !0);
    return (
      (i0.playbackRate.value = Q),
      i0.start(0, Math.random() * (J.duration - 0.1)),
      i0
    );
  }
  function E(J) {
    let Q = o.ctx,
      i0 = Q.sampleRate,
      A0 = Dw(i0);
    ((o.nyq = i0 * 0.45),
      A0.noise ||
        (A0.noise = {
          white: tI(i0, 3, "white"),
          brown: tI(i0, 4, "brown"),
        }),
      (o.buf.white = m([A0.noise.white])),
      (o.buf.brown = m([A0.noise.brown])),
      (o.master = i(o.vol.master)),
      (o.masterLP = a("lowpass", 2e4, 0.5)),
      (o.post = i(1)),
      o.master.connect(o.masterLP),
      o.masterLP.connect(o.post));
    let N0 = J.destination || Q.destination;
    if (J.limiter === !1) o.post.connect(N0);
    else {
      let Le = (o.limiter = s(Q.createDynamicsCompressor()));
      ((Le.threshold.value = Yd.thr),
        (Le.knee.value = Yd.knee),
        (Le.ratio.value = Yd.ratio),
        (Le.attack.value = Yd.attack),
        (Le.release.value = Yd.release));
      let xn = i(0.5 / V$(Yd.thr, Yd.knee, Yd.ratio)),
        js = s(Q.createWaveShaper()),
        Un = new Float32Array(4097);
      for (let re = 0; re < Un.length; re++) {
        let Ae = ((re / (Un.length - 1)) * 2 - 1) * 2,
          ws = Math.abs(Ae);
        Un[re] =
          ws <= 0.8
            ? Ae
            : Math.sign(Ae) * (0.8 + 0.2 * Math.tanh((ws - 0.8) / 0.2));
      }
      ((js.curve = Un),
        o.post.connect(Le),
        Le.connect(xn),
        xn.connect(js),
        js.connect(N0));
    }
    ((o.sfxVol = i(o.vol.sfx)),
      o.sfxVol.connect(o.master),
      (o.sfxLP = a("lowpass", 2e4, 0.5)),
      o.sfxLP.connect(o.sfxVol));
    let mt = (Le) => {
      let xn = i(1);
      return (xn.connect(Le), xn);
    };
    ((o.duckW = mt(o.sfxLP)),
      (o.duckA = mt(o.sfxLP)),
      (o.duckG = mt(o.sfxLP)),
      (o.bus = {
        gun: o.duckG,
        sfx: o.duckW,
        foley: mt(o.duckW),
        amb: o.duckA,
        exp: mt(o.sfxLP),
        ui: mt(o.sfxVol),
      }),
      (o.bus.k9 = mt(o.duckG)),
      (o.tin = i(1)),
      o.tin.connect(o.post),
      (o.revIn = i(1)));
    let xt = s(Q.createConvolver()),
      yt = s(Q.createConvolver());
    ((xt.normalize = !1),
      (yt.normalize = !1),
      (xt.buffer = p("ir:in", !0)),
      (yt.buffer = p("ir:out", !0)),
      (o.wetIn = i(0)),
      (o.wetOut = i(0)),
      o.revIn.connect(xt),
      xt.connect(o.wetIn),
      o.wetIn.connect(o.sfxLP),
      o.revIn.connect(yt),
      yt.connect(o.wetOut),
      o.wetOut.connect(o.sfxLP),
      (o.musicVol = i(o.vol.music)),
      o.musicVol.connect(o.master),
      (o.musicDuck = i(1)),
      o.musicDuck.connect(o.musicVol));
    let Mt = s(Q.createConvolver());
    ((Mt.normalize = !1),
      (Mt.buffer = xt.buffer),
      (o.musicRev = i(1)),
      o.musicRev.connect(Mt));
    let St = i(1);
    (Mt.connect(St), St.connect(o.musicDuck));
    let Rt = o.menu;
    ((Rt.gain = i(0)),
      Rt.gain.connect(o.musicDuck),
      (Rt.send = i(0.5)),
      Rt.gain.connect(Rt.send),
      Rt.send.connect(o.musicRev),
      (Rt.filt = a("lowpass", 560, 1)),
      Rt.filt.connect(Rt.gain));
    let Ot = r("sine", 0.047),
      Jt = i(210);
    (Ot.connect(Jt), Jt.connect(Rt.filt.frequency), Ot.start());
    let ee = r("sine", 0.019),
      Nt = i(140);
    (ee.connect(Nt),
      Nt.connect(Rt.filt.frequency),
      ee.start(),
      (Rt.dly = s(Q.createDelay(1.5))),
      (Rt.dly.delayTime.value = (60 / eR) * 0.75),
      (Rt.fb = i(0.36)),
      (Rt.dlyLP = a("lowpass", 2400, 0.5)),
      (Rt.lead = i(1)),
      Rt.lead.connect(Rt.gain),
      Rt.lead.connect(Rt.dly),
      Rt.dly.connect(Rt.dlyLP),
      Rt.dlyLP.connect(Rt.fb),
      Rt.fb.connect(Rt.dly));
    let ge = i(0.5);
    (Rt.dlyLP.connect(ge),
      ge.connect(Rt.gain),
      J.ambience !== !1 && C(),
      A(Q.currentTime, !0),
      (o.stats.persistent = o.stats.live));
  }
  function _(J, Q, i0, A0, N0, mt) {
    if (i0 >= 0.995) return;
    let xt = o.ctx.currentTime,
      yt =
        o.ducks[J] ||
        (o.ducks[J] = {
          until: 0,
          depth: 1,
        });
    xt < yt.until && yt.depth < i0 && (i0 = yt.depth);
    let Mt = Math.max(yt.until, xt + N0);
    ((yt.until = Mt),
      (yt.depth = i0),
      Q.cancelScheduledValues(xt),
      Q.setTargetAtTime(i0, xt, A0),
      Q.setTargetAtTime(1, Mt, mt));
  }
  function R(J, Q = 1) {
    J === "own"
      ? (_("A", o.duckA.gain, 0.5, 0.006, 0.14, 0.3),
        _("W", o.duckW.gain, 0.8, 0.006, 0.1, 0.2),
        _("M", o.musicDuck.gain, 0.63, 0.008, 0.2, 0.4))
      : J === "sup"
        ? _("A", o.duckA.gain, 0.8, 0.008, 0.08, 0.25)
        : J === "gun"
          ? (_("A", o.duckA.gain, Gc(1, 0.6, Q), 0.008, 0.12, 0.3),
            _("W", o.duckW.gain, Gc(1, 0.9, Q), 0.008, 0.08, 0.2))
          : J === "exp"
            ? (_("A", o.duckA.gain, Gc(1, 0.22, Q), 0.012, 0.45, 0.5),
              _("W", o.duckW.gain, Gc(1, 0.4, Q), 0.012, 0.35, 0.4),
              _("G", o.duckG.gain, Gc(1, 0.6, Q), 0.012, 0.25, 0.3),
              _("M", o.musicDuck.gain, Gc(1, 0.35, Q), 0.012, 0.5, 0.6))
            : J === "big" &&
              _("A", o.duckA.gain, Gc(1, 0.5, Q), 0.01, 0.3, 0.4);
  }
  function C() {
    let J = (o.amb = {
        sp: {},
      }),
      Q = i(0.18);
    Q.connect(o.bus.amb);
    let i0 = (St, Rt, Ot, Jt, ee) => {
        let Nt = S(o.buf[St], Rt);
        for (let Le of Ot) (Nt.connect(Le), (Nt = Le));
        let ge = i(Jt);
        return (Nt.connect(ge), ge.connect(ee), ge);
      },
      A0 = (St, Rt, Ot, Jt, ee) => {
        let Nt = r(St, Rt),
          ge = i(Ot);
        return (
          ee ? (Nt.connect(ee), ee.connect(ge)) : Nt.connect(ge),
          ge.connect(Jt),
          Nt.start(),
          ge
        );
      };
    ((J.outLP = a("lowpass", 12e3, 0.5)),
      (J.outG = i(0)),
      J.outLP.connect(J.outG),
      J.outG.connect(Q),
      (J.windF = a("bandpass", 520, 0.7)),
      (J.windG = i0("white", 0.9, [J.windF], 0.25, J.outLP)),
      (J.airG = i0(
        "white",
        1.13,
        [a("highpass", 2600), a("lowpass", 6500)],
        0.012,
        J.outLP,
      )),
      i0("brown", 0.8, [a("lowpass", 150)], 0.5, J.outLP),
      (J.trafG = i0("brown", 1.21, [a("bandpass", 330, 0.5)], 0.1, J.outLP)),
      (J.life = i(1)),
      J.life.connect(J.outLP),
      (J.inG = i(0)),
      J.inG.connect(Q));
    let N0 = (St) => {
        let Rt = i(St === "lobby" ? 1 : 0);
        return (Rt.connect(J.inG), (J.sp[St] = Rt), Rt);
      },
      mt = N0("lobby");
    (i0("brown", 0.93, [a("lowpass", 210)], 0.3, mt),
      i0("white", 0.77, [a("bandpass", 900, 0.4)], 0.014, mt),
      A0("sine", 60, 0.005, mt),
      A0("sine", 120, 0.003, mt));
    let xt = N0("kitchen");
    (A0("sine", 119.6, 0.03, xt),
      A0("sine", 59.8, 0.016, xt),
      A0("triangle", 239.4, 0.012, xt),
      A0("sine", 121.1, 0.016, xt),
      i0("brown", 1, [a("bandpass", 185, 2.5)], 0.16, xt),
      i0("white", 0.83, [a("bandpass", 620, 0.5)], 0.1, xt),
      i0("white", 1.07, [a("bandpass", 2300, 1)], 0.018, xt),
      i0("brown", 0.9, [a("lowpass", 180)], 0.2, xt));
    let yt = N0("bar");
    (A0("sawtooth", 120, 0.06, yt, a("bandpass", 2900, 1.4)),
      A0("sine", 120, 0.012, yt),
      A0("sine", 180, 0.006, yt),
      A0("sine", 98, 0.016, yt),
      i0("brown", 1.1, [a("bandpass", 300, 0.8)], 0.12, yt),
      i0("white", 0.7, [a("bandpass", 1100, 0.4)], 0.02, yt),
      i0("brown", 0.93, [a("lowpass", 200)], 0.24, yt));
    let Mt = N0("corridor");
    (i0("brown", 0.88, [a("lowpass", 140)], 0.22, Mt),
      i0("white", 0.9, [a("bandpass", 480, 0.5)], 0.011, Mt),
      A0("sine", 60, 0.003, Mt));
  }
  function L() {
    let J = o.lx,
      Q = o.lz;
    return J > 6 && J < 28 && Q > -20 && Q < -8
      ? "kitchen"
      : Math.hypot(J + 20.5, Q + 5.6) < 7.5
        ? "bar"
        : Math.abs(J) > 12 && Q > -8 && Q < 10
          ? "corridor"
          : "lobby";
  }
  function A(J, Q) {
    let i0 = o.indoor,
      A0 = Q ? 0.001 : 0.12;
    (o.wetIn.gain.setTargetAtTime(Math.sin((i0 * Math.PI) / 2) * W$, J, A0),
      o.wetOut.gain.setTargetAtTime(Math.cos((i0 * Math.PI) / 2) * q$, J, A0));
    let N0 = o.amb;
    if (N0) {
      let xt = o.clock,
        yt = Q ? 0.001 : 0.2,
        Mt =
          0.5 +
          0.25 * Math.sin(xt * 0.23) +
          0.15 * Math.sin(xt * 0.61 + 1.3) +
          0.1 * Math.sin(xt * 1.37 + 4);
      (N0.outG.gain.setTargetAtTime(Gc(1, 0.16, i0), J, yt),
        N0.outLP.frequency.setTargetAtTime(t(Gc(12e3, 650, i0)), J, yt),
        N0.inG.gain.setTargetAtTime(i0, J, yt),
        N0.windF.frequency.setTargetAtTime(380 + 420 * Mt, J, 0.3),
        N0.windG.gain.setTargetAtTime(0.1 + 0.28 * Mt, J, 0.3),
        N0.airG.gain.setTargetAtTime(0.004 + 0.02 * Mt * Mt, J, 0.3),
        N0.trafG.gain.setTargetAtTime(
          0.07 + 0.05 * Math.sin(xt * 0.11 + 2),
          J,
          0.5,
        ));
      let St = o.space && N0.sp[o.space] ? o.space : L();
      for (let Rt in N0.sp)
        N0.sp[Rt].gain.setTargetAtTime(Rt === St ? 1 : 0, J, Q ? 0.001 : 0.5);
    }
    let mt = o.lowHealth;
    o.sfxLP.frequency.setTargetAtTime(
      t(2e4 * Math.pow(0.09, Math.pow(mt, 1.2))),
      J,
      Q ? 0.001 : 0.15,
    );
  }
  function O(J) {
    let Q = o.amb;
    if (!Q) return 0;
    let i0 = o.ctx,
      A0 = i0.currentTime + 0.05,
      N0 = s(i0.createStereoPanner()),
      mt = i(0),
      xt = i(0.5);
    (mt.connect(N0), N0.connect(Q.life), N0.connect(xt), xt.connect(o.revIn));
    let yt = qt(-0.8, 0.8),
      Mt = 8;
    if (J === "siren") {
      Mt = qt(9, 14);
      let St = r("triangle", 700),
        Rt = a("lowpass", 1500, 0.7),
        Ot = r("sine", 1 / qt(3.4, 4.6)),
        Jt = i(260);
      (St.frequency.setValueAtTime(820, A0),
        St.frequency.linearRampToValueAtTime(790, A0 + Mt),
        Ot.connect(Jt),
        Jt.connect(St.frequency),
        St.connect(Rt),
        Rt.connect(mt),
        mt.gain.setValueAtTime(0, A0),
        mt.gain.linearRampToValueAtTime(0.024, A0 + Mt * 0.3),
        mt.gain.setValueAtTime(0.024, A0 + Mt * 0.55),
        mt.gain.linearRampToValueAtTime(0, A0 + Mt),
        N0.pan.setValueAtTime(yt, A0),
        N0.pan.linearRampToValueAtTime(fl(yt + qt(-0.4, 0.4), -1, 1), A0 + Mt),
        St.start(A0),
        Ot.start(A0),
        St.stop(A0 + Mt + 0.1),
        Ot.stop(A0 + Mt + 0.1),
        c(St, Rt, Ot, Jt, mt, N0, xt));
    } else if (J === "heli") {
      Mt = qt(18, 26);
      let St = l(o.buf.brown, !0),
        Rt = a("lowpass", 210, 0.6),
        Ot = l(o.buf.white, !0),
        Jt = a("bandpass", 620, 0.8),
        ee = i(0.3),
        Nt = i(0.55),
        ge = r("sawtooth", qt(10.5, 12.5)),
        Le = i(0.45),
        xn = r("sine", 76),
        js = i(0.25);
      (St.connect(Rt),
        Rt.connect(Nt),
        Ot.connect(Jt),
        Jt.connect(ee),
        ee.connect(Nt),
        xn.connect(js),
        js.connect(Nt),
        ge.connect(Le),
        Le.connect(Nt.gain),
        Nt.connect(mt),
        mt.gain.setValueAtTime(0, A0),
        mt.gain.linearRampToValueAtTime(0.3, A0 + Mt * 0.45),
        mt.gain.linearRampToValueAtTime(0, A0 + Mt));
      let Un = Math.random() < 0.5 ? 1 : -1;
      (N0.pan.setValueAtTime(-0.9 * Un, A0),
        N0.pan.linearRampToValueAtTime(0.9 * Un, A0 + Mt));
      for (let re of [St, Ot])
        (re.start(A0, Math.random() * 2), re.stop(A0 + Mt + 0.1));
      for (let re of [ge, xn]) (re.start(A0), re.stop(A0 + Mt + 0.1));
      c(St, Rt, Ot, Jt, ee, Nt, ge, Le, xn, js, mt, N0, xt);
    } else {
      let St = 392 * qt(0.94, 1.06),
        Rt = a("lowpass", 1300, 0.7),
        Ot = r("sawtooth", St),
        Jt = r("sawtooth", St * 1.26);
      (Ot.connect(Rt),
        Jt.connect(Rt),
        Rt.connect(mt),
        (N0.pan.value = yt),
        mt.gain.setValueAtTime(0, A0));
      let ee = A0,
        Nt = Fl(1, 2);
      for (let ge = 0; ge < Nt; ge++) {
        let Le = qt(0.18, 0.45);
        (mt.gain.linearRampToValueAtTime(0.012, ee + 0.03),
          mt.gain.setValueAtTime(0.012, ee + Le),
          mt.gain.linearRampToValueAtTime(0, ee + Le + 0.06),
          (ee += Le + qt(0.12, 0.2)),
          mt.gain.setValueAtTime(0, ee));
      }
      ((Mt = ee - A0 + 0.1),
        Ot.start(A0),
        Jt.start(A0),
        Ot.stop(A0 + Mt),
        Jt.stop(A0 + Mt),
        c(Ot, Jt, Rt, mt, N0, xt));
    }
    return Mt;
  }
  function H(J) {
    let Q = o.life;
    if (!o.amb || o.indoor > 0.75 || ((Q.next -= J), (Q.heli -= J), Q.next > 0))
      return;
    let i0 = Q.heli <= 0 && Math.random() < 0.35;
    (i0 && (Q.heli = qt(110, 200)),
      O(i0 ? "heli" : Math.random() < 0.55 ? "siren" : "horn"),
      (Q.next = qt(24, 60)));
  }
  let F = (J, Q, i0, A0) => {
      (J.noise({
        t: Q,
        type: "bandpass",
        f: i0,
        q: 4,
        a: 5e-4,
        d: 0.012,
        g: A0,
      }),
        J.tone({
          t: Q,
          type: "triangle",
          f: i0 * 0.83,
          a: 5e-4,
          d: 0.02,
          g: A0 * 0.2,
        }));
    },
    P = (J, Q, i0, A0 = 1, N0 = 0.03) => {
      (J.noise({
        t: Q,
        type: "lowpass",
        f: 3400 * A0,
        a: 4e-4,
        d: 0.02,
        g: 0.9 * i0,
      }),
        J.noise({
          t: Q,
          type: "highpass",
          f: 4200,
          a: 3e-4,
          d: 0.004,
          g: 0.35 * i0,
        }),
        J.tone({
          t: Q,
          f: 250 * A0,
          f1: 150 * A0,
          ft: 0.03,
          a: 5e-4,
          d: 0.035,
          g: 0.6 * i0,
        }),
        J.fm({
          t: Q,
          f: 1870 * A0 * qt(0.97, 1.03),
          ratio: 1.41,
          index: 1.6,
          id: 0.006,
          d: N0,
          g: 0.16 * i0,
        }),
        J.tone({
          t: Q,
          f: 3150 * A0 * qt(0.97, 1.03),
          a: 5e-4,
          d: N0 * 0.6,
          g: 0.07 * i0,
        }));
    },
    z = (J, Q, i0, A0 = 620) => {
      (J.noise({
        t: Q,
        type: "bandpass",
        f: A0,
        q: 3.5,
        a: 6e-4,
        d: 0.028,
        g: 3.2 * i0,
      }),
        J.noise({
          t: Q,
          type: "bandpass",
          f: A0 * 2.3,
          q: 3,
          a: 5e-4,
          d: 0.014,
          g: 1.3 * i0,
        }),
        J.tone({
          t: Q,
          f: A0 * 0.42,
          f1: A0 * 0.3,
          ft: 0.03,
          a: 8e-4,
          d: 0.035,
          g: 0.4 * i0,
        }));
    },
    k = (J, Q, i0, A0, N0, mt, xt = 1.6) => {
      (J.noise({
        t: Q,
        type: "bandpass",
        f: i0,
        f1: A0,
        ft: N0,
        q: xt,
        a: N0 * 0.3,
        d: N0 * 0.7,
        g: mt,
      }),
        J.noise({
          t: Q,
          type: "highpass",
          f: 5e3,
          a: N0 * 0.3,
          d: N0 * 0.6,
          g: mt * 0.08,
        }));
    },
    I = (J, Q, i0) => {
      (J.noise({
        t: Q,
        type: "bandpass",
        f: 1400,
        f1: 900,
        ft: 0.12,
        q: 0.5,
        a: 0.03,
        d: 0.12,
        g: 0.25 * i0,
      }),
        J.noise({
          t: Q + 0.02,
          type: "highpass",
          f: 3500,
          a: 0.02,
          d: 0.07,
          g: 0.05 * i0,
        }));
    },
    G = (J, Q, i0, A0) => {
      for (let N0 = 0; N0 < i0; N0++)
        F(J, Q + qt(0, 0.09), qt(2400, 4600), A0 * qt(0.4, 1));
    },
    K = (J, Q, i0, A0, N0, mt) => {
      J.noise({
        t: Q,
        type: "bandpass",
        f: i0,
        f1: A0,
        ft: N0 * 0.6,
        q: 1.1,
        a: N0 * 0.35,
        d: N0 * 0.65,
        g: mt,
      });
    },
    $ = (J, Q, i0, A0 = 95) => {
      (J.tone({
        t: Q,
        f: A0,
        f1: A0 * 0.52,
        ft: 0.09,
        a: 0.002,
        d: 0.16,
        g: i0,
      }),
        J.noise({
          t: Q,
          buf: "brown",
          type: "lowpass",
          f: 380,
          a: 0.003,
          d: 0.1,
          g: i0 * 1.1,
        }));
    },
    n0 = (J, Q, i0, A0, N0 = 3e3, mt = 1e4, xt = 0) => {
      let yt = Math.log(mt / N0);
      for (let Mt = 0; Mt < Q; Mt++) {
        let St = Math.pow(Math.random(), 1.7),
          Rt = xt + i0 * St,
          Ot = N0 * Math.exp(Math.random() * yt),
          Jt = A0 * qt(0.3, 1) * (1 - 0.6 * St);
        (J.tone({
          t: Rt,
          f: Ot,
          a: 5e-4,
          d: qt(0.03, 0.12),
          g: Jt,
        }),
          Math.random() < 0.3 &&
            J.tone({
              t: Rt,
              f: Ot * 1.47,
              a: 5e-4,
              d: 0.03,
              g: Jt * 0.4,
            }));
      }
    },
    e0 = {
      wood: 0.85,
      water: 0.6,
      carpet: 0.8,
      fabric: 0.8,
    };
  function p0(J, Q, i0, A0 = 0, N0 = 0) {
    let mt = N0 ? 1.25 : 0.9,
      xt = N0 ? 0.55 : 1,
      yt = qt(0.9, 1.1);
    switch (((i0 *= e0[Q] || 1), Q)) {
      case "marble":
      case "tile": {
        let Mt = (Q === "tile" ? 1.25 : 1) * mt * yt;
        (J.noise({
          t: A0,
          type: "bandpass",
          f: 2700 * Mt,
          q: 1.3,
          a: 6e-4,
          d: 0.012,
          g: 1.5 * i0,
        }),
          J.noise({
            t: A0,
            type: "bandpass",
            f: 1400 * Mt,
            q: 1.4,
            a: 6e-4,
            d: 0.022,
            g: 1.5 * i0,
          }),
          J.noise({
            t: A0,
            type: "bandpass",
            f: 640 * Mt,
            q: 1,
            d: 0.04,
            g: 2.3 * i0,
          }),
          J.tone({
            t: A0,
            f: 150 * yt,
            f1: 85,
            ft: 0.04,
            d: 0.055,
            g: 0.2 * i0 * xt,
          }),
          N0 &&
            Math.random() < 0.4 &&
            J.noise({
              t: A0 + qt(0.01, 0.03),
              type: "highpass",
              f: 4500,
              a: 0.004,
              d: 0.03,
              g: 0.1 * i0,
            }));
        break;
      }
      case "carpet":
      case "fabric":
        (J.noise({
          t: A0,
          buf: "brown",
          type: "lowpass",
          f: 400 * mt * yt,
          a: 0.004,
          d: 0.075,
          g: 1.9 * i0 * (N0 ? 0.7 : 1),
        }),
          J.noise({
            t: A0,
            type: "bandpass",
            f: 1700 * mt * yt,
            q: 0.5,
            a: 0.006,
            d: 0.05,
            g: 0.5 * i0,
          }),
          J.noise({
            t: A0,
            type: "bandpass",
            f: 700 * yt,
            q: 0.7,
            a: 0.004,
            d: 0.05,
            g: 0.8 * i0,
          }),
          J.tone({
            t: A0,
            f: 95 * yt,
            f1: 60,
            ft: 0.05,
            a: 0.003,
            d: 0.06,
            g: 0.2 * i0 * xt,
          }));
        break;
      case "wood":
        (J.noise({
          t: A0,
          type: "bandpass",
          f: 205 * yt * (N0 ? 1.2 : 1),
          q: 5,
          d: 0.065,
          g: 12 * i0 * xt,
        }),
          J.noise({
            t: A0,
            type: "bandpass",
            f: 530 * yt * mt,
            q: 4,
            d: 0.045,
            g: 6 * i0,
          }),
          J.noise({
            t: A0,
            type: "highpass",
            f: 2500,
            a: 5e-4,
            d: 0.008,
            g: 0.28 * i0 * mt,
          }),
          Math.random() < 0.18 &&
            J.tone({
              t: A0 + 0.02,
              type: "sawtooth",
              f: qt(380, 520),
              f1: qt(300, 380),
              ft: 0.07,
              a: 0.02,
              d: 0.06,
              g: 0.012 * i0,
            }));
        break;
      case "metal":
        (J.partials(
          430 * qt(0.94, 1.06),
          [1, 2.63, 4.35, 6.86],
          0.38 * i0 * xt,
          0.14,
          A0,
        ),
          J.noise({
            t: A0,
            type: "bandpass",
            f: 2800 * mt,
            q: 2,
            a: 5e-4,
            d: 0.012,
            g: 0.9 * i0,
          }),
          J.tone({
            t: A0,
            f: 130,
            f1: 80,
            d: 0.05,
            g: 0.4 * i0 * xt,
          }));
        break;
      case "water":
        (J.noise({
          t: A0,
          type: "bandpass",
          f: 900,
          f1: 2600,
          ft: 0.15,
          q: 0.9,
          a: 0.004,
          d: 0.2,
          g: 1.9 * i0,
        }),
          J.tone({
            t: A0,
            f: 320,
            f1: 140,
            ft: 0.07,
            d: 0.09,
            g: 0.45 * i0,
          }));
        for (let Mt = 0; Mt < 2; Mt++)
          J.tone({
            t: A0 + qt(0.04, 0.16),
            f: qt(900, 1800),
            f1: qt(1900, 2800),
            ft: 0.03,
            a: 0.002,
            d: 0.035,
            g: 0.12 * i0,
          });
        break;
      case "glass":
        (J.noise({
          t: A0,
          type: "bandpass",
          f: 3200 * mt * yt,
          q: 1.5,
          a: 6e-4,
          d: 0.01,
          g: 1 * i0,
        }),
          J.noise({
            t: A0,
            type: "bandpass",
            f: 900 * yt,
            q: 2,
            d: 0.04,
            g: 1.4 * i0,
          }),
          J.tone({
            t: A0,
            f: 190 * yt,
            f1: 120,
            d: 0.06,
            g: 0.5 * i0 * xt,
          }));
        break;
      case "foliage":
        (J.noise({
          t: A0,
          type: "bandpass",
          f: 3e3 * yt,
          q: 0.6,
          a: 0.008,
          d: 0.09,
          g: 0.7 * i0,
        }),
          J.noise({
            t: A0,
            buf: "brown",
            type: "lowpass",
            f: 350,
            a: 0.004,
            d: 0.06,
            g: 1.2 * i0 * xt,
          }));
        break;
      default:
        (J.noise({
          t: A0,
          type: "bandpass",
          f: 1100 * mt * yt,
          q: 0.8,
          d: 0.03,
          g: 2.2 * i0,
        }),
          J.noise({
            t: A0,
            type: "bandpass",
            f: 480 * yt,
            q: 1,
            d: 0.04,
            g: 1.6 * i0,
          }),
          J.tone({
            t: A0,
            f: 120 * yt,
            f1: 70,
            d: 0.05,
            g: 0.2 * i0 * xt,
          }));
        for (let Mt = 0; Mt < 3; Mt++)
          J.noise({
            t: A0 + qt(0.008, 0.06),
            type: "highpass",
            f: 3e3,
            a: 5e-4,
            d: 0.012,
            g: 0.22 * i0,
          });
    }
  }
  function t0(J, Q, i0) {
    let A0 = gu[J] ? J : "ar",
      N0 = gu[A0],
      mt = N0.sup,
      xt = !!(i0 && i0.suppressed),
      yt = !Q,
      Mt = o.ctx.currentTime;
    if (yt) {
      let Rt = o.lastShot;
      Rt && !Rt.dying && Mt - Rt.t0 < 0.25 && y(Rt, 0.03, 0.5);
    }
    let St = new T(Q, {
      bus: "gun",
      cat: yt ? "own" : "gun",
      own: yt,
      prio: yt ? 30 : 7,
      lpDist: !0,
      sos: !0,
      rev: (xt ? mt.rev : N0.rev) * qt(0.88, 1.12),
      ref: xt ? 4 : 8,
      roll: xt ? 1.3 : 1,
      maxDist: xt ? 55 : 0,
      occF: xt ? 800 : 1100,
      pitch: qt(0.965, 1.04),
      gain: JD(xt ? mt.level : N0.level) * qt(0.93, 1.07),
    });
    if (((St.t0 = Mt), xt)) St.play(p(x(`gun:${A0}:sup:`, Cg.sup), yt));
    else {
      let Rt = yt ? 0 : Lw(9, 40, St.dist);
      (Rt < 0.985 &&
        St.play(p(x(`gun:${A0}:near:`, Cg.near), yt), {
          g: Math.cos((Rt * Math.PI) / 2),
        }),
        Rt > 0.015 &&
          St.play(p(x(`gun:${A0}:far:`, Cg.far), !1), {
            g: Math.sin((Rt * Math.PI) / 2) * K$,
          }));
    }
    if (yt) ((o.lastShot = St), R(xt ? "sup" : "own"));
    else if (!xt) {
      let Rt = Ai(1 - St.dist / 22) * (1 - 0.6 * St.occ);
      Rt > 0.05 && R("gun", Rt);
    }
  }
  function M0() {
    let J = new T(null, {
      bus: "foley",
      cat: "foley",
      prio: 6,
      rev: 0.06,
      pitch: qt(0.97, 1.03),
      gain: 0.16,
    });
    (F(J, 0, 3600, 0.9),
      J.fm({
        f: 2700,
        ratio: 1.41,
        index: 1.2,
        id: 0.004,
        d: 0.018,
        g: 0.2,
      }),
      J.tone({
        f: 430,
        f1: 300,
        a: 5e-4,
        d: 0.02,
        g: 0.3,
      }),
      F(J, 0.019, 2300, 0.3));
  }
  function f0(J, Q) {
    let i0 = (Q$[J] || 1) * qt(0.96, 1.04),
      A0 = J === "shotgun" ? 1.15 : J === "pistol" ? 0.85 : 1,
      N0 = new T(null, {
        bus: "foley",
        cat: "foley",
        prio: 6,
        rev: 0.1,
        pitch: i0,
        gain: 0.2,
      });
    switch (Q) {
      case "magout":
        (F(N0, 0, 3e3, 1.5),
          k(N0, 0.012, 1300, 2300, 0.075, 1.5),
          z(N0, 0.082, 0.85, 560),
          N0.tone({
            t: 0.006,
            f: 190,
            f1: 120,
            d: 0.04,
            g: 0.6,
          }));
        break;
      case "magin":
        (z(N0, 0, 0.45, 700),
          k(N0, 0.008, 2200, 1300, 0.05, 0.85),
          z(N0, 0.058, 1, 610),
          P(N0, 0.06, 0.95 * A0, 1.15, 0.022));
        break;
      case "bolt":
        (k(N0, 0, 2100, 3e3, 0.06, 0.5, 2.2),
          P(N0, 0.004, 0.45, 1.3, 0.015),
          P(N0, 0.088, 1.1, 1, 0.085),
          N0.tone({
            t: 0.09,
            f: 742,
            a: 0.001,
            d: 0.07,
            g: 0.03,
          }));
        break;
      case "pump_back":
        (F(N0, 0, 2100, 0.6),
          k(N0, 0.008, 1e3, 2400, 0.075, 1.25, 1.2),
          G(N0, 0.02, 2, 0.16),
          P(N0, 0.082, 0.95, 0.85, 0.035));
        break;
      case "pump_fwd":
        (k(N0, 0, 2500, 1e3, 0.065, 1.25, 1.2),
          P(N0, 0.07, 1.7, 0.7, 0.05),
          N0.partials(640, [1, 1.89, 3.36], 0.1, 0.07, 0.07));
        break;
      case "shell":
        (z(N0, 0, 0.8, 760),
          k(N0, 0.012, 900, 1500, 0.045, 1, 2),
          F(N0, 0.06, 2600, 1.3),
          N0.tone({
            t: 0.06,
            f: 300,
            f1: 210,
            d: 0.03,
            g: 0.6,
          }),
          N0.partials(640, [1, 1.89], 0.06, 0.05, 0.06));
        break;
      case "slide":
        (k(N0, 0, 2600, 3700, 0.055, 0.9, 2), P(N0, 0.062, 0.85, 1.5, 0.04));
        break;
      default:
        I(N0, 0, 3.4);
    }
  }
  function _0(J) {
    let Q = new T(null, {
      bus: "foley",
      cat: "foley",
      prio: 4,
      rev: 0.08,
      pitch: qt(0.95, 1.05),
      gain: 0.36,
    });
    switch (J) {
      case "ads_in":
        (I(Q, 0, 1),
          G(Q, 0.02, 2, 0.3),
          Q.tone({
            t: 0.05,
            f: 210,
            f1: 150,
            a: 0.002,
            d: 0.03,
            g: 0.12,
          }));
        break;
      case "ads_out":
        (I(Q, 0, 0.8), G(Q, 0.01, 1, 0.24));
        break;
      case "swap":
        (I(Q, 0, 1.6),
          G(Q, 0.05, 3, 0.35),
          P(Q, 0.16, 0.5, 1.2, 0.02),
          Q.noise({
            t: 0.2,
            type: "lowpass",
            f: 1500,
            a: 0.001,
            d: 0.03,
            g: 0.5,
          }));
        break;
      case "inspect":
        (I(Q, 0, 1), G(Q, 0.08, 2, 0.2));
        break;
      case "melee_swing":
        (K(Q, 0, 600, 2600, 0.16, 1.5), I(Q, 0, 1));
        break;
      case "melee_hit":
        ($(Q, 0, 0.6, 130),
          Q.noise({
            type: "lowpass",
            f: 2400,
            a: 5e-4,
            d: 0.03,
            g: 0.8,
          }),
          G(Q, 0.01, 2, 0.3));
        break;
      case "grenade_pin":
        (Q.partials(3200, [1, 1.47, 2.09], 0.22, 0.12),
          F(Q, 0, 4200, 0.4),
          F(Q, 0.05, 2600, 0.25),
          Q.fm({
            t: 0.06,
            f: 1500,
            ratio: 2.3,
            index: 1.5,
            id: 0.01,
            d: 0.05,
            g: 0.1,
          }));
        break;
      case "grenade_throw":
        (K(Q, 0, 500, 1800, 0.22, 1.2), I(Q, 0, 1.4));
        break;
      case "tac_sprint_breath": {
        let i0 = qt(0.92, 1.08);
        (Q.noise({
          type: "bandpass",
          f: 1900 * i0,
          f1: 2600 * i0,
          ft: 0.16,
          q: 1.4,
          a: 0.07,
          d: 0.14,
          g: 0.2,
        }),
          Q.noise({
            type: "bandpass",
            f: 700 * i0,
            q: 1.2,
            a: 0.07,
            d: 0.12,
            g: 0.1,
          }),
          Q.noise({
            t: 0.27,
            type: "bandpass",
            f: 1500 * i0,
            f1: 900 * i0,
            ft: 0.2,
            q: 1.1,
            a: 0.05,
            d: 0.22,
            g: 0.3,
          }),
          Q.noise({
            t: 0.27,
            type: "bandpass",
            f: 480 * i0,
            q: 1,
            a: 0.05,
            d: 0.2,
            g: 0.2,
          }));
        break;
      }
      case "vault":
        (Q.noise({
          type: "lowpass",
          f: 1500,
          a: 0.001,
          d: 0.035,
          g: 1,
        }),
          Q.tone({
            f: 175,
            f1: 110,
            d: 0.05,
            g: 0.55,
          }),
          I(Q, 0.02, 1.6),
          K(Q, 0.06, 500, 1400, 0.22, 0.6),
          G(Q, 0.1, 2, 0.16),
          I(Q, 0.22, 1.1));
        break;
      case "prone":
        ($(Q, 0, 0.45, 105),
          I(Q, 0, 1.4),
          $(Q, 0.14, 0.65, 82),
          G(Q, 0.15, 3, 0.2),
          I(Q, 0.16, 1.5),
          Q.noise({
            t: 0.16,
            type: "bandpass",
            f: 800,
            f1: 450,
            ft: 0.18,
            q: 0.8,
            a: 0.02,
            d: 0.2,
            g: 0.3,
          }));
        break;
      case "crouch":
        (I(Q, 0, 1.3),
          G(Q, 0.04, 1, 0.14),
          Q.tone({
            t: 0.03,
            f: 120,
            f1: 80,
            a: 0.004,
            d: 0.05,
            g: 0.12,
          }));
        break;
      default:
        I(Q, 0, 1);
    }
  }
  function F0(J) {
    let Q = new T(null, {
      bus: "ui",
      cat: "ui",
      prio: 12,
      rev: 0.05,
      pitch: qt(0.97, 1.03),
      gain: 0.3,
    });
    switch (J) {
      case "optic":
        (k(Q, 0, 2600, 3400, 0.07, 0.6, 3),
          P(Q, 0.075, 0.5, 1.6, 0.015),
          F(Q, 0.16, 3800, 0.45),
          F(Q, 0.23, 4100, 0.5));
        break;
      case "muzzle":
        for (let i0 = 0; i0 < 5; i0++)
          F(Q, 0.045 * i0 * (1 - 0.06 * i0), 2600 + 180 * i0, 0.3 + 0.05 * i0);
        P(Q, 0.21, 0.7, 1.25, 0.05);
        break;
      case "underbarrel":
        (k(Q, 0, 1800, 2500, 0.06, 0.6, 2.5),
          z(Q, 0.065, 0.4, 820),
          P(Q, 0.13, 0.75, 1, 0.03));
        break;
      case "magazine":
        (z(Q, 0, 0.35, 700),
          k(Q, 0.008, 2200, 1300, 0.05, 0.5),
          z(Q, 0.058, 0.7, 610),
          P(Q, 0.06, 0.7, 1.15, 0.022));
        break;
      case "stock":
        (z(Q, 0, 0.6, 480),
          P(Q, 0.004, 0.45, 0.9, 0.02),
          F(Q, 0.09, 3e3, 0.5),
          P(Q, 0.095, 0.6, 1.1, 0.025));
        break;
      default:
        (F(Q, 0, 3200, 0.6), P(Q, 0.05, 0.6, 1.2, 0.03));
    }
  }
  function m0(J) {
    if (((J = !!J), o.laser === J)) return;
    o.laser = J;
    let Q = new T(null, {
      bus: "foley",
      cat: "foley",
      prio: 5,
      rev: 0.04,
      pitch: qt(0.98, 1.02),
      gain: 0.3,
    });
    (F(Q, 0, J ? 4400 : 3500, 0.7),
      Q.tone({
        t: 0.004,
        f: J ? 5200 : 6400,
        f1: J ? 6800 : 4200,
        ft: 0.05,
        a: 0.004,
        d: 0.05,
        g: 0.05,
      }),
      J || F(Q, 0.03, 2800, 0.3));
  }
  function S0(J, Q, i0) {
    let A0 = Q === "carpet" || Q === "fabric" || Q === "foliage",
      N0 = Q === "wood",
      mt = Q === "metal",
      xt = new T(J, {
        cat: "casing",
        prio: 1,
        rev: A0 ? 0.1 : 0.3,
        ref: 2,
        roll: 1.4,
        maxDist: 16,
        noOcc: !0,
        pitch: qt(0.9, 1.12),
        gain: A0 ? 0.045 : 0.1,
      });
    if (Q === "water") {
      (xt.tone({
        f: 600,
        f1: 240,
        ft: 0.05,
        d: 0.06,
        g: 0.6,
      }),
        xt.noise({
          type: "bandpass",
          f: 2200,
          q: 1,
          a: 0.003,
          d: 0.05,
          g: 0.5,
        }));
      return;
    }
    let yt = A0 ? 1 : Math.random() < 0.65 ? 2 : 1,
      Mt = 0,
      St = 1;
    for (let Rt = 0; Rt < yt; Rt++) {
      if (i0 === "shell")
        (xt.noise({
          t: Mt,
          type: "bandpass",
          f: N0 ? 620 : 900,
          q: 3,
          a: 5e-4,
          d: N0 ? 0.035 : 0.028,
          g: 2.2 * St,
        }),
          xt.tone({
            t: Mt,
            f: N0 ? 420 : 700,
            f1: N0 ? 300 : 520,
            d: 0.035,
            g: 0.5 * St,
          }),
          !A0 &&
            !N0 &&
            xt.tone({
              t: Mt,
              f: 2900 * qt(0.95, 1.05),
              a: 5e-4,
              d: 0.03,
              g: 0.15 * St,
            }),
          N0 &&
            xt.noise({
              t: Mt,
              type: "bandpass",
              f: 240,
              q: 4,
              a: 6e-4,
              d: 0.05,
              g: 2.5 * St,
            }));
      else if (A0)
        xt.noise({
          t: Mt,
          type: "lowpass",
          f: 1500,
          a: 5e-4,
          d: 0.02,
          g: 1.4 * St,
        });
      else {
        let Ot = N0
          ? qt(0.018, 0.03)
          : Q === "marble" || Q === "tile" || Q === "glass"
            ? qt(0.13, 0.2)
            : qt(0.07, 0.11);
        (xt.partials(
          qt(3900, 4700) * (Rt ? 1.06 : 1),
          [1, 1.46, 1.98, 2.71],
          0.5 * St * (N0 ? 0.6 : 1),
          Ot,
          Mt,
        ),
          xt.noise({
            t: Mt,
            type: "highpass",
            f: 6e3,
            a: 4e-4,
            d: 0.006,
            g: 0.4 * St,
          }),
          N0 &&
            (xt.noise({
              t: Mt,
              type: "bandpass",
              f: 380,
              q: 4,
              a: 6e-4,
              d: 0.04,
              g: 3 * St,
            }),
            xt.noise({
              t: Mt,
              type: "bandpass",
              f: 900,
              q: 3,
              a: 6e-4,
              d: 0.02,
              g: 1 * St,
            })),
          mt &&
            xt.partials(qt(900, 1500), [1, 2.32, 3.9], 0.25 * St, 0.12, Mt));
      }
      ((Mt += qt(0.045, 0.1)), (St *= qt(0.35, 0.55)));
    }
  }
  let T0 = {
    metal: 0.75,
    glass: 1.6,
    wood: 2.4,
    carpet: 1.6,
    fabric: 1.6,
    foliage: 1.5,
    plastic: 2.6,
    flesh: 1.3,
  };
  function j0(J, Q) {
    let i0 = new T(Q, {
        cat: "impact",
        prio: 4,
        rev: 0.3,
        ref: 3,
        roll: 1.2,
        rays: 1,
        lpDist: !0,
        pitch: qt(0.9, 1.1),
        gain: 0.33 * (T0[J] || 1),
      }),
      A0 = (N0) =>
        i0.noise({
          type: "highpass",
          f: 2600,
          a: 3e-4,
          d: 0.0045,
          g: N0,
        });
    switch (J) {
      case "wood":
        (A0(0.8),
          i0.noise({
            type: "bandpass",
            f: 320,
            q: 4,
            a: 6e-4,
            d: 0.07,
            g: 4,
          }),
          i0.noise({
            type: "bandpass",
            f: 780,
            q: 3,
            a: 6e-4,
            d: 0.035,
            g: 1.5,
          }));
        for (let N0 = 0; N0 < 3; N0++)
          i0.noise({
            t: qt(0.01, 0.07),
            type: "bandpass",
            f: qt(1800, 3500),
            q: 3,
            a: 5e-4,
            d: 0.012,
            g: 0.5,
          });
        break;
      case "metal":
        (A0(1),
          i0.partials(
            qt(1100, 2400),
            [1, 1.59, 2.31, 3.17, 4.2],
            0.45,
            qt(0.25, 0.5),
          ),
          i0.fm({
            f: qt(700, 1100),
            ratio: 2.76,
            index: 2,
            id: 0.02,
            d: 0.12,
            g: 0.18,
          }),
          i0.tone({
            f: 240,
            f1: 150,
            d: 0.03,
            g: 0.4,
          }),
          Math.random() < 0.3 && Z0(i0, 0.02, 0.35));
        break;
      case "glass":
        (i0.noise({
          type: "highpass",
          f: 5500,
          a: 4e-4,
          d: 0.006,
          g: 1,
        }),
          i0.tone({
            f: qt(4500, 7500),
            a: 4e-4,
            d: 0.03,
            g: 0.5,
          }),
          i0.tone({
            f: qt(2400, 3400),
            a: 4e-4,
            d: 0.02,
            g: 0.25,
          }));
        break;
      case "water":
        (i0.tone({
          f: 500,
          f1: 180,
          ft: 0.07,
          d: 0.09,
          g: 0.7,
        }),
          i0.noise({
            type: "bandpass",
            f: 1800,
            f1: 3e3,
            ft: 0.1,
            q: 0.8,
            a: 0.004,
            d: 0.14,
            g: 1.4,
          }));
        for (let N0 = 0; N0 < 3; N0++)
          i0.tone({
            t: qt(0.05, 0.2),
            f: qt(1e3, 2200),
            f1: qt(2200, 3200),
            ft: 0.03,
            a: 0.002,
            d: 0.03,
            g: 0.08,
          });
        break;
      case "fabric":
      case "carpet":
        (i0.noise({
          buf: "brown",
          type: "lowpass",
          f: 600,
          a: 0.002,
          d: 0.05,
          g: 1.8,
        }),
          i0.noise({
            type: "bandpass",
            f: 2200,
            q: 0.5,
            a: 0.003,
            d: 0.04,
            g: 0.2,
          }));
        break;
      case "flesh":
        (i0.noise({
          buf: "brown",
          type: "lowpass",
          f: 500,
          a: 0.002,
          d: 0.045,
          g: 1.6,
        }),
          i0.tone({
            f: 150,
            f1: 80,
            d: 0.05,
            g: 0.5,
          }));
        for (let N0 = 0; N0 < 2; N0++)
          i0.noise({
            t: qt(0.005, 0.03),
            type: "bandpass",
            f: qt(1100, 1700),
            q: 2.5,
            a: 0.002,
            d: 0.02,
            g: 0.3,
          });
        break;
      case "ceramic":
        (A0(0.8), i0.partials(qt(2600, 3200), [1, 1.57, 2.46], 0.5, 0.08));
        break;
      case "foliage":
        (i0.noise({
          type: "bandpass",
          f: 3e3,
          q: 0.6,
          a: 0.004,
          d: 0.06,
          g: 0.7,
        }),
          i0.noise({
            t: 0.03,
            type: "bandpass",
            f: 4200,
            q: 0.8,
            a: 0.01,
            d: 0.08,
            g: 0.25,
          }));
        break;
      case "plastic":
        (A0(0.5),
          i0.noise({
            type: "bandpass",
            f: 800,
            q: 3,
            a: 6e-4,
            d: 0.03,
            g: 3,
          }),
          i0.noise({
            type: "bandpass",
            f: 1900,
            q: 3,
            a: 6e-4,
            d: 0.015,
            g: 1,
          }));
        break;
      default: {
        let N0 = J === "marble" || J === "tile" ? 1 : 0;
        (A0(0.9 + 0.5 * N0),
          i0.noise({
            type: "lowpass",
            f: 1500 + 900 * N0,
            a: 6e-4,
            d: 0.05,
            g: 1.9,
          }),
          i0.noise({
            type: "bandpass",
            f: 1300 + 700 * N0,
            q: 1.2,
            a: 5e-4,
            d: 0.02,
            g: 1.6,
          }),
          i0.tone({
            f: 140,
            f1: 80,
            d: 0.04,
            g: 0.35,
          }));
        let mt = Fl(4, 6);
        for (let xt = 0; xt < mt; xt++)
          i0.noise({
            t: qt(0.01, 0.13),
            type: "highpass",
            f: 2500,
            a: 5e-4,
            d: 0.012,
            g: qt(0.15, 0.4),
          });
        N0
          ? i0.partials(qt(2800, 3600), [1, 1.6], 0.2, 0.04)
          : i0.noise({
              t: 0.02,
              type: "bandpass",
              f: 900,
              q: 0.6,
              a: 0.03,
              d: 0.16,
              g: 0.16,
            });
      }
    }
  }
  function Z0(J, Q, i0) {
    let A0 = qt(2600, 4200),
      N0 = qt(0.28, 0.45);
    (J.tone({
      t: Q,
      type: "triangle",
      f: A0,
      f1: A0 * qt(0.18, 0.3),
      ft: N0,
      a: 0.004,
      d: N0,
      g: i0,
    }),
      J.tone({
        t: Q,
        f: A0 * 1.51,
        f1: A0 * 0.33,
        ft: N0,
        a: 0.004,
        d: N0 * 0.7,
        g: i0 * 0.35,
      }),
      J.noise({
        t: Q,
        type: "bandpass",
        f: A0,
        f1: A0 * 0.25,
        ft: N0,
        q: 9,
        a: 0.004,
        d: N0,
        g: i0 * 2.5,
      }));
  }
  function lt(J) {
    let Q = new T(J, {
      cat: "impact",
      prio: 3,
      rev: 0.4,
      ref: 4,
      roll: 1,
      rays: 1,
      gain: 0.32,
    });
    (Q.noise({
      type: "highpass",
      f: 3e3,
      a: 3e-4,
      d: 0.004,
      g: 0.7,
    }),
      Z0(Q, 0, 0.5));
  }
  function H0(J) {
    let Q = new T(J, {
      cat: "impact",
      prio: 5,
      rev: 0.15,
      ref: 2,
      roll: 0.6,
      noOcc: !0,
      pitch: qt(0.85, 1.2),
      gain: 0.28,
    });
    (Q.noise({
      type: "highpass",
      f: 3500,
      a: 3e-4,
      d: 0.004,
      g: 1.5,
    }),
      Q.noise({
        type: "bandpass",
        f: 1500,
        q: 0.8,
        a: 4e-4,
        d: 0.008,
        g: 0.8,
      }),
      Q.noise({
        t: 0.002,
        type: "bandpass",
        f: 5200,
        f1: 1100,
        ft: 0.09,
        q: 4,
        a: 0.004,
        d: 0.1,
        g: 2.4,
      }),
      Q.noise({
        t: 0.002,
        type: "bandpass",
        f: 600,
        f1: 250,
        ft: 0.1,
        q: 1,
        a: 0.01,
        d: 0.09,
        g: 0.5,
      }));
  }
  function Y0(J) {
    let Q = o.ctx.currentTime,
      i0 = new T(J, {
        bus: "exp",
        cat: "exp",
        prio: 20,
        dyn: !0,
        rev: 0.3,
        ref: 9,
        roll: 1,
        lpDist: !0,
        sos: !0,
        occF: 700,
        rays: 3,
        pitch: qt(0.94, 1.06),
        gain: X$ * qt(0.95, 1.05),
      });
    i0.play(p(x("exp:", U$), !1));
    let A0 = Ai(1 - (i0.dist - 5) / 40) * (1 - 0.5 * i0.occ),
      N0 = i0.t;
    if ((R("exp", A0), A0 > 0.35)) {
      let mt = o.masterLP.frequency,
        xt = 2e4 * Math.pow(0.07, Lw(0.35, 1, A0));
      (mt.cancelScheduledValues(Q),
        mt.setTargetAtTime(t(xt), N0 + 0.02, 0.02),
        mt.setTargetAtTime(t(2e4), N0 + 0.16 + 0.2 * A0, 0.22));
    }
  }
  function et(J) {
    let Q = Ai(J);
    if (!(Q > 0.01)) return;
    let i0 = o.ctx.currentTime,
      A0 = o.masterLP.frequency;
    (A0.cancelScheduledValues(i0),
      A0.setTargetAtTime(t(2e4 * Math.pow(0.03, Q)), i0, 0.015),
      A0.setTargetAtTime(t(2e4), i0 + 0.25 + 0.5 * Q, 0.5 + 0.6 * Q));
    for (let [N0, mt] of [
      [5300, 0.03],
      [7950, 0.012],
      [5342, 0.012],
    ]) {
      let xt = r("sine", N0),
        yt = i(0);
      (u(yt.gain, i0, 0.04, 0.3, 2.8, mt * Q),
        xt.connect(yt),
        yt.connect(o.tin),
        xt.start(i0),
        xt.stop(i0 + 3.4),
        c(xt, yt));
    }
  }
  function ct(J) {
    let Q = new T(J, {
      cat: "prop",
      prio: 5,
      rev: 0.3,
      ref: 3,
      roll: 1.1,
      pitch: qt(0.9, 1.1),
      gain: 0.45,
    });
    (Q.partials(700, [1, 2.64, 4.1], 0.5, 0.06),
      Q.tone({
        f: 190,
        f1: 120,
        d: 0.04,
        g: 0.6,
      }),
      Q.noise({
        type: "bandpass",
        f: 2200,
        q: 2,
        a: 5e-4,
        d: 0.012,
        g: 1,
      }),
      Q.fm({
        f: 1250,
        ratio: 2.1,
        index: 1.5,
        id: 0.01,
        d: 0.05,
        g: 0.15,
      }));
  }
  function D0(J, Q, i0) {
    let A0 = !!(i0 && i0.run),
      N0 = !Q;
    o.foot = !o.foot;
    let mt = new T(Q, {
      bus: N0 ? "foley" : "sfx",
      cat: N0 ? "ownstep" : "step",
      prio: N0 ? 2 : 6,
      rev: N0 ? 0.16 : 0.24,
      ref: 2.5,
      roll: 1.2,
      maxDist: 20,
      occF: 1200,
      pitch: qt(0.92, 1.08) * (o.foot ? 1.03 : 0.97),
      gain: (N0 ? 0.13 : 0.85) * (A0 ? 1 : 0.6) * qt(0.82, 1.12),
    });
    A0
      ? (p0(mt, J, 1, 0, 1),
        Math.random() < 0.6 && p0(mt, J, qt(0.15, 0.3), qt(0.03, 0.05), 0),
        mt.noise({
          t: qt(0, 0.02),
          type: "bandpass",
          f: qt(1200, 1900),
          q: 0.6,
          a: 0.02,
          d: qt(0.05, 0.09),
          g: qt(0.04, 0.1),
        }),
        Math.random() < 0.55 && G(mt, qt(0.01, 0.04), Fl(1, 2), qt(0.04, 0.08)))
      : (p0(mt, J, qt(0.85, 1), 0, 0),
        p0(mt, J, qt(0.4, 0.6), qt(0.045, 0.07), 1),
        Math.random() < 0.25 &&
          mt.noise({
            t: 0.02,
            type: "bandpass",
            f: 1500,
            q: 0.6,
            a: 0.02,
            d: 0.06,
            g: 0.04,
          }));
  }
  function u0() {
    let J = new T(null, {
      bus: "foley",
      cat: "foley",
      prio: 3,
      rev: 0.1,
      pitch: qt(0.95, 1.05),
      gain: 0.3,
    });
    (I(J, 0, 1.4),
      J.tone({
        f: 95,
        f1: 60,
        d: 0.05,
        g: 0.35,
      }),
      G(J, 0.03, 1, 0.08));
  }
  function w0(J, Q) {
    let i0 = Ai(J ?? 0.5),
      A0 = new T(null, {
        bus: "foley",
        cat: "foley",
        prio: 4,
        rev: 0.2,
        pitch: qt(0.92, 1.05),
        gain: 0.065 + 0.07 * i0,
      });
    (p0(A0, Q, 1, 0, 1),
      p0(A0, Q, 0.8, qt(0.02, 0.035), 0),
      $(A0, 0, 0.5 + 1 * i0, 85),
      G(A0, 0.02, 1 + Math.round(2 * i0), 0.12 + 0.15 * i0),
      i0 > 0.5 && I(A0, 0.02, 1 + i0));
  }
  function P0() {
    o.slide && (M(o.slide, 0.035), (o.slide = null));
  }
  function st(J) {
    P0();
    let Q = (o.slide = new T(null, {
        bus: "foley",
        cat: "foley",
        prio: 6,
        rev: 0.15,
        pitch: qt(0.95, 1.05),
        gain: 0.11,
      })),
      i0 = (A0) =>
        Q.noise({
          a: 0.04,
          hold: 0.25,
          d: 0.9,
          ...A0,
        });
    switch (J) {
      case "carpet":
      case "fabric":
        (i0({
          type: "bandpass",
          f: 700,
          f1: 380,
          ft: 0.9,
          q: 0.7,
          g: 1.1,
        }),
          i0({
            type: "bandpass",
            f: 2600,
            q: 0.6,
            g: 0.12,
          }));
        break;
      case "water":
        (i0({
          type: "bandpass",
          f: 1800,
          f1: 900,
          ft: 0.9,
          q: 0.7,
          g: 1,
        }),
          i0({
            type: "highpass",
            f: 3500,
            g: 0.2,
          }));
        break;
      case "wood":
        (i0({
          type: "bandpass",
          f: 950,
          f1: 520,
          ft: 0.9,
          q: 1.4,
          g: 1,
        }),
          i0({
            type: "bandpass",
            f: 260,
            q: 3,
            g: 2.2,
          }),
          i0({
            type: "highpass",
            f: 4e3,
            g: 0.06,
          }));
        break;
      case "marble":
      case "tile":
      case "glass":
        (i0({
          type: "bandpass",
          f: 1500,
          f1: 800,
          ft: 0.9,
          q: 0.8,
          g: 0.8,
        }),
          i0({
            type: "bandpass",
            f: 3600,
            f1: 2400,
            ft: 0.9,
            q: 1.2,
            g: 0.22,
          }),
          i0({
            type: "highpass",
            f: 5e3,
            g: 0.07,
          }));
        break;
      case "metal":
        (i0({
          type: "bandpass",
          f: 1300,
          f1: 700,
          ft: 0.9,
          q: 0.8,
          g: 0.8,
        }),
          i0({
            type: "bandpass",
            f: 2900,
            q: 6,
            g: 0.5,
          }));
        break;
      default:
        (i0({
          type: "bandpass",
          f: 1200,
          f1: 620,
          ft: 0.9,
          q: 0.7,
          g: 0.95,
        }),
          i0({
            type: "highpass",
            f: 3200,
            g: 0.14,
          }));
    }
    (Q.noise({
      buf: "brown",
      type: "lowpass",
      f: 300,
      a: 0.03,
      hold: 0.2,
      d: 0.7,
      g: 0.9,
    }),
      I(Q, 0, 1.2),
      G(Q, 0.02, 2, 0.1));
  }
  function J0() {
    let J = new T(null, {
      bus: "foley",
      cat: "foley",
      prio: 5,
      rev: 0.12,
      pitch: qt(0.95, 1.05),
      gain: 0.3,
    });
    (K(J, 0, 420, 1500, 0.36, 1.3), I(J, 0.02, 1.6), G(J, 0.05, 2, 0.15));
  }
  function q0(J) {
    let Q = new T(null, {
      bus: "foley",
      cat: "foley",
      prio: 6,
      rev: 0.22,
      pitch: qt(0.95, 1.05),
      gain: 0.17,
    });
    ($(Q, 0, 1.4, 85),
      $(Q, 0.07, 0.6, 105),
      p0(Q, J, 0.9, 0.005, 0),
      p0(Q, J, 0.6, 0.06, 1),
      G(Q, 0.02, 3, 0.22),
      I(Q, 0.03, 1.5),
      Q.noise({
        t: 0.05,
        type: "bandpass",
        f: 900,
        f1: 500,
        ft: 0.25,
        q: 0.7,
        a: 0.03,
        d: 0.28,
        g: 0.4,
      }));
  }
  function v0() {
    let J = new T(null, {
      bus: "foley",
      cat: "foley",
      prio: 4,
      rev: 0.15,
      pitch: qt(0.95, 1.05),
      gain: 0.26,
    });
    (I(J, 0, 1.6),
      J.noise({
        t: 0.03,
        type: "lowpass",
        f: 1400,
        a: 0.001,
        d: 0.035,
        g: 0.9,
      }),
      J.tone({
        t: 0.03,
        f: 170,
        f1: 110,
        d: 0.05,
        g: 0.5,
      }),
      J.noise({
        t: 0.09,
        type: "lowpass",
        f: 1200,
        a: 0.001,
        d: 0.03,
        g: 0.5,
      }),
      I(J, 0.16, 1.2),
      $(J, 0.3, 0.7, 90),
      G(J, 0.3, 2, 0.14));
  }
  function x0(J) {
    new T(J, {
      cat: "glass",
      prio: 5,
      dyn: !0,
      rev: 0.3,
      ref: 3,
      roll: 1.1,
      rays: 1,
      pitch: qt(0.92, 1.1),
      gain: 0.25,
    }).play(p(x("glass:crack:", Xd.crack), !0));
  }
  function C0(J, Q) {
    let i0 = Ai(Q ?? 0.6),
      A0 = new T(J, {
        cat: "glass",
        prio: 9,
        dyn: !0,
        rev: 0.5,
        ref: 4,
        roll: 1,
        lpDist: !0,
        pitch: qt(0.95, 1.05) * Gc(1.14, 0.9, i0),
        gain: JD(Gc(-20, -12, i0)),
      });
    (A0.play(p(x("glass:crash:", Xd.crash), !0)),
      A0.tone({
        f: 125,
        f1: 55,
        ft: 0.1,
        a: 0.002,
        d: 0.15,
        g: 0.45 * i0,
      }),
      A0.noise({
        buf: "brown",
        type: "lowpass",
        f: 300,
        a: 0.003,
        d: 0.12,
        g: 0.7 * i0,
      }),
      i0 > 0.45 &&
        A0.play(p(x("glass:debris:", Xd.debris), !0), {
          t: qt(0.28, 0.42),
          g: 0.45 * i0,
          rate: qt(0.9, 1.1),
        }),
      i0 > 0.5 && R("big", Ai(1 - A0.dist / 18) * i0));
  }
  function k0(J) {
    new T(J, {
      cat: "debris",
      prio: 2,
      dyn: !0,
      rev: 0.3,
      ref: 2.5,
      roll: 1.2,
      noOcc: !0,
      pitch: qt(0.88, 1.12),
      gain: 0.08,
    }).play(p(x("glass:debris:", Xd.debris), !0));
  }
  function O0(J, Q, i0) {
    let A0 = Ai(i0 ?? 0.5);
    if (A0 < 0.02) return;
    let N0 = new T(J, {
      cat: "prop",
      prio: 3,
      rev: 0.3,
      ref: 3,
      roll: 1.2,
      rays: 1,
      pitch: qt(0.85, 1.15),
      gain: 0.1 + 0.26 * A0,
    });
    switch (Q) {
      case "metal":
        (N0.partials(qt(380, 900), [1, 2.32, 3.9, 5.6], 0.5, 0.3),
          N0.noise({
            type: "bandpass",
            f: 2600,
            q: 2,
            a: 5e-4,
            d: 0.015,
            g: 1,
          }),
          N0.tone({
            f: 150,
            f1: 90,
            d: 0.05,
            g: 0.5,
          }));
        break;
      case "ceramic":
        (N0.partials(qt(1500, 2400), [1, 1.57, 2.46], 0.5, 0.1),
          N0.noise({
            type: "highpass",
            f: 3e3,
            a: 5e-4,
            d: 0.01,
            g: 0.6,
          }));
        break;
      case "plastic":
        (N0.noise({
          type: "bandpass",
          f: 500,
          q: 3,
          a: 6e-4,
          d: 0.05,
          g: 6.5,
        }),
          N0.noise({
            type: "bandpass",
            f: 1300,
            q: 3,
            a: 6e-4,
            d: 0.03,
            g: 2.6,
          }));
        break;
      case "soft":
        (N0.noise({
          buf: "brown",
          type: "lowpass",
          f: 450,
          a: 0.004,
          d: 0.09,
          g: 2,
        }),
          N0.tone({
            f: 100,
            f1: 60,
            d: 0.07,
            g: 0.5,
          }));
        break;
      default:
        (N0.noise({
          type: "bandpass",
          f: 260,
          q: 5,
          a: 6e-4,
          d: 0.08,
          g: 5,
        }),
          N0.noise({
            type: "bandpass",
            f: 620,
            q: 4,
            a: 6e-4,
            d: 0.05,
            g: 2.2,
          }),
          N0.noise({
            type: "highpass",
            f: 2200,
            a: 5e-4,
            d: 0.008,
            g: 0.5,
          }),
          N0.tone({
            f: 120,
            f1: 75,
            d: 0.06,
            g: 0.5,
          }));
    }
  }
  function B0(J, Q) {
    let i0 = new T(J, {
      cat: "prop",
      prio: 7,
      dyn: !0,
      rev: 0.4,
      ref: 3.5,
      roll: 1.1,
      lpDist: !0,
      pitch: qt(0.92, 1.08),
      gain: 0.26,
    });
    switch (Q) {
      case "glass":
        (i0.noise({
          type: "highpass",
          f: 3200,
          a: 6e-4,
          d: 0.12,
          g: 0.9,
        }),
          i0.noise({
            type: "bandpass",
            f: 1800,
            q: 1,
            a: 6e-4,
            d: 0.06,
            g: 1.2,
          }),
          i0.tone({
            f: 700,
            f1: 300,
            ft: 0.02,
            a: 5e-4,
            d: 0.03,
            g: 0.4,
          }),
          i0.play(p(x("glass:debris:", Xd.debris), !0), {
            t: 0.01,
            g: 0.55,
            rate: qt(1.05, 1.25),
          }),
          n0(i0, Fl(4, 7), 0.4, 0.12, 4e3, 11e3, 0.01));
        break;
      case "wood":
        for (let A0 = 0; A0 < Fl(3, 5); A0++) {
          let N0 = qt(0, 0.16);
          (i0.noise({
            t: N0,
            type: "highpass",
            f: 1800,
            a: 4e-4,
            d: 0.01,
            g: 1,
          }),
            i0.noise({
              t: N0,
              type: "bandpass",
              f: qt(350, 700),
              q: 4,
              a: 5e-4,
              d: 0.04,
              g: 2.5,
            }));
        }
        (i0.noise({
          type: "bandpass",
          f: 240,
          q: 4,
          a: 0.001,
          d: 0.1,
          g: 4,
        }),
          i0.tone({
            type: "sawtooth",
            f: 420,
            f1: 160,
            ft: 0.12,
            a: 0.01,
            d: 0.12,
            g: 0.1,
          }));
        break;
      case "bulb":
        (i0.tone({
          f: 900,
          f1: 200,
          ft: 0.012,
          a: 4e-4,
          d: 0.02,
          g: 0.65,
        }),
          i0.noise({
            type: "highpass",
            f: 5e3,
            a: 4e-4,
            d: 0.008,
            g: 0.85,
          }),
          n0(i0, Fl(5, 8), 0.3, 0.1, 7e3, 12500, 0.01),
          i0.noise({
            t: 0.005,
            type: "bandpass",
            f: 3e3,
            q: 3,
            a: 0.001,
            d: 0.04,
            g: 0.35,
          }));
        break;
      case "metal":
        (i0.partials(qt(300, 600), [1, 2.32, 3.9, 5.6, 7.1], 0.6, 0.6),
          P(i0, 0, 1.2, 0.8, 0.06));
        break;
      case "plastic":
        i0.noise({
          type: "bandpass",
          f: 600,
          q: 2.5,
          a: 6e-4,
          d: 0.06,
          g: 3.5,
        });
        for (let A0 = 0; A0 < 4; A0++)
          i0.noise({
            t: qt(0.01, 0.15),
            type: "bandpass",
            f: qt(1200, 2600),
            q: 3,
            a: 5e-4,
            d: 0.015,
            g: 0.6,
          });
        break;
      default: {
        (i0.noise({
          type: "bandpass",
          f: 3e3,
          q: 0.7,
          a: 6e-4,
          d: 0.09,
          g: 1.2,
        }),
          i0.tone({
            f: 160,
            f1: 80,
            d: 0.07,
            g: 0.6,
          }));
        let A0 = Fl(10, 16);
        for (let N0 = 0; N0 < A0; N0++) {
          let mt = Math.pow(Math.random(), 1.6) * 0.5,
            xt = qt(1800, 6e3);
          (i0.tone({
            t: mt,
            f: xt,
            a: 5e-4,
            d: qt(0.02, 0.06),
            g: qt(0.05, 0.16),
          }),
            Math.random() < 0.4 &&
              i0.tone({
                t: mt,
                f: xt * 1.57,
                a: 5e-4,
                d: 0.02,
                g: 0.05,
              }));
        }
      }
    }
  }
  function ot(J) {
    let Q = new T(J, {
        cat: "prop",
        prio: 5,
        rev: 0.25,
        ref: 3,
        roll: 1.1,
        rays: 1,
        pitch: qt(0.9, 1.15),
        gain: 0.36,
      }),
      i0 = Fl(5, 9);
    for (let A0 = 0; A0 < i0; A0++) {
      let N0 = Math.pow(Math.random(), 1.4) * 0.38;
      (Q.noise({
        t: N0,
        type: "highpass",
        f: 4e3,
        a: 4e-4,
        d: qt(0.004, 0.02),
        g: qt(0.5, 1.3),
      }),
        Q.tone({
          t: N0,
          type: "sawtooth",
          f: 120,
          a: 0.001,
          d: qt(0.02, 0.05),
          g: 0.25,
        }),
        Q.noise({
          t: N0,
          type: "bandpass",
          f: 2500,
          q: 2,
          a: 0.001,
          d: qt(0.02, 0.05),
          g: 0.5,
        }));
    }
  }
  function Q0(J, Q) {
    let i0 = fl(rh(Q, 3), 0.3, 12),
      A0 = new T(J, {
        cat: "prop",
        prio: 6,
        dyn: !0,
        rev: 0.2,
        ref: 3.5,
        roll: 1.1,
        gain: 0.085,
      });
    (A0.noise({
      type: "highpass",
      f: 2e3,
      a: 0.03,
      hold: i0,
      d: 0.45,
      g: 0.5,
    }),
      A0.noise({
        type: "bandpass",
        f: 5200,
        q: 1.2,
        a: 0.02,
        hold: i0,
        d: 0.4,
        g: 0.9,
        rate: 1.3,
      }),
      A0.noise({
        type: "bandpass",
        f: 900,
        q: 0.8,
        a: 0.05,
        hold: i0,
        d: 0.3,
        g: 0.25,
      }),
      A0.noise({
        type: "highpass",
        f: 3e3,
        a: 5e-4,
        d: 0.02,
        g: 1.4,
      }));
  }
  function nt(J) {
    let Q = new T(J, {
      cat: "big",
      prio: 18,
      dyn: !0,
      rev: 0.35,
      ref: 8,
      roll: 1,
      lpDist: !0,
      gain: 0.4,
    });
    (Q.play(p("glass:crash:0", !0), {
      g: 0.9,
      rate: 0.84,
    }),
      Q.play(p("glass:crash:" + (Xd.crash - 1), !0), {
        t: 0.07,
        g: 0.7,
        rate: 1.12,
      }),
      Q.play(p(x("glass:debris:", Xd.debris), !0), {
        t: 0.5,
        g: 0.5,
        rate: 0.9,
      }),
      Q.play(p(x("glass:debris:", Xd.debris), !0), {
        t: 1.1,
        g: 0.3,
        rate: 1.1,
      }),
      Q.partials(180, [1, 1.63, 2.61, 4.22, 6.3], 0.3, 1.3),
      Q.fm({
        f: 360,
        ratio: 2.76,
        index: 2.4,
        id: 0.08,
        d: 0.5,
        g: 0.16,
      }),
      Q.tone({
        f: 62,
        f1: 30,
        ft: 0.25,
        a: 0.002,
        d: 0.4,
        g: 0.8,
      }),
      Q.noise({
        buf: "brown",
        type: "lowpass",
        f: 200,
        a: 0.004,
        d: 0.4,
        g: 1,
      }),
      Q.noise({
        type: "bandpass",
        f: 1e3,
        q: 0.8,
        a: 0.001,
        d: 0.2,
        g: 0.9,
      }),
      R("big", Ai(1 - Q.dist / 30)));
  }
  function L0(J) {
    let Q = new T(J, {
      cat: "prop",
      prio: 4,
      rev: 0.25,
      ref: 3,
      roll: 1.2,
      pitch: qt(0.9, 1.08),
      gain: 0.32,
    });
    ($(Q, 0, 1.3, 90),
      $(Q, qt(0.07, 0.14), 0.6, 110),
      G(Q, 0.02, Fl(2, 3), 0.14),
      I(Q, 0, 1.2));
  }
  function ht(J) {
    let Q = [50, 53, 55, 57, 60, 62, 65, 67, 69, 72, 74, 77, 79, 81],
      i0 = new T(J, {
        cat: "prop",
        prio: 6,
        dyn: !0,
        rev: 0.5,
        ref: 4,
        roll: 1,
        gain: 0.26,
      }),
      A0 = Math.random() < 0.35 ? Fl(2, 3) : 1,
      N0 = Fl(0, Q.length - 3);
    for (let mt = 0; mt < A0; mt++) {
      let xt = Q[Math.min(Q.length - 1, N0 + mt * Fl(1, 2))],
        yt = s2(xt),
        Mt = mt * qt(0, 0.025);
      for (let St = 1; St <= 5; St++)
        i0.tone({
          t: Mt,
          f: yt * St * (1 + 4e-4 * St * St),
          a: 0.003,
          d: 1.5 / St,
          g: 0.4 / (St * St * 0.6 + 0.4),
        });
      i0.noise({
        t: Mt,
        type: "lowpass",
        f: 2500,
        a: 0.001,
        d: 0.012,
        g: 0.4,
      });
    }
    i0.noise({
      buf: "brown",
      type: "lowpass",
      f: 300,
      a: 0.002,
      d: 0.08,
      g: 0.6,
    });
  }
  function pt(J) {
    let Q = new T(J, {
        cat: "prop",
        prio: 7,
        dyn: !0,
        rev: 0.45,
        ref: 4,
        roll: 1,
        gain: 0.15,
      }),
      i0 = 2090;
    (Q.tone({
      f: i0,
      a: 0.001,
      d: 1.5,
      g: 0.5,
    }),
      Q.tone({
        f: i0 * 2.76,
        a: 0.001,
        d: 0.9,
        g: 0.22,
      }),
      Q.tone({
        f: i0 * 5.4,
        a: 0.001,
        d: 0.45,
        g: 0.1,
      }),
      Q.tone({
        f: i0 * 1.003,
        a: 0.001,
        d: 1.5,
        g: 0.3,
      }),
      F(Q, 0, 3800, 0.5));
  }
  function V0(J) {
    let Q = J === "head",
      i0 = J === "kill",
      A0 = new T(null, {
        bus: "ui",
        cat: "ui",
        prio: 15,
        pitch: qt(0.98, 1.02) * (Q ? 1.1 : 1),
        gain: 0.22,
      });
    (A0.tone({
      type: "triangle",
      f: 1900,
      a: 5e-4,
      d: 0.026,
      g: 0.6,
    }),
      A0.tone({
        type: "triangle",
        f: 2850,
        a: 5e-4,
        d: 0.02,
        g: 0.35,
      }),
      A0.noise({
        type: "highpass",
        f: 5e3,
        a: 4e-4,
        d: 0.004,
        g: 0.7,
      }),
      Q &&
        (A0.partials(2640, [1, 1.5, 2.25, 2.81], 0.42, 0.11),
        A0.fm({
          f: 3520,
          ratio: 1.5,
          index: 0.9,
          id: 0.02,
          d: 0.09,
          g: 0.16,
        })),
      i0 &&
        (A0.tone({
          f: 180,
          f1: 90,
          ft: 0.05,
          a: 0.001,
          d: 0.08,
          g: 0.8,
        }),
        A0.noise({
          type: "lowpass",
          f: 900,
          a: 0.001,
          d: 0.03,
          g: 0.6,
        }),
        A0.tone({
          t: 0.045,
          f: 1175,
          a: 0.002,
          d: 0.3,
          g: 0.36,
        }),
        A0.tone({
          t: 0.045,
          f: 2350,
          a: 0.002,
          d: 0.12,
          g: 0.08,
        }),
        A0.tone({
          t: 0.105,
          f: 1760,
          a: 0.002,
          d: 0.36,
          g: 0.34,
        }),
        A0.tone({
          t: 0.105,
          f: 3520,
          a: 0.002,
          d: 0.14,
          g: 0.07,
        })));
  }
  function c0(J) {
    let Q = Ai(J ?? 0.3),
      i0 = new T(null, {
        bus: "ui",
        cat: "ui",
        prio: 12,
        pitch: qt(0.93, 1.05),
        gain: 0.1 + 0.2 * Q,
      });
    (i0.tone({
      f: 115,
      f1: 58,
      ft: 0.06,
      a: 0.001,
      d: 0.1,
      g: 1,
    }),
      i0.noise({
        buf: "brown",
        type: "lowpass",
        f: 700,
        a: 0.001,
        d: 0.07,
        g: 1.2,
      }),
      i0.noise({
        type: "bandpass",
        f: 1800,
        q: 1.2,
        a: 0.001,
        d: 0.02,
        g: 0.5,
      }));
  }
  function Z(J) {
    let Q = new T(null, {
      bus: "ui",
      cat: "ui",
      prio: 8,
      gain: 0.07 + 0.11 * J,
    });
    (Q.tone({
      f: 62,
      f1: 40,
      ft: 0.07,
      a: 0.004,
      d: 0.11,
      g: 1,
    }),
      Q.noise({
        buf: "brown",
        type: "lowpass",
        f: 120,
        a: 0.004,
        d: 0.07,
        g: 0.8,
      }),
      Q.tone({
        t: 0.17,
        f: 72,
        f1: 46,
        ft: 0.06,
        a: 0.004,
        d: 0.09,
        g: 0.7,
      }),
      Q.noise({
        t: 0.17,
        buf: "brown",
        type: "lowpass",
        f: 140,
        a: 0.004,
        d: 0.06,
        g: 0.5,
      }));
  }
  function r0() {
    let J = o.ctx,
      Q = J.currentTime,
      i0 = o.masterLP.frequency,
      A0 = new T(null, {
        bus: "ui",
        cat: "ui",
        prio: 19,
        gain: 0.2,
      });
    (A0.tone({
      f: 220,
      f1: 38,
      ft: 0.8,
      a: 0.004,
      d: 0.95,
      g: 0.7,
    }),
      A0.tone({
        f: 60,
        f1: 30,
        ft: 0.3,
        a: 0.003,
        d: 0.5,
        g: 1,
      }),
      A0.noise({
        buf: "brown",
        type: "lowpass",
        f: 500,
        f1: 90,
        ft: 0.6,
        a: 0.004,
        d: 0.8,
        g: 1.2,
      }),
      i0.cancelScheduledValues(Q),
      i0.setTargetAtTime(480, Q, 0.12),
      i0.setTargetAtTime(t(2e4), Q + 1.2, 0.45));
  }
  function b0(J) {
    let Q =
        J === "victory" ||
        J === "defeat" ||
        J === "deploy" ||
        J === "go" ||
        J === "rankup" ||
        J === "unlock",
      i0 = new T(null, {
        bus: "ui",
        cat: "ui",
        prio: 14,
        rev: Q ? 0.3 : 0,
        gain: 0.24,
      }),
      A0 = (xt, yt) =>
        i0.noise({
          t: xt,
          type: "highpass",
          f: 6e3,
          a: 4e-4,
          d: 0.003,
          g: yt,
        }),
      N0 = (xt, yt, Mt, St, Rt = "sine") => {
        (i0.tone({
          t: xt,
          type: Rt,
          f: yt,
          a: 0.002,
          d: Mt,
          g: St,
        }),
          i0.tone({
            t: xt,
            f: yt * 2,
            a: 0.002,
            d: Mt * 0.4,
            g: St * 0.18,
          }));
      },
      mt = (xt, yt, Mt, St, Rt = "sawtooth") => {
        let Ot = a("lowpass", 400, 0.8);
        (Ot.connect(i0.out),
          i0.nodes.push(Ot),
          Ot.frequency.setValueAtTime(350, i0.t + xt),
          Ot.frequency.exponentialRampToValueAtTime(
            t(3200),
            i0.t + xt + Mt * 0.45,
          ),
          Ot.frequency.exponentialRampToValueAtTime(500, i0.t + xt + Mt));
        for (let Jt of yt)
          for (let ee of [-7, 7])
            i0.tone({
              t: xt,
              type: Rt,
              f: s2(Jt),
              detune: ee,
              a: Mt * 0.3,
              hold: Mt * 0.15,
              d: Mt * 0.55,
              g: St,
              dest: Ot,
            });
      };
    switch (J) {
      case "hover":
        (A0(0, 0.2),
          i0.tone({
            f: 1760,
            a: 0.002,
            d: 0.018,
            g: 0.2,
          }));
        break;
      case "click":
        (A0(0, 0.4),
          i0.tone({
            type: "triangle",
            f: 1175,
            f1: 1210,
            ft: 0.02,
            a: 0.001,
            d: 0.032,
            g: 0.7,
          }),
          i0.tone({
            f: 1760,
            a: 0.001,
            d: 0.026,
            g: 0.3,
          }));
        break;
      case "back":
        (A0(0, 0.25),
          i0.tone({
            type: "triangle",
            f: 880,
            f1: 660,
            ft: 0.04,
            a: 0.001,
            d: 0.05,
            g: 0.7,
          }));
        break;
      case "tab":
        (A0(0, 0.3), N0(0, 1175, 0.03, 0.5), N0(0.036, 1760, 0.035, 0.45));
        break;
      case "slot":
        (A0(0, 0.3),
          i0.tone({
            type: "triangle",
            f: 784,
            a: 0.001,
            d: 0.04,
            g: 0.7,
          }),
          i0.noise({
            type: "bandpass",
            f: 1250,
            q: 3,
            a: 6e-4,
            d: 0.02,
            g: 1.4,
          }));
        break;
      case "equip":
        (P(i0, 0, 0.55, 1.3, 0.03),
          N0(0.05, 587, 0.1, 0.4),
          N0(0.105, 880, 0.16, 0.5));
        break;
      case "error": {
        let xt = i0.filter("lowpass", 900, 0.7);
        for (let yt of [0, 0.115])
          for (let Mt of [196, 207.65])
            i0.tone({
              t: yt,
              type: "triangle",
              f: Mt,
              a: 0.004,
              hold: 0.045,
              d: 0.03,
              g: 0.42,
              dest: xt,
            });
        break;
      }
      case "whoosh":
        (i0.noise({
          type: "bandpass",
          f: 450,
          f1: 3200,
          ft: 0.16,
          q: 1.2,
          a: 0.14,
          d: 0.18,
          g: 1,
        }),
          i0.noise({
            t: 0.05,
            type: "highpass",
            f: 6e3,
            a: 0.1,
            d: 0.12,
            g: 0.07,
          }));
        break;
      case "deploy":
        (i0.noise({
          type: "bandpass",
          f: 300,
          f1: 2400,
          ft: 0.4,
          q: 1.2,
          a: 0.38,
          d: 0.08,
          g: 1.4,
        }),
          $(i0, 0.4, 1.5, 80),
          mt(0.4, [38, 45, 50, 53], 1.3, 0.22),
          i0.tone({
            t: 0.4,
            f: 1760,
            a: 0.002,
            d: 0.3,
            g: 0.12,
          }));
        break;
      case "countdown":
        (A0(0, 0.2),
          i0.tone({
            f: 880,
            a: 0.003,
            hold: 0.06,
            d: 0.05,
            g: 0.8,
          }),
          i0.tone({
            type: "triangle",
            f: 1760,
            a: 0.003,
            hold: 0.04,
            d: 0.04,
            g: 0.1,
          }));
        break;
      case "go":
        i0.tone({
          type: "triangle",
          f: 880,
          f1: 1760,
          ft: 0.11,
          a: 0.004,
          hold: 0.1,
          d: 0.1,
          g: 0.8,
        });
        for (let xt of [69, 76, 81])
          i0.tone({
            t: 0.1,
            f: s2(xt),
            a: 0.004,
            d: 0.55,
            g: 0.3,
          });
        i0.noise({
          t: 0.1,
          type: "highpass",
          f: 6e3,
          a: 0.002,
          d: 0.12,
          g: 0.15,
        });
        break;
      case "score":
        (A0(0, 0.2), N0(0, 1175, 0.04, 0.55), N0(0.032, 1760, 0.05, 0.5));
        break;
      case "medal":
        ([1175, 1480, 1760, 2349].forEach((xt, yt) =>
          N0(yt * 0.07, xt, 0.3, 0.4),
        ),
          i0.noise({
            t: 0.05,
            type: "highpass",
            f: 8e3,
            a: 0.05,
            d: 0.3,
            g: 0.06,
          }));
        break;
      case "unlock":
        (P(i0, 0, 0.5, 1.4, 0.04),
          [880, 1175, 1480, 1760].forEach((xt, yt) =>
            N0(0.06 + yt * 0.055, xt, 0.32, 0.36),
          ),
          mt(0.24, [62, 66, 69, 74], 1, 0.07),
          i0.noise({
            t: 0.25,
            type: "highpass",
            f: 8e3,
            a: 0.08,
            d: 0.5,
            g: 0.05,
          }));
        break;
      case "rankup":
        ($(i0, 0, 1.4, 73),
          [587, 880, 1175, 1480, 1760].forEach((xt, yt) =>
            N0(0.05 + yt * 0.09, xt, 0.4, 0.34),
          ),
          mt(0.5, [50, 57, 62, 66, 69], 1.7, 0.12),
          N0(0.52, 2349, 0.9, 0.2),
          i0.noise({
            t: 0.5,
            type: "highpass",
            f: 8e3,
            a: 0.15,
            d: 0.9,
            g: 0.06,
          }));
        break;
      case "victory":
        ($(i0, 0, 1.6, 73),
          mt(0, [50, 57, 62, 66, 69], 2, 0.16),
          mt(0.9, [62, 66, 69, 74], 1.6, 0.12),
          [1480, 1760, 2349].forEach((xt, yt) =>
            i0.tone({
              t: 0.9 + yt * 0.09,
              f: xt,
              a: 0.003,
              d: 0.7,
              g: 0.12,
            }),
          ));
        break;
      case "defeat":
        ($(i0, 0, 1.6, 65),
          mt(0, [50, 57, 62, 65], 2.4, 0.16),
          mt(1, [46, 53, 58, 62], 2, 0.13),
          i0.tone({
            f: 293,
            f1: 196,
            ft: 2,
            a: 0.3,
            d: 2,
            g: 0.15,
          }));
        break;
      default:
        (A0(0, 0.3),
          i0.tone({
            f: 1175,
            a: 0.001,
            d: 0.03,
            g: 0.5,
          }));
    }
  }
  function d0(J, Q, i0, A0, N0, mt, xt, yt, Mt = 0) {
    let St = r(Q, i0),
      Rt = i(0);
    return (
      (St.detune.value = Mt),
      Rt.gain.setValueAtTime(0, A0),
      Rt.gain.linearRampToValueAtTime(yt, A0 + N0),
      Rt.gain.setValueAtTime(yt, A0 + N0 + mt),
      Rt.gain.linearRampToValueAtTime(0, A0 + N0 + mt + xt),
      St.connect(Rt),
      Rt.connect(J),
      St.start(A0),
      St.stop(A0 + N0 + mt + xt + 0.05),
      c(St, Rt),
      Rt
    );
  }
  function V(J, Q, i0, A0, N0) {
    for (let [mt, xt, yt] of [
      [1, 1, 1],
      [2, 0.36, 0.5],
      [3, 0.12, 0.25],
      [4, 0.05, 0.15],
      [0.5, 0.25, 1.2],
    ]) {
      let Mt = r(mt === 0.5 ? "triangle" : "sine", Q * mt),
        St = i(0),
        Rt = u(St.gain, i0, 0.008, 0, A0 * yt, N0 * xt);
      (Mt.connect(St),
        St.connect(J),
        Mt.start(i0),
        Mt.stop(Rt + 0.03),
        c(Mt, St));
    }
  }
  function B(J, Q) {
    let i0 = o.menu,
      A0 = 60 / eR,
      N0 = Q % 4,
      mt = Math.floor(Q / 4),
      xt = j$[N0];
    ((i0.root = xt[0]),
      xt.forEach((St, Rt) => {
        let Ot = s2(St);
        if (Rt === 0) {
          (d0(i0.gain, "sine", Ot * 2, J, 0.8, Fb - 0.8, 1.6, 0.05),
            d0(i0.filt, "triangle", Ot * 2, J, 0.8, Fb - 0.8, 1.6, 0.04));
          return;
        }
        (d0(i0.filt, "sawtooth", Ot, J, 1.1, Fb - 1.1, 1.9, 0.024, -7),
          d0(i0.filt, "sawtooth", Ot, J, 1.1, Fb - 1.1, 1.9, 0.024, 7));
      }));
    let yt = [1, 0.3, 0.55, 0.3, 0.8, 0.3, 0.55, 0.4],
      Mt = s2(i0.root + 12);
    for (let St = 0; St < 8; St++) {
      let Rt = J + (St * A0) / 2,
        Ot = r("sine", Mt),
        Jt = r("triangle", Mt * 2),
        ee = i(0),
        Nt = a("lowpass", 420, 0.7);
      (Ot.frequency.setValueAtTime(Mt * 1.12, Rt),
        Ot.frequency.exponentialRampToValueAtTime(Mt, Rt + 0.06));
      let ge = u(ee.gain, Rt, 0.01, 0, 0.3, 0.06 * yt[St]);
      (Ot.connect(ee),
        Jt.connect(Nt),
        Nt.connect(ee),
        ee.connect(i0.gain),
        Ot.start(Rt),
        Jt.start(Rt),
        Ot.stop(ge + 0.03),
        Jt.stop(ge + 0.03),
        c(Ot, Jt, ee, Nt));
    }
    if (mt % 3 !== 2) {
      let St = mt % 3 === 1 && N0 === 3 ? 12 : 0;
      for (let [Rt, Ot, Jt, ee] of $$)
        Rt === N0 &&
          V(i0.lead, s2(Jt + St), J + Ot * A0, 0.5 + ee * A0 * 0.9, 0.11);
    }
    N0 === 1 &&
      mt % 2 === 1 &&
      d0(i0.send, "sine", s2(xt[4] + 12), J + 1, 1.6, 0.6, 2.4, 0.02);
  }
  function j(J) {
    let Q = o.ctx,
      i0 = o.menu,
      A0 = a("lowpass", 150, 1.4),
      N0 = s(Q.createStereoPanner()),
      mt = i(1);
    ((N0.pan.value = qt(-0.6, 0.6)),
      A0.frequency.setValueAtTime(150, J),
      A0.frequency.linearRampToValueAtTime(1350, J + 3),
      A0.frequency.linearRampToValueAtTime(150, J + 6.5),
      mt.connect(A0),
      A0.connect(N0),
      N0.connect(i0.gain),
      N0.connect(i0.send));
    let xt = i0.root + 12;
    for (let [yt, Mt] of [
      [xt, -9],
      [xt, 8],
      [xt + 7, -5],
      [xt + 12, 6],
    ])
      d0(mt, "sawtooth", s2(yt), J, 3, 0.2, 3.3, 0.04, Mt);
    h(J + 7, () => {
      (n(mt), n(A0), n(N0));
    });
  }
  function s0(J) {
    let Q = o.menu;
    if (((Q.want = !!J), !o.ctx)) return;
    let i0 = o.ctx.currentTime,
      A0 = Q.gain.gain;
    (A0.cancelScheduledValues(i0),
      J
        ? (A0.setTargetAtTime(1, i0, 0.8),
          Q.on ||
            ((Q.next = i0 + 0.05), (Q.bar = 0), (Q.nextSwell = i0 + qt(9, 14))),
          (Q.on = !0))
        : (A0.setTargetAtTime(0, i0, 0.4), (Q.on = !1)));
  }
  function l0(J) {
    let Q = o.menu;
    if (Q.on) {
      for (Q.next < J - 1 && (Q.next = J + 0.05); Q.next < J + 0.6;)
        (B(Math.max(Q.next, J + 0.01), Q.bar++), (Q.next += Fb));
      J > Q.nextSwell && (j(J + 0.1), (Q.nextSwell = J + qt(18, 28)));
    }
  }
  let E0 = 92,
    U = 60 / E0,
    X = 0.64;
  function N(J, Q) {
    let i0 = o.lounge;
    if (!i0.dying || !J.detune) return;
    let A0 = Ai((Q - i0.killT) / 1.2);
    (J.detune.setValueAtTime(-3600 * Math.pow(A0, 1.3), Q),
      J.detune.linearRampToValueAtTime(
        -3600,
        Math.max(Q + 0.01, i0.killT + 1.25),
      ));
  }
  function q(J, Q, i0, A0, N0, mt, xt) {
    let yt = o.lounge,
      Mt = r(J, Q),
      St = i(0),
      Rt = u(St.gain, i0, A0, 0, N0, mt);
    (N(Mt, i0),
      Mt.connect(St),
      St.connect(xt || yt.in),
      Mt.start(i0),
      Mt.stop(Rt + 0.03),
      yt.oscs.push({
        n: Mt,
        end: Rt + 0.03,
      }),
      c(Mt, St));
  }
  function o0(J, Q, i0, A0, N0, mt, xt = "highpass") {
    let yt = o.lounge,
      Mt = l(o.buf.white, !0),
      St = a(xt, Q, i0),
      Rt = i(0),
      Ot = u(Rt.gain, J, A0, 0, N0, mt);
    (N(Mt, J),
      Mt.connect(St),
      St.connect(Rt),
      Rt.connect(yt.in),
      Mt.start(J, Math.random() * 2),
      Mt.stop(Ot + 0.03),
      yt.oscs.push({
        n: Mt,
        end: Ot + 0.03,
      }),
      c(Mt, St, Rt));
  }
  function h0(J, Q, i0, A0 = 1.1) {
    let N0 = s2(Q);
    (q("triangle", N0, J, 0.004, A0, 0.11 * i0),
      q("sawtooth", N0, J, 0.004, A0 * 0.35, 0.035 * i0),
      q("sine", N0 * 2.003, J, 0.004, A0 * 0.55, 0.08 * i0),
      q("sine", N0 * 3.01, J, 0.003, A0 * 0.3, 0.05 * i0),
      o0(J, 2400, 1.5, 0.001, 0.012, 0.03 * i0, "bandpass"));
  }
  function y0(J, Q, i0, A0 = 0.9) {
    let N0 = s2(Q);
    (q("sine", N0, J, 0.003, A0, 0.22 * i0),
      q("sine", N0 * 2, J, 0.003, A0 * 0.4, 0.05 * i0),
      q("sine", N0 * 4, J, 0.002, A0 * 0.16, 0.09 * i0),
      q("sine", N0 * 1.003, J, 0.003, A0, 0.1 * i0));
  }
  function D(J) {
    let Q = [
        [0, 1, 1.5, 2, 3, 3.5],
        [0.5, 1, 1.5, 2.5, 3],
        [0, 0.5, 1, 2, 2.5, 3.5],
        [1, 1.5, 2, 2.5, 3],
      ],
      i0 = [],
      A0 = (mt, xt) => mt.s[xt % 7] + 12 * Math.floor(xt / 7),
      N0 = Fl(5, 10);
    for (let mt = 0; mt < 2; mt++) {
      let xt = J9[(J + mt) % 8],
        yt = zw(Q);
      for (let Mt = 0; Mt < yt.length; Mt++) {
        let St = mt === 1 && Mt === yt.length - 1;
        if (((N0 = fl(N0 + zw([-1, -1, 1, 1, -2, 2, 1, -1]), 1, 13)), St)) {
          let Rt = N0,
            Ot = 99;
          for (let Jt = 2; Jt <= 13; Jt++) {
            let ee = Math.abs(Jt - N0);
            ee < Ot && xt.t.includes(A0(xt, Jt) % 12) && ((Ot = ee), (Rt = Jt));
          }
          N0 = Rt;
        }
        i0.push({
          b: mt,
          bt: yt[Mt],
          m: A0(xt, N0),
          d: St ? 1.6 : 0.5,
          vel: St ? 1 : qt(0.6, 0.95) * (Number.isInteger(yt[Mt]) ? 1 : 0.8),
        });
      }
    }
    return i0;
  }
  function W(J, Q, i0) {
    let A0 = o.lounge,
      N0 = J % 4,
      mt = Math.floor(J / 4),
      xt = mt % 8,
      yt = J9[xt],
      Mt = J9[(xt + 1) % 8],
      St = X * i0;
    if (N0 === 0) {
      A0.comp = zw(Z$);
      let Ot = yt.r,
        Jt = Math.random() < 0.6,
        ee = Mt.r + (Math.random() < 0.5 ? 1 : -1);
      ((A0.walk = Jt
        ? [Ot, Ot + yt.th, Ot + yt.fi, ee]
        : [Ot + 12, Ot + yt.fi, Ot + yt.th, ee]),
        (A0.phraseBar == null || mt >= A0.phraseBar) &&
          ((A0.phrase = D(xt)),
          (A0.phraseAt = mt),
          (A0.phraseBar = mt + 2 + Fl(1, 2))));
    }
    let Rt = s2(A0.walk[N0]);
    (q("triangle", Rt, Q, 0.008, 0.4, 0.4),
      q("sawtooth", Rt * 2, Q, 0.008, 0.2, 0.07),
      N0 === 3 &&
        Math.random() < 0.25 &&
        q("triangle", Rt * 1.5, Q + St, 0.008, 0.12, 0.25),
      o0(Q, 3600, 1.4, 0.001, 0.11, 0.11, "bandpass"),
      q("sine", 3300, Q, 0.001, 0.05, 0.008),
      N0 === 1 || N0 === 3
        ? (o0(Q + St, 3600, 1.4, 0.001, 0.07, 0.075, "bandpass"),
          o0(Q, 2900, 2, 0.001, 0.03, 0.08, "bandpass"),
          o0(Q, 2800, 0.6, 0.05, 0.22, 0.05, "bandpass"))
        : o0(Q + 0.02, 2400, 0.6, 0.08, 0.2, 0.03, "bandpass"),
      N0 === 3 &&
        Math.random() < 0.2 &&
        o0(Q + St, 1900, 1.2, 0.001, 0.05, 0.1, "bandpass"));
    for (let [Ot, Jt] of A0.comp) {
      if (Ot !== N0) continue;
      let ee = Ot === 3 && Jt > 0 ? Mt : yt,
        Nt = Q + (Jt ? St : 0);
      ee.v.forEach((ge, Le) =>
        h0(Nt + Le * 0.007, ge, qt(0.6, 0.9), Jt ? 0.5 : 1.1),
      );
    }
    if (A0.phrase) {
      let Ot = mt - A0.phraseAt;
      for (let Jt of A0.phrase)
        Jt.b === Ot &&
          Math.floor(Jt.bt) === N0 &&
          y0(Q + (Jt.bt % 1 ? St : 0), Jt.m, Jt.vel, Jt.d);
    }
  }
  function Y(J) {
    let Q = o.lounge;
    if (!o.ctx) {
      Q.want = J
        ? {
            x: J.x,
            y: J.y,
            z: J.z,
          }
        : {
            x: 0,
            y: 0,
            z: 0,
          };
      return;
    }
    if (Q.active) return;
    let i0 = o.ctx,
      A0 = i0.currentTime;
    ((Q.pos = {
      x: rh(J && J.x, 0),
      y: rh(J && J.y, 0),
      z: rh(J && J.z, 0),
    }),
      (Q.in = i(1)));
    let N0 = s(i0.createDelay(0.05)),
      mt = r("sine", 0.55),
      xt = i(7e-4),
      yt = r("sine", 6.3),
      Mt = i(6e-5);
    ((N0.delayTime.value = 0.008),
      mt.connect(xt),
      xt.connect(N0.delayTime),
      yt.connect(Mt),
      Mt.connect(N0.delayTime),
      mt.start(),
      yt.start());
    let St = a("highpass", 520, 0.9),
      Rt = a("lowpass", 3800, 0.7),
      Ot = a("peaking", 1800, 0.8, 11),
      Jt = s(i0.createWaveShaper());
    Jt.curve = f(1.6);
    let ee = l(o.buf.white, !0),
      Nt = a("bandpass", 2600, 0.5),
      ge = i(0.012),
      Le = r("sawtooth", 120),
      xn = a("lowpass", 700, 0.5),
      js = i(0.006);
    (ee.connect(Nt),
      Nt.connect(ge),
      ge.connect(Rt),
      Le.connect(xn),
      xn.connect(js),
      js.connect(Rt),
      ee.start(A0, Math.random() * 2),
      Le.start(A0),
      (Q.occLP = a("lowpass", 18e3, 0.5)),
      (Q.outG = i(0.2)));
    let Un = s(i0.createPanner());
    ((Un.panningModel = "equalpower"),
      (Un.distanceModel = "inverse"),
      (Un.refDistance = 4),
      (Un.rolloffFactor = 1.2),
      (Un.maxDistance = 250),
      d(Un, Q.pos));
    let re = i(0.22);
    (Q.in.connect(N0),
      N0.connect(St),
      St.connect(Rt),
      Rt.connect(Ot),
      Ot.connect(Jt),
      Jt.connect(Q.occLP),
      Q.occLP.connect(Q.outG),
      Q.outG.connect(Un),
      Un.connect(o.bus.amb),
      Un.connect(re),
      re.connect(o.revIn),
      (Q.chain = [
        Q.in,
        N0,
        xt,
        Mt,
        St,
        Rt,
        Ot,
        Jt,
        Nt,
        ge,
        xn,
        js,
        Q.occLP,
        Q.outG,
        Un,
        re,
      ]),
      (Q.srcs = [mt, yt, ee, Le]),
      (Q.active = !0),
      (Q.dying = !1),
      (Q.oscs.length = 0),
      (Q.beat = 0),
      (Q.next = A0 + 0.1),
      (Q.occT = 0),
      (Q.phrase = null),
      (Q.phraseBar = null),
      (Q.occV = 0));
  }
  function R0() {
    let J = o.lounge;
    for (let Q of J.srcs) {
      try {
        Q.stop();
      } catch {}
      n(Q);
    }
    for (let Q of J.chain) n(Q);
    for (let Q of J.oscs)
      try {
        Q.n.stop();
      } catch {}
    ((J.oscs.length = 0),
      (J.active = !1),
      (J.dying = !1),
      (J.chain = null),
      (J.srcs = null));
  }
  function U0() {
    let J = o.lounge;
    if (((J.want = null), !o.ctx || !J.active || J.dying)) return;
    let Q = o.ctx.currentTime;
    ((J.dying = !0), (J.killT = Q));
    for (let N0 of J.oscs)
      if (!(N0.end <= Q || !N0.n.detune))
        try {
          (N0.n.detune.setValueAtTime(0, Q),
            N0.n.detune.linearRampToValueAtTime(-3600, Q + 1.25));
        } catch {}
    let i0 = J.outG.gain;
    (i0.cancelScheduledValues(Q),
      i0.setValueAtTime(i0.value, Q),
      i0.linearRampToValueAtTime(i0.value * 0.8, Q + 0.6),
      i0.linearRampToValueAtTime(0, Q + 1.3));
    let A0 = new T(J.pos, {
      cat: "prop",
      prio: 6,
      rev: 0.2,
      ref: 4,
      roll: 1.2,
      gain: 0.4,
    });
    (A0.tone({
      f: 140,
      f1: 50,
      ft: 0.05,
      a: 0.001,
      d: 0.09,
      g: 1,
    }),
      A0.noise({
        type: "lowpass",
        f: 1800,
        a: 5e-4,
        d: 0.02,
        g: 0.8,
      }));
  }
  function $0(J, Q) {
    let i0 = o.lounge;
    if (i0.active) {
      if (i0.dying && J > i0.killT + 1.4) {
        R0();
        return;
      }
      for (i0.next < J - 1 && (i0.next = J + 0.05); i0.next < J + 0.25;) {
        let A0 = Math.max(i0.next, J + 0.01),
          N0 = i0.dying ? 1 + 2.5 * Ai((A0 - i0.killT) / 1.2) : 1;
        ((!i0.dying || A0 < i0.killT + 1.2) && W(i0.beat, A0, U * N0),
          (i0.next = A0 + U * N0),
          i0.beat++);
      }
      if (
        (i0.oscs.length > 96 && (i0.oscs = i0.oscs.filter((A0) => A0.end > J)),
        (i0.occT -= Q),
        i0.occT <= 0 && !i0.dying)
      ) {
        i0.occT = 0.25;
        let A0 = i0.pos.x - o.lx,
          N0 = i0.pos.y - o.ly,
          mt = i0.pos.z - o.lz,
          xt = g(i0.pos, Math.sqrt(A0 * A0 + N0 * N0 + mt * mt), 3);
        i0.occLP.frequency.setTargetAtTime(
          t(18e3 * Math.pow(750 / 18e3, xt)),
          J,
          0.2,
        );
      }
    }
  }
  let g0 = (J, Q = "-") =>
      p(x(`k9:${J}:${Q}:`, tR[Q === "-" ? J : J + ":" + Q] || 1), !1),
    G0 = (J, Q, i0) =>
      new T(J, {
        bus: J ? "k9" : "ui",
        cat: "k9",
        prio: 9,
        rev: J ? 0.2 : 0,
        ref: 3,
        roll: 1.1,
        maxDist: 60,
        occF: 1e3,
        pitch: qt(0.97, 1.03),
        gain: Q,
        ...i0,
      }),
    K0 = (J, Q, i0, A0, N0, mt, xt, yt = 2.2) => {
      let Mt = J.filter("bandpass", Math.max(A0, N0, mt) * 1.9, yt),
        St = Math.min(0.012, i0 * 0.2),
        Rt = (Ot) => [
          [0, A0 * Ot],
          [i0 * 0.65, N0 * Ot],
          [i0, mt * Ot],
        ];
      (J.glide({
        t: Q,
        type: "sawtooth",
        f: Rt(1),
        a: St,
        s: i0 * 0.7,
        r: i0 * 0.3,
        g: xt,
        dest: Mt,
      }),
        J.glide({
          t: Q,
          type: "sawtooth",
          f: Rt(1.013),
          a: St,
          s: i0 * 0.7,
          r: i0 * 0.3,
          g: xt * 0.6,
          dest: Mt,
        }),
        J.noise({
          t: Q,
          type: "bandpass",
          f: 3800,
          q: 1.2,
          a: i0 * 0.3,
          d: i0 * 0.7,
          g: xt * 0.22,
        }));
    },
    it = {
      marble: "hard",
      tile: "hard",
      stone: "hard",
      concrete: "hard",
      plaster: "hard",
      glass: "hard",
      ceramic: "hard",
      plastic: "hard",
      wood: "wood",
      metal: "metal",
      carpet: "soft",
      fabric: "soft",
      foliage: "soft",
      flesh: "soft",
      water: "wet",
    },
    ft = {
      ready(J) {
        let Q = G0(J, 0.075, {
          prio: 14,
          rev: 0.25,
          pitch: 1,
        });
        (Q.glide({
          type: "sine",
          f: [
            [0, 520],
            [0.1, 1700],
          ],
          a: 0.06,
          s: 0.02,
          r: 0.03,
          g: 0.06,
        }),
          Q.play(g0("motif", "ready"), {
            t: 0.11,
          }),
          Q.tone({
            t: 0.31,
            f: 1760,
            a: 0.004,
            d: 0.5,
            g: 0.07,
          }),
          Q.tone({
            t: 0.31,
            f: 2640,
            a: 0.004,
            d: 0.3,
            g: 0.03,
          }),
          $(Q, 0.11, 0.3, 80));
      },
      denied(J) {
        let Q = G0(J, 0.085, {
          prio: 14,
          pitch: 1,
        });
        (Q.play(g0("motif", "denied")),
          Q.noise({
            type: "lowpass",
            f: 900,
            a: 0.001,
            d: 0.02,
            g: 0.5,
          }));
      },
      friendly_inbound(J) {
        let Q = G0(J, 0.085, {
          prio: 14,
          rev: 0.3,
          pitch: 1,
        });
        (Q.noise({
          type: "highpass",
          f: 5e3,
          a: 5e-4,
          d: 0.006,
          g: 0.5,
        }),
          Q.noise({
            type: "bandpass",
            f: 2200,
            q: 1,
            a: 0.01,
            d: 0.05,
            g: 0.12,
          }),
          Q.play(g0("motif", "ready"), {
            t: 0.05,
            rate: 1,
          }),
          K0(Q, 0.5, 0.13, 700, 1500, 1250, 0.05),
          $(Q, 0.25, 0.5, 74),
          Q.tone({
            t: 0.25,
            f: 146.8,
            a: 0.02,
            d: 0.6,
            g: 0.16,
          }),
          Q.tone({
            t: 0.25,
            f: 220,
            a: 0.02,
            d: 0.5,
            g: 0.1,
          }));
      },
      enemy_inbound(J) {
        G0(J, 0.051, {
          prio: 16,
          rev: 0.55,
          pitch: 1,
        }).play(g0("howl"));
      },
      throw(J) {
        let Q = G0(J, 0.17, {
          bus: J ? "k9" : "foley",
          cat: "foley",
          prio: 6,
          rev: 0.1,
        });
        (I(Q, 0, 1.8),
          K(Q, 0.03, 280, 900, 0.3, 0.8),
          Q.tone({
            t: 0.02,
            f: 110,
            f1: 68,
            ft: 0.1,
            a: 0.01,
            d: 0.13,
            g: 0.5,
          }),
          z(Q, 0.03, 0.4, 520),
          G(Q, 0.05, 3, 0.2),
          Q.glide({
            t: 0.14,
            type: "sine",
            f: [
              [0, 1200],
              [0.05, 1900],
            ],
            a: 0.01,
            s: 0.02,
            r: 0.03,
            g: 0.025,
          }));
      },
      land(J, Q) {
        let i0 = Q.surf || "marble",
          A0 = it[i0] || "hard",
          N0 = G0(J, 0.15, {
            prio: 8,
            rev: 0.25,
          });
        ($(N0, 0, 1, 82),
          z(N0, 0.002, 0.8, 470),
          z(N0, 0.004, 0.4, 1150),
          p0(N0, i0, 0.8, 0, 0),
          N0.noise({
            t: 0.03,
            type: "bandpass",
            f: 2400,
            f1: 1500,
            ft: 0.08,
            q: 3,
            a: 0.01,
            d: 0.09,
            g: A0 === "soft" ? 0.05 : 0.2,
          }));
        let [mt, xt] =
            A0 === "soft"
              ? [620, 340]
              : A0 === "wood"
                ? [900, 500]
                : A0 === "wet"
                  ? [1800, 900]
                  : [1500, 800],
          yt = fl(rh(Q.dur, 0.3), 0.2, 0.8);
        (N0.noise({
          t: 0.04,
          type: "bandpass",
          f: mt,
          f1: xt,
          ft: yt,
          q: 0.8,
          a: 0.03,
          d: yt,
          g: 0.45,
        }),
          G(N0, 0.015, 4, 0.3),
          G(N0, yt * 0.5, 3, 0.18),
          z(N0, yt * 0.37, 0.3, 560),
          z(N0, yt * 0.7, 0.16, 640));
      },
      unfold(J, Q) {
        let i0 = fl(rh(Q.dur, 1.6), 0.6, 4),
          A0 = aI,
          N0 = G0(J, 0.3, {
            prio: 13,
            rev: 0.22,
            ref: 3.5,
            pitch: qt(0.985, 1.015),
          }),
          mt = (yt) => yt * i0;
        (P(N0, mt(A0.relay), 0.6, 0.8, 0.03),
          N0.tone({
            t: mt(A0.relay),
            f: 120,
            f1: 70,
            a: 0.001,
            d: 0.06,
            g: 0.22,
          }));
        {
          let yt = mt(A0.whine[0]),
            Mt = mt(A0.whine[1] - A0.whine[0]);
          (N0.glide({
            t: yt,
            type: "sine",
            f: [
              [0, 320],
              [Mt * 0.8, 2300],
              [Mt, 2500],
            ],
            a: Mt * 0.5,
            s: Mt * 0.35,
            r: Mt * 0.15 + 0.1,
            g: 0.035,
          }),
            N0.glide({
              t: yt,
              type: "triangle",
              f: [
                [0, 640],
                [Mt * 0.8, 4600],
                [Mt, 5e3],
              ],
              a: Mt * 0.6,
              s: Mt * 0.25,
              r: Mt * 0.15 + 0.1,
              g: 0.012,
            }));
        }
        (A0.legs.forEach((yt, Mt) => {
          let St = [1, 1.12, 0.89, 1.06][Mt],
            Rt = mt(yt);
          (z(N0, Rt, 0.8, 640 * St),
            F(N0, Rt, 3100 * St, 0.9),
            K0(
              N0,
              Rt + 0.012,
              Math.min(0.1, i0 * 0.06),
              520 * St,
              1180 * St,
              860 * St,
              0.3,
            ));
        }),
          [
            [A0.lift1, 1],
            [A0.lift2, 1.22],
          ].forEach(([[yt, Mt], St]) => {
            let Rt = mt(yt),
              Ot = mt(Mt - yt);
            (K0(N0, Rt, Ot, 150 * St, 265 * St, 230 * St, 0.2, 1.4),
              K0(N0, Rt, Ot, 620 * St, 1020 * St, 900 * St, 0.3),
              N0.noise({
                t: Rt + Ot,
                type: "lowpass",
                f: 1300,
                a: 0.001,
                d: 0.03,
                g: 0.5,
              }),
              N0.tone({
                t: Rt + Ot,
                f: 170,
                f1: 110,
                a: 0.001,
                d: 0.04,
                g: 0.2,
              }));
          }),
          K0(
            N0,
            mt(A0.head),
            Math.min(0.11, i0 * 0.07),
            1250,
            1900,
            1600,
            0.13,
          ),
          A0.ears.forEach((yt, Mt) => {
            (F(N0, mt(yt), Mt ? 5e3 : 4300, 0.9),
              N0.tone({
                t: mt(yt),
                f: Mt ? 2600 : 2250,
                a: 5e-4,
                d: 0.012,
                g: 0.2,
              }));
          }));
        {
          let yt = mt(A0.antenna),
            Mt = 392;
          (N0.glide({
            t: yt,
            type: "sine",
            f: [
              [0, Mt * 1.5],
              [0.035, Mt],
              [0.5, Mt * 0.985],
            ],
            a: 0.002,
            s: 0.03,
            r: 0.44,
            g: 0.2,
          }),
            N0.glide({
              t: yt,
              type: "sine",
              f: [
                [0, Mt * 2.76 * 1.5],
                [0.03, Mt * 2.76],
                [0.3, Mt * 2.74],
              ],
              a: 0.002,
              s: 0.01,
              r: 0.26,
              g: 0.07,
            }),
            N0.fm({
              t: yt,
              f: Mt * 5.4,
              ratio: 1.41,
              index: 1.5,
              id: 0.02,
              d: 0.09,
              g: 0.05,
            }),
            F(N0, yt, 3400, 0.3));
        }
        let xt = it[Q.surf] || "hard";
        A0.taps.forEach((yt, Mt) =>
          N0.play(g0("step", xt), {
            t: mt(yt),
            g: 0.32 + 0.04 * Mt,
            rate: [1.08, 1, 1.14, 0.95][Mt],
          }),
        );
        {
          let yt = mt(A0.shake[0]),
            Mt = Math.max(0.1, mt(A0.shake[1] - A0.shake[0]));
          for (let St = 0; St < 9; St++)
            F(
              N0,
              yt + (Mt * (St + qt(0, 0.6))) / 9,
              qt(2300, 4800),
              qt(0.25, 0.55) * (1 - (0.5 * St) / 9),
            );
          for (let St = 0; St < 4; St++)
            K0(
              N0,
              yt + (Mt * St) / 4,
              Mt / 4.5,
              700,
              St & 1 ? 560 : 880,
              700,
              0.09,
            );
        }
      },
      boot(J) {
        let Q = G0(J, 0.08, {
          prio: 12,
          rev: 0.25,
          pitch: 1,
        });
        (F(Q, 0, 3600, 0.4),
          Q.noise({
            t: 0.005,
            type: "bandpass",
            f: 800,
            f1: 5200,
            ft: 0.11,
            q: 2.5,
            a: 0.03,
            d: 0.1,
            g: 0.1,
          }),
          Q.play(g0("motif", "boot"), {
            t: 0.07,
          }),
          Q.tone({
            t: 0.05,
            f: 120,
            a: 0.08,
            d: 0.3,
            g: 0.07,
          }));
      },
      step(J, Q) {
        rt(J, Q);
      },
      alert(J, Q) {
        let i0 = !!Q.hostile,
          A0 = G0(J, i0 ? 0.124 : 0.097, {
            prio: 12,
            rev: 0.3,
            ref: 7,
            roll: 0.8,
            maxDist: 90,
            lpDist: !0,
            sos: !0,
            occF: 900,
          });
        (A0.play(g0("bark", i0 ? "h" : "f")),
          i0 && J && R("big", Ai(1 - A0.dist / 22) * (1 - 0.5 * A0.occ)));
      },
      windup(J, Q) {
        let i0 = fl(rh(Q.dur, 0.28), 0.12, 1.2),
          A0 = G0(J, 0.46, {
            prio: 11,
          });
        (K0(A0, 0, i0, 170, 400, 430, 0.3, 1.5),
          A0.glide({
            type: "sine",
            f: [
              [0, 1700],
              [i0, 5400],
            ],
            a: i0 * 0.85,
            s: 0,
            r: 0.03,
            g: 0.1,
          }),
          A0.glide({
            type: "sine",
            f: [
              [0, 1735],
              [i0, 5440],
            ],
            a: i0 * 0.85,
            s: 0,
            r: 0.03,
            g: 0.06,
          }),
          A0.noise({
            type: "bandpass",
            f: 700,
            q: 6,
            a: i0 * 0.6,
            d: i0 * 0.4,
            g: 0.5,
          }));
        for (let N0 = 0; N0 < 4; N0++)
          F(
            A0,
            i0 * (1 - Math.pow(0.55, N0 + 1)) * 1.02,
            2600 + 500 * N0,
            0.16 + 0.05 * N0,
          );
      },
      leap(J) {
        let Q = G0(J, 0.22, {
          prio: 11,
        });
        (Q.noise({
          type: "highpass",
          f: 2500,
          a: 4e-4,
          d: 0.012,
          g: 1.1,
        }),
          Q.noise({
            type: "bandpass",
            f: 1200,
            q: 1,
            a: 6e-4,
            d: 0.07,
            g: 1,
          }),
          Q.tone({
            f: 96,
            f1: 55,
            ft: 0.06,
            a: 0.001,
            d: 0.08,
            g: 0.7,
          }),
          K0(Q, 0, 0.09, 980, 620, 320, 0.2),
          Q.noise({
            t: 0.004,
            type: "bandpass",
            f: 3300,
            q: 2,
            a: 0.002,
            d: 0.03,
            g: 0.35,
          }),
          K(Q, 0.03, 420, 1500, 0.3, 0.7));
      },
      takedown(J, Q) {
        let i0 = fl(rh(Q.dur, 0.7), 0.2, 3),
          A0 = G0(J, 0.2, {
            prio: 12,
            rev: 0.28,
            ref: 4,
          });
        ($(A0, 0, 0.75, 85),
          z(A0, 0.003, 0.7, 520),
          I(A0, 0.02, 1.5),
          A0.noise({
            t: 0.03,
            type: "highpass",
            f: 3e3,
            a: 3e-4,
            d: 0.006,
            g: 1.4,
          }),
          A0.noise({
            t: 0.03,
            type: "bandpass",
            f: 1800,
            q: 1,
            a: 5e-4,
            d: 0.02,
            g: 0.8,
          }),
          A0.play(g0("arc"), {
            t: 0.03,
            g: 1,
            dur: i0 - 0.03,
            rel: 0.07,
            off: qt(0, 0.6),
            rate: qt(0.95, 1.08),
          }),
          A0.tone({
            t: 0.03,
            type: "sawtooth",
            f: 100,
            a: 0.01,
            hold: i0 - 0.1,
            d: 0.06,
            g: 0.05,
            dest: A0.filter("lowpass", 420, 0.7),
          }),
          G(A0, 0.01, 4, 0.3),
          G(A0, i0 * 0.3, 3, 0.2),
          G(A0, i0 * 0.62, 3, 0.18),
          F(A0, i0, 3e3, 0.3),
          J && R("big", Ai(1 - A0.dist / 16)));
      },
      hit(J) {
        let Q = G0(J, 0.2, {
          prio: 6,
          rev: 0.25,
          pitch: qt(0.9, 1.1),
        });
        (Q.noise({
          type: "bandpass",
          f: 950,
          q: 3,
          a: 5e-4,
          d: 0.025,
          g: 2.2,
        }),
          Q.noise({
            type: "lowpass",
            f: 1800,
            a: 4e-4,
            d: 0.015,
            g: 0.8,
          }),
          Q.tone({
            f: 210,
            f1: 140,
            a: 6e-4,
            d: 0.03,
            g: 0.4,
          }));
        let i0 = qt(3800, 5200);
        (Q.tone({
          t: 0.004,
          type: "triangle",
          f: i0,
          f1: i0 * 0.55,
          ft: 0.07,
          a: 0.001,
          d: 0.07,
          g: 0.14,
        }),
          Q.noise({
            type: "highpass",
            f: 4e3,
            a: 3e-4,
            d: 0.003,
            g: 0.5,
          }));
      },
      stagger(J, Q) {
        let i0 = fl(rh(Q.dur, 0.35), 0.15, 1.5),
          A0 = G0(J, 0.34, {
            prio: 9,
          });
        ($(A0, 0, 0.5, 100), K0(A0, 0, i0, 230, 150, 95, 0.4, 1.6));
        let N0 = Math.round(i0 * 30);
        for (let mt = 0; mt < N0; mt++)
          A0.noise({
            t: (i0 * mt) / N0,
            type: "bandpass",
            f: qt(900, 1300),
            q: 1.5,
            a: 0.002,
            d: 0.014,
            g: 0.45 * (1 - (0.5 * mt) / N0),
          });
        (P(A0, i0 * qt(0.25, 0.4), 0.3, 1.3, 0.015),
          P(A0, i0 * qt(0.6, 0.8), 0.25, 1.1, 0.015),
          K0(A0, i0, 0.07, 400, 760, 640, 0.07));
      },
      destroyed(J) {
        let Q = G0(J, 0.19, {
          prio: 14,
          rev: 0.4,
          ref: 4,
          lpDist: !0,
        });
        (Q.tone({
          f: 240,
          f1: 60,
          ft: 0.04,
          a: 6e-4,
          d: 0.06,
          g: 1.1,
        }),
          Q.noise({
            type: "highpass",
            f: 2e3,
            a: 4e-4,
            d: 0.012,
            g: 1.3,
          }),
          Q.noise({
            type: "lowpass",
            f: 900,
            a: 8e-4,
            d: 0.04,
            g: 0.9,
          }));
        let i0 = Fl(9, 13);
        for (let N0 = 0; N0 < i0; N0++) {
          let mt = 0.02 + Math.pow(Math.random(), 1.5) * 0.75;
          (Q.noise({
            t: mt,
            type: "highpass",
            f: 4200,
            a: 4e-4,
            d: qt(0.004, 0.018),
            g: qt(0.3, 0.9),
          }),
            Q.noise({
              t: mt,
              type: "bandpass",
              f: 2500,
              q: 2,
              a: 0.001,
              d: qt(0.015, 0.04),
              g: 0.3,
            }));
        }
        let A0 = Q.filter("lowpass", 2600, 0.7);
        (Q.glide({
          t: 0.03,
          type: "sawtooth",
          f: [
            [0, 1500],
            [0.3, 880],
            [0.42, 1040],
            [0.8, 380],
            [1.15, 62],
          ],
          a: 0.01,
          s: 0.75,
          r: 0.4,
          g: 0.13,
          dest: A0,
        }),
          Q.glide({
            t: 0.03,
            type: "sine",
            f: [
              [0, 3e3],
              [0.3, 1760],
              [0.42, 2080],
              [0.8, 760],
              [1.15, 124],
            ],
            a: 0.01,
            s: 0.6,
            r: 0.5,
            g: 0.06,
          }),
          z(Q, 0.55, 0.45, 430),
          z(Q, 0.82, 0.3, 610),
          z(Q, 1.08, 0.18, 380),
          G(Q, 0.58, 3, 0.2),
          $(Q, 0.55, 0.5, 80),
          F(Q, 1.27, 2600, 0.25),
          J && R("big", Ai(1 - Q.dist / 20)));
      },
      expire(J) {
        let Q = G0(J, 0.12, {
          prio: 10,
          rev: 0.3,
          pitch: 1,
        });
        Q.play(g0("motif", "expire"));
        let i0 = Q.filter("lowpass", 800, 0.7);
        (Q.glide({
          t: 0.34,
          type: "sawtooth",
          f: [
            [0, 520],
            [0.7, 68],
          ],
          a: 0.05,
          s: 0.4,
          r: 0.25,
          g: 0.1,
          dest: i0,
        }),
          Q.noise({
            t: 0.4,
            type: "bandpass",
            f: 900,
            f1: 380,
            ft: 0.4,
            q: 1,
            a: 0.1,
            d: 0.35,
            g: 0.12,
          }),
          F(Q, 1.02, 2400, 0.3),
          Q.tone({
            t: 1.02,
            f: 130,
            f1: 80,
            a: 0.001,
            d: 0.04,
            g: 0.25,
          }));
      },
    };
  function gt(J, Q, i0) {
    let A0 = ft[J];
    A0 && A0(Q && isFinite(Q.x + Q.y + Q.z) ? Q : null, i0 || {});
  }
  function rt(J, Q) {
    let i0 = o.k9,
      A0 = o.ctx.currentTime,
      N0 = Q.gait === "gallop" ? 2 : Q.gait === "walk" ? 0 : 1,
      mt = Ai(rh(Q.strength, 0.7)),
      xt =
        Q.id != null
          ? "i" + Q.id
          : J
            ? ((Math.round(J.x / 6) & 255) << 8) | (Math.round(J.z / 6) & 255)
            : -1,
      yt = i0.steps.get(xt);
    (yt ||
      ((yt = {
        t: -9,
        n: 0,
        voiced: -9,
        fore: -9,
        h: 0,
      }),
      i0.steps.set(xt, yt)),
      o.stats.k9StepCalls++);
    let Mt = A0 - yt.t;
    if (
      ((yt.t = A0),
      (yt.n = Mt > (N0 === 2 ? 0.1 : 0.22) ? 0 : yt.n + 1),
      A0 - yt.voiced < 0.026)
    )
      return;
    let St = 1;
    if (N0 === 2) {
      if (Q.leg != null) {
        if (Q.leg < 2) {
          if (A0 - yt.fore < 0.1) return;
          ((yt.fore = A0), (yt.h = 0));
        } else St = yt.h++ & 1 ? 0.5 : 0.62;
      } else {
        let Jt = yt.n & 3;
        if (Jt === 3) return;
        St = [0.62, 0.5, 1][Jt];
      }
    } else N0 === 1 && (St = yt.n & 1 ? 0.8 : 1);
    ((yt.voiced = A0), o.stats.k9Steps++);
    let Rt = it[Q.surf] || "hard",
      Ot = new T(J, {
        bus: J ? "k9" : "foley",
        cat: "k9step",
        prio: 3,
        rev: 0.16,
        ref: 2.2,
        roll: 1.2,
        maxDist: 24,
        occF: 1300,
        rays: 1,
        pitch:
          qt(0.93, 1.07) *
          (N0 === 2 ? 0.95 : 1) *
          (St === 1 && N0 === 2 ? 0.9 : 1),
        gain: J$ * [0.5, 0.75, 1][N0] * St * (0.6 + 0.4 * mt) * qt(0.85, 1.1),
      });
    (Ot.play(g0("step", Rt)),
      !(yt.n & 3) &&
        N0 > 0 &&
        Math.random() < 0.8 &&
        Ot.play(g0("zip"), {
          t: qt(0.004, 0.02),
          g: 0.2,
          rate: qt(0.85, 1.25) * (N0 === 2 ? 1.2 : 1),
        }));
  }
  function dt(J) {
    for (let Q of J.srcs) {
      try {
        Q.stop();
      } catch {}
      n(Q);
    }
    for (let Q of J.nodes) n(Q);
    o.k9.loops.delete(J.key);
  }
  function tt(J) {
    let Q = o.ctx,
      i0 = {
        key: J,
        srcs: [],
        nodes: [],
        t: 0,
        k: 0,
        hunt: qt(0.4, 1.2),
        pos: {
          x: 0,
          y: 0,
          z: 0,
        },
        stop: 0,
      },
      A0 = (Mt) => (i0.srcs.push(Mt), Mt),
      N0 = (Mt) => (i0.nodes.push(Mt), Mt);
    ((i0.oA = A0(r("sawtooth", 80))),
      (i0.lpA = N0(a("lowpass", 600, 0.7))),
      (i0.gA = N0(i(0))),
      (i0.oB = A0(r("sawtooth", 400))),
      (i0.oB2 = A0(r("sawtooth", 405))),
      (i0.bpB = N0(a("bandpass", 900, 3))),
      (i0.gB = N0(i(0))),
      (i0.nz = A0(l(o.buf.white, !0))),
      (i0.bpN = N0(a("bandpass", 3e3, 1.2))),
      (i0.gN = N0(i(0))),
      (i0.sum = N0(i(1))),
      (i0.lfo = A0(r("sine", 3))),
      (i0.lfoG = N0(i(0))),
      (i0.tone = N0(a("lowpass", 18e3, 0.5))),
      (i0.out = N0(i(0))),
      i0.oA.connect(i0.lpA),
      i0.lpA.connect(i0.gA),
      i0.gA.connect(i0.sum),
      i0.oB.connect(i0.bpB),
      i0.oB2.connect(i0.bpB),
      i0.bpB.connect(i0.gB),
      i0.gB.connect(i0.sum),
      i0.nz.connect(i0.bpN),
      i0.bpN.connect(i0.gN),
      i0.gN.connect(i0.sum),
      i0.lfo.connect(i0.lfoG),
      i0.lfoG.connect(i0.sum.gain),
      i0.sum.connect(i0.tone),
      i0.tone.connect(i0.out));
    let mt = N0(s(Q.createChannelMerger(2)));
    i0.ear = [0, 1].map((Mt) => {
      let St = N0(s(Q.createDelay(0.005))),
        Rt = N0(a("lowpass", 18e3, 0.5)),
        Ot = N0(i(0.707));
      return (
        i0.out.connect(St),
        St.connect(Rt),
        Rt.connect(Ot),
        Ot.connect(mt, 0, Mt),
        {
          d: St,
          lp: Rt,
          g: Ot,
        }
      );
    });
    let xt = N0(i(0.14));
    (mt.connect(o.bus.k9), mt.connect(xt), xt.connect(o.revIn));
    let yt = Q.currentTime;
    for (let Mt of i0.srcs)
      Mt === i0.nz ? Mt.start(yt, Math.random() * 2) : Mt.start(yt);
    return (o.k9.loops.set(J, i0), i0);
  }
  function X0(J, Q, i0) {
    let A0 = o.k9,
      N0 = String(J),
      mt = o.ctx.currentTime,
      xt = A0.loops.get(N0);
    if (
      ((i0 = Ai(rh(i0, 0))), !Q || !isFinite(Q.x + Q.y + Q.z) || i0 <= 0.001)
    ) {
      xt &&
        !xt.stop &&
        (xt.out.gain.cancelScheduledValues(mt),
        xt.out.gain.setTargetAtTime(0, mt, 0.05),
        (xt.stop = mt + 0.4));
      return;
    }
    if (!xt) {
      if (A0.loops.size >= 4) {
        let so = null;
        for (let Os of A0.loops.values()) (!so || Os.t < so.t) && (so = Os);
        dt(so);
      }
      xt = tt(N0);
    }
    ((xt.stop = 0),
      (xt.t = mt),
      (xt.k = i0),
      (xt.pos.x = Q.x),
      (xt.pos.y = Q.y),
      (xt.pos.z = Q.z));
    let yt = o.ts,
      Mt = 0.07,
      St = (so, Os) => so.setTargetAtTime(Os, mt, Mt);
    (St(xt.oA.frequency, (70 + 190 * i0) * yt),
      St(xt.lpA.frequency, t((500 + 2200 * i0) * yt)),
      St(xt.gA.gain, 0.5 - 0.22 * i0));
    let Rt = (380 + 1500 * Math.pow(i0, 1.3)) * yt;
    (St(xt.oB.frequency, Rt),
      St(xt.oB2.frequency, Rt * 1.011),
      St(xt.bpB.frequency, t(Rt * 2)),
      St(xt.gB.gain, 0.04 + 1.1 * i0),
      St(xt.bpN.frequency, t(2800 + 2500 * i0)),
      St(xt.gN.gain, 0.003 + 0.2 * i0 * i0),
      St(xt.lfo.frequency, (2 + 5.5 * i0) * yt),
      St(xt.lfoG.gain, 0.08 + 0.27 * i0));
    let Ot = Q.x - o.lx,
      Jt = Q.y - o.ly,
      ee = Q.z - o.lz,
      Nt = Math.sqrt(Ot * Ot + Jt * Jt + ee * ee),
      ge = 1 / Math.max(Nt, 1e-4),
      Le = g(Q, Nt, 1),
      xn = Nt > 0.7 ? Ai(-(Ot * o.fx + Jt * o.fy + ee * o.fz) * ge) : 0,
      js = 2e4 * Math.pow(0.07, Ai((Nt - 8) / 70));
    (Le > 0.01 && (js = Math.min(js, 2e4 * Math.pow(1100 / 2e4, Le))),
      xn > 0.05 && (js = Math.min(js, 2e4 * Math.pow(0.09, xn))),
      xt.tone.frequency.setTargetAtTime(t(js), mt, 0.1));
    let Un = 2.5,
      re =
        tZ *
        (0.34 + 0.66 * Math.pow(i0, 0.8)) *
        (Un / (Un + 1.3 * Math.max(0, Nt - Un))) *
        (1 - Lw(21, 30, Nt)) *
        Gc(1, 0.5, Le);
    (xt.out.gain.cancelScheduledValues(mt),
      xt.out.gain.setTargetAtTime(re, mt, 0.06),
      xt.out.gain.setTargetAtTime(0, mt + 0.4, 0.08));
    let Ae = Nt > 0.5 ? fl((Ot * o.rx + Jt * o.ry + ee * o.rz) * ge, -1, 1) : 0,
      ws = Math.abs(Ae),
      Zo = (Math.PI / 4) * (1 + nI * ws);
    for (let so = 0; so < 2; so++) {
      let Os = (so === 1) == Ae >= 0,
        va = xt.ear[so];
      (va.g.gain.setTargetAtTime(Os ? Math.sin(Zo) : Math.cos(Zo), mt, 0.04),
        va.d.delayTime.setTargetAtTime(Os ? 0 : oI * ws, mt, 0.04),
        va.lp.frequency.setTargetAtTime(
          t(Os ? 18e3 : 18e3 * Math.pow(iI, ws)),
          mt,
          0.04,
        ));
    }
  }
  function ut(J, Q) {
    let i0 = o.k9;
    for (let A0 of i0.loops.values()) {
      if ((A0.stop && J > A0.stop) || J - A0.t > 1.5) {
        dt(A0);
        continue;
      }
      if (
        !(A0.stop || J - A0.t > 0.3 || A0.k > 0.24) &&
        ((A0.hunt -= Q), A0.hunt <= 0)
      ) {
        A0.hunt = qt(0.5, 1.9);
        let N0 = G0(A0.pos, 0.07, {
            prio: 2,
            rev: 0.12,
            maxDist: 20,
            rays: 1,
          }),
          mt = qt(700, 1500);
        K0(
          N0,
          0,
          qt(0.04, 0.09),
          mt,
          mt * qt(1.15, 1.5),
          mt * qt(1.05, 1.2),
          0.5,
        );
      }
    }
    if (i0.steps.size > 12)
      for (let [A0, N0] of i0.steps) J - N0.t > 3 && i0.steps.delete(A0);
  }
  function z0(J = {}) {
    if (o.ctx)
      return (
        o.ctx.state === "suspended" &&
          o.ctx.resume &&
          o.ctx.resume().catch(() => {}),
        !0
      );
    try {
      let Q = globalThis.AudioContext || globalThis.webkitAudioContext;
      if (!J.context && !Q) return !1;
      ((o.ctx =
        J.context ||
        new Q({
          latencyHint: "interactive",
        })),
        E(J));
      let i0 = Dw(o.ctx.sampleRate).d,
        A0 = B$().filter((N0) => !i0[N0]);
      if (J.context) {
        for (let N0 of A0) Nb(o.ctx.sampleRate, N0);
        o.bakeQ = [];
      } else o.bakeQ = A0;
      if (
        (o.ctx.state === "suspended" &&
          o.ctx.resume &&
          o.ctx.resume().catch(() => {}),
        !J.context && typeof addEventListener == "function")
      ) {
        let N0 = () => {
          o.ctx &&
            o.ctx.state === "suspended" &&
            o.ctx.resume().catch(() => {});
        };
        (addEventListener("pointerdown", N0), addEventListener("keydown", N0));
      }
      if ((o.menu.want && s0(!0), o.lounge.want)) {
        let N0 = o.lounge.want;
        ((o.lounge.want = null), Y(N0));
      }
      return !0;
    } catch (Q) {
      return (e("init", Q), (o.ctx = null), !1);
    }
  }
  function I0(J = {}) {
    for (let i0 of ["master", "sfx", "music"])
      typeof J[i0] == "number" && isFinite(J[i0]) && (o.vol[i0] = Ai(J[i0]));
    if (!o.ctx) return;
    let Q = o.ctx.currentTime;
    (o.master.gain.setTargetAtTime(o.vol.master, Q, 0.03),
      o.sfxVol.gain.setTargetAtTime(o.vol.sfx, Q, 0.03),
      o.musicVol.gain.setTargetAtTime(o.vol.music, Q, 0.03));
  }
  function vt(J, Q, i0) {
    if (!J || !isFinite(J.x + J.y + J.z)) return;
    ((o.lx = J.x),
      (o.ly = J.y),
      (o.lz = J.z),
      o.lvec.copy && J.isVector3
        ? o.lvec.copy(J)
        : J.clone
          ? (o.lvec = J.clone())
          : ((o.lvec.x = J.x), (o.lvec.y = J.y), (o.lvec.z = J.z)));
    let A0 =
        Q && isFinite(Q.x + Q.y + Q.z)
          ? Q
          : {
              x: 0,
              y: 0,
              z: -1,
            },
      N0 =
        i0 && isFinite(i0.x + i0.y + i0.z)
          ? i0
          : {
              x: 0,
              y: 1,
              z: 0,
            },
      mt = Math.hypot(A0.x, A0.y, A0.z) || 1;
    ((o.fx = A0.x / mt), (o.fy = A0.y / mt), (o.fz = A0.z / mt));
    {
      let yt = A0.y * N0.z - A0.z * N0.y,
        Mt = A0.z * N0.x - A0.x * N0.z,
        St = A0.x * N0.y - A0.y * N0.x,
        Rt = Math.hypot(yt, Mt, St);
      Rt > 1e-6 && ((o.rx = yt / Rt), (o.ry = Mt / Rt), (o.rz = St / Rt));
    }
    if (!o.ctx) return;
    let xt = o.ctx.listener;
    xt.positionX
      ? ((xt.positionX.value = J.x),
        (xt.positionY.value = J.y),
        (xt.positionZ.value = J.z),
        (xt.forwardX.value = A0.x),
        (xt.forwardY.value = A0.y),
        (xt.forwardZ.value = A0.z),
        (xt.upX.value = N0.x),
        (xt.upY.value = N0.y),
        (xt.upZ.value = N0.z))
      : (xt.setPosition(J.x, J.y, J.z),
        xt.setOrientation(A0.x, A0.y, A0.z, N0.x, N0.y, N0.z));
  }
  function wt(J) {
    J &&
      (typeof J.indoor == "number" &&
        isFinite(J.indoor) &&
        (o.indoorT = Ai(J.indoor)),
      "space" in J && (o.space = typeof J.space == "string" ? J.space : null));
  }
  function _t(J) {
    if (!o.ctx) return;
    let Q = o.ctx.currentTime;
    if (
      ((J = J > 0 && J < 1 ? J : 0.016),
      (o.clock += J),
      (o.indoor += (o.indoorT - o.indoor) * (1 - Math.exp(-3 * J))),
      (o.acc += J),
      o.acc >= 0.1 && ((o.acc = 0), A(Q), v(), o.occCache.size > 200))
    )
      for (let [i0, A0] of o.occCache)
        o.clock - A0.t > 2 && o.occCache.delete(i0);
    if (o.bakeQ && o.bakeQ.length && ++o.bakeTick & 1) {
      let i0 = typeof performance < "u" ? performance.now() : 0;
      if ((Nb(o.ctx.sampleRate, o.bakeQ.shift()), typeof performance < "u")) {
        let A0 = performance.now() - i0;
        ((o.stats.bakeMs += A0),
          A0 > o.stats.bakeMax && (o.stats.bakeMax = A0));
      }
    }
    (o.lowHealth > 0.05 &&
      Q >= o.nextBeat &&
      (Z(o.lowHealth), (o.nextBeat = Q + Gc(1.05, 0.5, o.lowHealth))),
      l0(Q),
      $0(Q, J),
      H(J),
      ut(Q, J));
  }
  let Pt =
      (J, Q) =>
      (...i0) => {
        if (o.ctx)
          try {
            return Q(...i0);
          } catch (A0) {
            e(J, A0);
            return;
          }
      },
    bt =
      (J, Q) =>
      (...i0) => {
        try {
          return Q(...i0);
        } catch (A0) {
          e(J, A0);
          return;
        }
      },
    Et = {
      gunshot: t0,
      dryFire: M0,
      reload: f0,
      foley: _0,
      attachment: F0,
      laser: m0,
      casing: S0,
      impact: j0,
      ricochet: lt,
      whiz: H0,
      explosion: Y0,
      tinnitus: et,
      grenadeBounce: ct,
      footstep: D0,
      jump: u0,
      land: w0,
      slideStart: st,
      slideStop: P0,
      dive: J0,
      diveLand: q0,
      mantle: v0,
      glassCrack: x0,
      glassShatter: C0,
      glassDebris: k0,
      propHit: O0,
      breakProp: B0,
      sparks: ot,
      extinguisher: Q0,
      chandelierCrash: nt,
      bodyFall: L0,
      pianoNote: ht,
      bell: pt,
      hitmarker: V0,
      hurt: c0,
      death: r0,
      ui: b0,
      k9: gt,
      k9Loop: X0,
    },
    zt = {
      init: bt("init", z0),
      setVolumes: bt("setVolumes", I0),
      setListener: bt("setListener", vt),
      setEnvironment: bt("setEnvironment", wt),
      setOcclusionTester: bt("setOcclusionTester", (J) => {
        ((o.occl = typeof J == "function" ? J : null), o.occCache.clear());
      }),
      setTimeScale: bt("setTimeScale", (J) => {
        o.ts = fl(typeof J == "number" && isFinite(J) ? J : 1, 0.35, 1.5);
      }),
      setLowHealth: bt("setLowHealth", (J) => {
        o.lowHealth = Ai(rh(J, 0));
      }),
      update: bt("update", _t),
      music: {
        menu: bt("music.menu", s0),
      },
      lounge: {
        start: bt("lounge.start", Y),
        kill: bt("lounge.kill", U0),
      },
      k9Cues: aI,
      _errors: o.errors,
      _engine: o,
      _debug: {
        lifeEvent: Pt("lifeEvent", O),
      },
    };
  for (let J of Object.keys(Et)) zt[J] = Pt(J, Et[J]);
  return zt;
}
var audio = createAudio();

export { audio };
