import { Fighter, Sprite } from './classes';

// shop and background images
import backgroundImageUrl from '../img/background.png';
import shopImageUrl from '../img/shop.png';

// player sprites
import playerIdleImageUrl from '../img/samuraiMack/Idle.png';
import playerRunImageUrl from '../img/samuraiMack/Run.png';
import playerJumpImageUrl from '../img/samuraiMack/Jump.png';
import playerFallImageUrl from '../img/samuraiMack/Fall.png';
import playerAttack1ImageUrl from '../img/samuraiMack/Attack1.png';
import playerTakeHitImageUrl from '../img/samuraiMack/Take Hit - white silhouette.png';
import playerDeathImageUrl from '../img/samuraiMack/Death.png';

// enemy sprites
import enemyIdleImageUrl from '../img/kenji/Idle.png';
import enemyRunImageUrl from '../img/kenji/Run.png';
import enemyJumpImageUrl from '../img/kenji/Jump.png';
import enemyFallImageUrl from '../img/kenji/Fall.png';
import enemyAttack1ImageUrl from '../img/kenji/Attack1.png';
import enemyTakeHitImageUrl from '../img/kenji/Take Hit.png';
import enemyDeathImageUrl from '../img/kenji/Death.png';

export const getDefaultBackgroundInstance = () =>
	new Sprite({
		position: { x: 0, y: 0 },
		imageSrc: backgroundImageUrl,
	});

export const getDefaultShopInstance = () =>
	new Sprite({
		position: { x: 670, y: 128 },
		imageSrc: shopImageUrl,
		scale: 2.75,
		framesMax: 6,
	});

export const getDefaultPlayerInstance = () =>
	new Fighter({
		position: { x: 0, y: 0 },
		velocity: { x: 0, y: 1 },
		imageSrc: playerIdleImageUrl,
		framesMax: 8,
		scale: 2.5,
		offset: {
			x: 215,
			y: 157,
		},
		sprites: {
			idle: {
				imageSrc: playerIdleImageUrl,
				framesMax: 8,
			},
			run: {
				imageSrc: playerRunImageUrl,
				framesMax: 8,
			},
			jump: {
				imageSrc: playerJumpImageUrl,
				framesMax: 2,
			},
			fall: {
				imageSrc: playerFallImageUrl,
				framesMax: 2,
			},
			attack1: {
				imageSrc: playerAttack1ImageUrl,
				framesMax: 6,
			},
			takeHit: {
				imageSrc: playerTakeHitImageUrl,
				framesMax: 4,
			},
			death: {
				imageSrc: playerDeathImageUrl,
				framesMax: 6,
			},
		},
		attackBox: {
			offset: { x: 100, y: 50 },
			width: 160,
			height: 50,
		},
	});

export const getDefaultEnemyInstance = () =>
	new Fighter({
		position: { x: 950, y: 100 },
		velocity: { x: 0, y: 0 },
		offset: { x: -50, y: 0 },
		color: 'blue',
		imageSrc: enemyIdleImageUrl,
		framesMax: 4,
		scale: 2.5,
		offset: {
			x: 215,
			y: 167,
		},
		sprites: {
			idle: {
				imageSrc: enemyIdleImageUrl,
				framesMax: 4,
			},
			run: {
				imageSrc: enemyRunImageUrl,
				framesMax: 8,
			},
			jump: {
				imageSrc: enemyJumpImageUrl,
				framesMax: 2,
			},
			fall: {
				imageSrc: enemyFallImageUrl,
				framesMax: 2,
			},
			attack1: {
				imageSrc: enemyAttack1ImageUrl,
				framesMax: 4,
			},
			takeHit: {
				imageSrc: enemyTakeHitImageUrl,
				framesMax: 3,
			},
			death: {
				imageSrc: enemyDeathImageUrl,
				framesMax: 6,
			},
		},
		attackBox: {
			offset: { x: -175, y: 50 },
			width: 175,
			height: 50,
		},
	});
