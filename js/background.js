// Purpose: Background class to handle the background layers and mouse events.
class Background {
	constructor() {
		this.radius = 70;
		this.influenceArea = {
			x: 100, y: 100,
			width: this.radius * 2,
			height: this.radius * 2
		};
		this.isThrottled = false;
		const s = "./assets/background/space_px_bg_";
		this.sectionBgs = [ s+'8', s+'10', s+'11', s+'6', s+'4', ];
		this.darkLayer = './assets/background/black_bg.png';
	};

	init() {
		this.createBackgroundLayers();
		this.setupEventListeners();
	};

	createBackgroundLayers() {
		this.backgroundLayer1 = document.createElement('div');
		this.backgroundLayer1.id = "bg-layer-1";
		this.applyBackgroundStyles(this.backgroundLayer1, this.sectionBgs[0]+'.png', 1);
		document.body.appendChild(this.backgroundLayer1);

		this.backgroundLayer2 = document.createElement('div');
		this.backgroundLayer2.id = "bg-layer-2";
		this.applyBackgroundStyles(this.backgroundLayer2, this.darkLayer, 2);
		document.body.appendChild(this.backgroundLayer2);
	};

	applyBackgroundStyles(element, imageUrl, zIndex) {
		Object.assign(element.style, {
			position: 'fixed', top: '0', left: '0', width: '100%', height: '100vh', 
			backgroundImage: "url("+imageUrl+")", backgroundSize: 'cover', 
			backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: zIndex, 
			transition: 'background-image 1s ease-in-out'
		});
		//// loading lazy
		element.style.filter = 'blur(10px)';
		element.style.transition = 'filter 0.5s ease-in-out';
		setTimeout(() => { element.style.filter = 'blur(0)'; }, 1000);
	};

	setupEventListeners() {
		if (window.innerWidth > 768) {
			setTimeout(() => {
				const throttledMouseMove = this.throttle(this.handleMouseMove.bind(this), 100);
				document.addEventListener('mousemove', throttledMouseMove);
				document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
				document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
			}, 10000);
		}
	};

	throttle(func, limit) {
		let inThrottle;
		return function() {
			const args = arguments;
			const context = this;
			if (!inThrottle) {
				func.apply(context, args);
				inThrottle = true;
				setTimeout(() => inThrottle = false, limit);
			}
		};
	};

	handleMouseMove(e) {
		if (!this.isThrottled) {
			this.isThrottled = true;
			setTimeout(() => this.isThrottled = false, 100);
			requestAnimationFrame(() => {
				if (app.mouseMarkEnabled) {
					this.updateBackgroundMask(this.backgroundLayer2, e.clientX, e.clientY, this.radius);
					this.influenceArea.x = e.clientX - this.influenceArea.width / 2;
					this.influenceArea.y = e.clientY - this.influenceArea.height / 2;
				} else { this.backgroundLayer2.style.webkitMaskImage = 'none'; }
			});
		}
	};	

	handleMouseDown(e) {
		if (app.mouseMarkEnabled) {
			this.radius = 180;
			this.updateBackgroundMask(this.backgroundLayer2, e.clientX, e.clientY, this.radius);
		} else { this.backgroundLayer2.style.webkitMaskImage = 'none'; }
	};

	handleMouseUp(e) {
		if (app.mouseMarkEnabled) {
			this.radius = 70;
			this.updateBackgroundMask(this.backgroundLayer2, e.clientX, e.clientY, this.radius);
		} else { this.backgroundLayer2.style.webkitMaskImage = 'none'; }
	};

	updateBackgroundMask(element, x, y, maskSize) {
		element.style.webkitMaskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
		element.style.maskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
	};

	updateBackgroundForSection(sectionIndex) {
		this.backgroundLayer1.style.backgroundImage = 'url(' + this.sectionBgs[sectionIndex - 1] + '.png)';
	};
};

