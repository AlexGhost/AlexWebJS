function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

Student = function(name, intValue, offset, maxStud) {
	this.name = name;
	this.threegroup = new THREE.Group();

	this.intValue = intValue;
	this.r = 170 + (this.intValue * 50);
	this.theta = 0;
	this.dTheta = Math.PI / 1000;

	const texture = new THREE.TextureLoader().load( 'https://cdn.intra.42.fr/users/small_' + name + '.jpg' );

	this.img = new THREE.MeshBasicMaterial({
		map: texture
	});

	this.body = new THREE.Mesh(
		new THREE.CircleGeometry(15, 25),
		this.img
	);
	this.body.receiveShadow = false;

	this.threegroup.add(this.body);

	this.randomRotationZ = getRandomInt(-10, 11);
	this.threegroup.rotation.z = getRandomInt(0, 360);
	let tmp = 200 / maxStud
	this.theta -= this.dTheta * offset * tmp * 10;
}

Student.prototype.move = function() {
	this.theta -= this.dTheta * (16 - this.intValue) * .1;
	this.threegroup.rotation.z += this.randomRotationZ * (16 - this.intValue) * .0005;
	this.threegroup.position.x = this.r * Math.cos(this.theta);
	this.threegroup.position.y = this.r * Math.sin(this.theta);
}

Particle = function(offset) {
	this.x = 0;
	this.y = 0;
	this.offset = offset;
	this.r = getRandomInt(0, offset * .0075) + 10;
	this.theta = 0;
	this.dTheta = Math.PI / 1000;

	this.theta -= this.dTheta * 5 * offset;
}

Particle.prototype.move = function() {
	this.theta -= this.dTheta * this.r * .02;
	this.x = this.r * Math.cos(this.theta);
	this.y = this.r * Math.sin(this.theta);
}