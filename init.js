import { gameSketch } from "./sketches/game.js";
import { surfaceSketch } from "./sketches/surface.js";

document.addEventListener("DOMContentLoaded", () => {
    let clientHeight = document.documentElement.clientHeight;
    let scaling = (clientHeight * 0.7) / 600;
    document.getElementById("leftComponent").setAttribute("style", `transform: scale(${scaling});`);
    document.getElementById("rightComponent").setAttribute("style", `transform: scale(${scaling});`);

	new p5(gameSketch, document.getElementById("game"));
	new p5(surfaceSketch, document.getElementById("surface"));
});
