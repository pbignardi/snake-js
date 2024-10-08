"use strict";
import { containsSubArray, equalArray } from "../utils.js";

let scale_klein = 50;
let x_shift = 40;

export function setup_klein(sketch, width_surface, height_surface, scale) {
	sketch.createCanvas(width_surface, height_surface, sketch.WEBGL);
	sketch.angleMode(sketch.RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	sketch.camera(0, -600, 800);
}

export function draw_klein(
	sketch,
	rows,
	cols,
	snakePosition,
	foodPosition,
	colorChessboard1,
	colorChessboard2
) {
	let startColor_1 = sketch.color(255, 203, 107);
	let endColor_1 = sketch.color(255, 83, 112);
	let startColor_2 = sketch.color(195, 232, 141);
	let endColor_2 = sketch.color(130, 170, 255);
	let head_color = sketch.color(195, 232, 141); // to change ?
	let last_color = sketch.color(49, 128, 25); // to change ?
	sketch.background(41, 41, 41);
	sketch.orbitControl();

	let u_step = (2 * sketch.PI) / rows;
	let v_step = (2 * sketch.PI) / cols;

	for (let v_num = 0; v_num < cols; v_num += 1) {
		for (let u_num = 0; u_num < rows; u_num += 1) {
			let u = u_num * u_step;
			let v = v_num * v_step;

			// Color of the face
			let index =
				snakePosition !== null
					? snakePosition.findIndex((e) => e[0] == v_num && e[1] == u_num)
					: -1;
			if (index > -1) {
				let inter = sketch.map(index, 0, snakePosition.length, 0, 1);
				let color = sketch.lerpColor(head_color, last_color, inter);
				sketch.fill(color);
			} else if (equalArray(foodPosition, [v_num, u_num]) || false) {
				sketch.fill(240, 113, 120);
			} else if ((u_num + v_num) % 2 == 0) {
				sketch.fill(colorChessboard1);
			} else {
				sketch.fill(colorChessboard2);
			}

			// Construction of the face with the four vertices
			sketch.beginShape(sketch.TESS);
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					// see https://mathcurve.com/surfaces.gb/klein/klein.shtml
					let r = 2 * (1 - sketch.cos(u + ((i + j) % 2) * u_step) / 2);
					if (u < sketch.PI) {
						let pX =
							x_shift +
							scale_klein *
								(3 * (1 + sketch.sin(u + ((i + j) % 2) * u_step)) +
									r * sketch.cos(v + i * v_step)) *
								sketch.cos(u + ((i + j) % 2) * u_step);
						let pY =
							scale_klein *
							(4 + r * sketch.cos(v + i * v_step)) *
							sketch.sin(u + ((i + j) % 2) * u_step);
						let pZ = scale_klein * r * sketch.sin(v + i * v_step);
						sketch.vertex(pX, pY, pZ);
					} else {
						let pX =
							x_shift +
							scale_klein *
								(3 *
									(1 + sketch.sin(u + ((i + j) % 2) * u_step)) *
									sketch.cos(u + ((i + j) % 2) * u_step) -
									r * sketch.cos(v + i * v_step));
						let pY = scale_klein * 4 * sketch.sin(u + ((i + j) % 2) * u_step);
						let pZ = scale_klein * r * sketch.sin(v + i * v_step);
						sketch.vertex(pX, pY, pZ);
					}

					// see: https://it.wikipedia.org/wiki/Bottiglia_di_Klein
					// let r = 10;
					// let pX =
					// 	(r +
					// 		sketch.cos((u + ((i + j) % 2) * u_step) / 2) *
					// 			sketch.sin(v + i * v_step) -
					// 		sketch.sin((u + ((i + j) % 2) * u_step) / 2) *
					// 			sketch.sin(2 * (v + i * v_step))) *
					// 	sketch.cos(u + ((i + j) % 2) * u_step);
					// let pY =
					// 	(r +
					// 		sketch.cos((u + ((i + j) % 2) * u_step) / 2) *
					// 			sketch.sin(v + i * v_step) -
					// 		sketch.sin((u + ((i + j) % 2) * u_step) / 2) *
					// 			sketch.sin(2 * (v + i * v_step))) *
					// 	sketch.sin(u + ((i + j) % 2) * u_step);
					// let pZ =
					// 	sketch.sin((u + ((i + j) % 2) * u_step) / 2) *
					// 		sketch.sin(v + i * v_step) +
					// 	sketch.cos((u + ((i + j) % 2) * u_step) / 2) *
					// 		sketch.sin(2 * (v + i * v_step));
					// sketch.vertex(pX, pY, pZ);
				}
			}
			sketch.endShape(sketch.CLOSE);

			// Construction of the identification
			// if (v === 0) {
			// 	let r = 2 * (1 - sketch.cos(u) / 2);
			// 	if (u < sketch.PI) {
			// 		var pX =
			// 			x_shift +
			// 			scale_klein *
			// 				(3 * (1 + sketch.sin(u)) + r * sketch.cos(v)) *
			// 				sketch.cos(u);
			// 		var pY = scale_klein * (4 + r * sketch.cos(v)) * sketch.sin(u);
			// 		var pZ = scale_klein * r * sketch.sin(v);
			// 	} else {
			// 		var pX =
			// 			x_shift +
			// 			scale_klein *
			// 				(3 * (1 + sketch.sin(u)) * sketch.cos(u) - r * sketch.cos(v));
			// 		var pY = scale_klein * 4 * sketch.sin(u);
			// 		var pZ = scale_klein * r * sketch.sin(v);
			// 	}

			// 	r = 2 * (1 - sketch.cos(u + u_step) / 2);
			// 	if (u < sketch.PI) {
			// 		var pX2 =
			// 			x_shift +
			// 			scale_klein *
			// 				(3 * (1 + sketch.sin(u + u_step)) + r * sketch.cos(v)) *
			// 				sketch.cos(u + u_step);
			// 		var pY2 =
			// 			scale_klein * (4 + r * sketch.cos(v)) * sketch.sin(u + u_step);
			// 		var pZ2 = scale_klein * r * sketch.sin(v);
			// 	} else {
			// 		var pX2 =
			// 			x_shift +
			// 			scale_klein *
			// 				(3 * (1 + sketch.sin(u + u_step)) * sketch.cos(u + u_step) -
			// 					r * sketch.cos(v));
			// 		var pY2 = scale_klein * 4 * sketch.sin(u + u_step);
			// 		var pZ2 = scale_klein * r * sketch.sin(v);
			// 	}

			// 	let inter = sketch.map(u_num, 0, rows, 0, 1);
			// 	let color = sketch.lerpColor(startColor_1, endColor_1, inter);
			// 	sketch.stroke(color);
			// 	sketch.strokeWeight(5);
			// 	sketch.line(pX, pY, pZ, pX2, pY2, pZ2);
			// 	sketch.stroke("black");
			// 	sketch.strokeWeight(1);
			// }

			// if (u === 0) {
			// 	let r = 2 * (1 - sketch.cos(u) / 2);
			// 	let pX =
			// 		x_shift +
			// 		scale_klein *
			// 			(3 * (1 + sketch.sin(u)) + r * sketch.cos(v)) *
			// 			sketch.cos(u);
			// 	let pY = scale_klein * (4 + r * sketch.cos(v)) * sketch.sin(u);
			// 	let pZ = scale_klein * r * sketch.sin(v);

			// 	let pX2 =
			// 		x_shift +
			// 		scale_klein *
			// 			(3 * (1 + sketch.sin(u)) + r * sketch.cos(v + v_step)) *
			// 			sketch.cos(u);
			// 	let pY2 =
			// 		scale_klein * (4 + r * sketch.cos(v + v_step)) * sketch.sin(u);
			// 	let pZ2 = scale_klein * r * sketch.sin(v + v_step);

			// 	let inter = sketch.map(v_num, 0, cols, 0, 1);
			// 	let color = sketch.lerpColor(startColor_2, endColor_2, inter);
			// 	sketch.stroke(color);
			// 	sketch.strokeWeight(5);
			// 	sketch.line(pX, pY, pZ, pX2, pY2, pZ2);
			// 	sketch.stroke("black");
			// 	sketch.strokeWeight(1);
			// }
		}
	}
}
