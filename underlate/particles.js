const DAMPING = 0.995;
function Particle(x, y) {
	this.x = this.oldX = x;
	this.y = this.oldY = y;
}

Particle.prototype.attract = function(x, y) {
	var dx = x - this.x;
	var dy = y - this.y;
	var distance = Math.sqrt(dx * dx + dy * dy) * 10;
	this.x += dx / distance;
	this.y += dy / distance;
	this.velocityX = (this.x - this.oldX) * DAMPING;
	this.velocityY = (this.y - this.oldY) * DAMPING;
	this.oldX = this.x;
	this.oldY = this.y;
	this.x += this.velocityX;
	this.y += this.velocityY;
};

Particle.prototype.draw = function() {
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.moveTo(this.oldX, this.oldY);
	ctx.lineTo(this.x, this.y);
	ctx.stroke();
};
