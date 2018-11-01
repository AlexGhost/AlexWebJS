var keyboard_up = false;
var keyboard_down = false;
var keyboard_left = false;
var keyboard_right = false;
var keyboard_space = false;

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
	else if(e.keyCode == 32)
		keyboard_space = true;
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
	else if(e.keyCode == 32)
		keyboard_space = false;
}
