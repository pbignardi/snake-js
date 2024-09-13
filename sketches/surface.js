"use strict";

import { setup_cylinder, draw_cylinder } from "../surfaces/cylinder.js";
import { setup_torus, draw_torus } from "../surfaces/torus.js";
import { setup_moebius, draw_moebius } from "../surfaces/moebius.js";
import { setup_klein, draw_klein } from "../surfaces/klein.js";
import { setup_square, draw_square } from "../surfaces/square.js";

export const surfaceSketch = (sketch) => {
	let topology = sessionStorage.getItem("topology");
	let width = parseInt(sessionStorage.getItem("width"));
	let height = parseInt(sessionStorage.getItem("height"));
	let scale = parseInt(sessionStorage.getItem("scale"));
	let cols = Math.floor(width / scale);
	let rows = Math.floor(height / scale);
	let colorChessboard1 = parseInt(sessionStorage.getItem("colorChessboard1"));
	let colorChessboard2 = parseInt(sessionStorage.getItem("colorChessboard2"));

	// Define setup functions for different topologies

	const setupFunctions = {
		square: setup_square,
		cylinder: setup_cylinder,
		torus: setup_torus,
		moebius: setup_moebius,
		klein: setup_klein,
	};

	// Call the appropriate setup function based on the topology
	sketch.setup = () => {
		sketch.frameRate(120);
		if (setupFunctions[topology]) {
			setupFunctions[topology](sketch, width, height);
		} else {
			console.error(`Unknown topology: ${topology}`);
		}
	};

	// Define draw functions for different topologies
	const drawFunctions = {
		square: draw_square,
		cylinder: draw_cylinder,
		torus: draw_torus,
		moebius: draw_moebius,
		klein: draw_klein,
	};

	sketch.draw = () => {
		// get position of snake from session storage
		let snakePosition = JSON.parse(sessionStorage.getItem("snakePosition")); // array of array
		let foodPosition = JSON.parse(sessionStorage.getItem("foodPosition")); // array of two elements
		// Call the appropriate draw function based on the topology
		if (drawFunctions[topology]) {
			drawFunctions[topology](
				sketch,
				cols,
				rows,
				snakePosition,
				foodPosition,
				colorChessboard1,
				colorChessboard2
			);
		} else {
			console.error(`Unknown topology: ${topology}`);
		}
	};
};
