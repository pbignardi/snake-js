// Mobius geometry
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

	// Mobius strip see --> https://mathweb.ucsd.edu/~jeggers/math31ch/mobius_strip.pdf
}
