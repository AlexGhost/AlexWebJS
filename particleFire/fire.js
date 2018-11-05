var DAMPING = 0.995;
var keyboard_space = false;
var colors = ["#B80006", "#BF1607", "#C62D08", "#CD440A", "#D45A0B", "#DB710D", "#E2880E", "#E99E0F"];

function Particle(x, y) {
	this.x = this.oldX = x;
	this.y = this.oldY = y;
	this.speed = 0;
	this.timer = 0;
}

Particle.prototype.move = function() {
	/*var dx = x - this.x;
	var dy = y - this.y;
	var distance = Math.sqrt(dx * dx + dy * dy) * 2;*/
	this.x += Math.random() * 0.04 - 0.02;
	this.y -= Math.random() * 0.02;
	this.velocityX = (this.x - this.oldX) * DAMPING;
	this.velocityY = (this.y - this.oldY) * DAMPING;
	this.oldX = this.x;
	this.oldY = this.y;
	if (this.x < 0) {
		this.x = 0;
		this.velocityX *= -0.1;
	}
	else if (this.x > width) {
		this.x = width;
		this.velocityX *= -0.1;
	}
	if (this.y < 0) {
		this.y = 0;
		this.velocityY *= -0.1;
	}
	/*else if (this.y > height) {
		this.y = height;
		this.velocityY *= -0.1;
	}*/
	this.x += this.velocityX;
	this.y += this.velocityY;
	if (this.timer > 7)
		this.speed = 7;
	else if (this.timer > 6)
		this.speed = 6;
	else if (this.timer > 5)
		this.speed = 5;
	else if (this.timer > 4)
		this.speed = 4;
	else if (this.timer > 3)
		this.speed = 3;
	else if (this.timer > 2)
		this.speed = 2;
	else if (this.timer > 1)
		this.speed = 1;
	else
		this.speed = 0;
	this.timer -= 0.01;
	if (this.timer <= 0) {
		this.timer = 7.;
		this.x = this.oldX = width / 2 + Math.random() * 50 - 25;
		this.y = this.oldY = height * 0.99 + Math.random() * 10 - 5;
	}
};

Particle.prototype.draw = function() {
	ctx.strokeStyle = colors[this.speed];
	ctx.lineWidth = (this.speed + 6) / 3;
	ctx.beginPath();
	ctx.moveTo(this.oldX, this.oldY);
	ctx.lineTo(this.x, this.y);
	ctx.stroke();
};

var display = document.getElementById('display');
var ctx = display.getContext('2d');
var particles = [];
var actual_part = particles.length;
var width = display.width = window.innerWidth - 100;
var height = display.height = window.innerHeight - 100;
var mouse = { x: width * 0.5, y: height * 0.5 };

/*for (var i = 0; i < 1000; i++) {
	particles[i] = new Particle(width / 2, height * 0.8);
}*/

requestAnimationFrame(frame);
function frame() {
	requestAnimationFrame(frame);
	ctx.clearRect(0, 0, width, height);
	if (actual_part < 3000) {
		particles[actual_part] = new Particle(width / 2 + Math.random() * 50 - 25, height * 0.99 + Math.random() * 10 - 5);
		particles[actual_part + 1] = new Particle(width / 2 + Math.random() * 50 - 25, height * 0.99 + Math.random() * 10 - 5);
		particles[actual_part + 2] = new Particle(width / 2 + Math.random() * 50 - 25, height * 0.99 + Math.random() * 10 - 5);
		actual_part += 3;
	} else {
		//actual_part = 0;
	}
	for (var i = 0; i < particles.length; i++) {
		particles[i].move();
		particles[i].draw();
	}
}
