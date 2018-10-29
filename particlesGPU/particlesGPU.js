const DAMPING = 0.995;
var renderer, scene, camera;
var particleSystem;
var particles = [];
var colors = ["#B80006", "#BF1607", "#C62D08", "#CD440A", "#D45A0B", "#DB710D", "#E2880E", "#E99E0F"]
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
		particles[i] = new Particle(Math.random() * 20 - 10 , Math.random() * 20 - 10, 0);
		geometry.vertices.push(
		new THREE.Vector3(particles[i].x, particles[i].y));
	}
	var material = new THREE.PointsMaterial({color: 0x7bc5d4, size: 0.01});
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
	this.speed = 0;
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
	/*if (this.x < 0)
	{
		this.x = 0;
		this.velocityX *= -0.1;
	}
	else if (this.x > width)
	{
		this.x = width;
		this.velocityX *= -0.1;
	}
	if (this.y < 0)
	{
		this.y = 0;
		this.velocityY *= -0.1;
	}
	else if (this.y > height)
	{
		this.y = height;
		this.velocityY *= -0.1;
	}*/
	this.x += this.velocityX;
	this.y += this.velocityY;
	/*if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 35)
		this.speed = 7;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 30)
		this.speed = 6;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 25)
		this.speed = 5;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 20)
		this.speed = 4;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 15)
		this.speed = 3;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 10)
		this.speed = 2;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 5)
		this.speed = 1;
	else
		this.speed = 0;*/
};

function draw() {
	requestAnimationFrame(draw);
	particleSystem.geometry.verticesNeedUpdate = true;
	for (var i = 0 ; i < particleSystem.geometry.vertices.length ; i++) {
		particles[i].attract(mouse.x, mouse.y);
		particleSystem.geometry.vertices[i].x = particles[i].x;
		particleSystem.geometry.vertices[i].y = particles[i].y;
	}
	renderer.render(scene, camera);
}

init();
draw();
