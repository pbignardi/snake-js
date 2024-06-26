// Mobius geometry
let width = 800;
let height = 800;
let scale = 20;
let scale_mobius = 100;
function setup() {
	createCanvas(width, height, WEBGL);
	angleMode(RADIANS);

	// Set up the camera
	// camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
	camera(0, 550, 600, 0, 0, 0, 0, 1, 0);
}

function draw() {
	background(30);
	orbitControl();

	// Mobius strip see --> https://mathweb.ucsd.edu/~jeggers/math31ch/mobius_strip.pdf
	let theta_step = (2 * PI) / 50;
	let t_step = 2 / 30;
	for (let theta = -PI; theta < PI; theta += theta_step) {
		for (let t = -1; t < 1 - t_step; t += t_step) {
			beginShape(TESS);
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					let pX =
						cos(theta + i * theta_step) *
						(2 +
							(t + ((i + j) % 2) * t_step) * cos((theta + i * theta_step) / 2));
					let pY =
						sin(theta + i * theta_step) *
						(2 +
							(t + ((i + j) % 2) * t_step) * cos((theta + i * theta_step) / 2));
					let pZ =
						(t + ((i + j) % 2) * t_step) * sin((theta + i * theta_step) / 2);
					vertex(scale_mobius * pX, scale_mobius * pY, scale_mobius * pZ);
				}
			}
			endShape(CLOSE);
		}
	}
}
