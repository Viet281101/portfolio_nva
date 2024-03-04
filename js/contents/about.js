
class About {
	constructor() {
		this.section = document.getElementById('about');
		this.myCV = './assets/doc/Viet_Nguyen_CV.pdf';
		this.leftArrow = './assets/icons/arrow_left.png';
		this.rightArrow = './assets/icons/arrow_right.png';
		this.contentData = {};
		this.loadContentData();
	};

	loadContentData() {
		fetch('./js/data/about.json')
			.then(response => response.json())
			.then(data => { this.contentData = data; this.createAboutContent(); })
			.catch(error => console.error('Error loading the about content:', error));
	};

	createAboutContent() {
		if (Object.keys(this.contentData).length === 0) return;
		this.lang = app.lang;
		this.section.innerHTML = '<div class="slides-container">';
		const slidesContainer = this.section.querySelector('.slides-container');
		
		const slide1 = document.createElement('div');
		slide1.className = 'slide';
		const aboutContent = this.createAboutContentDOM();
		slide1.appendChild(aboutContent);

		const slide2 = document.createElement('div');
		slide2.className = 'slide';
		
		const slide2Content = document.createElement('div');
		slide2Content.className = 'slide2-content';
		const slide2Title = document.createElement('h1');
		slide2Title.textContent = this.contentData[this.lang].title2;
		slide2Title.className = 'about-title-2';
		const slide2ContentText = document.createElement('p');
		slide2ContentText.textContent = this.contentData[this.lang].content2;
		slide2ContentText.className = 'about-content-2';
		
		slide2Content.appendChild(slide2Title);
		slide2Content.appendChild(slide2ContentText);
		slide2.appendChild(slide2Content);

		slidesContainer.appendChild(slide1);
		slidesContainer.appendChild(slide2);

		this.appendNavigationButtons();
		slidesContainer.addEventListener('scroll', () => this.updateButtonVisibility());

		this.bindTouchEvents();
		this.applyAboutStyles();
	};

	createAboutContentDOM() {
		const aboutContent = document.createElement('div');
		aboutContent.className = 'about-content';

		const aboutTitle = document.createElement('h1');
		aboutTitle.textContent = this.contentData[this.lang].title;
		aboutTitle.className = 'about-title';

		const aboutLeft = this.createAboutLeftContent();
		const aboutRight = this.createAboutRightContent();

		aboutContent.appendChild(aboutTitle);
		aboutContent.appendChild(aboutLeft);
		aboutContent.appendChild(aboutRight);
		aboutContent.appendChild(this.createCVButton());

		return aboutContent;
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
		cvButton.addEventListener('mouseover', (event) => { app.mouseMarkEnabled = false; });
		cvButton.addEventListener('mouseout', (event) => {
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses') app.mouseMarkEnabled = true;
		});
		return cvButton;
	};

