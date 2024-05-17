// Torus geometry
let width = 800;
let height = 800;
let scale = 20;
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

	increse_theta = PI / 18;
	increse_phi = PI / 18;
	for (let theta = 0; theta < 2 * PI; theta += increse_theta) {
		for (let phi = 0; phi < 2 * PI; phi += increse_phi) {
			beginShape(TESS);
			for (i = 0; i < 2; i++) {
				for (j = 0; j < 2; j++) {
					let pX =
						(250 + 50 * cos(phi + ((i + j) % 2) * increse_phi)) *
						cos(theta + i * increse_theta);
					let pY =
						(250 + 50 * cos(phi + ((i + j) % 2) * increse_phi)) *
						sin(theta + i * increse_theta);
					let pZ = 50 * sin(phi + ((i + j) % 2) * increse_phi);
					vertex(pX, pY, pZ);
				}
			}
			endShape();
		}
	}
}
