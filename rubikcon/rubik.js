var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var score_text = document.getElementById("ScoreID");
var obj_text = document.getElementById("ObjectiveID");
var colors = ["red", "blue", "green", "yellow", "orange"];
var timer_or = 150;
var timer = 0;
var objid = -1;
var score = -1;
var bestscore = 0;
var reset_timer_score = 1;
var mouse_x;
var mouse_y;

function change_obj()
{
	var tmp = objid;

	while (objid == tmp)
		objid = Math.floor(Math.random() * colors.length);
	switch (objid)
	{
		case 0: obj_text.innerText = "Click on a RED tile"; break;
		case 1: obj_text.innerText = "Click on a BLUE tile"; break;
		case 2: obj_text.innerText = "Click on a GREEN tile"; break;
		case 3: obj_text.innerText = "Click on a YELLOW tile"; break;
		case 4: obj_text.innerText = "Click on a ORANGE tile"; break;
	}
}

function draw_score()
{
	score_text.innerText = "Score: " + score + "\nBestScore: " + bestscore;
}

function add_score()
{
	change_obj();
	score++;
	if (bestscore < score)
		bestscore = score;
	if (timer_or >= 80)
		timer_or -= 5;
	draw_score();
}

function reset_score()
{
	//change_obj();
	timer_or = 150;
	score = 0;
	reset_timer_score = 0;
	draw_score();
}

function createcube(pos_x, pos_y)
{
	var cube = {};
	cube.color = Math.floor(Math.random() * colors.length);
	cube.clicked = 0;
	cube.x = pos_x;
	cube.y = pos_y;

	cube.draw = function()
	{
		ctx.beginPath();
		ctx.rect(cube.x, cube.y, 200, 200);
		ctx.fillStyle = colors[cube.color];
		ctx.fill();
		ctx.closePath();
	}
	cube.changecolor = function()
	{
		if (!cube.clicked)
			cube.color = Math.floor(Math.random() * colors.length);
		cube.draw();
	}
	return cube;
}

function loop()
{
	timer--;
	if (timer <= 0)
	{
		timer = timer_or;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0 ; i < cubes.length ; i++)
			cubes[i].changecolor();
		if (reset_timer_score > 0)
			reset_timer_score--;
		else
			reset_score();
	}
}

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);

function mouseMoveHandler(e)
{
	mouse_x = e.clientX - canvas.offsetLeft;
	mouse_y = e.clientY - canvas.offsetTop;
}

function mouseDownHandler(e)
{
	var ok = 0;

	for (var i = 0 ; i < cubes.length ; i++)
	{
		if (mouse_x > cubes[i].x && mouse_x < cubes[i].x + 200
			&& mouse_y > cubes[i].y && mouse_y < cubes[i].y + 200
			&& cubes[i].color == objid)
		{
			add_score();
			ok = 1;
			reset_timer_score = 1;
		}
	}
	if (ok == 0)
		reset_score();
}

var cubes = [createcube(0, 0),
				createcube(200, 0),
				createcube(400, 0),
				createcube(600, 0),
				createcube(800, 0),
				createcube(0, 200),
				createcube(200, 200),
				createcube(400, 200),
				createcube(600, 200),
				createcube(800, 200),
				createcube(0, 400),
				createcube(200, 400),
				createcube(400, 400),
				createcube(600, 400),
				createcube(800, 400),
				createcube(0, 600),
				createcube(200, 600),
				createcube(400, 600),
				createcube(600, 600),
				createcube(800, 600),
				createcube(0, 800),
				createcube(200, 800),
				createcube(400, 800),
				createcube(600, 800),
				createcube(800, 800)
				];
add_score();
setInterval(loop, 10);
