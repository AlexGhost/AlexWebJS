//THREEJS RELATED VARIABLES
var scene,
	camera,
	controls,
	fieldOfView,
	aspectRatio,
	nearPlane,
	farPlane,
	light,
	shadowLight,
	renderer,
	container;

//SCENE
var floor;

var cubes = [9];

//SCREEN VARIABLES
var HEIGHT,
	WIDTH,
	windowHalfX,
	windowHalfY,
	mousePos = {x:0,y:0};
	dist = 0;

//INIT THREE JS, SCREEN AND MOUSE EVENTS
function init() {
	scene = new THREE.Scene();
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 60;
	nearPlane = 1;
	farPlane = 2000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane);
	camera.position.z = 800;
	camera.position.y = 0;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMapEnabled = true;
	container = document.getElementById('world');
	container.appendChild(renderer.domElement);
	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;
	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('mousemove', handleMouseMove, false);
	/*document.addEventListener('mousedown', handleMouseDown, false);
	document.addEventListener('mouseup', handleMouseUp, false);*/
	document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchend', handleTouchEnd, false);
	document.addEventListener('touchmove',handleTouchMove, false);
}

//OBJECTS CREATION
function createLights() {
	light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5);
	shadowLight = new THREE.DirectionalLight(0xffffff, .8);
	shadowLight.position.set(200, 200, 200);
	shadowLight.castShadow = true;
	shadowLight.shadowDarkness = .2;

	scene.add(light);
	scene.add(shadowLight);
}

function createFloor(){
	floor = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1200,1000),
		new THREE.MeshBasicMaterial({color: 0xebe5e7})
	);
	floor.rotation.x = -Math.PI/2;
	floor.position.x = -350;
	floor.position.y = -300;
	floor.position.z = -400;
	floor.receiveShadow = true;
	scene.add(floor);
}

function createCubes() {
	cubes[0] = new Cube(0x4a994e, 0, 0, Math.random() * (2 - 0.5) + 0.5);
	cubes[1] = new Cube(0xad3525, -200, 0, Math.random() * (2 - 0.5) + 0.5);
	cubes[2] = new Cube(0x346ba3, 200, 0, Math.random() * (2 - 0.5) + 0.5);
	cubes[3] = new Cube(0xc1590f, 0, 200, Math.random() * (2 - 0.5) + 0.5);
	cubes[4] = new Cube(0xc451c6, 0, -200, Math.random() * (2 - 0.5) + 0.5);
	cubes[5] = new Cube(0x5e44dd, -200, 200, Math.random() * (2 - 0.5) + 0.5);
	cubes[6] = new Cube(0x232323, 200, 200, Math.random() * (2 - 0.5) + 0.5);
	cubes[7] = new Cube(0xf9e316, -200, -200, Math.random() * (2 - 0.5) + 0.5);
	cubes[8] = new Cube(0x774627, 200, -200, Math.random() * (2 - 0.5) + 0.5);

	var i = 0;
	while (i < cubes.length) {
		scene.add(cubes[i].threegroup);
		i++;
	}
}

//LOGIC FUNCTIONS
function loop(xTarget, yTarget) {
	var xTarget = (mousePos.x - windowHalfX);
	var yTarget= (mousePos.y - windowHalfY);

	cubes[0].look(xTarget, yTarget);

	//LOOK AT GREEN IF GREEN LOOK AT THEM
	if (xTarget < -150 && yTarget < 100 && yTarget > -100) {
		cubes[1].look(200, 1);
	} else {
		cubes[1].look(cubes[1].watchX, cubes[1].watchY);
	}
	if (xTarget > 150 && yTarget < 100 && yTarget > -100) {
		cubes[2].look(-200, 0);
	} else {
		cubes[2].look(cubes[2].watchX, cubes[2].watchY);
	}
	if (yTarget < -150 && xTarget < 100 && xTarget > -100) {
		cubes[3].look(0, 200);
	} else {
		cubes[3].look(cubes[3].watchX, cubes[3].watchY);
	}
	if (yTarget > 150 && xTarget < 100 && xTarget > -100) {
		cubes[4].look(0, -200);
	} else {
		cubes[4].look(cubes[4].watchX, cubes[4].watchY);
	}
	if (xTarget < -200 && yTarget < -100) {
		cubes[5].look(200, 200);
	} else {
		cubes[5].look(cubes[5].watchX, cubes[5].watchY);
	}
	if (xTarget > 200 && yTarget < -100) {
		cubes[6].look(-200, 200);
	} else {
		cubes[6].look(cubes[6].watchX, cubes[6].watchY);
	}
	if (xTarget < -200 && yTarget > 100) {
		cubes[7].look(200, -200);
	} else {
		cubes[7].look(cubes[7].watchX, cubes[7].watchY);
	}
	if (xTarget > 200 && yTarget > 100) {
		cubes[8].look(-200, -200);
	} else {
		cubes[8].look(cubes[8].watchX, cubes[8].watchY);
	}

	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

//MAIN
init();
createFloor();
createLights();
createCubes();
loop();
