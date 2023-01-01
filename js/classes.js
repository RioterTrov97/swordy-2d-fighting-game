import { HEALTH_DECREASE_ON_HIT, GRAVITY } from './constants';
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

class Sprite {
	constructor({
		position,
		imageSrc,
		scale = 1,
		framesMax = 1,
		offset = { x: 0, y: 0 },
	}) {
		this.position = position;
		this.width = 50;
		this.height = 150;
		this.image = new Image();
		this.image.src = imageSrc;
		this.scale = scale;
		this.framesMax = framesMax;
		this.framesCurrent = 0;
		this.framesElapsed = 0;
		this.framesHold = 5;
		this.offset = offset;
	}

	draw() {
		c.drawImage(
			this.image,
			this.framesCurrent * (this.image.width / this.framesMax),
			0,
			this.image.width / this.framesMax,
			this.image.height,
			this.position.x - this.offset.x,
			this.position.y - this.offset.y,
			(this.image.width / this.framesMax) * this.scale,
			this.image.height * this.scale
		);
	}

	animateFrames() {
		this.framesElapsed++;

		if (this.framesElapsed % this.framesHold === 0) {
			if (this.framesCurrent < this.framesMax - 1) {
				this.framesCurrent++;
			} else {
				this.framesCurrent = 0;
			}
		}
	}

	update() {
		this.draw();
		this.animateFrames();
	}
}

class Fighter extends Sprite {
	constructor({
		position,
		velocity,
		color = 'red',
		// offset,
		imageSrc,
		scale = 1,
		framesMax = 1,
		offset = { x: 0, y: 0 },
		sprites,
		attackBox = {
			offset: { x: 0, y: 0 },
			width: undefined,
			height: undefined,
		},
	}) {
		super({
			position,
			imageSrc,
			scale,
			framesMax,
			offset,
		});
		this.framesCurrent = 0;
		this.framesElapsed = 0;
		this.framesHold = 5;
		this.velocity = velocity;
		this.width = 50;
		this.height = 150;
		this.lastKey;
		this.attackBox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			offset: attackBox.offset,
			width: attackBox.width,
			height: attackBox.height,
		};
		this.color = color;
		this.isAttacking = false;
		this.health = 100;
		this.sprites = sprites;
		this.dead = false;

		for (const sprite in this.sprites) {
			sprites[sprite].image = new Image();
			sprites[sprite].image.src = sprites[sprite].imageSrc;
		}
	}

	update() {
		this.draw();
		if (!this.dead) this.animateFrames();

		this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
		this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

		this.position.x += this.velocity.x;

		// stop fighter from going out of frame
		if (this.position.x < 0) {
			this.position.x = 0;
		} else if (this.position.x >= 950) {
			this.position.x = 950;
		}

		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
			this.velocity.y = 0;
			this.position.y = 330;
		} else {
			this.velocity.y += GRAVITY;
		}
	}

	attack() {
		this.switchSprite('attack1');
		this.isAttacking = true;
	}

	takeHit() {
		this.health -= HEALTH_DECREASE_ON_HIT;
		this.switchSprite(this.health <= 0 ? 'death' : 'takeHit');
	}

	switchSprite(sprite) {
		// If it is still attack frames, don't draw idle
		if (this.image === this.sprites.death.image) {
			if (this.framesCurrent === this.sprites.death.framesMax - 1)
				this.dead = true;
			return;
		}

		// If it is still attack frames, don't draw idle
		if (
			this.image === this.sprites.attack1.image &&
			this.framesCurrent < this.sprites.attack1.framesMax - 1
		)
			return;

		// If fight gets hit override
		if (
			this.image === this.sprites.takeHit.image &&
			this.framesCurrent < this.sprites.takeHit.framesMax - 1
		)
			return;

		if (this.image !== this.sprites[sprite].image) {
			this.image = this.sprites[sprite].image;
			this.framesMax = this.sprites[sprite].framesMax;
			this.framesCurrent = 0;
		}
	}
}

export { Fighter, Sprite };
