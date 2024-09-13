"use strict";

export const gameSketch = (sketch) => {
	let s;
	let food;
	let width = parseInt(sessionStorage.getItem("width"));
	let height = parseInt(sessionStorage.getItem("height"));
	let scl = parseInt(sessionStorage.getItem("scale"));
	let colorChessboard1 = parseInt(sessionStorage.getItem("colorChessboard1"));
	let colorChessboard2 = parseInt(sessionStorage.getItem("colorChessboard2"));
	let cols = Math.floor(width / scl);
	let rows = Math.floor(height / scl);

	// setup function
	sketch.setup = () => {
		sketch.createCanvas(width, height);
		s = new Snake(sketch);
		sketch.frameRate(10);
		pickLocation();
	};

	// access to the position occupied by the snake
	let snakePosition = () => {
		let positions = [];
		positions.push([s.x / scl, s.y / scl]);
		for (let i = 0; i < s.tail.length; i++) {
			positions.push([s.tail[i].x / scl, s.tail[i].y / scl]);
		}
		return positions;
	};

	// pickLocation function for food
	let pickLocation = () => {
		food = sketch.createVector(
			Math.floor(Math.random() * cols),
			Math.floor(Math.random() * rows)
		);
		food.mult(scl);
	};

	// draw function
	sketch.draw = () => {
		// create chessboard
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				if ((i + j) % 2 == 0) {
					sketch.fill(colorChessboard1);
				} else {
					sketch.fill(colorChessboard2);
				}
				sketch.rect(i * scl, j * scl, scl, scl);
			}
		}

		if (s.eat(food)) {
			pickLocation();
		}
		s.death();
		s.update();
		s.show();
		sketch.fill(240, 113, 120);
		sketch.rect(food.x, food.y, scl, scl);

		// push position of snake to session storage
		sessionStorage.setItem("snakePosition", JSON.stringify(snakePosition()));
		// push food position to session storage
		sessionStorage.setItem(
			"foodPosition",
			JSON.stringify([food.x / scl, food.y / scl])
		);
	};

	// keyPressed function
	sketch.keyPressed = () => {
		if (sketch.keyCode in dirs) {
			s.changeDirection(dirs[sketch.keyCode]);
		}
	};
};
