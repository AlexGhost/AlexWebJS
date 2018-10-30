var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
document.getElementById('display').appendChild(renderer.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 100;
scene.add(camera);

// create the particle variables
var particleCount = 100000,
	particles = new THREE.Geometry(),
	pMaterial = new THREE.PointsMaterial({
	color: 0xFFFFFF,
	size: 0.3,
	/*map: THREE.ImageUtils.loadTexture(
		"images/particle.png"),
		blending: THREE.AdditiveBlending,
		transparent: true*/
});

// now create the individual particles
for (var p = 0; p < particleCount; p++) {
	// create a particle with random
	// position values, -250 -> 250
	var pX = Math.random() * 200 - 100,
		pY = Math.random() * 200 - 100,
		pZ = Math.random() * 200 - 100,
		particle = new THREE.Vector3(pX, pY, pZ);
	// create a velocity vector
	particle.velocity = new THREE.Vector3(0, -Math.random(), 0);
	// add it to the geometry
	particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.Points(
	particles,
	pMaterial);

particleSystem.sortParticles = true;

// add it to the scene
scene.add(particleSystem);

// animation loop
function update() {

	// add some rotation to the system
	particleSystem.rotation.y += 0.0001;

	var pCount = particleCount;
	while (pCount--) {

	// get the particle
	var particle = particles.vertices[pCount];

	// check if we need to reset
	if (particle.y < -100) {
		particle.y = 100;
		particle.velocity.y = 0;
	}

	// update the velocity with
	// a splat of randomniz
	particle.velocity.y -= Math.random() * .1;

	// and the position
	particle.add(particle.velocity);
	}

	// flag to the particle system
	// that we've changed its vertices.
	particleSystem.geometry.verticesNeedUpdate = true;

	// draw
	renderer.render(scene, camera);

	// set up the next call
	requestAnimationFrame(update);
}

update();
