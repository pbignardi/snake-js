"use strict";
import { containsSubArray, equalArray } from "../utils.js";

let colorChessboard1 = 30;
let colorChessboard2 = 60;

let radius_tube = 60;
let radius_hole = 200;
let y_shift = -150;

export function setup_torus(sketch, width_surface, height_surface, scale) {
	sketch.createCanvas(width_surface, height_surface, sketch.WEBGL);
	sketch.angleMode(sketch.RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	sketch.camera(0, 400, -300, 0, 0, 0, 0, 1, 0);
}

export function draw_torus(sketch, cols, rows, snakePosition, foodPosition) {
	sketch.background(255);
	sketch.orbitControl();

	let increse_theta = (2 * sketch.PI) / cols;
	let increse_phi = (2 * sketch.PI) / rows;

	for (let theta_num = 0; theta_num < cols; theta_num += 1) {
		for (let phi_num = 0; phi_num < rows; phi_num += 1) {
			let theta = theta_num * increse_theta;
			let phi = phi_num * increse_phi;

			sketch.beginShape(sketch.TESS);
			// Color of the face
			if (containsSubArray(snakePosition, [theta_num, phi_num])) {
				sketch.fill(255);
			} else if (equalArray(foodPosition, [theta_num, phi_num])) {
				sketch.fill(255, 0, 0);
			} else if ((theta_num + phi_num) % 2 == 0) {
				sketch.fill(colorChessboard1);
			} else {
				sketch.fill(colorChessboard2);
			}

			// Construction of the face with the four vertices
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					let pX =
						(radius_hole +
							radius_tube * sketch.cos(phi + ((i + j) % 2) * increse_phi)) *
						sketch.cos(theta + i * increse_theta);
					let pY =
						y_shift +
						(radius_hole +
							radius_tube * sketch.cos(phi + ((i + j) % 2) * increse_phi)) *
							sketch.sin(theta + i * increse_theta);
					let pZ = radius_tube * sketch.sin(phi + ((i + j) % 2) * increse_phi);
					sketch.vertex(pX, pY, pZ);
				}
			}
			sketch.endShape();
		}
	}
}
