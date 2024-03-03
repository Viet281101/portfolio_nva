
class ScrollOnTop {
	constructor() {
		this.scrollOnTopBtn = "./assets/icons/nav_up.png";
	};

	createScrollOnTopBtn() {
		const btn = document.createElement('button');
		btn.title = 'Scroll to top';
		btn.id = 'scrollOnTopBtn';
		btn.innerHTML = `<img src="${this.scrollOnTopBtn}" alt="Scroll to top" style="width: 30px; height: 30px;">`;
		document.body.appendChild(btn);

		btn.addEventListener('click', () => {
			if (window.innerWidth > 800) $("#fullpage").data('fullpage').moveTo(1);
			else window.scrollTo({ top: 0, behavior: 'smooth' });
		});
		btn.addEventListener('mouseover', () => { app.mouseMarkEnabled = false; });
		btn.addEventListener('mouseout', () => {
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses') app.mouseMarkEnabled = true;
		});
		this.styleScrollOnTopBtn();
	};

	updateContent(lang) {
		const btn = document.getElementById('scrollOnTopBtn');
		if (lang === 'en') btn.title = 'Scroll to top';
		else if (lang === 'fr') btn.title = 'Haut de page';
	};

	styleScrollOnTopBtn() {
		const style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `
			#scrollOnTopBtn {
				position: fixed;
				bottom: 20px;
				right: 30px;
				display: none;
				z-index: 10;
				border: none;
				outline: none;
				background-color: #333;
				color: white;
				cursor: pointer;
				padding: 15px;
				border-radius: 50%;
			}
			#scrollOnTopBtn:hover { background-color: #555; }
			@media (max-width: 1000px) {
				#scrollOnTopBtn { right: 10px; padding: 10px; }
			}
			@media (max-width: 800px) {
				#scrollOnTopBtn { padding: 8px; }
			}
			@media (max-width: 600px) {
				#scrollOnTopBtn { bottom: 40px; }
			}
		`;
		document.head.appendChild(style);
	};
};
