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
var floor,
	redCube, blueCube, greenCube,
	orangeCube, pinkCube,
	purpleCube, blackCube, goldCube, brownCube;

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
	camera.lookAt(new THREE.Vector3(0,0,0));
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
		//new THREE.MeshBasicMaterial({color: 0xff0000})
	);
	floor.rotation.x = -Math.PI/2;
	floor.position.x = -350;
	floor.position.y = -300;
	floor.position.z = -400;
	floor.receiveShadow = true;
	scene.add(floor);
}

function createCubes() {
	redCube = new Cube(0xad3525, -200, 0, Math.random() * (2 - 0.5) + 0.5);
	greenCube = new Cube(0x4a994e, 0, 0, Math.random() * (2 - 0.5) + 0.5);
	blueCube = new Cube(0x346ba3, 200, 0, Math.random() * (2 - 0.5) + 0.5);
	orangeCube = new Cube(0xc1590f, 0, 200, Math.random() * (2 - 0.5) + 0.5);
	pinkCube = new Cube(0xc451c6, 0, -200, Math.random() * (2 - 0.5) + 0.5);
	purpleCube = new Cube(0x5e44dd, -200, 200, Math.random() * (2 - 0.5) + 0.5);
	blackCube = new Cube(0x232323, 200, 200, Math.random() * (2 - 0.5) + 0.5);
	goldCube = new Cube(0xf9e316, -200, -200, Math.random() * (2 - 0.5) + 0.5);
	brownCube = new Cube(0x774627, 200, -200, Math.random() * (2 - 0.5) + 0.5);
	scene.add(redCube.threegroup);
	scene.add(greenCube.threegroup);
	scene.add(blueCube.threegroup);
	scene.add(orangeCube.threegroup);
	scene.add(pinkCube.threegroup);
	scene.add(purpleCube.threegroup);
	scene.add(blackCube.threegroup);
	scene.add(goldCube.threegroup);
	scene.add(brownCube.threegroup);
}

//LOGIC FUNCTIONS
function loop(xTarget, yTarget) {
	var xTarget = (mousePos.x - windowHalfX);
	var yTarget= (mousePos.y - windowHalfY);

	greenCube.look(xTarget, yTarget);

	//LOOK AT GREEN IF GREEN LOOK AT THEM
	if (yTarget < -150 && xTarget < 100 && xTarget > -100) {
		orangeCube.look(0, 200);
	} else {
		orangeCube.look(orangeCube.watchX, orangeCube.watchY);
	}
	if (yTarget > 150 && xTarget < 100 && xTarget > -100) {
		pinkCube.look(0, -200);
	} else {
		pinkCube.look(pinkCube.watchX, pinkCube.watchY);
	}
	if (xTarget < -150 && yTarget < 100 && yTarget > -100) {
		redCube.look(200, 0);
	} else {
		redCube.look(redCube.watchX, redCube.watchY);
	}
	if (xTarget > 150 && yTarget < 100 && yTarget > -100) {
		blueCube.look(-200, 0);
	} else {
		blueCube.look(blueCube.watchX, blueCube.watchY);
	}
	if (xTarget > 200 && yTarget < -100) {
		blackCube.look(-200, 200);
	} else {
		blackCube.look(blackCube.watchX, blackCube.watchY);
	}
	if (xTarget < -200 && yTarget < -100) {
		purpleCube.look(200, 200);
	} else {
		purpleCube.look(purpleCube.watchX, purpleCube.watchY);
	}
	if (xTarget > 200 && yTarget > 100) {
		brownCube.look(-200, -200);
	} else {
		brownCube.look(brownCube.watchX, brownCube.watchY);
	}
	if (xTarget < -200 && yTarget > 100) {
		goldCube.look(200, -200);
	} else {
		goldCube.look(goldCube.watchX, goldCube.watchY);
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
