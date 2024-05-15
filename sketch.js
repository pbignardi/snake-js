let s;
let food;

//let pixelX = 600;
//let pixelY = 600;
//let scl = 20;
let pixelX = parseInt(localStorage.getItem("width"));
let pixelY = parseInt(localStorage.getItem("height"));
let scl = parseInt(localStorage.getItem("scale"));
console.log(`The number of pixels in x direction is: ${pixelX}`);
console.log(`The number of pixels in y direction is: ${pixelY}`);
console.log(`The scale value is: ${scl}`);
//let topology = localStorage.getItem("topology");
let colorChessboard1 = 30;
let colorChessboard2 = 60;

function setup() {
	createCanvas(pixelX, pixelY);
	s = new Snake();
	frameRate(10);
	pickLocation();
}

function pickLocation() {
	let cols = floor(width / scl);
	let rows = floor(height / scl);
	console.log(cols, rows);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}

function mousePressed() {
	s.total++;
}

function draw() {
	// create chessboard
	for (i = 0; i < pixelX / scl; i++) {
		for (j = 0; j < pixelY / scl; j++) {
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
