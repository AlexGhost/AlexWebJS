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

var students = [];

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
	camera.position.y = 0;
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
}

function createStudents() {
	let i = 0;
	let j = 0;

	while (j < 1) {
		for (let key in studentsJson) {
			let value = studentsJson[key];
			students[i] = new Student(key, value);
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
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

//MAIN
init();
createStudents();
loop();