var canvas = document.getElementById("myCanvas");
var score_text = document.getElementById("ScoreID");
var ctx = canvas.getContext("2d");
var snek_x = canvas.width/2;
var snek_y = 200;
var snek_radius = 14;
var snek_dx = 0;
var snek_dy = 1;
var apple_x = 100;
var apple_y = 200;
var apple_radius = 16;
var keyboard_up = false;
var keyboard_down = false;
var keyboard_left = false;
var keyboard_right = false;
var score = 0;
var bestscore = 0;
var tail_length = 5;
var tails = new Array(999);

function snek_respawn()
{
	snek_x = canvas.width/2;
	snek_y = 200;
	snek_dx = 0;
	snek_dy = 1;
	keyboard_up = false;
	keyboard_down = false;
	keyboard_left = false;
	keyboard_right = false;
	score = 0;
	tail_length = 5;
	apple_respawn();
	draw_score();
	for (var i = 0 ; i < 990 ; i++)
	{
		if (tails[i])
			tails[i].timer = 0;
	}
	for (var i = 0 ; i < tail_length ; i++)
		tails[i] = create_new_tail(snek_x, snek_y, i);
}

function create_new_tail(x,  y, vtimer)
{
	var tail = {};
	tail.x = x;
	tail.y = y;
	tail.timer_or = vtimer * 5;
	tail.timer = tail.timer_or;
	tail.timer_deplete = function() {
		if (tail.timer > 0)
			tail.timer--;
	}
	tail.draw = function() {
		ctx.beginPath();
		ctx.arc(tail.x, tail.y, snek_radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
	}
	return tail;
}

function draw_snek()
{
	ctx.beginPath();
	ctx.rect(
		(snek_x - (2 + (3 * Math.abs(snek_dx))) / 2) + (snek_dx * 14),
		(snek_y - (2 + (3 * Math.abs(snek_dy))) / 2) + (snek_dy * 14),
		2 + (3 * Math.abs(snek_dx)), 2 + (3 * Math.abs(snek_dy)));
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(snek_x, snek_y, snek_radius, 0, Math.PI * 2, false);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(
		(snek_x - (2 + (3 * Math.abs(snek_dx))) / 2) + (snek_dx * 4) - (snek_dy * 3),
		(snek_y - (2 + (3 * Math.abs(snek_dy))) / 2) + (snek_dy * 4) + (snek_dx * 3),
		2 + (3 * Math.abs(snek_dx)), 2 + (3 * Math.abs(snek_dy)));
	ctx.rect(
		(snek_x - (2 + (3 * Math.abs(snek_dx))) / 2) + (snek_dx * 4) + (snek_dy * 3),
		(snek_y - (2 + (3 * Math.abs(snek_dy))) / 2) + (snek_dy * 4) - (snek_dx * 3),
		2 + (3 * Math.abs(snek_dx)), 2 + (3 * Math.abs(snek_dy)));
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}

function draw_apple()
{
	ctx.beginPath();
	ctx.arc(apple_x, apple_y, apple_radius, 0, Math.PI * 2, false);
	ctx.fillStyle = "#FF9933";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(apple_x - 1, apple_y - 18, 2, 6);
	ctx.fillStyle = "#146615";
	ctx.fill();
	ctx.closePath();
}


function apple_respawn()
{
	apple_x = Math.floor(Math.random() * (canvas.width - 100)) + 50;
	apple_y = Math.floor(Math.random() * (canvas.height - 100)) + 50;
}

function snek_eat()
{
	apple_respawn();
	score++;
	tail_length += 2;
	if (tail_length > 995)
		tail_length = 995;
	if (bestscore < score)
		bestscore = score;
	draw_score();
}

function draw_score()
{
	score_text.innerText = "Score: " + score + "\nBest Score: " + bestscore;
}

function loop()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw_apple();
	for (var i = 0 ; i < tail_length ; i++)
	{
		if (tails[i])
		{
			tails[i].draw();
			tails[i].timer_deplete();
			if (tails[i].timer <= 0)
				tails[i] = create_new_tail(snek_x, snek_y, i);
		}
		else
			tails[i] = create_new_tail(snek_x, snek_y, i);
	}
	draw_snek();

	if (keyboard_right && snek_dx != -1)
	{
		snek_dx = 1;
		snek_dy = 0;
	}
	else if (keyboard_left && snek_dx != 1)
	{
		snek_dx = -1;
		snek_dy = 0;
	}
	else if (keyboard_down && snek_dy != -1)
	{
		snek_dx = 0;
		snek_dy = 1;
	}
	else if (keyboard_up && snek_dy != 1)
	{
		snek_dx = 0;
		snek_dy = -1;
	}

	if (snek_x < 0 || snek_x > canvas.width || snek_y < 0 || snek_y > canvas.height)
		snek_respawn();
	else if (snek_x + snek_radius > apple_x - apple_radius / 2
			&& snek_x - snek_radius < apple_x + apple_radius / 2
			&& snek_y + snek_radius > apple_y - apple_radius / 2
			&& snek_y - snek_radius < apple_y + apple_radius / 2)
		snek_eat();
	snek_x += snek_dx;
	snek_y += snek_dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e)
{
	if(e.keyCode == 39 || e.keyCode == 68)
		keyboard_right = true;
	else if(e.keyCode == 37 || e.keyCode == 65)
		keyboard_left = true;
	else if(e.keyCode == 38 || e.keyCode == 87)
		keyboard_up = true;
	else if(e.keyCode == 40 || e.keyCode == 83)
		keyboard_down = true;
}

function keyUpHandler(e)
{
	if(e.keyCode == 39 || e.keyCode == 68)
		keyboard_right = false;
	else if(e.keyCode == 37 || e.keyCode == 65)
		keyboard_left = false;
	else if(e.keyCode == 38 || e.keyCode == 87)
		keyboard_up = false;
	else if(e.keyCode == 40 || e.keyCode == 83)
		keyboard_down = false;
}

snek_respawn();
setInterval(loop, 5);
