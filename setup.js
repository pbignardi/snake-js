"use strict";

document.addEventListener("DOMContentLoaded", function () {
	document
		.getElementById("setupForm")
		.addEventListener("submit", function (event) {
			event.preventDefault();

			// Get the values from the form
			const width = document.getElementById("width").value;
			const height = document.getElementById("height").value;
			const scale = document.getElementById("scale").value;
			sessionStorage.setItem("width", width);
			sessionStorage.setItem("height", height);
			sessionStorage.setItem("scale", scale);

			// Get the selected topology
			let topologyElement = document.querySelector(
				'input[name="topology"]:checked'
			);
			if (topologyElement) {
				let topology = topologyElement.value;
				sessionStorage.setItem("topology", topology);
			} else {
				console.error("No topology selected");
				return;
			}

			// Choose the colors for the chessboard
			sessionStorage.setItem("colorChessboard1", 90);
			sessionStorage.setItem("colorChessboard2", 45);

			window.location.href = "snake.html"; // Redirect to snake.html
		});
});
