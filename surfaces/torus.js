"use strict";
import { containsSubArray, equalArray } from "../utils.js";

let radius_tube = 60;
let radius_hole = 200;
let y_shift = -100;

export function setup_torus(sketch, width_surface, height_surface) {
	sketch.createCanvas(width_surface, height_surface, sketch.WEBGL);
	sketch.angleMode(sketch.RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	sketch.camera(0, 600, -500, 0, 0, 0, 0, 1, 0);
}

export function draw_torus(
	sketch,
	cols,
	rows,
	snakePosition,
	foodPosition,
	colorChessboard1,
	colorChessboard2
) {
	let startColor_1 = sketch.color(255, 203, 107);
	let endColor_1 = sketch.color(255, 83, 112);
	let startColor_2 = sketch.color(195, 232, 141);
	let endColor_2 = sketch.color(130, 170, 255);
	sketch.background(41, 41, 41);
	sketch.orbitControl();
	let head_color = sketch.color(195, 232, 141); // to change ?
	let last_color = sketch.color(49, 128, 25); // to change ?

	let increse_theta = (2 * sketch.PI) / cols;
	let increse_phi = (2 * sketch.PI) / rows;

	for (let theta_num = 0; theta_num < cols; theta_num += 1) {
		for (let phi_num = 0; phi_num < rows; phi_num += 1) {
			let theta = theta_num * increse_theta;
			let phi = phi_num * increse_phi;

			// Color of the face
			let index =
				snakePosition !== null
					? snakePosition.findIndex((e) => e[0] == theta_num && e[1] == phi_num)
					: -1;
			if (index > -1) {
				let inter = sketch.map(index, 0, snakePosition.length, 0, 1);
				let color = sketch.lerpColor(head_color, last_color, inter);
				sketch.fill(color);
			} else if (equalArray(foodPosition, [theta_num, phi_num]) || false) {
				sketch.fill(240, 113, 120);
			} else if ((theta_num + phi_num) % 2 == 0) {
				sketch.fill(colorChessboard1);
			} else {
				sketch.fill(colorChessboard2);
			}

			sketch.beginShape(sketch.TESS);
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

			// Construction of the identification
			if (theta === 0) {
				let pX =
					(radius_hole + radius_tube * sketch.cos(phi)) * sketch.cos(theta);
				let pY =
					y_shift +
					(radius_hole + radius_tube * sketch.cos(phi)) * sketch.sin(theta);
				let pZ = radius_tube * sketch.sin(phi);

				let pX2 =
					(radius_hole + radius_tube * sketch.cos(phi + increse_phi)) *
					sketch.cos(theta);
				let pY2 =
					y_shift +
					(radius_hole + radius_tube * sketch.cos(phi + increse_phi)) *
						sketch.sin(theta);
				let pZ2 = radius_tube * sketch.sin(phi + increse_phi);

				let inter = sketch.map(phi_num, 0, rows, 0, 1);
				let color = sketch.lerpColor(startColor_1, endColor_1, inter);
				sketch.stroke(color);
				sketch.strokeWeight(5);
				sketch.line(pX, pY, pZ, pX2, pY2, pZ2);
				sketch.stroke("black");
				sketch.strokeWeight(1);
			}

			if (phi === 0) {
				let pX =
					(radius_hole + radius_tube * sketch.cos(phi)) * sketch.cos(theta);
				let pY =
					y_shift +
					(radius_hole + radius_tube * sketch.cos(phi)) * sketch.sin(theta);
				let pZ = radius_tube * sketch.sin(phi);

				let pX2 =
					(radius_hole + radius_tube * sketch.cos(phi)) *
					sketch.cos(theta + increse_theta);
				let pY2 =
					y_shift +
					(radius_hole + radius_tube * sketch.cos(phi)) *
						sketch.sin(theta + increse_theta);
				let pZ2 = radius_tube * sketch.sin(phi);

				let inter = sketch.map(theta_num, 0, cols, 0, 1);
				let color = sketch.lerpColor(startColor_2, endColor_2, inter);
				sketch.stroke(color);
				sketch.strokeWeight(5);
				sketch.line(pX, pY, pZ, pX2, pY2, pZ2);
				sketch.stroke("black");
				sketch.strokeWeight(1);
			}
		}
	}
}
