Student = function(name, intValue) {
	this.threegroup = new THREE.Group();

	this.posX = intValue * 50;
	this.posY = 0;

	const texture = new THREE.TextureLoader().load( 'https://cdn.intra.42.fr/users/medium_' + name + '.jpg' );

	this.img = new THREE.MeshBasicMaterial({
		map: texture
	});

	this.body = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(40,50),
		this.img
	);
	this.body.receiveShadow = false;

	this.threegroup.add(this.body);
	this.threegroup.position.x = this.posX;
	this.threegroup.position.y = this.posY;
}

Student.prototype.move = function() {
	// this.threegroup.position.x += 1;
}