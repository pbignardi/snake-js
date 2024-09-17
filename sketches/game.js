"use strict";

export const gameSketch = (sketch) => {
	let s;
	let food;
	let width = parseInt(sessionStorage.getItem("width"));
	let height = parseInt(sessionStorage.getItem("height"));
	let scl = parseInt(sessionStorage.getItem("scale"));
	let topology = sessionStorage.getItem("topology");
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
		if (!s.isDeath()) {
			s.death();
			s.update();
			s.show();
			drawIdentification();

			// Draw food
			sketch.fill(240, 113, 120);
			sketch.rect(food.x, food.y, scl, scl);

			// push position of snake to session storage
			sessionStorage.setItem("snakePosition", JSON.stringify(snakePosition()));
			// push food position to session storage
			sessionStorage.setItem(
				"foodPosition",
				JSON.stringify([food.x / scl, food.y / scl])
			);
		}
	};

	// keyPressed function
	sketch.keyPressed = () => {
		if (sketch.keyCode in dirs) {
			s.changeDirection(dirs[sketch.keyCode]);
		}
	};

	let drawIdentification = () => {
		// Add gradient for identification
		sketch.strokeWeight(10);
		let startColor_1 = sketch.color(255, 203, 107);
		let endColor_1 = sketch.color(255, 83, 112);
		let startColor_2 = sketch.color(195, 232, 141);
		let endColor_2 = sketch.color(130, 170, 255);
		let offset = 2;

		switch (topology) {
			case "square":
				// Square topology no identification needed
				break;
			case "cylinder":
				// Cylinder topology
				for (let i = 0; i < rows; i++) {
					// vertical lines
					let inter = sketch.map(i, 0, rows, 0, 1);
					let gradientColor = sketch.lerpColor(startColor_1, endColor_1, inter);
					sketch.stroke(gradientColor);

					sketch.line(-offset, scl * i, -offset, scl * (i + 1));
					sketch.line(
						scl * cols + offset,
						scl * i,
						scl * cols + offset,
						scl * (i + 1)
					);
				}
				break;
			case "torus":
				// Torus topology
				for (let i = 0; i < rows; i++) {
					// vertical lines
					let inter = sketch.map(i, 0, rows, 0, 1);

					let gradientColor = sketch.lerpColor(startColor_1, endColor_1, inter);
					sketch.stroke(gradientColor);
					sketch.line(-offset, scl * i, -offset, scl * (i + 1));
					sketch.line(
						scl * cols + offset,
						scl * i,
						scl * cols + offset,
						scl * (i + 1)
					);
				}
				for (let i = 0; i < cols; i++) {
					// horizontal lines
					let inter = sketch.map(i, 0, cols, 0, 1);

					let gradientColor = sketch.lerpColor(startColor_2, endColor_2, inter);
					sketch.stroke(gradientColor);
					sketch.line(scl * i, -offset, scl * (i + 1), -offset);
					sketch.line(
						scl * i,
						scl * rows + offset,
						scl * (i + 1),
						scl * rows + offset
					);
				}
				break;
			case "moebius":
				// Moebius topology
				for (let i = 0; i < rows; i++) {
					// vertical lines
					let inter = sketch.map(i, 0, rows, 0, 1);

					let gradientColor = sketch.lerpColor(startColor_1, endColor_1, inter);
					sketch.stroke(gradientColor);
					sketch.line(-1, scl * i, -1, scl * (i + 1));

					gradientColor = sketch.lerpColor(endColor_1, startColor_1, inter);
					sketch.stroke(gradientColor);
					sketch.line(scl * cols + 1, scl * i, scl * cols + 1, scl * (i + 1));
				}
				break;
			case "klein":
				// Klein topology
				for (let i = 0; i < rows; i++) {
					// vertical lines
					let inter = sketch.map(i, 0, rows, 0, 1);
					let gradientColor = sketch.lerpColor(startColor_1, endColor_1, inter);
					sketch.stroke(gradientColor);

					sketch.line(-offset, scl * i, -offset, scl * (i + 1));
					sketch.line(
						scl * cols + offset,
						scl * i,
						scl * cols + offset,
						scl * (i + 1)
					);
				}
				for (let i = 0; i < cols; i++) {
					// horizontal lines
					let inter = sketch.map(i, 0, cols, 0, 1);

					let gradientColor = sketch.lerpColor(startColor_2, endColor_2, inter);
					sketch.stroke(gradientColor);
					sketch.line(scl * i, -offset, scl * (i + 1), -offset);
					gradientColor = sketch.lerpColor(endColor_2, startColor_2, inter);
					sketch.stroke(gradientColor);
					sketch.line(
						scl * i,
						scl * rows + offset,
						scl * (i + 1),
						scl * rows + offset
					);
				}
				break;
			default:
				console.error(`Unknown topology: ${topology}`);
		}

		// reset stroke weight and stroke color
		sketch.strokeWeight(1);
		sketch.stroke("black");
	};
};
