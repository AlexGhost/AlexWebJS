const display = document.getElementById('display');
const ctx = display.getContext('2d');
const particles = [];
const width = display.width = window.innerWidth - 100;
const height = display.height = window.innerHeight - 100;
const mouse = { x: width * 0.5, y: height * 0.5 };
const particleSpeedX = 5;
const particleSpeedY = .5;
let keyboard_space = false;

function Particle(x, y) {
	this.x = x;
	this.y = y;
	this.dx = ((Math.random() * 1) - 0.5) * particleSpeedX;
	this.dy = ((Math.random() * 1) - 0.5) * particleSpeedY;
	this.red = (Math.random() * 510) - 250;
	this.addred = (Math.random() * 2) + 2;
	this.green = (Math.random() * 510) - 250;
	this.addgreen = (Math.random() * 2) + 2;
	this.blue = (Math.random() * 510) - 250;
	this.addblue = (Math.random() * 2) + 2;
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
	ctx.beginPath();
	ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.closePath();
};

Particle.prototype.draw_line = function(x2, y2) {
	var distance = Math.sqrt(Math.abs(this.x - x2) * Math.abs(this.x - x2) + Math.abs(this.y - y2) * Math.abs(this.y - y2));
	if (distance < 200)
	{
		ctx.beginPath();
		//ctx.strokeStyle = convertHex(getColor(), (150 - distance) * .5);
		ctx.strokeStyle = 'rgba('+this.red+','+this.green+','+this.blue+','
			+parseFloat(((200 - distance) * 1)/200)+')';
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

for (var i = 0; i < 200; i++) {
	particles[i] = new Particle(Math.random() * width, Math.random() * height);
}

/*display.addEventListener("mousemove", onMousemove);
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
		actual_color++;
		if (actual_color > 4)
			actual_color = 0;
		keyboard_space = true;
	}
}

function keyUpHandler(e)
{
	if(e.keyCode == 32)
		keyboard_space = false;
}*/

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
