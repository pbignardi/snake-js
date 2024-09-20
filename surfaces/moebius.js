"use strict";
import { containsSubArray, equalArray } from "../utils.js";

let scale_moebius = 100;
let y_shift = -0.5;
let x_shift = -0.3;

export function setup_moebius(sketch, width_surface, height_surface, scale) {
	sketch.createCanvas(width_surface, height_surface, sketch.WEBGL);
	sketch.angleMode(sketch.RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	sketch.camera(0, 550, -550, 0, 0, 0, 0, 1, 0);
}

export function draw_moebius(
	sketch,
	cols,
	rows,
	snakePosition,
	foodPosition,
	colorChessboard1,
	colorChessboard2
) {
	sketch.background(41, 41, 41);
	sketch.orbitControl();

	// Moebius strip
	let theta_step = (2 * sketch.PI) / cols;
	let t_step = 2 / rows;
	let startColor_1 = sketch.color(255, 203, 107);
	let endColor_1 = sketch.color(255, 83, 112);
	let head_color = sketch.color(195, 232, 141); // to change ?
	let last_color = sketch.color(49, 128, 25); // to change ?

	for (let theta_num = 0; theta_num < cols; theta_num += 1) {
		for (let t_num = 0; t_num < rows; t_num += 1) {
			let theta = (theta_num - cols / 2) * theta_step;
			let t = (t_num - rows / 2) * t_step;

			// Color of the face
			let index =
				snakePosition !== null
					? snakePosition.findIndex((e) => e[0] == theta_num && e[1] == t_num)
					: -1;
			if (index > -1) {
				let inter = sketch.map(index, 0, snakePosition.length, 0, 1);
				let color = sketch.lerpColor(head_color, last_color, inter);
				sketch.fill(color);
			} else if (equalArray(foodPosition, [theta_num, t_num]) || false) {
				sketch.fill(240, 113, 120);
			} else if ((theta_num + t_num) % 2 == 0) {
				sketch.fill(colorChessboard1);
			} else {
				sketch.fill(colorChessboard2);
			}

			// Construction of the face with the four vertices
			sketch.beginShape(sketch.TESS);
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					let pX =
						x_shift +
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

			// Construction of the identification
			if (theta === -sketch.PI) {
				let pX = x_shift + sketch.cos(theta) * (2 + t * sketch.cos(theta / 2));
				let pY = y_shift + sketch.sin(theta) * (2 + t * sketch.cos(theta / 2));
				let pZ = t * sketch.sin(theta / 2);

				let pX2 =
					x_shift +
					sketch.cos(theta) * (2 + (t + t_step) * sketch.cos(theta / 2));
				let pY2 =
					y_shift +
					sketch.sin(theta) * (2 + (t + t_step) * sketch.cos(theta / 2));
				let pZ2 = (t + t_step) * sketch.sin(theta / 2);

				let inter = sketch.map(t_num, 0, rows, 0, 1);
				let color = sketch.lerpColor(startColor_1, endColor_1, inter);
				sketch.stroke(color);
				sketch.strokeWeight(5);
				sketch.line(
					scale_moebius * pX,
					scale_moebius * pY,
					scale_moebius * pZ,
					scale_moebius * pX2,
					scale_moebius * pY2,
					scale_moebius * pZ2
				);
				sketch.stroke("black");
				sketch.strokeWeight(1);
			}
		}
	}
}
