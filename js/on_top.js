
class ScrollOnTop {
	constructor() {
		this.scrollOnTopBtn = "./assets/icons/nav_up.png";
	};

	createScrollOnTopBtn() {
		const btn = document.createElement('button');
		btn.title = 'Scroll to top';
		btn.id = 'scrollOnTopBtn';

		const img = document.createElement('img');
		img.src = this.scrollOnTopBtn;
		img.alt = 'Scroll to top';
		img.style.width = img.style.height = window.innerWidth > 900 ? '40px' : '35px';
		btn.appendChild(img);

		Object.assign(btn.style, {
			position: 'fixed', bottom: '20px', right: '30px', display: 'none', zIndex: '10',
			border: 'none', outline: 'none', backgroundColor: '#333', color: 'white',
			cursor: 'pointer', padding: '10px', borderRadius: '50%',
		});
		document.body.appendChild(btn);
		btn.addEventListener('mouseover', () => { btn.style.backgroundColor = '#555'; });
		btn.addEventListener('mouseout', () => { btn.style.backgroundColor = '#333'; });
		btn.addEventListener('click', () => {
			if (window.innerWidth > 800) $("#fullpage").data('fullpage').moveTo(1);
			else window.scrollTo({ top: 0, behavior: 'smooth' });
		});
		this.setupHoverEffect(btn);
		this.styleScrollOnTopBtn();
	};

	setupHoverEffect(btn) {
		btn.addEventListener('mouseover', () => {
			app.mouseMarkEnabled = false; 
			btn.style.backgroundColor = '#555';
		});
		btn.addEventListener('mouseout', () => {
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses' &&
				app.sections[app.currentSection] !== 'contact') 
			{
				app.mouseMarkEnabled = true; 
				btn.style.backgroundColor = '#333';
			}
		});
	}

	updateContent(lang) {
		const btn = document.getElementById('scrollOnTopBtn');
		btn.title = lang === 'en' ? 'Scroll to top' : 'Haut de page';
	};

	styleScrollOnTopBtn() {
		window.addEventListener('resize', this.applyResponsiveStyles.bind(this));
		this.applyResponsiveStyles();
	};

	applyResponsiveStyles() {
		const btn = document.getElementById('scrollOnTopBtn');
		const screenWidth = window.innerWidth;
		if (screenWidth <= 1000) {
			btn.style.right = '10px';
			btn.style.padding = '10px';
		} 
		if (screenWidth <= 800) {
			btn.style.padding = '8px';
		} 
		if (screenWidth <= 600) {
			btn.style.bottom = '40px';
		}
	};
};
