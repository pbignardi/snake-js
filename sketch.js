let s;
let scl = 20;
let f;

function setup() {
	createCanvas(600, 600);
	s = new Snake();
	f = new Food();
	frameRate(10);
}

function pickLocation() {
	let cols = floor(width / scl);
	let rows = floor(height / scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}

function mousePressed() {
	s.total++;
}

function draw() {
	background(51);
	if (s.eat(f.pos)) {
		f = new Food();
	}
	s.death();
	s.update();
	s.show();
	fill(255, 0, 100);
	rect(f.x, f.y, scl, scl);
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		s.dir(0, -1);
	} else if (keyCode === DOWN_ARROW) {
		s.dir(0, 1);
	} else if (keyCode === RIGHT_ARROW) {
		s.dir(1, 0);
	} else if (keyCode === LEFT_ARROW) {
		s.dir(-1, 0);
	}
}
