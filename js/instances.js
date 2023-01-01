import { Fighter, Sprite } from './classes';

export const getDefaultBackgroundInstance = () =>
	new Sprite({
		position: { x: 0, y: 0 },
		imageSrc: './img/background.png',
	});

export const getDefaultShopInstance = () =>
	new Sprite({
		position: { x: 670, y: 128 },
		imageSrc: './img/shop.png',
		scale: 2.75,
		framesMax: 6,
	});

export const getDefaultPlayerInstance = () =>
	new Fighter({
		position: { x: 0, y: 0 },
		velocity: { x: 0, y: 1 },
		imageSrc: './img/samuraiMack/Idle.png',
		framesMax: 8,
		scale: 2.5,
		offset: {
			x: 215,
			y: 157,
		},
		sprites: {
			idle: {
				imageSrc: './img/samuraiMack/Idle.png',
				framesMax: 8,
			},
			run: {
				imageSrc: './img/samuraiMack/Run.png',
				framesMax: 8,
			},
			jump: {
				imageSrc: './img/samuraiMack/Jump.png',
				framesMax: 2,
			},
			fall: {
				imageSrc: './img/samuraiMack/Fall.png',
				framesMax: 2,
			},
			attack1: {
				imageSrc: './img/samuraiMack/Attack1.png',
				framesMax: 6,
			},
			takeHit: {
				imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
				framesMax: 4,
			},
			death: {
				imageSrc: './img/samuraiMack/Death.png',
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
		imageSrc: './img/kenji/Idle.png',
		framesMax: 4,
		scale: 2.5,
		offset: {
			x: 215,
			y: 167,
		},
		sprites: {
			idle: {
				imageSrc: './img/kenji/Idle.png',
				framesMax: 4,
			},
			run: {
				imageSrc: './img/kenji/Run.png',
				framesMax: 8,
			},
			jump: {
				imageSrc: './img/kenji/Jump.png',
				framesMax: 2,
			},
			fall: {
				imageSrc: './img/kenji/Fall.png',
				framesMax: 2,
			},
			attack1: {
				imageSrc: './img/kenji/Attack1.png',
				framesMax: 4,
			},
			takeHit: {
				imageSrc: './img/kenji/Take hit.png',
				framesMax: 3,
			},
			death: {
				imageSrc: './img/kenji/Death.png',
				framesMax: 6,
			},
		},
		attackBox: {
			offset: { x: -175, y: 50 },
			width: 175,
			height: 50,
		},
	});
