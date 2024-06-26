// Klein bottle
let width = 800;
let height = 800;
let scale = 20;
let scale_klein = 110;
function setup() {
	createCanvas(width, height, WEBGL);
	angleMode(RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	camera(0, -600, 600);
}

function draw() {
	background(30);
	orbitControl();

	// see https://en.wikipedia.org/wiki/Klein_bottle for the parameterization
	let u_step = 0.03;
	let v_step = 0.1;
	for (u = 0; u < PI; u += u_step) {
		for (v = 0; v < 2 * PI; v += v_step) {
			beginShape(TESS);
			for (i = 0; i < 2; i++) {
				for (j = 0; j < 2; j++) {
					let pX =
						-scale_klein *
						(2 / 15) *
						cos(u + ((i + j) % 2) * u_step) *
						(3 * cos(v + i * v_step) -
							30 * sin(u + ((i + j) % 2) * u_step) +
							90 *
								Math.pow(cos(u + ((i + j) % 2) * u_step), 4) *
								sin(u + ((i + j) % 2) * u_step) -
							60 *
								Math.pow(cos(u + ((i + j) % 2) * u_step), 6) *
								sin(u + ((i + j) % 2) * u_step) +
							5 *
								cos(u + ((i + j) % 2) * u_step) *
								cos(v + i * v_step) *
								sin(u + ((i + j) % 2) * u_step));
					let pY =
						-300 +
						-scale_klein *
							(1 / 15) *
							sin(u + ((i + j) % 2) * u_step) *
							(3 * cos(v + i * v_step) -
								3 *
									Math.pow(cos(u + ((i + j) % 2) * u_step), 2) *
									cos(v + i * v_step) -
								48 *
									Math.pow(cos(u + ((i + j) % 2) * u_step), 4) *
									cos(v + i * v_step) +
								48 *
									Math.pow(cos(u + ((i + j) % 2) * u_step), 6) *
									cos(v + i * v_step) -
								60 * sin(u + ((i + j) % 2) * u_step) +
								5 *
									cos(u + ((i + j) % 2) * u_step) *
									cos(v + i * v_step) *
									sin(u + ((i + j) % 2) * u_step) -
								5 *
									Math.pow(cos(u + ((i + j) % 2) * u_step), 3) *
									cos(v + i * v_step) *
									sin(u + ((i + j) % 2) * u_step) -
								80 *
									Math.pow(cos(u + ((i + j) % 2) * u_step), 5) *
									cos(v + i * v_step) *
									sin(u + ((i + j) % 2) * u_step) +
								80 *
									Math.pow(cos(u + ((i + j) % 2) * u_step), 7) *
									cos(v + i * v_step) *
									sin(u + ((i + j) % 2) * u_step));
					let pZ =
						scale_klein *
						(2 / 15) *
						(3 +
							5 *
								cos(u + ((i + j) % 2) * u_step) *
								sin(u + ((i + j) % 2) * u_step)) *
						sin(v + i * v_step);
					vertex(pX, pY, pZ);
				}
			}
			endShape(CLOSE);
		}
	}
}
