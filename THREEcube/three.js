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
var floor, cube;

//SCREEN VARIABLES

var HEIGHT,
	WIDTH,
	windowHalfX,
	windowHalfY,
	mousePos = {x:0,y:0};
	dist = 0;

	//INIT THREE JS, SCREEN AND MOUSE EVENTS

function init(){
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
	document.addEventListener('mousedown', handleMouseDown, false);
	document.addEventListener('mouseup', handleMouseUp, false);
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

function handleMouseMove(event) {
	mousePos = {x:event.clientX, y:event.clientY};
}

function handleMouseDown(event) {
	//isBlowing = true;
}
function handleMouseUp(event) {
	//isBlowing = false;
}

function handleTouchStart(event) {
	if (event.touches.length > 1) {
		event.preventDefault();
		mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
		//isBlowing = true;
	}
}

function handleTouchEnd(event) {
	mousePos = {x:windowHalfX, y:windowHalfY};
	//isBlowing = false;
}

function handleTouchMove(event) {
	if (event.touches.length == 1) {
		event.preventDefault();
		mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
		//isBlowing = true;
	}
}

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
		new THREE.PlaneBufferGeometry(1000,500),
		new THREE.MeshBasicMaterial({color: 0xebe5e7})
	);
	floor.rotation.x = -Math.PI/2;
	floor.position.y = -100;
	floor.receiveShadow = true;
	scene.add(floor);
}

function createCube() {
	cube = new Cube();
	scene.add(cube.threegroup);
}

Cube = function() {
	this.threegroup = new THREE.Group();
	this.mat = new THREE.MeshLambertMaterial({
		color: 0xad3525,
		shading:THREE.FlatShading
	});

	var bodyGeom = new THREE.BoxGeometry(80, 80, 80);
	this.body = new THREE.Mesh(bodyGeom, this.mat);

	this.threegroup.add(this.body);
	this.threegroup.traverse(function(object) {
		if (object instanceof THREE.Mesh) {
			object.castShadow = true;
			object.receiveShadow = true;
		}
	});
}

Cube.prototype.loop = function() {
	this.body.rotation.y += .01;
	this.body.rotation.x += .02;
}

function loop() {
	render();
	cube.loop();
	requestAnimationFrame(loop);
}

function render() {
	renderer.render(scene, camera);
}

init();
createFloor();
createLights();
createCube();
loop();
