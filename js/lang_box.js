
class LangBox {
	constructor() {
		this.lang = app.lang;
		this.langs = ['en', 'fr'];
	};

	createLanguageSelector() {
		const languageSelector = document.createElement('div');
		languageSelector.id = 'language-selector';
		languageSelector.title = 'Change language';
		const select = document.createElement('select');
		select.title = 'Change language';
		select.innerHTML = this.langs.map(lang => `
		<option value="${lang}" ${this.lang === lang ? 'selected' : ''}>
				${this.getLangName(lang)}
		</option>`).join('');

		select.addEventListener('change', (event) => {
			this.lang = event.target.value;
			app.updateLanguage(this.lang);
		});

		languageSelector.addEventListener('mouseover', (event) => {
			app.mouseMarkEnabled = false;
		});
		languageSelector.addEventListener('mouseout', (event) => {
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses') 
			{
				app.mouseMarkEnabled = true;
			}
		});

		languageSelector.appendChild(select);
		document.body.appendChild(languageSelector);

		this.styleLanguageSelector();
	};

	getLangName(lang) {
		const langNames = {
			'en': 'English',
			'fr': 'Français'
		};
		return langNames[lang];
	};

	styleLanguageSelector() {
		const style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `
			#language-selector {
				position: fixed;
				top: 0;
				left: 230px;
				z-index: 10;
				padding: 10px;
			}
			#language-selector select {
				border-radius: 5px;
				border: 1px solid #333;
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background-image: url('assets/icons/down_arrow.png');
				background-repeat: no-repeat;
				background-position: right 3px center;
				background-size: 20px;
				background-color: #333;
				padding: 5px 30px 5px 10px;
				color: white;
				font-family:'Pixel', sans-serif;
				font-size: 14px;
			}
			#language-selector select:hover {
				cursor: pointer;
			}
			@media screen and (max-width: 1000px) {
				#language-selector {
					left: 5px;
				}
				#language-selector select {
					font-size: 8px;
				}
			}
		`;
		document.head.appendChild(style);
	};
};
