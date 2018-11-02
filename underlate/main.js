var canvas = document.getElementById("display");
var ctx = canvas.getContext("2d");

var player = new Player(300, 500);
var fly = new Fly();
var particles = [];

/*for (var i = 0 ; i < 100 ; i++) {
	particles[i] = new Particle(player.x, player.y);
}*/

fly.respawn();
function loop()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0 ; i < particles.length ; i++) {
		particles[i].attract(player.x + (Math.random() * 1000) - 500, player.y + (Math.random() * 1000) - 500);
		particles[i].draw();
	}
	player.move(-keyboard_left + keyboard_right, -keyboard_up + keyboard_down);
	if (player.x > fly.x - 25 && player.x < fly.x + 25 && player.y > fly.y - 30 && player.y < fly.y + 30) {
		fly.respawn();
		particles[player.flies] = new Particle(player.x, player.y);
		player.flies += 1;
	}
	fly.draw();
	player.draw();
	draw_ath();
}

setInterval(loop, 5);
