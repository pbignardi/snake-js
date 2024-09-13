"use strict";
import { containsSubArray, equalArray } from "../utils.js";

export function setup_square(sketch, width_surface, height_surface, scale) {
	sketch.createCanvas(width_surface, height_surface);
}

export function draw_square(
	sketch,
	rows,
	cols,
	snakePosition,
	foodPosition,
	colorChessboard1,
	colorChessboard2
) {
	sketch.background(41, 41, 41);
	let scl = parseInt(sessionStorage.getItem("scale"));

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			// Color of the face
			if (containsSubArray(snakePosition, [i, j])) {
				sketch.fill(195, 232, 141);
			} else if (equalArray(foodPosition, [i, j])) {
				sketch.fill(240, 113, 120);
			} else if ((i + j) % 2 == 0) {
				sketch.fill(colorChessboard1);
			} else {
				sketch.fill(colorChessboard2);
			}

			// Construction of the face with the four vertices
			sketch.rect(i * scl, j * scl, scl, scl);
		}
	}
}
