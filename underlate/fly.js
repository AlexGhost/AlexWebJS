function Fly() {
	this.x = 0;
	this.y = 0;
}

Fly.prototype.respawn = function() {
	this.x = (Math.random() * 1000) + 100;
	this.y = (Math.random() * 700) + 100;
}

Fly.prototype.draw = function() {
	ctx.beginPath();
	ctx.rect(this.x - 5, this.y - 5, 10, 10);
	ctx.fillStyle = "#FFFF55";
	ctx.fill();
	ctx.closePath();
}
