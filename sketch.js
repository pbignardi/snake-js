let x = 0;
let y = 0;
let xhole = 400;
let yhole = 100;

function setup() {
	createCanvas(800, 600);
}

function draw() {
	background(200, 250, 40);
	circle(xhole, yhole, 40);
	circle(x, y, 10);
	// check if ball is in the hole stop
}

function keyPressed() {
	if ( key == 'j' ) {
		y += 20
	}
	if ( key == 'k' ) {
		y -= 20
	}
	if ( key == 'h' ) {
		x -= 20
	}
	if ( key == 'l' ) {
		x += 20
	}
}
