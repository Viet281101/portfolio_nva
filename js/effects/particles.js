
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.zIndex = '-1';
if (window.innerWidth < 1000) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.left = '0';
} else {
	canvas.width = window.innerWidth - 220;
	canvas.height = window.innerHeight;
	canvas.style.left = '220px';
}


const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'blue');
gradient.addColorStop(0.5, 'pink');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.strokeStyle = 'white';

class Particle {
	constructor(effect) {
		this.effect = effect;
		this.radius = Math.floor(Math.random() * 7 + 2);

		this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
		this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);

		this.speedX = Math.random() * 1 - 0.5;
		this.speedY = Math.random() * 1 - 0.5;

		this.pushX = 0;
		this.pushY = 0;
		this.friction = 0.95;
	}

	draw(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.fill();
		// context.stroke();
	}

	update() {
		if (this.effect.mouse.pressed) {
			const dx = this.x - this.effect.mouse.x;
			const dy = this.y - this.effect.mouse.y;
			const distance = Math.hypot(dx, dy);
			// const distance = Math.sqrt(Math.pow(this.x - this.effect.mouse.x, 2) + Math.pow(this.y - this.effect.mouse.y, 2));
			const force = (this.effect.mouse.radius / distance);
			if (distance < this.effect.mouse.radius) {
				const angle = Math.atan2(dy, dx);
				this.pushX += Math.cos(angle) * force;
				this.pushY += Math.sin(angle) * force;
			}
		}

		this.x += (this.pushX *= this.friction) + this.speedX;
		this.y += (this.pushY *= this.friction) + this.speedY;

		if (this.x < this.radius) {
			this.x = this.radius;
			this.speedX *= -1;
		} else if (this.x > this.effect.width - this.radius) {
			this.x = this.effect.width - this.radius;
			this.speedX *= -1;
		}

		if (this.y < this.radius) {
			this.y = this.radius;
			this.speedY *= -1;
		} else if (this.y > this.effect.height - this.radius) {
			this.y = this.effect.height - this.radius;
			this.speedY *= -1;
		}

	}

	reset() {
		this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
		this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
	}
};


class Effect {
	constructor(canvas, context) {
		this.canvas = canvas;
		this.context = context;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.particles = [];
		if (this.canvas.width < 1000) {
			this.numberOfParticles = 50;
		} else {
			this.numberOfParticles = 250;
		}
		this.createParticles();

		this.mouse = {
			x: 0,
			y: 0,
			pressed: false,
			radius: 150,
		};

		window.addEventListener('resize', e => {
			console.log(e.target.window.innerWidth);
			this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
		});

		window.addEventListener('mousemove', e => {
			// console.log(e.x, e.y);
			if (this.mouse.pressed) {
				if (canvas.width < 1000) {
					this.mouse.x = e.x;
				} else {
					this.mouse.x = e.x - 220;
				}
				this.mouse.y = e.y;
				// console.log(this.mouse.x, this.mouse.y);
			}
		});

		window.addEventListener('mousedown', e => {
			this.mouse.pressed = true;
			if (canvas.width < 1000) {
				this.mouse.x = e.x;
			} else {
				this.mouse.x = e.x - 220;
			}
			this.mouse.y = e.y;
		});

		window.addEventListener('mouseup', e => {
			this.mouse.pressed = false;
		});
	}

	createParticles() {
		for (let i = 0; i < this.numberOfParticles; i++) {
			this.particles.push(new Particle(this));
		}
	}

	handleParticles(context) {
		this.connectParticles(context);
		this.particles.forEach(particle => {
			particle.draw(context);
			particle.update();
		});
	}

	connectParticles(context) {
		const maxDistance = 100;
		for (let a = 0; a < this.particles.length; a++) {
			for (let b = a; b < this.particles.length; b++) {
				const dx = this.particles[a].x - this.particles[b].x;
				const dy = this.particles[a].y - this.particles[b].y;
				const distance = Math.hypot(dx, dy);
				// const distance = Math.sqrt(Math.pow(this.particles[a].x - this.particles[b].x, 2) + Math.pow(this.particles[a].y - this.particles[b].y, 2));
				if (distance < maxDistance) {
					context.save();
					const opacity = 1 - distance / maxDistance;
					// context.globalAlpha = opacity;
					context.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
					context.lineWidth = 1;

					context.beginPath();
					context.moveTo(this.particles[a].x, this.particles[a].y);
					context.lineTo(this.particles[b].x, this.particles[b].y);
					context.stroke();
					context.restore();
				}
			}
		}
	}

	resize(width, height) {
		if (width < 1000) {
			this.canvas.width = width;
			this.canvas.height = height;
			this.canvas.style.left = '0';
		}
		else {
			this.canvas.width = width - 220;
			this.canvas.height = height;
			this.canvas.style.left = '220px';
		}
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		const gradient = this.context.createLinearGradient(0, 0, width, height);
		gradient.addColorStop(0, 'blue');
		gradient.addColorStop(0.5, 'pink');
		gradient.addColorStop(1, 'blue');
		this.context.fillStyle = gradient;
		this.context.strokeStyle = 'white';

		this.particles.forEach(particle => {
			particle.reset();
		});
	}
};


const effect = new Effect(canvas, ctx);


function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	effect.handleParticles(ctx);
	requestAnimationFrame(animate);
};

animate();
