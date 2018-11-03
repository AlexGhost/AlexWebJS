function draw_ath() {
	ctx.beginPath();
	ctx.rect(0, 900, 1200, 300);
	ctx.fillStyle = "#777777";
	ctx.fill();
	ctx.closePath();
	ctx.font = "120px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Life: " + player.life, 300, 1000);
	ctx.fillText("Flies: " + player.flies, 300, 1150);
}
