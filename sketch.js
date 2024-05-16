let s;
let food;
let width = parseInt(localStorage.getItem("width"));
let height = parseInt(localStorage.getItem("height"));
let scl = parseInt(localStorage.getItem("scale"));
let topology = localStorage.getItem("topology");
let colorChessboard1 = 30;
let colorChessboard2 = 60;

function setup() {
	createCanvas(width, height);
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
	// create chessboard
	for (i = 0; i < width / scl; i++) {
		for (j = 0; j < height / scl; j++) {
			(i + j) % 2 == 0 ? fill(colorChessboard1) : fill(colorChessboard2);
			rect(i * scl, j * scl, scl, scl);
		}
	}

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
