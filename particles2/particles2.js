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
	this.dx = (Math.random() * 2) - 1;
	this.dy = (Math.random() * 2) - 1;
}

Particle.prototype.move = function() {
	if (this.x <= 0)
	{
		this.dx = -this.dx;
	}
	else if (this.x >= width)
	{
		this.dx = -this.dx;
	}
	if (this.y <= 0)
	{
		this.dy = -this.dy;
	}
	else if (this.y >= height)
	{
		this.dy = -this.dy;
	}
	this.x += this.dx;
	this.y += this.dy;
};

Particle.prototype.draw = function() {
	ctx.beginPath();
	ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
};

function draw_line(x1, y1, x2, y2)
{
	var distance = Math.sqrt(Math.abs(x1 - x2) * Math.abs(x1 - x2) + Math.abs(y1 - y2) * Math.abs(y1 - y2));
	if (distance < 200)
	{
		ctx.beginPath();
		if (distance < 50)
			ctx.strokeStyle = "#FFFFFF";
		else if (distance < 60)
			ctx.strokeStyle = "#EEEEEE";
		else if (distance < 70)
			ctx.strokeStyle = "#888888";
		else if (distance < 80)
			ctx.strokeStyle = "#666666";
		else if (distance < 100)
			ctx.strokeStyle = "#555555";
		else if (distance < 120)
			ctx.strokeStyle = "#444444";
		else if (distance < 140)
			ctx.strokeStyle = "#333333";
		else if (distance < 160)
			ctx.strokeStyle = "#222222";
		else
			ctx.strokeStyle = "#111111";
		ctx.lineWidth = 2;
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
}

for (var i = 0; i < 200; i++) {
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
			draw_line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
		}
	particles[i].draw();
	}
}
