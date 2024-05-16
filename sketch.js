let s;
let food;
let width = parseInt(sessionStorage.getItem("width"));
let height = parseInt(sessionStorage.getItem("height"));
let scl = parseInt(sessionStorage.getItem("scale"));
let topology = sessionStorage.getItem("topology");
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
			if ((i + j) % 2 == 0) {
				fill(colorChessboard1);
			} else {
				fill(colorChessboard2);
			}
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
	if (keyCode in dirs) {
		s.changeDirection(dirs[keyCode]);
	}
}
