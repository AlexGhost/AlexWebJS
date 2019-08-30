Cube = function(color, posX, posY, reactionTime) {
	this.threegroup = new THREE.Group();

	this.posX = posX;
	this.posY = posY;
	this.reactionTime = reactionTime;
	this.twitchTime = reactionTime * 0.33;

	this.timer = 0;
	this.timerTwitch = 0;
	this.watchX = 0;
	this.watchY = 0;
	this.eyeTwitchX = 0;
	this.eyeTwitchY = 0;

	this.bodyMat = new THREE.MeshLambertMaterial({
		color: color,
		shading:THREE.FlatShading
	});
	this.eyeBallMat = new THREE.MeshBasicMaterial({
		color: 0xffffff
	});
	this.eyeMat = new THREE.MeshBasicMaterial({
		color: 0x000000
	});
	this.mouthMat = new THREE.MeshLambertMaterial({
		color: 0x555555,
		shading:THREE.FlatShading
	});

	var bodyGeom = new THREE.BoxGeometry(80, 80, 80);
	this.body = new THREE.Mesh(bodyGeom, this.bodyMat);
	this.body.receiveShadow = false;

	var eyeBallGeom = new THREE.BoxGeometry(20, 20, 10);
	this.eyeBall1 = new THREE.Mesh(eyeBallGeom, this.eyeBallMat);
	this.eyeBall1.position.x = -15;
	this.eyeBall1.position.y = 15;
	this.eyeBall1.position.z = 40;
	this.eyeBall2 = new THREE.Mesh(eyeBallGeom, this.eyeBallMat);
	this.eyeBall2.position.x = 15;
	this.eyeBall2.position.y = 15;
	this.eyeBall2.position.z = 40;

	var eyeGeom = new THREE.BoxGeometry(5, 5, 5);
	this.eye1 = new THREE.Mesh(eyeGeom, this.eyeMat);
	this.eye1.position.x = -15;
	this.eye1.position.y = 15;
	this.eye1.position.z = 44;
	this.eye2 = new THREE.Mesh(eyeGeom, this.eyeMat);
	this.eye2.position.x = 15;
	this.eye2.position.y = 15;
	this.eye2.position.z = 44;

	var mouthGeom = new THREE.BoxGeometry(20, 10, 10);
	this.mouth = new THREE.Mesh(mouthGeom, this.mouthMat);
	this.mouth.position.y = -20;
	this.mouth.position.z = 40;

	this.threegroup.add(this.body);
	this.threegroup.add(this.eyeBall1);
	this.threegroup.add(this.eye1);
	this.threegroup.add(this.eyeBall2);
	this.threegroup.add(this.eye2);
	this.threegroup.add(this.mouth);
	this.threegroup.traverse(function(object) {
		if (object instanceof THREE.Mesh) {
			object.castShadow = true;
			object.receiveShadow = true;
		}
	});
	this.threegroup.position.x = posX;
	this.threegroup.position.y = posY;
}

Cube.prototype.look = function(xTarget, yTarget) {
	var tHeagRotY = rule3(xTarget, -200, 200, -Math.PI / 4, Math.PI / 4);
	var tHeadRotX = rule3(yTarget, -200,200, -Math.PI / 4, Math.PI / 4);
	var tHeadPosX = (rule3(xTarget, -200, 200, 70, -70) * 0.5) + this.posX;
	var tHeadPosY = (rule3(yTarget, -140, 260, 20, 100) * 0.5) + this.posY;
	var tEye1PosX = (rule3(xTarget, -200, 200, -45, -15) * 0.5) + this.eyeTwitchX;
	var tEye1PosY = (rule3(yTarget, -200, 200, 45, 15) * 0.5) + this.eyeTwitchY;
	var tEye2PosX = (rule3(xTarget, -200, 200, 15, 45) * 0.5) + this.eyeTwitchX;
	var tEye2PosY = (rule3(yTarget, -200, 200, 45, 15) * 0.5) + this.eyeTwitchY;
	this.threegroup.rotation.y += (tHeagRotY - this.threegroup.rotation.y) / 10;
	this.threegroup.rotation.x += (tHeadRotX - this.threegroup.rotation.x) / 10;
	this.threegroup.position.x += (tHeadPosX - this.threegroup.position.x) / 20;
	this.threegroup.position.y += (tHeadPosY - this.threegroup.position.y) / 20;
	this.eye1.position.x += (tEye1PosX - this.eye1.position.x) / 10;
	this.eye1.position.y += (tEye1PosY - this.eye1.position.y) / 10;
	this.eye2.position.x += (tEye2PosX - this.eye2.position.x) / 10;
	this.eye2.position.y += (tEye2PosY - this.eye2.position.y) / 10;

	if (this.timer > 0) {
		this.timer -= 0.01;
	} else {
		this.timer = this.reactionTime
		this.thinkLook();
	}
	if (this.timerTwitch > 0) {
		this.timerTwitch -= 0.01;
	} else {
		this.timerTwitch = this.twitchTime
		this.eyeTwitchX = Math.random() * (2 + 2) - 2;
		this.eyeTwitchY = Math.random() * (2 + 2) - 2;
	}
}

Cube.prototype.thinkLook = function() {
	this.watchX = Math.random() * (100 + 100) - 100;
	this.watchY = Math.random() * (100 + 100) - 100;
}
