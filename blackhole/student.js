function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

Student = function(name, intValue, offset) {
	this.threegroup = new THREE.Group();

	this.intValue = intValue;
	this.r = 90 + (this.intValue * 40);
	this.theta = 0;
	this.dTheta = Math.PI / 1000;

	const texture = new THREE.TextureLoader().load( 'https://cdn.intra.42.fr/users/medium_' + name + '.jpg' );

	this.img = new THREE.MeshBasicMaterial({
		map: texture
	});

	this.body = new THREE.Mesh(
		new THREE.CircleGeometry(18, 15),
		this.img
	);
	this.body.receiveShadow = false;

	this.threegroup.add(this.body);

	this.randomRotation = getRandomInt(-100, 101);
	this.threegroup.rotation.z = getRandomInt(0, 360);
	this.theta -= this.dTheta * ((1100 * offset) + 1000 * this.intValue);
}

Student.prototype.move = function() {
	this.theta -= this.dTheta * (16 - this.intValue) * .1;
	this.threegroup.rotation.z += this.randomRotation * (16 - this.intValue) * .00005;
	this.threegroup.position.x = this.r * Math.cos(this.theta);
	this.threegroup.position.y = this.r * Math.sin(this.theta);
}