var canvas = document.getElementById("display");
var ctx = canvas.getContext("2d");

var player = new Player(600, 600);

function loop()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.move(-keyboard_left + keyboard_right, -keyboard_up + keyboard_down);
	player.draw();
	draw_ath();
}

setInterval(loop, 5);
