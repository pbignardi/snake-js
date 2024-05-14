"use strict";
class Snake {
	#x;
	#y;
	#xspeed;
	#yspeed;
	#total;
	#tail;

	constructor() {
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
	}

	update() {
		this.#tail.unshift(createVector(this.x, this.y));
		this.#tail = this.tail.slice(0, this.total);

		this.#x = this.x + this.xspeed * scl;
		this.#y = this.y + this.yspeed * scl;

		this.#x = constrain(this.x, 0, width - scl);
		this.#y = constrain(this.y, 0, height - scl);
	}

	show() {
		fill(255);
		for (let i = 0; i < this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		rect(this.x, this.y, scl, scl);
	}

}
