// Dependencies: none
class About {
	constructor() {
		this.section = document.getElementById('about');
		this.myCV = './assets/doc/Viet_Nguyen_CV.pdf';
		this.contentData = {};
		this.loadContentData();
	};

	loadContentData() {
		fetch('./js/data/about.json')
			.then(response => response.json())
			.then(data => {
				this.contentData = data;
				this.createAboutContent();
			})
			.catch(error => console.error('Error loading the about content:', error));
	};

	createAboutContent() {
		if (Object.keys(this.contentData).length === 0) return;

		this.lang = app.lang;

		this.section.innerHTML = ''; // Clear any existing content

		const aboutTitle = document.createElement('div');
		aboutTitle.className = 'about-title';
		const title = document.createElement('h1');
		title.textContent = this.contentData[this.lang].title;
		aboutTitle.appendChild(title);

		const aboutContent = document.createElement('div');
		aboutContent.className = 'about-content';

		const aboutLeft = this.createAboutLeftContent();
		const aboutRight = this.createAboutRightContent();

		aboutContent.appendChild(aboutLeft);
		aboutContent.appendChild(aboutRight);

		const cvButton = this.createCVButton();

		this.section.appendChild(aboutTitle);
		this.section.appendChild(aboutContent);
		this.section.appendChild(cvButton);

		this.applyAboutStyles();
	};

	createAboutLeftContent() {
		const aboutLeft = document.createElement('div');
		aboutLeft.className = 'about-content-left';
		const leftTitle = document.createElement('h2');
		leftTitle.textContent = this.contentData[this.lang].whoAmI;
		const leftContent = document.createElement('p');
		leftContent.textContent = this.contentData[this.lang].whoAmIDesc;

		aboutLeft.appendChild(leftTitle);
		aboutLeft.appendChild(leftContent);
		return aboutLeft;
	};

	createAboutRightContent() {
		const aboutRight = document.createElement('div');
		aboutRight.className = 'about-content-right';
		const rightTitle = document.createElement('h2');
		rightTitle.textContent = this.contentData[this.lang].whatIDo;
		const rightContent = document.createElement('p');
		rightContent.textContent = this.contentData[this.lang].whatIDoDesc;

		aboutRight.appendChild(rightTitle);
		aboutRight.appendChild(rightContent);
		return aboutRight;
	};

	createCVButton() {
		const cvButton = document.createElement('a');
		cvButton.href = this.myCV;
		cvButton.textContent = this.contentData[this.lang].cvButton;
		cvButton.className = 'cv-button';
		cvButton.target = '_blank';
		cvButton.title = this.contentData[this.lang].cvButtonTitle;
		cvButton.addEventListener('mouseover', (event) => {
			app.mouseMarkEnabled = false;
		});
		cvButton.addEventListener('mouseout', (event) => {
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses') 
			{
				app.mouseMarkEnabled = true;
			}
		});
		return cvButton;
	};

	updateContent(lang) {
		this.lang = lang;
		this.createAboutContent();
	};

	applyAboutStyles() {
		const css = `
			/* About section styles */
			@charset "UTF-8";
			#about {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.about-title {
				text-align: center;
				padding-bottom: 60px;
			}
			.about-content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 80%;
			}
			.about-content-left, .about-content-right {
				flex: 1;
				padding: 10px;
			}
			.about-content-left {
				order: 1;
			}
			.about-content-right {
				order: 2;
			}
			.about-content-left-title, .about-content-right-title {
				padding-bottom: 20px;
			}
			.about-content-left-content, .about-content-right-content {
				text-align: left;
			}
			.about-content-left-content p, .about-content-right-content p {
				font-size: 1.2em;
			}
			.cv-button {
				display: block;
				margin: 20px auto;
				padding: 10px 20px;
				text-transform: uppercase;
				font-size: 24px;
				text-align: center;
				border-radius: 5px;
				border: 2px solid #00D7FF;
				text-decoration: none;
				color: #fff;
			}
			.cv-button:hover {
				color: #00D7FF;
			}
			@media screen and (max-width: 1000px) {
				#about .about-content {
					flex-direction: column;
					align-items: center;
					font-size: 12px;
				}
				.about-title { padding-bottom: 20px; }
				.about-content-left-title, .about-content-right-title { padding-bottom: 5px;}
				.about-content-left, .about-content-right {
					order: 1;
					width: 100%;
					padding: 0;
				}
				.about-content-left {
					padding-bottom: 20px;
				}
			}
		`;
		const head = document.head;
		const style = document.createElement('style');

		head.appendChild(style);
		style.type = 'text/css';
		style.innerHTML = css;
	};
};

