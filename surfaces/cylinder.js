"use strict";
import { containsSubArray, equalArray } from "../utils.js";

let colorChessboard1 = 30;
let colorChessboard2 = 60;

let y_shift = -200;
let height_cylinder = 200;
let radius_cylinder = 150;

export function setup_cylinder(sketch, width_surface, height_surface, scale) {
	sketch.createCanvas(width_surface, height_surface, sketch.WEBGL);
	sketch.angleMode(sketch.RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	sketch.camera(0, 250, -280, 0, 0, 0, 0, 1, 0);
}

export function draw_cylinder(sketch, cols, rows, snakePosition, foodPosition) {
	sketch.background(255);
	sketch.orbitControl();

	let increse_theta = (2 * sketch.PI) / cols;
	let increse_h = height_cylinder / rows;

	for (let theta_num = 0; theta_num < cols; theta_num += 1) {
		for (let h_num = 0; h_num < rows; h_num += 1) {
			let theta = theta_num * increse_theta;
			let h = h_num * increse_h;

			sketch.beginShape(sketch.TESS);
			// Color of the face
			if (containsSubArray(snakePosition, [theta_num, h_num])) {
				sketch.fill(255);
			} else if (equalArray(foodPosition, [theta_num, h_num])) {
				sketch.fill(255, 0, 0);
			} else if ((theta_num + h_num) % 2 == 0) {
				sketch.fill(colorChessboard1);
			} else {
				sketch.fill(colorChessboard2);
			}

			// Construction of the face with the four vertices
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					let pX = radius_cylinder * sketch.cos(theta + i * increse_theta);
					let pY =
						y_shift + radius_cylinder * sketch.sin(theta + i * increse_theta);
					let pZ = h + ((i + j) % 2) * increse_h;
					sketch.vertex(pX, pY, pZ);
				}
			}
			sketch.endShape();
		}
	}
}
