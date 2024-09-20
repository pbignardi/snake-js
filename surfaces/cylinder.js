"use strict";
import { containsSubArray, equalArray } from "../utils.js";

let y_shift = -100;
let height_cylinder = 200;
let radius_cylinder = 150;

export function setup_cylinder(sketch, width_surface, height_surface, scale) {
	sketch.createCanvas(width_surface, height_surface, sketch.WEBGL);
	sketch.angleMode(sketch.RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	sketch.camera(0, 300, -280, 0, 0, 0, 0, 1, 0);
}

export function draw_cylinder(
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
	sketch.background(41, 41, 41);
	sketch.orbitControl();

	let increse_theta = (2 * sketch.PI) / cols;
	let increse_h = height_cylinder / rows;
	let head_color = sketch.color(195, 232, 141); // to change ?
	let last_color = sketch.color(49, 128, 25); // to change ?

	for (let theta_num = 0; theta_num < cols; theta_num += 1) {
		for (let h_num = 0; h_num < rows; h_num += 1) {
			let theta = theta_num * increse_theta;
			let h = h_num * increse_h;

			let index =
				snakePosition !== null
					? snakePosition.findIndex((e) => e[0] == theta_num && e[1] == h_num)
					: -1;
			if (index > -1) {
				let inter = sketch.map(index, 0, snakePosition.length, 0, 1);
				let color = sketch.lerpColor(head_color, last_color, inter);
				sketch.fill(color);
			} else if (equalArray(foodPosition, [theta_num, h_num]) || false) {
				sketch.fill(240, 113, 120);
			} else if ((theta_num + h_num) % 2 == 0) {
				sketch.fill(colorChessboard1);
			} else {
				sketch.fill(colorChessboard2);
			}

			// Construction of the face with the four vertices
			sketch.beginShape(sketch.TESS);
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

			// Construction of the identification
			if (theta === 0) {
				let pX = radius_cylinder * sketch.cos(theta);
				let pY = y_shift + radius_cylinder * sketch.sin(theta);
				let pZ = h;

				let pX2 = radius_cylinder * sketch.cos(theta);
				let pY2 = y_shift + radius_cylinder * sketch.sin(theta);
				let pZ2 = h + increse_h;

				let inter = sketch.map(h_num, 0, rows, 0, 1);
				let color = sketch.lerpColor(startColor_1, endColor_1, inter);
				sketch.stroke(color);
				sketch.strokeWeight(5);
				sketch.line(pX, pY, pZ, pX2, pY2, pZ2);
				sketch.stroke("black");
				sketch.strokeWeight(1);
			}
		}
	}
}
