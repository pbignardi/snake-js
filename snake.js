"use strict";
class Snake {
	#x;
	#y;
	#xspeed;
	#yspeed;
	#total;
	#tail;
	#directions = {
		'LEFT': [-1, 0],
		'RIGHT': [1, 0],
		'DOWN': [0, 1],
		'UP': [0, -1]
	};

	constructor() {
		console.log(topology);
		this.#x = 0;
		this.#y = 0;
		this.#xspeed = 1;
		this.#yspeed = 0;
		this.#total = 0;
		this.#tail = [];
	}

	// getters
	get x() { return this.#x }
	get y() { return this.#y }
	get xspeed() { return this.#xspeed }
	get yspeed() { return this.#yspeed }
	get total() { return this.#total }
	get tail() { return this.#tail }
	get directions() { return this.#directions }

	// setters
	set xspeed(xspeed) { if(abs(xspeed) <= 1) { this.#xspeed = xspeed; } }
	set yspeed(yspeed) { if(abs(yspeed) <= 1) { this.#yspeed = yspeed; } }

	// methods
	eat(pos) {
		let d = dist(this.x, this.y, pos.x, pos.y);
		if (d < 1) { this.#total++; return true; }
		else { return false; }
	}

	dir(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	death() {
		for (let i = 0; i < this.tail.length; i++) {
			let pos = this.tail[i];
			let d = dist(this.x, this.y, pos.x, pos.y);
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
		window.location.href = "setup.html";
	}

	update() {
		this.#tail.unshift(createVector(this.x, this.y));
		this.#tail = this.tail.slice(0, this.total);

		this.#x = this.x + this.xspeed * scl;
		this.#y = this.y + this.yspeed * scl;

		switch (topology) {
			case "square":
				// Square topology
				this.#x = constrain(this.x, 0, width - scl);
				this.#y = constrain(this.y, 0, height - scl);
				break;
			case "cylinder":
				// Cylinder topology
				this.#x = this.x >= 0 ? this.x % width : width - scl;
				this.#y = constrain(this.y, 0, height - scl);
				break;
			case "mobius":
				// Mobius strip topology
				let tmp_x = this.x >= 0 ? this.x % width : width - scl;
				if (tmp_x === this.x) {
					this.#y = constrain(this.y, 0, height - scl);
					this.#x = tmp_x;
				} else {
					this.#x = tmp_x;
					this.#y = height - scl - this.y;
				}
				break;
			case "torus":
				// Torus topology
				this.#x = this.x >= 0 ? this.x % width : width - scl;
				this.#y = this.y >= 0 ? this.y % height : height - scl;
				break;
			case "klein":
				// Klein bottle topology
				let tmp_y = this.y >= 0 ? this.y % height : height - scl;
				if (tmp_y === this.y) {
					this.#x = this.x >= 0 ? this.x % width : width - scl;
					this.#y = tmp_y;
				} else {
					this.#y = tmp_y;
					this.#x = width - scl - this.x;
				}
				break;
			default:
				console.log("Topology not found");
				break;
		}
	}

	show() {
		fill(255);
		for (let i = 0; i < this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		rect(this.x, this.y, scl, scl);
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
