// Same original debug inputs and simulated frame durations in both versions.
(() => {
  const snapshots = [];
  const capture = (step) => snapshots.push({
    step, state: GH.G.state, match: GH.debug.match.state,
    scores: [...GH.debug.match.scores],
    position: GH.debug.player.pos.toArray(), yaw: GH.debug.player.yaw,
    health: GH.debug.player.health, stance: GH.debug.player.mode,
    arsenal: { state: GH.debug.arsenal.state, current: GH.debug.arsenal.cur,
      grenades: GH.debug.arsenal.grenades,
      slots: GH.debug.arsenal.slots.map((slot) => ({ id: slot.def.id, ammo: slot.ammo, reserve: slot.reserve })),
    },
    bots: GH.debug.match.bots.map((bot) => ({ team: bot.team, name: bot.name, alive: bot.alive, health: bot.health, position: bot.pos.toArray() })),
  });
  const key = (name, frames) => {
    GH.debug.key(name, true);
    __audit.step(frames, 50);
    GH.debug.key(name, false);
  };
  GH.debug.view(null);
  GH.debug.start();
  __audit.step(64, 50);
  capture("deployed");
  key("KeyW", 12);
  capture("moved");
  GH.debug.look(75, 0);
  key("Mouse0", 7);
  capture("fired");
  key("KeyR", 1);
  capture("reloading");
  __audit.step(60, 50);
  capture("reloaded");
  key("Digit2", 1);
  __audit.step(16, 50);
  capture("swapped");
  return (__audit.lastScenario = { frames: __audit.frames, randomCalls: __audit.randomCalls, randomPerFrame: __audit.randomPerFrame, errors: __audit.errors, snapshots });
})()
