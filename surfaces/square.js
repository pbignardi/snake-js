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
    let head_color = sketch.color(195, 232, 141) // to change ?
    let last_color = sketch.color(49, 128, 25) // to change ?

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			// Color of the face
            let index = snakePosition !== null ? snakePosition.findIndex((e) => (e[0] == i && e[1] == j)) : -1;
            if (index > -1) {
                let inter = sketch.map(index, 0, snakePosition.length, 0, 1);
                let color = sketch.lerpColor(head_color, last_color, inter);
                sketch.fill(color);
			} else if (equalArray(foodPosition, [i, j]) || false) {
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
