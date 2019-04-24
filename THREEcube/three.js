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

function onWindowResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

//EVENTS
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

Cube = function(color, posX, posY, reactionTime) {
	this.threegroup = new THREE.Group();

	this.posX = posX;
	this.posY = posY;
	this.reactionTime = reactionTime;
	this.twitchTime = reactionTime * 0.33;

	this.timer = 0;
	this.timerTwitch = 0;
	this.watchX = 0;
	this.watchY = 0;
	this.eyeTwitchX = 0;
	this.eyeTwitchY = 0;

	this.bodyMat = new THREE.MeshLambertMaterial({
		color: color,
		shading:THREE.FlatShading
	});
	this.eyeBallMat = new THREE.MeshBasicMaterial({
		color: 0xffffff
	});
	this.eyeMat = new THREE.MeshBasicMaterial({
		color: 0x000000
	});
	this.mouthMat = new THREE.MeshLambertMaterial({
		color: 0x555555,
		shading:THREE.FlatShading
	});

	var bodyGeom = new THREE.BoxGeometry(80, 80, 80);
	this.body = new THREE.Mesh(bodyGeom, this.bodyMat);

	var eyeBallGeom = new THREE.BoxGeometry(20, 20, 10);
	this.eyeBall1 = new THREE.Mesh(eyeBallGeom, this.eyeBallMat);
	this.eyeBall1.position.x = -15;
	this.eyeBall1.position.y = 15;
	this.eyeBall1.position.z = 40;
	this.eyeBall2 = new THREE.Mesh(eyeBallGeom, this.eyeBallMat);
	this.eyeBall2.position.x = 15;
	this.eyeBall2.position.y = 15;
	this.eyeBall2.position.z = 40;

	var eyeGeom = new THREE.BoxGeometry(5, 5, 5);
	this.eye1 = new THREE.Mesh(eyeGeom, this.eyeMat);
	this.eye1.position.x = -15;
	this.eye1.position.y = 15;
	this.eye1.position.z = 44;
	this.eye2 = new THREE.Mesh(eyeGeom, this.eyeMat);
	this.eye2.position.x = 15;
	this.eye2.position.y = 15;
	this.eye2.position.z = 44;

	var mouthGeom = new THREE.BoxGeometry(20, 10, 10);
	this.mouth = new THREE.Mesh(mouthGeom, this.mouthMat);
	this.mouth.position.y = -20;
	this.mouth.position.z = 40;

	this.threegroup.add(this.body);
	this.threegroup.add(this.eyeBall1);
	this.threegroup.add(this.eye1);
	this.threegroup.add(this.eyeBall2);
	this.threegroup.add(this.eye2);
	this.threegroup.add(this.mouth);
	this.threegroup.traverse(function(object) {
		if (object instanceof THREE.Mesh) {
			object.castShadow = true;
			object.receiveShadow = true;
		}
	});
	this.threegroup.position.x = posX;
	this.threegroup.position.y = posY;
}

Cube.prototype.look = function(xTarget, yTarget) {
	var tHeagRotY = rule3(xTarget, -200, 200, -Math.PI / 4, Math.PI / 4);
	var tHeadRotX = rule3(yTarget, -200,200, -Math.PI / 4, Math.PI / 4);
	var tHeadPosX = (rule3(xTarget, -200, 200, 70, -70) * 0.5) + this.posX;
	var tHeadPosY = (rule3(yTarget, -140, 260, 20, 100) * 0.5) + this.posY;
	var tEye1PosX = (rule3(xTarget, -200, 200, -45, -15) * 0.5) + this.eyeTwitchX;
	var tEye1PosY = (rule3(yTarget, -200, 200, 45, 15) * 0.5) + this.eyeTwitchY;
	var tEye2PosX = (rule3(xTarget, -200, 200, 15, 45) * 0.5) + this.eyeTwitchX;
	var tEye2PosY = (rule3(yTarget, -200, 200, 45, 15) * 0.5) + this.eyeTwitchY;
	this.threegroup.rotation.y += (tHeagRotY - this.threegroup.rotation.y) / 10;
	this.threegroup.rotation.x += (tHeadRotX - this.threegroup.rotation.x) / 10;
	this.threegroup.position.x += (tHeadPosX - this.threegroup.position.x) / 20;
	this.threegroup.position.y += (tHeadPosY - this.threegroup.position.y) / 20;
	this.eye1.position.x += (tEye1PosX - this.eye1.position.x) / 10;
	this.eye1.position.y += (tEye1PosY - this.eye1.position.y) / 10;
	this.eye2.position.x += (tEye2PosX - this.eye2.position.x) / 10;
	this.eye2.position.y += (tEye2PosY - this.eye2.position.y) / 10;

	if (this.timer > 0) {
		this.timer -= 0.01;
	} else {
		this.timer = this.reactionTime
		this.thinkLook();
	}
	if (this.timerTwitch > 0) {
		this.timerTwitch -= 0.01;
	} else {
		this.timerTwitch = this.twitchTime
		this.eyeTwitchX = Math.random() * (2 + 2) - 2;
		this.eyeTwitchY = Math.random() * (2 + 2) - 2;
	}
}

Cube.prototype.thinkLook = function() {
	this.watchX = Math.random() * (100 + 100) - 100;
	this.watchY = Math.random() * (100 + 100) - 100;
}

//LOGIC FUNCTIONS
function loop(xTarget, yTarget) {
	var xTarget = (mousePos.x - windowHalfX);
	var yTarget= (mousePos.y - windowHalfY);

	greenCube.look(xTarget, yTarget);

	//LOOK AT GREEN IF GREEN LOOK AT THEM
	if (yTarget < -150 && xTarget < 100 && xTarget > -100) {
		orangeCube.look(0, 200);
		console.log('up');
	} else {
		orangeCube.look(orangeCube.watchX, orangeCube.watchY);
	}
	if (yTarget > 150 && xTarget < 100 && xTarget > -100) {
		pinkCube.look(0, -200);
		console.log('down');
	} else {
		pinkCube.look(pinkCube.watchX, pinkCube.watchY);
	}
	if (xTarget < -150 && yTarget < 100 && yTarget > -100) {
		redCube.look(200, 0);
		console.log('left');
	} else {
		redCube.look(redCube.watchX, redCube.watchY);
	}
	if (xTarget > 150 && yTarget < 100 && yTarget > -100) {
		blueCube.look(-200, 0);
		console.log('right');
	} else {
		blueCube.look(blueCube.watchX, blueCube.watchY);
	}
	if (xTarget > 200 && yTarget < -100) {
		blackCube.look(-200, 200);
		console.log('upright');
	} else {
		blackCube.look(blackCube.watchX, blackCube.watchY);
	}
	if (xTarget < -200 && yTarget < -100) {
		purpleCube.look(200, 200);
		console.log('upleft');
	} else {
		purpleCube.look(purpleCube.watchX, purpleCube.watchY);
	}
	if (xTarget > 200 && yTarget > 100) {
		brownCube.look(-200, -200);
		console.log('downright');
	} else {
		brownCube.look(brownCube.watchX, brownCube.watchY);
	}
	if (xTarget < -200 && yTarget > 100) {
		goldCube.look(200, -200);
		console.log('downleft');
	} else {
		goldCube.look(goldCube.watchX, goldCube.watchY);
	}

	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

//UTILS
function clamp(v, min, max) {
	return Math.min(Math.max(v, min), max);
}

function rule3(v, vmin, vmax, tmin, tmax) {
	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;
}

//MAIN
init();
createFloor();
createLights();
createCubes();
loop();
