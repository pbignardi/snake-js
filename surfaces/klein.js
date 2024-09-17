"use strict";
import { containsSubArray, equalArray } from "../utils.js";

let scale_klein = 110; // 110 for wikipedia and 20 for the other

export function setup_klein(sketch, width_surface, height_surface, scale) {
	sketch.createCanvas(width_surface, height_surface, sketch.WEBGL);
	sketch.angleMode(sketch.RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	sketch.camera(0, -600, 600);
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
    let head_color = sketch.color(195, 232, 141) // to change ?
    let last_color = sketch.color(49, 128, 25) // to change ?
	sketch.background(41, 41, 41);
	sketch.orbitControl();

	let u_step = sketch.PI / rows; // for wikipedia
	// let u_step = (2 * sketch.PI) / rows; // for the other
	let v_step = (2 * sketch.PI) / cols;

	for (let v_num = 0; v_num < cols; v_num += 1) {
		for (let u_num = 0; u_num < rows; u_num += 1) {
			let u = u_num * u_step;
			let v = v_num * v_step;

			sketch.beginShape(sketch.TESS);
			// Color of the face
            let index = snakePosition !== null ? snakePosition.findIndex((e) => (e[0] == v_num && e[1] == u_num)) : -1;
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
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					// // supplementary variable
					// let r = 2 * (1 - sketch.cos(u + ((i + j) % 2) * u_step) / 2);

					// // see https://mathcurve.com/surfaces.gb/klein/klein.shtml
					// if (u < sketch.PI) {
					// 	let pX =
					// 		scale_klein *
					// 		(3 * (1 + sketch.sin(u + ((i + j) % 2) * u_step)) +
					// 			r * sketch.cos(v + i * v_step)) *
					// 		sketch.cos(u + ((i + j) % 2) * u_step);
					// 	let pY =
					// 		scale_klein *
					// 		(4 + r * sketch.cos(v + i * v_step)) *
					// 		sketch.sin(u + ((i + j) % 2) * u_step);
					// 	let pZ = scale_klein * r * sketch.sin(v + i * v_step);
					// 	sketch.vertex(pX, pY, pZ);
					// } else {
					// 	let pX =
					// 		scale_klein *
					// 		(3 *
					// 			(1 + sketch.sin(u + ((i + j) % 2) * u_step)) *
					// 			sketch.cos(u + ((i + j) % 2) * u_step) -
					// 			r * sketch.cos(v + i * v_step));
					// 	let pY = scale_klein * 4 * sketch.sin(u + ((i + j) % 2) * u_step);
					// 	let pZ = scale_klein * r * sketch.sin(v + i * v_step);
					// 	sketch.vertex(pX, pY, pZ);
					// }

					//	// see https://en.wikipedia.org/wiki/Klein_bottle for the parameterization
					let pX =
						-scale_klein *
						(2 / 15) *
						sketch.cos(u + ((i + j) % 2) * u_step) *
						(3 * sketch.cos(v + i * v_step) -
							30 * sketch.sin(u + ((i + j) % 2) * u_step) +
							90 *
								sketch.pow(sketch.cos(u + ((i + j) % 2) * u_step), 4) *
								sketch.sin(u + ((i + j) % 2) * u_step) -
							60 *
								sketch.pow(sketch.cos(u + ((i + j) % 2) * u_step), 6) *
								sketch.sin(u + ((i + j) % 2) * u_step) +
							5 *
								sketch.cos(u + ((i + j) % 2) * u_step) *
								sketch.cos(v + i * v_step) *
								sketch.sin(u + ((i + j) % 2) * u_step));
					let pY =
						-scale_klein *
						(1 / 15) *
						sketch.sin(u + ((i + j) % 2) * u_step) *
						(3 * sketch.cos(v + i * v_step) -
							3 *
								sketch.pow(sketch.cos(u + ((i + j) % 2) * u_step), 2) *
								sketch.cos(v + i * v_step) -
							48 *
								sketch.pow(sketch.cos(u + ((i + j) % 2) * u_step), 4) *
								sketch.cos(v + i * v_step) +
							48 *
								sketch.pow(sketch.cos(u + ((i + j) % 2) * u_step), 6) *
								sketch.cos(v + i * v_step) -
							60 * sketch.sin(u + ((i + j) % 2) * u_step) +
							5 *
								sketch.cos(u + ((i + j) % 2) * u_step) *
								sketch.cos(v + i * v_step) *
								sketch.sin(u + ((i + j) % 2) * u_step) -
							5 *
								sketch.pow(sketch.cos(u + ((i + j) % 2) * u_step), 3) *
								sketch.cos(v + i * v_step) *
								sketch.sin(u + ((i + j) % 2) * u_step) -
							80 *
								sketch.pow(sketch.cos(u + ((i + j) % 2) * u_step), 5) *
								sketch.cos(v + i * v_step) *
								sketch.sin(u + ((i + j) % 2) * u_step) +
							80 *
								sketch.pow(sketch.cos(u + ((i + j) % 2) * u_step), 7) *
								sketch.cos(v + i * v_step) *
								sketch.sin(u + ((i + j) % 2) * u_step));
					let pZ =
						scale_klein *
						(2 / 15) *
						(3 +
							5 *
								sketch.cos(u + ((i + j) % 2) * u_step) *
								sketch.sin(u + ((i + j) % 2) * u_step)) *
						sketch.sin(v + i * v_step);
					sketch.vertex(pX, pY, pZ);
				}
			}
			sketch.endShape(sketch.CLOSE);
		}
	}
}
