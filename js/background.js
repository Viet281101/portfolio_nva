// Purpose: Background class to handle the background layers and mouse events.
class Background {
	constructor() {
		this.radius = 70;
		this.influenceArea = {
			x: 100,
			y: 100,
			width: this.radius * 2,
			height: this.radius * 2
		};
		this.sectionBackgrounds = [
			'./assets/background/space_px_bg_8.png',
			'./assets/background/space_px_bg_10.png',
			'./assets/background/space_px_bg_11.png',
			'./assets/background/space_px_bg_6.png',
			'./assets/background/space_px_bg_4.png',
		];
	};

	init() {
		this.createBackgroundLayers();
		this.setupEventListeners();
	};

	createBackgroundLayers() {
		this.backgroundLayer1 = document.createElement('div');
		this.applyBackgroundStyles(this.backgroundLayer1, './assets/background/space_px_bg_8.png', 1);
		document.body.appendChild(this.backgroundLayer1);

		this.backgroundLayer2 = document.createElement('div');
		this.applyBackgroundStyles(this.backgroundLayer2, './assets/background/black_bg.png', 2);
		document.body.appendChild(this.backgroundLayer2);
	};

	applyBackgroundStyles(element, imageUrl, zIndex) {
		element.style.position = 'fixed';
		element.style.top = '0';
		element.style.left = '0';
		element.style.width = '100%';
		element.style.height = '100vh';
		element.style.backgroundImage = 'url(' + imageUrl + ')';
		element.style.backgroundSize = 'cover';
		element.style.backgroundPosition = 'center';
		element.style.backgroundRepeat = 'no-repeat';
		element.style.zIndex = zIndex;
		element.style.transition = 'background-image 1s ease-in-out';
		//// loading lazy
		element.style.filter = 'blur(10px)';
		element.style.transition = 'filter 0.5s ease-in-out';
		setTimeout(() => {
			element.style.filter = 'blur(0)';
		}, 1000);
	};

	setupEventListeners() {
		if (window.innerWidth > 768) {
			setTimeout(() => {
				document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
				document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
				document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
			}, 2000);
		}
	};

	handleMouseMove(e) {
		if (app.mouseMarkEnabled) {
			this.updateBackgroundMask(this.backgroundLayer2, e.clientX, e.clientY, this.radius);
			this.influenceArea.x = e.clientX - this.influenceArea.width / 2;
			this.influenceArea.y = e.clientY - this.influenceArea.height / 2;
		} else {
			this.backgroundLayer2.style.webkitMaskImage = 'none';
		}
	};

	handleMouseDown(e) {
		if (app.mouseMarkEnabled) {
			this.radius = 180;
			this.updateBackgroundMask(this.backgroundLayer2, e.clientX, e.clientY, this.radius);
		} else {
			this.backgroundLayer2.style.webkitMaskImage = 'none';
		}
	};

	handleMouseUp(e) {
		if (app.mouseMarkEnabled) {
			this.radius = 70;
			this.updateBackgroundMask(this.backgroundLayer2, e.clientX, e.clientY, this.radius);
		} else {
			this.backgroundLayer2.style.webkitMaskImage = 'none';
		}
	};

	updateBackgroundMask(element, x, y, maskSize) {
		element.style.webkitMaskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
		element.style.maskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
	};

	updateBackgroundForSection(sectionIndex) {
		this.backgroundLayer1.style.backgroundImage = 'url(' + this.sectionBackgrounds[sectionIndex - 1] + ')';
	};
};

