document
	.getElementById("setupForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		const width = document.getElementById("width").value;
		const height = document.getElementById("height").value;
		const scale = document.getElementById("scale").value;
		//const topology = document.querySelector(
		//'input[name="topology"]:checked'
		//).value;

		localStorage.setItem("width", width);
		localStorage.setItem("height", height);
		localStorage.setItem("scale", scale);
		//localStorage.setItem("topology", topology);

		window.location.href = "snake.html";
	});
