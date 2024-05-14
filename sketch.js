let s;
let scl = 20;
let food;

function setup() {
	createCanvas(600, 600);
	s = new Snake();
	frameRate(10);
	pickLocation();
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
	if (s.eat(food)) {
		pickLocation();
	}
	s.death();
	s.update();
	s.show();
	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);
}

function keyPressed() {
	if (keyCode in dirs) {
		s.changeDirection(dirs[keyCode]);
	}
}
