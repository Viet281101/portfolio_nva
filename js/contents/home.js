// Dependencies: Typewriter.js home.json
class Home {
	constructor() {
		this.section = document.getElementById('home');
		this.contentData = {};
		this.loadContentData();
	};

	loadContentData() {
		fetch('./js/data/home.json')
			.then(response => response.json())
			.then(data => {
				this.contentData = data;
				this.createHomeContent();
			})
			.catch(error => console.error('Error loading the home content:', error));
	};

	createHomeContent() {
		if (Object.keys(this.contentData).length === 0) return;

		this.lang = app.lang;
		
		this.section.innerHTML = '';

		const avatarContainer = document.createElement('div');
		avatarContainer.id = 'avatar-container';
		const avatarLoading = document.createElement('div');
		avatarLoading.id = 'avatar-loading';
		avatarContainer.appendChild(avatarLoading);

		const introTitle = document.createElement('div');
		introTitle.className = 'intro-title';

		const greeting = document.createElement('h1');
		greeting.className = 'hero-title';
		var greetingWriting = new Typewriter(greeting, {
			autoStart: true,
			loop: true,
		});
		greetingWriting.typeString(this.contentData[this.lang].greeting)
			.pauseFor(3000)
			.deleteAll()
			.typeString(this.contentData[this.lang].greeting2)
			.pauseFor(3000)
			.deleteAll()
			.start();

		const introduction = document.createElement('h1');
		const nameSpan = document.createElement('span');
		nameSpan.className = 'gradient-text';
		nameSpan.textContent = this.contentData[this.lang].nameSpan;
		introduction.textContent = this.contentData[this.lang].intro;
		introduction.appendChild(nameSpan);

		const description = document.createElement('p');
		description.className = 'hero-description';
		description.textContent = this.contentData[this.lang].desc;

		introTitle.appendChild(greeting);
		introTitle.appendChild(introduction);
		introTitle.appendChild(description);

		this.section.appendChild(avatarContainer);
		this.section.appendChild(introTitle);

		this.applyHomeStyles();
	};

	updateContent(lang) {
		this.lang = lang;
		this.loadContentData();
	};

	applyHomeStyles() {
		const css = `
			/* Home section styles */
			@charset "UTF-8";
			#home {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			#home .intro-title, #home #avatar-container {
				flex: 1;
				padding: 10px;
			}
			#home .intro-title { order: 1; height: 600px;}
			#home #avatar-container { order: 2; }
			#avatar-container {
				min-width: 600px;
				max-width: 600px;
				min-height: 500px;
				max-height: 500px;
				margin-top: 12px;
				margin-bottom: 32px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			#avatar-loading {
				font-size: 3em;
			}

			h1, .hero-description {
				text-align: left;
			}
			h1 {
				font-size: 2.5em;
				padding: 0;
				margin: 0;
				font-weight: 500;
			}
			.hero-description {
				margin-top: 24px;
				font-size: 1.5em;
				font-weight: 100;
				color: white;
			}
			.hero-title {
				padding-top: 60px;
				display: flex;
				flex-direction: row;
			}
			.gradient-text {
				background-image: linear-gradient(-45deg, rgb(177, 8, 189), rgb(88, 186, 255));
				background-clip: text;
				color: transparent;
			}
			@media (max-width: 800px) {
				#home {
					flex-direction: column;
					align-items: stretch;
				}
				#home .intro-title, #home #avatar-container {
					flex: none;
					order: unset;
					padding: 0;
				}
				#avatar-container {
					min-width: 100%;
					max-width: 100%;
					min-height: 500px;
					max-height: 500px;
					margin-top: 0;
					margin-bottom: 0;
				}
				section {
					padding: 0;
				}
				hero-title {
					padding-top: 0;
				}
				h1, .hero-description {
					text-align: center;
					font-size: 18px;
					margin: 0;
				}
			}
		`;

		const head = document.head;
		const style = document.createElement('style');

		head.appendChild(style);
		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
	};
};

