function Enemy(type) {
	this.x = -10;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.timer = 75.;
	this.type = type;
}

Enemy.prototype.respawn = function() {
	if (this.type == 1)
		this.x = 0;
	else
		this.x = 1200;
	this.y = (Math.random() * 900);
	this.dx = this.type;
	this.dy = (Math.random() * 0.5) - 0.25;
	this.timer = (Math.random() * 5.) + 150.;
}

Enemy.prototype.move = function() {
	this.x += this.dx;
	this.y += this.dy;
	this.timer -= .1;
	if (this.timer <= 0)
		this.respawn();
}

Enemy.prototype.draw = function() {
	ctx.beginPath();
	ctx.rect(this.x - 5, this.y - 5, 10, 10);
	ctx.fillStyle = "#FF2222";
	ctx.fill();
	ctx.closePath();
}
