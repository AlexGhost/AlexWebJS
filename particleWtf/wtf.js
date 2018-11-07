const DAMPING = 0.99;
var colors = ["#270001", "#48040E", "#6D0013", "#930011", "#B80006",
	"#BF1607", "#C62D08", "#CD440A", "#D45A0B", "#DB710D", "#E2880E", "#E99E0F"];

function convertHex(hex, opacity) {
	var hex = hex.replace('#', '');
	var r = parseInt(hex.substring(0,2), 16);
	var g = parseInt(hex.substring(2,4), 16);
	var b = parseInt(hex.substring(4,6), 16);

	var result = 'rgba('+r+','+g+','+b+','+opacity/200+')';
	return result;
}

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
	this.x += Math.cos(this.timer * Math.PI * 1.1) * (Math.random() * 0.3);
	this.y += Math.sin(this.timer * Math.PI * 1.1) * (Math.random() * 0.3);
	this.velocityX = (this.x - this.oldX) * DAMPING;
	this.velocityY = (this.y - this.oldY) * DAMPING;
	this.oldX = this.x;
	this.oldY = this.y;
	/*if (this.x < 0) {
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
	else if (this.y > height) {
		this.y = height;
		this.velocityY *= -0.1;
	}*/
	this.x += this.velocityX;
	this.y += this.velocityY;
	if (this.timer <= 0) {
		this.timer = 12.;
		this.x = this.oldX = width / 2 + 300;
		this.y = this.oldY = height/ 2 - 400;
	}
	if (this.timer > 11)
		this.speed = 11;
	else if (this.timer > 10)
		this.speed = 10;
	else if (this.timer > 9)
		this.speed = 9;
	else if (this.timer > 8)
		this.speed = 8;
	else if (this.timer > 7)
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
};

Particle.prototype.draw = function() {
	//LINE
	/*ctx.strokeStyle = convertHex(colors[this.speed], 255 - ((12 - this.speed) * 20));
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(this.oldX, this.oldY);
	ctx.lineTo(this.x, this.y);
	ctx.stroke();*/
	//CIRCLE
	/*ctx.beginPath();
	ctx.arc(this.x, this.y, 12 - this.speed, 0, Math.PI * 2, false);
	ctx.fillStyle = convertHex(colors[this.speed], 255 - ((12 - this.speed) * 20));
	ctx.fill();
	ctx.closePath();*/
	//SQUARE
	ctx.beginPath();
	ctx.rect(this.x - 5, this.y - 5, 10, 10);
	ctx.fillStyle = convertHex("#FFFFFF", 50);
	ctx.fill();
	ctx.closePath();
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
ctx.font = "20px Arial";
function frame() {
	requestAnimationFrame(frame);
	ctx.clearRect(0, 0, width, height);
	if (actual_part < 2000) {
		particles[actual_part] = new Particle(0, 0);
		actual_part += 1;
	}
	for (var i = 0; i < particles.length; i++) {
		particles[i].move();
		particles[i].draw();
	}
	/*ctx.fillStyle = "#111111";
	ctx.fillText("Particles: "+particles.length, 0, height);*/
}
