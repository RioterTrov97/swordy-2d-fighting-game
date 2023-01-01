import './style.css';
import {
	getDefaultBackgroundInstance,
	getDefaultShopInstance,
	getDefaultPlayerInstance,
	getDefaultEnemyInstance,
} from './js/instances';
import { rectangularCollision, determineWinner } from './js/utils';
import { DEFAULT_TIMER } from './js/constants';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// instantiate default state
let background = getDefaultBackgroundInstance();
let shop = getDefaultShopInstance();
let player = getDefaultPlayerInstance();
let enemy = getDefaultEnemyInstance();

const keys = {
	a: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
	ArrowRight: {
		pressed: false,
	},
	ArrowLeft: {
		pressed: false,
	},
};

let timer = DEFAULT_TIMER;
let timerId;
export function decreaseTimer() {
	if (timer > 0) {
		timerId = setTimeout(decreaseTimer, 1000);
		timer--;
		document.querySelector('#timer').innerHTML = timer;
	} else {
		determineWinner({ player, enemy, timerId });
	}
}

function animate() {
	window.requestAnimationFrame(animate);
	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height);
	background.update();
	shop.update();
	c.fillStyle = 'rgba(255,255,255,0.15)';
	c.fillRect(0, 0, canvas.width, canvas.height);
	player.update();
	enemy.update();

	// player movement
	const playerLastKey = player.lastKey;
	player.velocity.x = 0;
	if (keys.a.pressed && playerLastKey === 'a') {
		player.velocity.x = -5;
		player.switchSprite('run');
	} else if (keys.d.pressed && playerLastKey === 'd') {
		player.velocity.x = 5;
		player.switchSprite('run');
	} else {
		player.switchSprite('idle');
	}

	// jumping
	if (player.velocity.y < 0) {
		player.switchSprite('jump');
	} else if (player.velocity.y > 0) {
		player.switchSprite('fall');
	}

	// enemy movement
	const enemyLastKey = enemy.lastKey;
	enemy.velocity.x = 0;
	if (keys.ArrowLeft.pressed && enemyLastKey === 'ArrowLeft') {
		enemy.velocity.x = -5;
		enemy.switchSprite('run');
	} else if (keys.ArrowRight.pressed && enemyLastKey === 'ArrowRight') {
		enemy.velocity.x = 5;
		enemy.switchSprite('run');
	} else {
		enemy.switchSprite('idle');
	}

	// jumping
	if (enemy.velocity.y < 0) {
		enemy.switchSprite('jump');
	} else if (enemy.velocity.y > 0) {
		enemy.switchSprite('fall');
	}

	// detect for collision
	if (
		rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
		player.isAttacking &&
		player.framesCurrent === 4
	) {
		enemy.takeHit();
		player.isAttacking = false;
		// document.querySelector('#enemyHealth').style.width = enemy.health + '%';
		gsap.to('#enemyHealth', {
			width: enemy.health + '%',
		});
		document.querySelector('.enemy-health-percentage').innerHTML =
			enemy.health + '%';
	}

	// if player misses
	if (player.isAttacking && player.framesCurrent === 4) {
		player.isAttacking = false;
	}

	if (
		rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
		enemy.isAttacking &&
		enemy.framesCurrent === 2
	) {
		player.takeHit();
		enemy.isAttacking = false;
		gsap.to('#playerHealth', {
			width: player.health + '%',
		});
		document.querySelector('.player-health-percentage').innerHTML =
			player.health + '%';
	}

	// if enemy misses
	if (enemy.isAttacking && enemy.framesCurrent === 2) {
		enemy.isAttacking = false;
	}

	// end game based on health
	if (enemy.health <= 0 || player.health <= 0 || timer <= 0) {
		determineWinner({ player, enemy, timerId });
	}
}

animate();

let hasGameStarted = false;

window.addEventListener('keydown', ({ key }) => {
	if (!timer || !hasGameStarted) return;

	if (!player.dead) {
		switch (key) {
			case 'a':
				keys.a.pressed = true;
				player.lastKey = 'a';
				break;
			case 'd':
				keys.d.pressed = true;
				player.lastKey = 'd';
				break;
			case 'w':
				if (player.velocity.y === 0) player.velocity.y = -16;
				break;
			case 's':
				player.attack();
				break;
			default:
				break;
		}
	}
	if (!enemy.dead) {
		switch (key) {
			case 'ArrowRight':
				keys.ArrowRight.pressed = true;
				enemy.lastKey = 'ArrowRight';
				break;
			case 'ArrowLeft':
				keys.ArrowLeft.pressed = true;
				enemy.lastKey = 'ArrowLeft';
				break;
			case 'ArrowUp':
				if (enemy.velocity.y === 0) enemy.velocity.y = -16;
				break;
			case 'ArrowDown':
				enemy.attack();
				break;
			default:
				break;
		}
	}
});

window.addEventListener('keyup', ({ key }) => {
	switch (key) {
		case 'a':
			keys.a.pressed = false;
			break;
		case 'd':
			keys.d.pressed = false;
			break;
		case 'ArrowRight':
			keys.ArrowRight.pressed = false;
			break;
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = false;
			break;

		default:
			break;
	}
});

const resetButton = document.querySelector('.reset-btn');
resetButton.addEventListener('click', () => {
	background = getDefaultBackgroundInstance();
	shop = getDefaultShopInstance();
	player = getDefaultPlayerInstance();
	enemy = getDefaultEnemyInstance();

	gsap.to('#playerHealth', {
		width: player.health + '%',
	});
	gsap.to('#enemyHealth', {
		width: enemy.health + '%',
	});

	document.querySelector('.result-container').style.display = 'none';
	document.querySelector('.reset').style.display = 'none';

	timer = DEFAULT_TIMER;
	decreaseTimer();
});

const startButton = document.querySelector('.start-btn');
startButton.addEventListener('click', () => {
	document.querySelector('.start').style.display = 'none';
	hasGameStarted = true;
	decreaseTimer();
});
