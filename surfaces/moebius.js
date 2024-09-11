"use strict";
import { containsSubArray, equalArray } from "../utils.js";

let colorChessboard1 = 30;
let colorChessboard2 = 60;

let scale_moebius = 100;
let y_shift = -1.5;

export function setup_moebius(sketch, width_surface, height_surface, scale) {
	sketch.createCanvas(width_surface, height_surface, sketch.WEBGL);
	sketch.angleMode(sketch.RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	sketch.camera(0, 400, -400, 0, 0, 0, 0, 1, 0);
}

export function draw_moebius(sketch, cols, rows, snakePosition, foodPosition) {
	sketch.background(255);
	sketch.orbitControl();

	// Moebius strip see --> https://mathweb.ucsd.edu/~jeggers/math31ch/moebius_strip.pdf
	let theta_step = (2 * sketch.PI) / cols;
	let t_step = 2 / rows;

	for (let theta_num = 0; theta_num < cols; theta_num += 1) {
		for (let t_num = 0; t_num < rows; t_num += 1) {
			let theta = (theta_num - cols / 2) * theta_step;
			let t = (t_num - rows / 2) * t_step;

			sketch.beginShape(sketch.TESS);
			// Color of the face
			if (containsSubArray(snakePosition, [theta_num, t_num])) {
				sketch.fill(255);
			} else if (equalArray(foodPosition, [theta_num, t_num])) {
				sketch.fill(255, 0, 0);
			} else if ((theta_num + t_num) % 2 == 0) {
				sketch.fill(colorChessboard1);
			} else {
				sketch.fill(colorChessboard2);
			}

			// Construction of the face with the four vertices
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					let pX =
						sketch.cos(theta + i * theta_step) *
						(2 +
							(t + ((i + j) % 2) * t_step) *
								sketch.cos((theta + i * theta_step) / 2));
					let pY =
						y_shift +
						sketch.sin(theta + i * theta_step) *
							(2 +
								(t + ((i + j) % 2) * t_step) *
									sketch.cos((theta + i * theta_step) / 2));
					let pZ =
						(t + ((i + j) % 2) * t_step) *
						sketch.sin((theta + i * theta_step) / 2);
					sketch.vertex(
						scale_moebius * pX,
						scale_moebius * pY,
						scale_moebius * pZ
					);
				}
			}
			sketch.endShape(sketch.CLOSE);
		}
	}
}
