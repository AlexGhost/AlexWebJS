function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

Student = function(name, intValue, offset) {
	this.threegroup = new THREE.Group();

	this.intValue = intValue;
	this.r = 60 + (this.intValue * 45);
	this.theta = 0;
	this.dTheta = Math.PI / 1000;

	const texture = new THREE.TextureLoader().load( 'https://cdn.intra.42.fr/users/medium_' + name + '.jpg' );

	this.img = new THREE.MeshBasicMaterial({
		map: texture
	});

	this.body = new THREE.Mesh(
		new THREE.CircleGeometry(15, 25),
		this.img
	);
	this.body.receiveShadow = false;

	this.threegroup.add(this.body);

	this.randomRotation = getRandomInt(-10, 11);
	this.threegroup.rotation.z = getRandomInt(0, 360);
	this.theta -= this.dTheta * ((1100 * offset) + 1000 * this.intValue);
}

Student.prototype.move = function() {
	this.theta -= this.dTheta * (16 - this.intValue) * .1;
	this.threegroup.rotation.z += this.randomRotation * (16 - this.intValue) * .0005;
	this.threegroup.position.x = this.r * Math.cos(this.theta);
	this.threegroup.position.y = this.r * Math.sin(this.theta);
}

Particle = function(offset) {
	this.x = 0;
	this.y = 0;
	this.offset = offset;
	this.r = getRandomInt(0, offset * .1) + 38;
	this.theta = 0;
	this.dTheta = Math.PI / 1000;

	this.theta -= this.dTheta * 5 * offset;
}

Particle.prototype.move = function() {
	const inverseR = 10000 - this.r;

	this.theta -= (this.dTheta * inverseR * .0002 - (this.r * .000008));
	this.x = this.r * Math.cos(this.theta);
	this.y = this.r * Math.sin(this.theta);
}