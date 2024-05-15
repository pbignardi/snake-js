class Food {
	#x;
	#y;
	#cols = floor(width / scl);
	#rows = floor(height / scl);

	constructor() {
		this.#x = scl * floor(random(this.#cols));
		this.#y = scl * floor(random(this.#rows));
	}
	// getter setter
	get x() { return this.#x; }
	get y() { return this.#y; }
	get pos() { return createVector(this.x, this.y); }
}
