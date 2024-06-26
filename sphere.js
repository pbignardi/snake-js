// Sphere geometry
let width = 600;
let height = 600;
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

	increse_phi = PI / 36;
	increse_theta = PI / 36;
	for (let phi = 0; phi < 2 * PI; phi += increse_phi) {
		for (let theta = 0; theta < PI; theta += increse_theta) {
			beginShape(TESS);
			for (i = 0; i < 2; i++) {
				for (j = 0; j < 2; j++) {
					let pX =
						250 *
						sin(theta + i * increse_theta) *
						cos(phi + ((i + j) % 2) * increse_phi);
					let pY =
						250 *
						sin(theta + i * increse_theta) *
						sin(phi + ((i + j) % 2) * increse_phi);
					let pZ = 250 * cos(theta + i * increse_theta);
					vertex(pX, pY, pZ);
				}
			}
			endShape();
		}
	}
}
