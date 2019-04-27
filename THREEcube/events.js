function onWindowResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

function handleMouseMove(event) {
	mousePos = {x:event.clientX, y:event.clientY};
}

/*function handleMouseDown(event) {
}

function handleMouseUp(event) {
}*/

function handleTouchStart(event) {
	if (event.touches.length > 1) {
		event.preventDefault();
		mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
	}
}

function handleTouchEnd(event) {
	mousePos = {x:windowHalfX, y:windowHalfY};
}

function handleTouchMove(event) {
	if (event.touches.length == 1) {
		event.preventDefault();
		mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
	}
}
