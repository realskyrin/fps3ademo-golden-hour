// core/input.js: recovered from the verified GOLDEN HOUR release.

var InputController = class {
  constructor(canvas) {
    ((this.el = canvas),
      (this.keys = new Set()),
      (this.down = new Set()),
      (this.up = new Set()),
      (this.mx = 0),
      (this.my = 0),
      (this.wheel = 0),
      (this.locked = !1),
      (this.onLockChange = null),
      (this.enabled = !0));
    let e = (i) => {
        if (i.repeat) {
          this.locked && i.preventDefault();
          return;
        }
        (this.keys.add(i.code),
          this.down.add(i.code),
          this.locked &&
            (i.code === "Tab" ||
              i.code === "Space" ||
              i.code.startsWith("Arrow") ||
              i.code === "Quote" ||
              i.code === "Slash" ||
              (i.code.startsWith("F") &&
                i.code.length <= 3 &&
                i.code !== "F" &&
                i.code !== "F11" &&
                i.code !== "F12")) &&
            i.preventDefault());
      },
      s = (i) => {
        (this.keys.delete(i.code), this.up.add(i.code));
      };
    (addEventListener("keydown", e),
      addEventListener("keyup", s),
      addEventListener("blur", () => this.keys.clear()),
      addEventListener("mousemove", (i) => {
        this.locked &&
          ((this.mx += i.movementX || 0), (this.my += i.movementY || 0));
      }));
    let n = (i) => "Mouse" + i;
    (addEventListener("mousedown", (i) => {
      this.locked &&
        (this.keys.add(n(i.button)),
        this.down.add(n(i.button)),
        i.preventDefault());
    }),
      addEventListener("mouseup", (i) => {
        (this.keys.delete(n(i.button)),
          this.up.add(n(i.button)),
          this.locked && i.button >= 3 && i.preventDefault());
      }),
      addEventListener("auxclick", (i) => {
        this.locked && i.preventDefault();
      }),
      addEventListener(
        "wheel",
        (i) => {
          this.locked && (this.wheel += Math.sign(i.deltaY));
        },
        {
          passive: !0,
        },
      ),
      addEventListener("contextmenu", (i) => i.preventDefault()),
      document.addEventListener("pointerlockchange", () => {
        ((this.locked = document.pointerLockElement === canvas),
          this.locked || this.keys.clear(),
          this.onLockChange && this.onLockChange(this.locked));
      }));
  }
  lock() {
    if (!this.locked)
      try {
        let t = this.el.requestPointerLock({
          unadjustedMovement: !0,
        });
        t &&
          t.catch &&
          t.catch(() => {
            try {
              this.el.requestPointerLock();
            } catch {}
          });
      } catch {
        try {
          this.el.requestPointerLock();
        } catch {}
      }
  }
  unlock() {
    document.pointerLockElement && document.exitPointerLock();
  }
  held(t) {
    return this.enabled && this.keys.has(t);
  }
  pressed(t) {
    return this.enabled && this.down.has(t);
  }
  released(t) {
    return this.up.has(t);
  }
  any(t, e = "held") {
    for (let s of t) if (this[e](s)) return !0;
    return !1;
  }
  endFrame() {
    (this.down.clear(),
      this.up.clear(),
      (this.mx = 0),
      (this.my = 0),
      (this.wheel = 0));
  }
};
var KEY_BINDINGS = {
  forward: ["KeyW", "ArrowUp"],
  back: ["KeyS", "ArrowDown"],
  left: ["KeyA", "ArrowLeft"],
  right: ["KeyD", "ArrowRight"],
  jump: ["Space"],
  sprint: ["ShiftLeft", "ShiftRight"],
  crouch: ["KeyC"],
  dive: ["KeyX", "KeyZ"],
  fire: ["Mouse0"],
  ads: ["Mouse1", "Mouse2"],
  reload: ["KeyR"],
  melee: ["KeyV", "KeyF", "Mouse3", "Mouse4"],
  grenade: ["KeyG", "KeyQ"],
  swap: ["Digit1", "Digit2", "KeyE"],
  inspect: ["KeyT"],
  score: ["Tab"],
  k9: ["KeyB", "Digit3"],
};

export { InputController, KEY_BINDINGS };
