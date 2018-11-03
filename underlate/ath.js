function draw_ath() {
	ctx.beginPath();
	ctx.rect(0, 900, 1200, 300);
	ctx.fillStyle = "#777777";
	ctx.fill();
	ctx.closePath();
	ctx.font = "150px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Flies: " + player.flies,300,1050);
}
