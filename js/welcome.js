
class WelcomeStartUpPopUp {
	constructor() {
		this.key_src = "./assets/key/keyboard_";
		this.key_up_1 = this.key_src + "70.png";
		this.key_up_2 = this.key_src + "171.png";
		this.key_down_1 = this.key_src + "71.png";
		this.key_down_2 = this.key_src + "172.png";
		this.key_right_1 = this.key_src + "72.png";
		this.key_right_2 = this.key_src + "173.png";
		this.key_left_1 = this.key_src + "73.png";
		this.key_left_2 = this.key_src + "174.png";
		this.x_close = "./assets/icons/x_close.png";
		this.popupElement = null;
		this.intervalId = null;
	};

	createStartUpPopUp() {
		this.popupElement = document.createElement("div");
		this.popupElement.id = "welcomePopup";
		Object.assign(this.popupElement.style, {
			position: 'fixed', top: '0', left: '0',
			width: '100%', height: '100%',
			backgroundColor: 'rgba(0, 0, 0, 0.9)', color: 'white',
			display: 'flex', flexDirection: 'column',
			justifyContent: 'center', alignItems: 'center',
			zIndex: '14'
		});
		document.body.appendChild(this.popupElement);

		const popupContent = document.createElement("div");
		popupContent.id = "popupContent";
		Object.assign(popupContent.style, {
			position: 'relative', padding: '20px'
		});
		this.popupElement.appendChild(popupContent);

		const closeBtn = document.createElement("img");
		closeBtn.id = "closeBtn";
		closeBtn.src = this.x_close;
		closeBtn.alt = "Close"; closeBtn.title = "Close";
		closeBtn.loading = "lazy";
		closeBtn.addEventListener("mouseover", () => closeBtn.style.transform = "scale(1.3)");
		closeBtn.addEventListener("mouseout", () => closeBtn.style.transform = "scale(1)");
		closeBtn.addEventListener("click", () => this.closePopup());
		Object.assign(closeBtn.style, {
			position: 'absolute', top: '50px', right: '-50px',
			cursor: 'pointer', width: '80px', height: '80px'
		});
		popupContent.appendChild(closeBtn);

		const heading = document.createElement("h1");
		heading.textContent = "WELCOME TO MY SITE!";
		Object.assign(heading.style, {
			textAlign: 'center', marginTop: '50px', fontSize: '50px'
		});
		popupContent.appendChild(heading);

		const instructions = document.createElement("p");
		instructions.textContent = "If you are using a computer, you can use the following keys to navigate the site:";
		Object.assign(instructions.style, {
			textAlign: 'center', fontSize: '25px', marginTop: '20px', wordWrap: 'break-word'
		});
		popupContent.appendChild(instructions);
	
		this.createKeyImages(popupContent);

		this.updateKeyImages();
		this.intervalId = setInterval(() => this.updateKeyImages(), 1000);
		setTimeout(() => this.closePopup(), 10000);
	};

	createKeyImages(popupContent) {
		const keyGuide = document.createElement("div");
		keyGuide.id = "keyGuide";
		Object.assign(keyGuide.style, {
			display: 'flex', width: '100%',
			justifyContent: 'center', marginTop: '50px'
		});
		popupContent.appendChild(keyGuide);

		const keyImages = document.createElement("div");
		keyImages.id = "keyImages";
		keyGuide.appendChild(keyImages);

		const keys = [this.key_up_1, this.key_down_1, this.key_right_1, this.key_left_1];
		keys.forEach((key, index) => {
			const img = document.createElement("img");
			img.src = key;
			img.alt = `Key ${index}`;
			img.loading = "lazy";
			Object.assign(img.style, {
				display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
				gap: '20px', marginBottom: '20px', marginTop: '15px', width: '50px'
			});
			keyImages.appendChild(img);
		});

		const keyDescriptions = document.createElement("ul");
		keyDescriptions.style.listStyle = "none";
		keyDescriptions.id = "keyDescriptions";
		Object.assign(keyDescriptions.style, {
			textAlign: 'left'
		});
		const descriptions = ["Up - Scroll Up", "Down - Scroll Down", "Right - Next Page", "Left - Previous Page"];
		descriptions.forEach(description => {
			const li = document.createElement("li");
			li.textContent = description;
			Object.assign(li.style, {
				fontSize: '20px', marginBottom: '40px', justifyContent: 'space-around'
			});
			keyDescriptions.appendChild(li);
		});
		keyGuide.appendChild(keyDescriptions);
	};

	updateKeyImages() {
		const keyImageElements = document.getElementById("keyImages")?.getElementsByTagName("img");
		if (!keyImageElements) return;
		if (keyImageElements.length === 0) {
			const keys = [this.key_up_1, this.key_down_1, this.key_right_1, this.key_left_1];
			keys.forEach(key => {
				const img = document.createElement("img");
				img.src = key;
				img.alt = "Key";
				img.loading = "lazy";
				Object.assign(img.style, {
					display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
					gap: '20px', marginBottom: '20px', marginTop: '15px', width: '50px'
				});
				document.getElementById("keyImages").appendChild(img);
			});
		} else {
			keyImageElements[0].src = this.key_up_1;
			keyImageElements[1].src = this.key_down_1;
			keyImageElements[2].src = this.key_right_1;
			keyImageElements[3].src = this.key_left_1;
		}

		[this.key_up_1, this.key_up_2] = [this.key_up_2, this.key_up_1];
		[this.key_down_1, this.key_down_2] = [this.key_down_2, this.key_down_1];
		[this.key_right_1, this.key_right_2] = [this.key_right_2, this.key_right_1];
		[this.key_left_1, this.key_left_2] = [this.key_left_2, this.key_left_1];
	};

	closePopup() { 
		clearInterval(this.intervalId);
		this.popupElement.remove();
		this.removeScriptTag();
	};
	removeScriptTag() {
		const scripts = document.getElementsByTagName('script');
		for (let script of scripts) {
			if (script.src.includes('welcome.js')) {
				script.parentNode.removeChild(script);
				break;
			}
		}
	};
	init() { this.createStartUpPopUp(); };
};

const welcomeStartUpPopUp = new WelcomeStartUpPopUp();
if (window.innerWidth > 1000) welcomeStartUpPopUp.init();
