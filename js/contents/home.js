// Dependencies: Typewriter.js home.json
class Home {
	constructor() {
		this.section = document.getElementById('home');
		Object.assign(this.section.style, {
			display: 'flex', justifyContent: 'space-between', alignItems: 'center'
		});
		this.contentData = {};
		this.loadContentData();
		this.createAvatarContent();
		this.applyHomeStyles();
	};

	loadContentData() {
		fetch('./js/data/home.json')
			.then(response => response.json())
			.then(data => { this.contentData = data; this.createHomeContent(); })
			.catch(error => console.error('Error loading the home content:', error));
	};

	createAvatarContent() {
		if (!document.getElementById('avatar-container')) {
			const avatarContainer = document.createElement('div');
			avatarContainer.id = 'avatar-container';
			Object.assign(avatarContainer.style, {
				flex: '1', padding: '10px', order: '2',
				display: 'flex', justifyContent: 'center', alignItems: 'center',
				minWidth: '600px', maxWidth: '600px', minHeight: '500px', maxHeight: '500px',
				marginTop: '12px', marginBottom: '32px'
			});
			const avatarLoading = document.createElement('div');
			avatarLoading.id = 'avatar-loading';
			Object.assign(avatarLoading.style, {
				fontSize: '3em', color: 'white'
			});
			avatarContainer.appendChild(avatarLoading);
			this.section.appendChild(avatarContainer);
			window.dispatchEvent(new CustomEvent('avatarContainerReady'));
		}
	};

	createHomeContent() {
		if (Object.keys(this.contentData).length === 0) return;
		this.lang = app.lang;
		this.clearContentExceptAvatar();

		const introTitle = document.createElement('div');
		introTitle.className = 'intro-title';
		Object.assign(introTitle.style, {
			order: '1', height: '600px', flex: '1', padding: '10px'
		});

		const greeting = document.createElement('h1');
		greeting.className = 'hero-title';
		Object.assign(greeting.style, {
			paddingTop: '60px', display: 'flex', flexDirection: 'row'
		});
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
		Object.assign(introduction.style, {
			fontSize: '2.5em', fontWeight: '500', padding: '0', margin: '0', textAlign: 'left'
		});
		introduction.appendChild(nameSpan);

		const description = document.createElement('p');
		description.className = 'hero-description';
		description.textContent = this.contentData[this.lang].desc;
		Object.assign(description.style, {
			marginTop: '24px', fontSize: '1.5em', fontWeight: '100', color: 'white', textAlign: 'left'
		});

		introTitle.appendChild(greeting);
		introTitle.appendChild(introduction);
		introTitle.appendChild(description);

		this.section.appendChild(introTitle);
	};

	clearContentExceptAvatar() {
		Array.from(this.section.children).forEach(child => {
			if (child.id !== 'avatar-container') {
				this.section.removeChild(child);
			}
		});
	};

	updateContent(lang) {
		this.lang = lang;
		this.loadContentData();
	};

	applyHomeStyles() {
		const css = `
			/* Home section styles */
			@charset "UTF-8";
			@media (max-width: 800px) {
				#home { flex-direction: column; align-items: stretch; }
				#home .intro-title, #home #avatar-container {
					flex: none; order: unset; padding: 0;
				}
				#avatar-container {
					min-width: 100%; max-width: 100%;
					min-height: 500px; max-height: 500px;
					margin-top: 0; margin-bottom: 0;
				}
				section { padding: 0; }
				hero-title { padding-top: 0; }
				h1, .hero-description { text-align: center; font-size: 18px; margin: 0; }
			}
			@media (max-width: 500px) {
				#avatar-container {
					min-height: 400px; max-height: 400px;
					min-width: 100%; max-width: 100%;
				}
			}
		`;
		const head = document.head;
		const style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	};
};

