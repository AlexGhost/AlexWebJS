var player_img = new Image();
player_img.src = "player.png";

function Player(x, y) {
	this.x = x;
	this.y = y;
	this.flies = 0;
	this.facing_dir = 1;
	this.is_moving = false;
	this.timer_movement = .0;
}

Player.prototype.move = function(dx, dy) {
	this.x += dx;
	this.y += dy;
	if (dx > 0)
		this.facing_dir = 1;
	else if (dx < 0)
		this.facing_dir = 0;
	if (dx != 0 || dy != 0) {
		this.is_moving = true;
		this.timer_movement += 0.05;
		if (this.timer_movement > 2)
			this.timer_movement = .0;
	}
	else {
		this.is_moving = false;
		this.timer_movement = .0;
	}

	//LIMIT
	if (this.x > 1140)
		this.x = 1140;
	else if (this.x < 60)
		this.x = 60;
	if (this.y > 840)
		this.y = 840;
	else if (this.y < 60)
		this.y = 60;
}

Player.prototype.draw = function() {
	if (this.facing_dir == 1) {
		if (this.is_moving && this.timer_movement > 1)
			ctx.drawImage(player_img, 320, 0, 160, 200, this.x - 25, this.y - 30, 50, 60);
		else if (this.is_moving)
			ctx.drawImage(player_img, 160, 0, 160, 200, this.x - 25, this.y - 30, 50, 60);
		else
			ctx.drawImage(player_img, 0, 0, 160, 200, this.x - 25, this.y - 30, 50, 60);
	}
	else {
		if (this.is_moving && this.timer_movement > 1)
			ctx.drawImage(player_img, 320, 200, 160, 200, this.x - 25, this.y - 30, 50, 60);
		else if (this.is_moving)
			ctx.drawImage(player_img, 160, 200, 160, 200, this.x - 25, this.y - 30, 50, 60);
		else
			ctx.drawImage(player_img, 0, 200, 160, 200, this.x - 25, this.y - 30, 50, 60);
	}
}
