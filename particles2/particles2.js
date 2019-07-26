const display = document.getElementById('display');
const ctx = display.getContext('2d');
const particles = [];
const width = display.width = window.innerWidth - 100;
const height = display.height = window.innerHeight - 100;
const mouse = { x: width * 0.5, y: height * 0.5 };
const particleSpeedX = 5;
const particleSpeedY = .5;
let keyboard_space = false;
let mode = 0;

const nbParticles = 300;

function Particle(x, y) {
	this.x = x;
	this.y = y;
	this.dx = ((Math.random() * 1) - 0.5) * particleSpeedX;
	this.dy = ((Math.random() * 1) - 0.5) * particleSpeedY;
	this.red = (Math.random() * 255);
	this.addred = (Math.random() * 4) - 2;
	this.green = (Math.random() * 255);
	this.addgreen = (Math.random() * 4) - 2;
	this.blue = (Math.random() * 255);
	this.addblue = (Math.random() * 4) - 2;
	this.alpha = 0;
}

Particle.prototype.move = function() {
	if (this.x <= 0)
		this.dx = -this.dx;
	else if (this.x >= width)
		this.dx = -this.dx;
	if (this.y <= 0)
		this.dy = -this.dy;
	else if (this.y >= height)
		this.dy = -this.dy;
	this.x += this.dx;
	this.y += this.dy;
};

Particle.prototype.draw = function() {
	if (mode == 1)
		this.alpha = Math.sqrt(Math.abs(this.x - mouse.x) * Math.abs(this.x - mouse.x)
			+ Math.abs(this.y - mouse.y) * Math.abs(this.y - mouse.y));
	else
		this.alpha = 0;
	if (this.alpha < 300) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
		ctx.fillStyle = 'rgba('+255+','+255+','+255+','+parseFloat((300 - this.alpha) / 100)+')';
		ctx.fill();
		ctx.closePath();
	}
};

Particle.prototype.draw_line = function(x2, y2) {
	const distance = Math.sqrt(Math.abs(this.x - x2) * Math.abs(this.x - x2) + Math.abs(this.y - y2) * Math.abs(this.y - y2));
	if (distance < 200 && this.alpha < 200) {
		ctx.beginPath();
		ctx.strokeStyle = 'rgba('+this.red+','+this.green+','+this.blue+','
			+parseFloat((200 - distance) / 200)+')';
		ctx.lineWidth = 2;
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
}

Particle.prototype.changeColors = function() {
	this.red += this.addred;
	this.green += this.addgreen;
	this.blue += this.addblue;
	if (this.red > 255 || this.red < 0) this.addred = -this.addred;
	if (this.green > 255 || this.green < 0) this.addgreen = -this.addgreen;
	if (this.blue > 255 || this.blue < 0) this.addblue = -this.addblue;
}

function convertHex(hex, opacity) {
	var hex = hex.replace('#','');
	var r = parseInt(hex.substring(0,2), 16);
	var g = parseInt(hex.substring(2,4), 16);
	var b = parseInt(hex.substring(4,6), 16);

	var result = 'rgba('+r+','+g+','+b+','+opacity/200+')';
	return result;
}

for (var i = 0; i < nbParticles; i++) {
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
		mode++;
		if (mode > 1)
			mode = 0;
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
		particles[i].move();
		particles[i].changeColors();
		for (var j = i + 1; j < particles.length; j++) {
			particles[i].draw_line(particles[j].x, particles[j].y);
		}
	particles[i].draw();
	}
}
