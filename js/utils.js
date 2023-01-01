export function rectangularCollision({ rectangle1, rectangle2 }) {
	const isOverTheLeft =
		rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
		rectangle2.position.x;
	const isFrontOfRight =
		rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width;
	const isUnderTheTop =
		rectangle1.attackBox.position.y <=
		rectangle2.position.y + rectangle2.height;
	const isOverTheBottom =
		rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
		rectangle2.position.y;

	return isOverTheLeft && isFrontOfRight && isUnderTheTop && isOverTheBottom;
}

export function determineWinner({ player, enemy, timerId }) {
	clearTimeout(timerId);
	if (player.health === enemy.health) {
		document.querySelector('.result').innerHTML = 'Tie 😔😔😔';
	} else if (player.health > enemy.health) {
		document.querySelector('.result').innerHTML = 'Player 1 Wins 🎉🎉🎉';
	} else {
		document.querySelector('.result').innerHTML = 'Player 2 Wins 🎉🎉🎉';
	}
	document.querySelector('.result-container').style.display = 'flex';
	document.querySelector('.reset').style.display = 'flex';
}
