// Cylinder geometry
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

	increse_theta = PI / 36;
	increse_h = 20;
	increse_phi = PI / 36;
	for (let theta = 0; theta < 2 * PI; theta += increse_theta) {
		for (let h = 0; h < 200; h += increse_h) {
			beginShape(TESS);
			for (i = 0; i < 2; i++) {
				for (j = 0; j < 2; j++) {
					let pX = 250 * cos(theta + i * increse_theta);
					let pY = 250 * sin(theta + i * increse_theta);
					let pZ = h + ((i + j) % 2) * increse_h;
					vertex(pX, pY, pZ);
				}
			}
			endShape();
		}
	}
}
