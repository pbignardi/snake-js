"use strict";

let colorChessboard1 = 30;
let colorChessboard2 = 60;

export function setup_sphere(sketch, width_surface, height_surface, scale) {
	sketch.createCanvas(width_surface, height_surface, sketch.WEBGL);
	sketch.angleMode(sketch.RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	sketch.camera(0, 550, 600, 0, 0, 0, 0, 1, 0);
}

export function draw_sphere(sketch) {
	sketch.background(255);
	sketch.orbitControl();

	let increse_phi = sketch.PI / 36;
	let increse_theta = sketch.PI / 36;
	for (let phi = 0; phi < 2 * sketch.PI; phi += increse_phi) {
		for (let theta = 0; theta < sketch.PI; theta += increse_theta) {
			sketch.beginShape(sketch.TESS);
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					let pX =
						250 *
						sketch.sin(theta + i * increse_theta) *
						sketch.cos(phi + ((i + j) % 2) * increse_phi);
					let pY =
						250 *
						sketch.sin(theta + i * increse_theta) *
						sketch.sin(phi + ((i + j) % 2) * increse_phi);
					let pZ = 250 * sketch.cos(theta + i * increse_theta);
					vertex(pX, pY, pZ);
				}
			}
			sketch.endShape();
		}
	}
}
