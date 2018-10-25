var DAMPING = 0.995;
var keyboard_space = false;
var actual_colors = 0;
var colors = [["#B80006", "#BF1607", "#C62D08", "#CD440A", "#D45A0B", "#DB710D", "#E2880E", "#E99E0F"],
				["#00852A", "#13912C", "#269D2F", "#39A932", "#4CB535", "#5FC238", "#72CE3B", "#85DA3E"],
				["#0000A2", "#0020A9", "#0040B0", "#005EBE", "#007CCC", "#009ADA", "#00B8E8", "#00D6FA"],
				["#9A11E1", "#8922DD", "#7833D9", "#6744D5", "#5656D2", "#4467CE", "#3378CA", "#2289C6"],
				["#897F33", "#9A8F45", "#ABA056", "#BBB067", "#CCC079", "#DDD18A", "#EEE19B", "#FFF2AD"]];

function Particle(x, y) {
	this.x = this.oldX = x;
	this.y = this.oldY = y;
	this.speed = 0;
}

Particle.prototype.attract = function(x, y) {
	var dx = x - this.x;
	var dy = y - this.y;
	var distance = Math.sqrt(dx * dx + dy * dy) * 2;
	this.x += dx / distance;
	this.y += dy / distance;
	this.velocityX = (this.x - this.oldX) * DAMPING;
	this.velocityY = (this.y - this.oldY) * DAMPING;
	this.oldX = this.x;
	this.oldY = this.y;
	if (this.x < 0)
	{
		this.x = 0;
		this.velocityX *= -0.1;
	}
	else if (this.x > width)
	{
		this.x = width;
		this.velocityX *= -0.1;
	}
	if (this.y < 0)
	{
		this.y = 0;
		this.velocityY *= -0.1;
	}
	else if (this.y > height)
	{
		this.y = height;
		this.velocityY *= -0.1;
	}
	this.x += this.velocityX;
	this.y += this.velocityY;
	if (Math.abs(this.velocityX) + Math.abs(this.velocityY) > 35)
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
		this.speed = 0;
};

Particle.prototype.draw = function() {
	ctx.strokeStyle = colors[actual_colors][this.speed];
	ctx.lineWidth = (this.speed + 6) / 3;
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

for (var i = 0; i < 1000; i++) {
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
		particles[i].attract(mouse.x, mouse.y);
		//particles[i].attract(particles[i].x, particles[i].y);
		particles[i].draw();
	}
}
