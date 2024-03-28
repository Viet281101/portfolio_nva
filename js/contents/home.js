
class Home {
	constructor(lang) {
		this.section = document.getElementById('home');
		Object.assign(this.section.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center' });
		this.lang = lang;
		this.contentData = {};
		this.loadContentData();
		this.createAvatarContent();
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
			Object.assign(avatarLoading.style, { fontSize: '3em', color: 'white' });
			avatarContainer.appendChild(avatarLoading);
			this.section.appendChild(avatarContainer);
			window.dispatchEvent(new CustomEvent('avatarContainerReady'));
		}
	};
	createHomeContent() {
		if (Object.keys(this.contentData).length === 0) return;
		this.clearContentExceptAvatar();

		const introTitle = document.createElement('div');
		introTitle.className = 'intro-title';
		Object.assign(introTitle.style, { order: '1', height: '600px', flex: '1', padding: '10px' });

		const greeting = document.createElement('h1');
		greeting.className = 'hero-title';
		Object.assign(greeting.style, { paddingTop: '60px', display: 'flex', flexDirection: 'row', fontSize: '34px', });
		var greetingWriting = new Typewriter(greeting, { autoStart: true, loop: true, });
		greetingWriting.typeString(this.contentData[this.lang].greeting).pauseFor(3000).deleteAll().typeString(this.contentData[this.lang].greeting2).pauseFor(3000).deleteAll().start();

		const introduction = document.createElement('h1');
		const nameSpan = document.createElement('span');
		nameSpan.className = 'gradient-text';
		nameSpan.textContent = this.contentData[this.lang].nameSpan;
		introduction.textContent = this.contentData[this.lang].intro;
		Object.assign(introduction.style, { fontSize: '2.5em', fontWeight: '500', padding: '0', margin: '0', textAlign: 'left' });
		introduction.appendChild(nameSpan);

		const description = document.createElement('p');
		description.className = 'hero-description';
		description.textContent = this.contentData[this.lang].desc;
		Object.assign(description.style, { marginTop: '24px', fontSize: '1.5em', fontWeight: '100', color: 'white', textAlign: 'left' });

		introTitle.appendChild(greeting);
		introTitle.appendChild(introduction);
		introTitle.appendChild(description);

		this.section.appendChild(introTitle);
		this.applyRespnsiveStyles();
	};
	clearContentExceptAvatar() {
		Array.from(this.section.children).forEach(child => {
			if (child.id !== 'avatar-container') { this.section.removeChild(child); }
		});
	};
	updateContent(lang) { this.lang = lang; this.loadContentData(); };
	applyRespnsiveStyles() {
		const applyStylesForMobile = () => {
			Object.assign(this.section.style, { flexDirection: 'column', alignItems: 'stretch' });
			const avatarContainer = document.getElementById('avatar-container');
			Object.assign(avatarContainer.style, {
				minWidth: '100%', maxWidth: '100%', minHeight: '400px', maxHeight: '400px',
				marginTop: '0', marginBottom: '0', order: '1', padding: '0'
			});
			Array.from(this.section.getElementsByClassName('intro-title')).forEach(introTitle => {
				Object.assign(introTitle.style, { order: '2', padding: '0', height: 'auto' });
			});
			Array.from(this.section.getElementsByTagName('h1')).forEach(h1 => {
				Object.assign(h1.style, { textAlign: 'center', fontSize: '18px' });
			});
			Array.from(this.section.getElementsByClassName('hero-description')).forEach(desc => {
				Object.assign(desc.style, { textAlign: 'center', fontSize: '18px' });
			});
		};
		const screen = window.innerWidth;
		if (screen <= 800) { applyStylesForMobile(); }
		window.addEventListener('resize', () => {
			const newScreen = window.innerWidth;
			if (newScreen <= 800) { applyStylesForMobile(); } 
			else {
				Object.assign(this.section.style, { flexDirection: 'row', alignItems: 'center' });
				const avatarContainer = document.getElementById('avatar-container');
				Object.assign(avatarContainer.style, {
					minWidth: '600px', maxWidth: '600px', minHeight: '500px', maxHeight: '500px',
					marginTop: '12px', marginBottom: '32px', order: '2', padding: '10px'
				});
				Array.from(this.section.getElementsByClassName('intro-title')).forEach(introTitle => {
					Object.assign(introTitle.style, { order: '1', padding: '10px', height: '600px' });
				});
				Array.from(this.section.getElementsByTagName('h1')).forEach(h1 => {
					Object.assign(h1.style, { textAlign: 'left', fontSize: '2.5em' });
				});
				Array.from(this.section.getElementsByClassName('hero-description')).forEach(desc => {
					Object.assign(desc.style, { textAlign: 'left', fontSize: '1.5em' });
				});
			}
		});
	};
};
