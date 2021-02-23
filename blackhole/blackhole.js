const studentsJson = {
	"acourtin": 1,
	"rfautier": 2,
	"alerandy": 3,
	"tlernoul": 4,
	"gsmith": 5,
	"esuits": 6,
	"fle-roy": 7,
	"lolivet": 8,
	"roddavid": 9,
	"baudiber": 10,
	"ehouzard": 11,
	"aleduc": 12,
	"cbesse": 13,
	"charly": 14,
	"norminet": 15,
}

const numOnOrbit = {
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
	6: 0,
	7: 0,
	8: 0,
	9: 0,
	10: 0,
	11: 0,
	12: 0,
	13: 0,
	14: 0,
	15: 0,
}

window.addEventListener('click', onDocumentMouseDown, false);

function onWindowResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

//THREEJS RELATED VARIABLES
var scene,
	camera,
	fieldOfView,
	aspectRatio,
	nearPlane,
	farPlane,
	renderer,
	container;

//SCENE
var floor;

var students = [];
var particleSystem;
var particles = [];

//SCREEN VARIABLES
var HEIGHT,
	WIDTH,
	windowHalfX,
	windowHalfY,
	dist = 0;

var date;

//INIT THREE JS, SCREEN AND MOUSE EVENTS
function init() {
	scene = new THREE.Scene();
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 50;
	nearPlane = 1;
	farPlane = 2000;
	camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio,
		nearPlane, farPlane);
	camera.position.z = 800;
	camera.position.y = -500;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	renderer = new THREE.WebGLRenderer({alpha: true, antialias: false });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMapEnabled = true;
	container = document.getElementById('world');
	container.appendChild(renderer.domElement);
	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;
	window.addEventListener('resize', onWindowResize, false);

	blackholeGroup = new THREE.Group();

	blackholeBody = new THREE.Mesh(
		new THREE.SphereGeometry( 50, 10, 10 ),
		new THREE.MeshBasicMaterial({
			color: 0x000000
		})
	);
	blackholeBody.receiveShadow = false;
	blackholeGroup.add(blackholeBody);
	scene.add(blackholeGroup);

	var geometry = new THREE.Geometry();
	for (var i = 0 ; i < 20000 ; i++) {
		particles[i] = new Particle(i);
		geometry.vertices.push(
		new THREE.Vector3(particles[i].x, particles[i].y));
	}
	var material = new THREE.PointsMaterial({color: 0xffffff, size: 2});
	particleSystem = new THREE.Points(geometry, material);
	scene.add(particleSystem);
}

function createStudents() {
	let i = 0;
	let j = 0;
	while (j < 20) {
		for (let key in studentsJson) {
			let value = studentsJson[key];
			students[i] = new Student(key, value, numOnOrbit[value]);
			numOnOrbit[value] += 1;
			scene.add(students[i].threegroup);
			i++;
		}
	j++;
	}
}

//LOGIC FUNCTIONS
function loop() {
	students.forEach((stu) => {
		stu.move();
	});
	particleSystem.geometry.verticesNeedUpdate = true;
	for (var i = 0 ; i < particleSystem.geometry.vertices.length ; i++) {
		particles[i].move();
		particleSystem.geometry.vertices[i].set(particles[i].x, particles[i].y, -10);
	}
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onDocumentMouseDown( event ) {
event.preventDefault();
mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
raycaster.setFromCamera( mouse, camera );
var intersects = raycaster.intersectObjects( students.map((s) => {return s.threegroup.children[0]}) );
if ( intersects.length > 0 ) {
	students.forEach((s) => {
		if (intersects[0].object.parent == s.threegroup) {
			const url = 'https://profile.intra.42.fr/users/' + s.name;
			window.open(url);
		}
	});
}}

//MAIN
init();
createStudents();
loop();
