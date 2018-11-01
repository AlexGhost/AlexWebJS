var canvas = document.getElementById("display");
var ctx = canvas.getContext("2d");

var player = new Player(300, 500);
var particles = [];

for (var i = 0 ; i < 100 ; i++) {
	particles[i] = new Particle(1000 + (Math.random() * 100) - 50, 500 + (Math.random() * 100) - 50);
}

function loop()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0 ; i < particles.length ; i++) {
		if (player.flies)
			particles[i].attract(player.x + (Math.random() * 1000) - 500, player.y + (Math.random() * 1000) - 500);
		else
			particles[i].attract(1000 + (Math.random() * 1000) - 500, 500 + (Math.random() * 1000) - 500);
		particles[i].draw();
	}
	player.move(-keyboard_left + keyboard_right, -keyboard_up + keyboard_down);
	player.draw();
	draw_ath();
}

setInterval(loop, 5);
