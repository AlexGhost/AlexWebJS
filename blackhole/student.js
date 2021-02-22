Student = function(name, intValue) {
	this.threegroup = new THREE.Group();

	this.intValue = intValue;
	this.r = 40 * intValue;
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
	this.threegroup.position.x = 0;
	this.threegroup.position.y = 0;
}

Student.prototype.move = function() {
	// this.theta -= this.dTheta * (16 - this.intValue) * .5;
	this.threegroup.position.x = this.r * Math.cos(this.theta);
	this.threegroup.position.y = this.r * Math.sin(this.theta);
}