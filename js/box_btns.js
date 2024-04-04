
class LangBox {
	constructor(lang) {
		this.lang = lang;
		this.langs = ['en', 'fr'];
	};
	createLanguageSelector() {
		const languageSelector = document.createElement('div');
		languageSelector.id = 'language-selector';
		languageSelector.title = 'Change language';
		Object.assign(languageSelector.style, {
			position: 'fixed', top: '0', left: '230px', zIndex: '10', padding: '10px',
		});

		const select = document.createElement('select');
		select.title = 'Change language';
		select.id = 'box-selector';
		select.className = 'select-langbox';
		this.langs.forEach(lang => {
			const option = document.createElement('option');
			option.value = lang;
			option.textContent = this.getLangName(lang);
			if (this.lang === lang) {
				option.selected = true;
			}
			select.appendChild(option);
		});
		Object.assign(select.style, {
			borderRadius: '5px', border: '1px solid #333', WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none',
			backgroundImage: 'url("assets/icons/nav_down.png")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 3px center', backgroundSize: '20px',
			backgroundColor: '#333', padding: '5px 30px 5px 10px', color: 'white', fontFamily:"'Pixel', sans-serif", fontSize: '14px', cursor: 'pointer',
		});
		select.addEventListener('change', (event) => {
			this.lang = event.target.value;
			app.updateLanguage(this.lang);
		});

		languageSelector.appendChild(select);
		document.body.appendChild(languageSelector);
		this.setupInteractiveStyles(select);
	};
	getLangName(lang) {
		const langNames = { 'en': 'English', 'fr': 'Français' };
		return langNames[lang];
	};
	setupInteractiveStyles(select) {
		window.addEventListener('resize', () => this.applyResponsiveStyles(select));
		this.applyResponsiveStyles(select);
		select.addEventListener('mouseover', () => {
			app.mouseMarkEnabled = false;
			select.style.backgroundColor = '#555';
		});
		select.addEventListener('mouseout', () => {
			select.style.backgroundColor = '#333';
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses' &&
				app.sections[app.currentSection] !== 'contact') {
					app.mouseMarkEnabled = true;
			}
		});
	};
	applyResponsiveStyles(select) {
		const screenWidth = window.innerWidth;
		if (screenWidth <= 1000) {
			select.parentNode.style.left = '5px';
			select.parentNode.style.top = '5px';
			select.style.fontSize = '10px';
		} else {
			select.parentNode.style.left = '230px';
			select.parentNode.style.top = '0';
			select.style.fontSize = '14px';
		}
	};
};

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
