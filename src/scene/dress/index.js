// scene/dress/index.js: recovered from the verified GOLDEN HOUR release.
import { dressLobby } from "./lobby.js";
import { dressWestWing } from "./west-wing.js";
import { dressEastWing } from "./east-wing.js";
import { dressHotelDetails } from "./details.js";

function dressHotel(o, t) {
  if (dressLobby.stub) for (let e of t.basic) e();
  for (let e of [dressLobby, dressWestWing, dressEastWing, dressHotelDetails])
    e(o, t);
}

export { dressHotel };
