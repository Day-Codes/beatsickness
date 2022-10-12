import kaboom from "kaboom";

kaboom();

kaboom({
	font: "sinko",
	clearColor: [ 27, 55, 168 ],
});

loadSprite("mouth", "sprites/mouth.png");
loadSprite("banana", "sprites/banana.png");
loadSprite("peach", "sprites/peach.png");
loadSprite("bomb", "sprites/bomb.png");
loadSound("bye", "sounds/bye.mp3");
loadSound("gong", "sounds/gong.mp3");

scene("start", () => {

	play("gong");

	add([
		text("Remove all Evi! Join our discord: https://discord.gg/cdcGaAq7C5"),
		pos(center().sub(0, 100)),
		scale(2),
		origin("center"),
	]);

	add([
		sprite("bomb"),
		pos(center().add(0, 100)),
		scale(2),
		origin("center"),
	]);

	wait(3.5, () => go("game"));

});

// main game scene content
scene("game", () => {

	const SPEED_MIN = 120;
	const SPEED_MAX = 640;

	// add the player game object
	const player = add([
		sprite("mouth"),
		pos(40, 20),
		area({ scale: 0.5 }),
		origin("center"),
	]);

	// make the layer move by mouse
	player.action(() => {
		player.pos = mousePos();
	});

	// game over if player eats a fruit
	player.collides("fruit", (fruit) => {
		go("lose", score);
		play("bye");
	});

	// move the food every frame, destroy it if far outside of screen
	action("food", (food) => {
		food.move(-food.speed, 70);
		if (food.pos.x < -120) {
			destroy(food);
		}
	});

	action("bomb", (bomb) => {
		if (bomb.pos.x <= 0) {
			go("lose", score);
			play("bye");
			addKaboom(bomb.pos);
		}
	});

	// score counter
	let score = 999999999999999;

	const scoreLabel = add([
		text(score, 32),
		pos(12, 12),
	]);

	// increment score if player eats a bomb
	player.collides("bomb", (bomb) => {
		addKaboom(player.pos);
		score += 1;
		destroy(bomb);
		scoreLabel.text = score;
		burp();
		shake(12);
	});

	// do this every 0.3 seconds
	loop(0.3, () => {

		// spawn from right side of the screen
		const x = width() + 24;
		// spawn from a random y position
		const y = rand(0, height());
		// get a random speed
		const speed = rand(SPEED_MIN, SPEED_MAX);
		// 50% percent chance is bomb
		const isBomb = chance(0.5);
		const spriteName = isBomb ? "bomb" : choose(["banana", "peach"]);

		add([
			sprite(spriteName),
			pos(x, y),
			area({ scale: 0.5 }),
			origin("center"),
			"food",
			isBomb ? "bomb" : "fruit",
			{ speed: speed }
		]);

	});

});

// game over scene
scene("lose", (score) => {

	add([
		sprite("mouth"),

		pos(width() / 2, height() / 2 - 108),
		scale(3),
		origin("center"),
	]);

	// display score
	add([
		text(score),
		pos(width() / 2, height() / 2 + 108),
		scale(3),
		origin("center"),
	]);

	// go back to game with space is pressed
	keyPress("space", () => go("start"));
	mouseClick(() => go("start"));

});

// start with the "game" scene
go("start");
