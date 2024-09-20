import { gameSketch } from "./sketches/game.js";
import { surfaceSketch } from "./sketches/surface.js";

document.addEventListener("DOMContentLoaded", () => {
	new p5(gameSketch, document.getElementById("game"));
	new p5(surfaceSketch, document.getElementById("surface"));
});
