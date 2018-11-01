const DAMPING = 0.995;
//var colors = ["#B80006", "#BF1607", "#C62D08", "#CD440A", "#D45A0B", "#DB710D", "#E2880E", "#E99E0F"];
function Particle(x, y) {
	this.x = this.oldX = x;
	this.y = this.oldY = y;
	//this.speed = 0;
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
	/*if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 35)
		this.speed = 7;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 30)
		this.speed = 6;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 25)
		this.speed = 5;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 20)
		this.speed = 4;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 15)
		this.speed = 3;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 10)
		this.speed = 2;
	else if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 5)
		this.speed = 1;
	else
		this.speed = 0;*/
};

Particle.prototype.draw = function() {
	/*ctx.strokeStyle = "#FFFFFF";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(this.oldX, this.oldY);
	ctx.lineTo(this.x, this.y);
	ctx.stroke();*/
	ctx.beginPath();
	ctx.rect(this.x - 5, this.y - 5, 10, 10);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
	ctx.closePath();
};
