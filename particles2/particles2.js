var keyboard_space = false;
var display = document.getElementById('display');
var ctx = display.getContext('2d');
var particles = [];
var width = display.width = window.innerWidth - 100;
var height = display.height = window.innerHeight - 100;
var mouse = { x: width * 0.5, y: height * 0.5 };

function Particle(x, y) {
	this.x = x;
	this.y = y;
	this.dx = (Math.random() * 1) - 0.5;
	this.dy = (Math.random() * 1) - 0.5;
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
	ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
};

Particle.prototype.draw_line = function(x2, y2)
{
	var distance = Math.sqrt(Math.abs(this.x - x2) * Math.abs(this.x - x2) + Math.abs(this.y - y2) * Math.abs(this.y - y2));
	if (distance < 300)
	{
		ctx.beginPath();
		ctx.strokeStyle = convertHex("#DDFFFF", (300 - distance) * 0.5);
		ctx.lineWidth = 2;
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
}

function convertHex(hex, opacity) {
	var hex = hex.replace('#','');
	var r = parseInt(hex.substring(0,2), 16);
	var g = parseInt(hex.substring(2,4), 16);
	var b = parseInt(hex.substring(4,6), 16);

	var result = 'rgba('+r+','+g+','+b+','+opacity/200+')';
	return result;
}

for (var i = 0; i < 150; i++) {
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
		if (actual_colors > 4)
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
		particles[i].move();
		for (var j = i + 1; j < particles.length; j++) {
			particles[i].draw_line(particles[j].x, particles[j].y);
		}
	particles[i].draw();
	}
}