	bindTouchEvents() {
		const slidesContainer = this.section.querySelector('.slides-container');
		let touchStartX = 0;
		let touchEndX = 0;
		slidesContainer.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, false);
		slidesContainer.addEventListener('touchend', (e) => { touchEndX = e.changedTouches[0].clientX; this.handleTouchMove(touchStartX, touchEndX); }, false);
	};
	handleTouchMove(startX, endX) {
		if (startX - endX > 50) this.scrollSlides('right');
		else if (endX - startX > 50) this.scrollSlides('left');
	};

	updateContent(lang) {
		this.lang = lang;
		const aboutTitle = this.section.querySelector('.about-title');
		aboutTitle.textContent = this.contentData[this.lang].title;

		const aboutLeft = this.section.querySelector('.about-content-left');
		const leftTitle = aboutLeft.querySelector('h2');
		leftTitle.textContent = this.contentData[this.lang].whoAmI;
		const leftContent = aboutLeft.querySelector('p');
		leftContent.textContent = this.contentData[this.lang].whoAmIDesc;

		const aboutRight = this.section.querySelector('.about-content-right');
		const rightTitle = aboutRight.querySelector('h2');
		rightTitle.textContent = this.contentData[this.lang].whatIDo;
		const rightContent = aboutRight.querySelector('p');
		rightContent.textContent = this.contentData[this.lang].whatIDoDesc;

		const cvButton = this.section.querySelector('.cv-button');
		cvButton.textContent = this.contentData[this.lang].cvButton;
		cvButton.title = this.contentData[this.lang].cvButtonTitle;

		const scrollLeftBtn = this.section.querySelector('.scroll-left-btn');
		const scrollRightBtn = this.section.querySelector('.scroll-right-btn');
		scrollLeftBtn.title = this.contentData[this.lang].leftBtn;
		scrollRightBtn.title = this.contentData[this.lang].rightBtn;

		const slide2Title = this.section.querySelector('.about-title-2');
		slide2Title.textContent = this.contentData[this.lang].title2;
		const slide2ContentText = this.section.querySelector('.about-content-2');
		slide2ContentText.textContent = this.contentData[this.lang].content2;

		this.updateButtonVisibility();
	};

	appendNavigationButtons() {
		const leftNavButton = document.createElement('img');
		leftNavButton.src = this.leftArrow;
		leftNavButton.loading = 'lazy';
		leftNavButton.title = this.contentData[this.lang].leftBtn;
		leftNavButton.className = 'scroll-left-btn';
		leftNavButton.style.display = 'none';

		const rightNavButton = document.createElement('img');
		rightNavButton.src = this.rightArrow;
		rightNavButton.loading = 'lazy';
		rightNavButton.title = this.contentData[this.lang].rightBtn;
		rightNavButton.className = 'scroll-right-btn';

		rightNavButton.onclick = () => this.scrollSlides('right');
		leftNavButton.onclick = () => this.scrollSlides('left');

		rightNavButton.addEventListener('mouseover', (event) => { app.mouseMarkEnabled = false; });
		rightNavButton.addEventListener('mouseout', (event) => {
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses') {app.mouseMarkEnabled = true; }
		});
		leftNavButton.addEventListener('mouseover', (event) => { app.mouseMarkEnabled = false; });
		leftNavButton.addEventListener('mouseout', (event) => {
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses') {app.mouseMarkEnabled = true; }
		});

		this.section.appendChild(leftNavButton);
		this.section.appendChild(rightNavButton);
	};

	scrollSlides(direction) {
		const slidesContainer = this.section.querySelector('.slides-container');
		const slideWidth = this.section.querySelector('.slide').offsetWidth;
		if (direction === 'right') slidesContainer.scrollLeft += slideWidth;
		else if (direction === 'left') slidesContainer.scrollLeft -= slideWidth;
		setTimeout(() => this.updateButtonVisibility(), 50);
	};

	updateButtonVisibility() {
		const slidesContainer = this.section.querySelector('.slides-container');
		const leftNavButton = this.section.querySelector('.scroll-left-btn');
		const rightNavButton = this.section.querySelector('.scroll-right-btn');
		const maxScrollLeft = slidesContainer.scrollWidth - slidesContainer.clientWidth;
		leftNavButton.style.display = slidesContainer.scrollLeft > 0 ? 'block' : 'none';
		rightNavButton.style.display = slidesContainer.scrollLeft < maxScrollLeft ? 'block' : 'none';
	};

	applyAboutStyles() {
		const css = `
			.slides-container {
				display: flex;
				overflow-x: hidden;
				scroll-behavior: smooth;
				width: 100%; height: 100%;
			}
			.slide {
				width: 100%; height: 100%;
				flex-shrink: 0;
				display: flex;
				overflow: hidden;
				justify-content: center;
				align-items: center; text-align: center;
			}
			.scroll-left-btn, .scroll-right-btn {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 50px; height: 50px;
				cursor: pointer;
			}
			.scroll-left-btn:hover, .scroll-right-btn:hover { transform: translateY(-50%) scale(1.1);}
			.scroll-left-btn { left: -35px; }
			.scroll-right-btn { right: -35px; }
			.slides-container::-webkit-scrollbar { display: none; }
			.about-title {
				text-align: center;
				margin-bottom: 40px;
				font-size: 44px;
				color: #fff;
			}
			.about-content {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				padding: 20px;
				gap: 20px;
			}
			.about-content-left, .about-content-right {
				flex-basis: 50%;
				padding: 10px;
				font-size: 18px;
				color: #fff;
			}
			.about-content-left h2, .about-content-right h2 {
				margin-bottom: 10px;
				font-size: 26px;
			}
			.cv-button {
				display: block;
				margin: 20px; padding: 10px 20px;
				text-transform: uppercase;
				font-size: 24px;
				text-align: center;
				border-radius: 5px; border: 2px solid #00D7FF;
				text-decoration: none;
				color: #fff;
			}
			.cv-button:hover { color: #00D7FF; }
			@media screen and (max-width: 900px) {
			/* Adjustments for mobile screens */
			.about-content { flex-direction: column; gap: 0; }
			.about-title { font-size: 24px; margin-bottom: 15px; }
			.about-content-left h2, .about-content-right h2 { font-size: 18px; }
			.about-content-left, .about-content-right {
				width: 100%;
				text-align: center;
				padding: 5px;
				font-size: 14px;
				word-wrap: break-word;
			}
			.cv-button { width: 80%; }
			.scroll-left-btn, .scroll-right-btn { width: 40px; height: 40px; }
		}
		`;
		const head = document.head;
		const style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	};
};
