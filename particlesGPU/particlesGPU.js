const DAMPING = 0.995;
var renderer, scene, camera;
var particleSystem;
var particles = [];
var mouse = {x: 0, y: 0};

function init() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
	document.getElementById('display').appendChild(renderer.domElement);
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 100;
	scene.add(camera);
	var geometry = new THREE.Geometry();
	for (var i = 0 ; i < 1000000 ; i++) {
		particles[i] = new Particle(Math.random() * 100 - 50 , Math.random() * 100 - 50, 0);
		geometry.vertices.push(
		new THREE.Vector3(particles[i].x, particles[i].y));
	}
	var material = new THREE.PointsMaterial({color: 0x7bc5d4, size: 0.001});
	particleSystem = new THREE.Points(geometry, material);
	scene.add(particleSystem);
}

display.addEventListener("mousemove", onMousemove);

function onMousemove(e) {
	mouse.x = (e.clientX - (window.innerWidth * 0.5)) * 0.05;
	mouse.y = (-e.clientY + (window.innerHeight * 0.5)) * 0.05;
}

function Particle(x, y) {
	this.x = this.oldX = x;
	this.y = this.oldY = y;
}

Particle.prototype.attract = function(x, y) {
	var dx = x - this.x;
	var dy = y - this.y;
	var distance = Math.sqrt(dx * dx + dy * dy) * 5;
	this.x += dx / distance;
	this.y += dy / distance;
	this.velocityX = (this.x - this.oldX) * DAMPING;
	this.velocityY = (this.y - this.oldY) * DAMPING;
	this.oldX = this.x;
	this.oldY = this.y;
	this.x += this.velocityX;
	this.y += this.velocityY;
};

function draw() {
	requestAnimationFrame(draw);
	particleSystem.geometry.verticesNeedUpdate = true;
	for (var i = 0 ; i < particleSystem.geometry.vertices.length ; i++) {
		particles[i].attract(mouse.x, mouse.y);
		particleSystem.geometry.vertices[i].set(particles[i].x, particles[i].y, 0);
	}
	renderer.render(scene, camera);
}

init();
draw();
