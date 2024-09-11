"use strict";

document
	.getElementById("setupForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		const width = document.getElementById("width").value;
		const height = document.getElementById("height").value;
		const scale = document.getElementById("scale").value;
		let topology = document.querySelector(
			'input[name="topology"]:checked'
		).value;

		sessionStorage.setItem("width", width);
		sessionStorage.setItem("height", height);
		sessionStorage.setItem("scale", scale);
		sessionStorage.setItem("topology", topology);

		window.location.href = "snake.html"; // Redirect to snake.html
	});
