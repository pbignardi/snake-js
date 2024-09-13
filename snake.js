"use strict";

class Snake {
	#sketch;
	#x;
	#y;
	#xspeed;
	#yspeed;
	#total;
	#tail;
	#topology; // Declare the private field '#topology' in the class 'Snake'
	#scl;
	#height;
	#width;
	#directions = {
		LEFT: [-1, 0],
		RIGHT: [1, 0],
		DOWN: [0, 1],
		UP: [0, -1],
	};

	constructor(sketch) {
		this.#sketch = sketch;
		this.#x = 0;
		this.#y = 0;
		this.#xspeed = 1;
		this.#yspeed = 0;
		this.#total = 0;
		this.#tail = [];
		this.#topology = sessionStorage.getItem("topology"); // Initialize the private field '#topology'
		this.#scl = parseInt(sessionStorage.getItem("scale"));
		this.#height = parseInt(sessionStorage.getItem("height"));
		this.#width = parseInt(sessionStorage.getItem("width"));
	}

	// getters
	get sketch() {
		return this.#sketch;
	}
	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get xspeed() {
		return this.#xspeed;
	}
	get yspeed() {
		return this.#yspeed;
	}
	get total() {
		return this.#total;
	}
	get tail() {
		return this.#tail;
	}
	get directions() {
		return this.#directions;
	}
	get topology() {
		return this.#topology;
	}
	get scl() {
		return this.#scl;
	}
	get height() {
		return this.#height;
	}
	get width() {
		return this.#width;
	}

	// setters
	set xspeed(xspeed) {
		if (Math.abs(xspeed) <= 1) {
			this.#xspeed = xspeed;
		}
	}
	set yspeed(yspeed) {
		if (Math.abs(yspeed) <= 1) {
			this.#yspeed = yspeed;
		}
	}

	eat(pos) {
		let d = this.sketch.dist(this.x, this.y, pos.x, pos.y);
		if (d < 1) {
			this.#total++;
			return true;
		} else {
			return false;
		}
	}

	dir(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	death() {
		for (let i = 0; i < this.tail.length; i++) {
			let pos = this.tail[i];
			let d = this.sketch.dist(this.x, this.y, pos.x, pos.y);
			if (d < 1) {
				console.log("starting over");
				this.reset();
			}
		}
	}

	reset() {
		this.#x = 0;
		this.#y = 0;
		this.#xspeed = 1;
		this.#yspeed = 0;
		this.#total = 0;
		this.#tail = [];
		sessionStorage.clear();
		window.location.href = "setup.html";
	}

	update() {
		this.#tail.unshift(this.sketch.createVector(this.x, this.y));
		this.#tail = this.tail.slice(0, this.total);

		this.#x = this.x + this.xspeed * this.scl;
		this.#y = this.y + this.yspeed * this.scl;

		switch (this.topology) {
			case "square":
				// Square topology
				this.#x = this.sketch.constrain(this.x, 0, this.width - this.scl);
				this.#y = this.sketch.constrain(this.y, 0, this.height - this.scl);
				break;
			case "cylinder":
				// Cylinder topology
				this.#x = this.x >= 0 ? this.x % this.width : this.width - this.scl;
				this.#y = this.sketch.constrain(this.y, 0, this.height - this.scl);
				break;
			case "moebius":
				// Moebius strip topology
				let tmp_x = this.x >= 0 ? this.x % this.width : this.width - this.scl;
				if (tmp_x === this.x) {
					this.#y = this.sketch.constrain(this.y, 0, this.height - this.scl);
					this.#x = tmp_x;
				} else {
					this.#x = tmp_x;
					this.#y = this.height - this.scl - this.y;
				}
				break;
			case "torus":
				// Torus topology
				this.#x = this.x >= 0 ? this.x % this.width : this.width - this.scl;
				this.#y = this.y >= 0 ? this.y % this.height : this.height - this.scl;
				break;
			case "klein":
				// Klein bottle topology
				let tmp_y = this.y >= 0 ? this.y % this.height : this.height - this.scl;
				if (tmp_y === this.y) {
					this.#x = this.x >= 0 ? this.x % this.width : this.width - this.scl;
					this.#y = tmp_y;
				} else {
					this.#y = tmp_y;
					this.#x = this.width - this.scl - this.x;
				}
				break;
			default:
				console.log("Topology not found");
				break;
		}
	}

	show() {
		this.sketch.fill(195, 232, 141);
		for (let i = 0; i < this.tail.length; i++) {
			this.sketch.rect(this.tail[i].x, this.tail[i].y, this.scl, this.scl);
		}
		this.sketch.rect(this.x, this.y, this.scl, this.scl);
	}

	changeDirection(dir) {
		let x, y;
		[x, y] = this.directions[dir];
		// allow only 90degs turns
		if (this.xspeed * x >= 0 && this.yspeed * y >= 0) {
			this.dir(x, y);
		}
	}
}
