var DAMPING = 0.99;
var keyboard_space = false;
var actual_colors = 0;
var colors = [["#A20000", "#A92000", "#B04000", "#BE5E00", "#CC7C00", "#DA9A00", "#E8B800", "#FAD600"],
				["#00A200", "#20A900", "#40B000", "#5EBE00", "#7CCC00", "#9ADA00", "#B8E800", "#D6FA00"],
				["#0000A2", "#0020A9", "#0040B0", "#005EBE", "#007CCC", "#009ADA", "#00B8E8", "#00D6FA"]];

function Particle(x, y) {
	this.x = this.oldX = x;
	this.y = this.oldY = y;
	this.speed = 0;
}

Particle.prototype.attract = function(x, y) {
	var dx = x - 5 - this.x;
	var dy = y - this.y;
	var distance = Math.sqrt(dx * dx + dy * dy) * 2;
	this.x += dx / distance;
	this.y += dy / distance;
	var velocityX = (this.x - this.oldX) * DAMPING + (Math.random() * 0.5) - 0.25;
	var velocityY = (this.y - this.oldY) * DAMPING + (Math.random() * 0.5) - 0.25;
	this.oldX = this.x;
	this.oldY = this.y;
	this.x += velocityX;
	this.y += velocityY;
	if (Math.abs(velocityX) + Math.abs(velocityY) > 35)
		this.speed = 7;
	else if (Math.abs(velocityX) + Math.abs(velocityY) > 30)
		this.speed = 6;
	else if (Math.abs(velocityX) + Math.abs(velocityY) > 25)
		this.speed = 5;
	else if (Math.abs(velocityX) + Math.abs(velocityY) > 20)
		this.speed = 4;
	else if (Math.abs(velocityX) + Math.abs(velocityY) > 15)
		this.speed = 3;
	else if (Math.abs(velocityX) + Math.abs(velocityY) > 10)
		this.speed = 2;
	else if (Math.abs(velocityX) + Math.abs(velocityY) > 5)
		this.speed = 1;
	else
		this.speed = 0;
};

Particle.prototype.draw = function() {
	ctx.strokeStyle = colors[actual_colors][this.speed];
	ctx.lineWidth = (this.speed + 2) / 3;
	ctx.beginPath();
	ctx.moveTo(this.oldX, this.oldY);
	ctx.lineTo(this.x, this.y);
	ctx.stroke();
};

var display = document.getElementById('display');
var ctx = display.getContext('2d');
var particles = [];
var width = display.width = window.innerWidth - 100;
var height = display.height = window.innerHeight - 100;
var mouse = { x: width * 0.5, y: height * 0.5 };

for (var i = 0; i < 3000; i++) {
	particles[i] = new Particle(Math.random() * width, Math.random() * height);
}

display.addEventListener("mousemove", onMousemove);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function onMousemove(e) {
	mouse.x = e.clientX - display.offsetLeft;
	mouse.y = e.clientY - display.offsetTop;
}

function keyDownHandler(e)
{
	if(e.keyCode == 32 && keyboard_space == false)
	{
		actual_colors++;
		if (actual_colors > 2)
			actual_colors = 0;
		keyboard_space = true;
	}
}

function keyUpHandler(e)
{
	if(e.keyCode == 32)
		keyboard_space = false;
}

requestAnimationFrame(frame);

function frame() {
	requestAnimationFrame(frame);
	ctx.clearRect(0, 0, width, height);
	for (var i = 0; i < particles.length; i++) {
		particles[i].attract(mouse.x, mouse.y);
		if (particles[i].x < 0)
			particles[i].x = 0;
		else if (particles[i].x > width)
			particles[i].x = width;
		if (particles[i].y < 0)
			particles[i].y = 0;
		else if (particles[i].y > height)
			particles[i].y = height;
		particles[i].draw();
	}
}
