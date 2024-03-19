
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
		const langNames = {
			'en': 'English',
			'fr': 'Français'
		};
		return langNames[lang];
	};

	setupInteractiveStyles(select) {
		// Apply responsive styles
		window.addEventListener('resize', () => this.applyResponsiveStyles(select));
		this.applyResponsiveStyles(select);

		// Setup hover and mouse out events
		select.addEventListener('mouseover', () => {
			app.mouseMarkEnabled = false;
			select.style.backgroundColor = '#555';
		});
		select.addEventListener('mouseout', () => {
			select.style.backgroundColor = '#333';
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses') {
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
