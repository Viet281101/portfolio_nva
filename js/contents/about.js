
class About {
	constructor(lang) {
		this.section = document.getElementById('about');
		const ars = './assets/icons/arrow_';
		this.leftArrow = ars+'left.png';
		this.rightArrow = ars+'right.png';
		this.gitHubStats = {
			url : 'https://github-readme-stats.vercel.app/api/top-langs/?',
			user : 'username=viet281101',
			theme : '&theme=transparent',
			layout : '&layout=compact',
			langs : '&langs_count=14',
			border: '&hide_border=true',
			custom_title: '&custom_title=Programming Languages',
			card_width: '&card_width=300',
			hide_title: '&hide_title=true'
		};
		this.lang = lang;
		this.contentData = {};
		this.loadContentData();
	};

	loadContentData() {
		fetch('./js/data/about.json').then(response => response.json()).then(data => { this.contentData = data; this.createAboutContent(); }).catch(error => console.error('Error loading the about content:', error));
	};

	createAboutContent() {
		if (Object.keys(this.contentData).length === 0) return;
		const slidesContainer = document.createElement('div');
		slidesContainer.className = 'slides-container';
		Object.assign(slidesContainer.style, { display: 'flex', overflowX: 'hidden', scrollBehavior: 'smooth', width: '100%', height: '100%' });
		
		const slide1 = document.createElement('div');
		slide1.className = 'slide';
		const aboutContent = this.createAboutContentDOM();
		slide1.appendChild(aboutContent);

		const slide2 = this.createSecondSlide();
		slidesContainer.appendChild(slide1);
		slidesContainer.appendChild(slide2);
		this.section.appendChild(slidesContainer);

		this.appendNavigationButtons();
		slidesContainer.addEventListener('scroll', () => this.updateButtonVisibility());
		this.bindTouchEvents();
	};
	createSecondSlide() {
		const slide2 = document.createElement('div');
		slide2.className = 'slide';
		
		const slide2Content = document.createElement('div');
		slide2Content.className = 'slide2-content';
		const slide2Title = document.createElement('h1');
		slide2Title.textContent = this.contentData[this.lang].title2;
		slide2Title.className = 'about-title-2';
		slide2Content.appendChild(slide2Title);
		
		const slide2SkillsContainer = document.createElement('div');
		slide2SkillsContainer.className = 'skills-container';

		const technicalSkills = document.createElement('div');
		technicalSkills.className = 'technical-skills';
		const technicalSkillsTitle = document.createElement('h2');
		technicalSkillsTitle.textContent = this.contentData[this.lang].skillsTitle;
		technicalSkills.appendChild(technicalSkillsTitle);

		const topLangImg = this.createTopLangImg();
		technicalSkills.appendChild(topLangImg);

		const softSkills = document.createElement('div');
		softSkills.className = 'soft-skills';
		const softSkillsTitle = document.createElement('h2');
		softSkillsTitle.textContent = this.contentData[this.lang].skillsTitle2;
		softSkills.appendChild(softSkillsTitle);

		const softSkillsList = document.createElement('ul');
		for (const skillKey in this.contentData[this.lang].skills) {
			const skillValue = this.contentData[this.lang].skills[skillKey];
			const skillItem = document.createElement('li');
			skillItem.textContent = skillValue;
			softSkillsList.appendChild(skillItem);
		}
		softSkills.appendChild(softSkillsList);

		slide2SkillsContainer.appendChild(technicalSkills);
		slide2SkillsContainer.appendChild(softSkills);
		slide2Content.appendChild(slide2SkillsContainer);
		slide2.appendChild(slide2Content);
		return slide2;
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
		cvButton.href = this.contentData[this.lang].cvTarget;
		cvButton.textContent = this.contentData[this.lang].cvButton;
		cvButton.className = 'cv-button';
		cvButton.target = '_blank';
		cvButton.title = this.contentData[this.lang].cvButtonTitle;
		cvButton.addEventListener('mouseover', (event) => { app.mouseMarkEnabled = false; });
		cvButton.addEventListener('mouseout', (event) => { this.eventMouseOut(); });
		return cvButton;
	};
	createTopLangImg() {
		const topLangImg = document.createElement('img');
		topLangImg.src = `${this.gitHubStats.url}${this.gitHubStats.user}${this.gitHubStats.theme}${this.gitHubStats.layout}${this.gitHubStats.langs}${this.gitHubStats.border}${this.gitHubStats.custom_title}${this.gitHubStats.card_width}${this.gitHubStats.hide_title}`;
		topLangImg.alt = 'Top Languages';
		topLangImg.className = 'top-langs-img';
		topLangImg.loading = 'lazy';
		topLangImg.addEventListener('mouseover', (event) => { app.mouseMarkEnabled = false; });
		topLangImg.addEventListener('mouseout', (event) => { this.eventMouseOut(); });
		return topLangImg;
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
	eventMouseOut() {
		if (app.sections[app.currentSection] !== 'projects' && 
			app.sections[app.currentSection] !== 'home' && 
			app.sections[app.currentSection] !== 'courses' && 
			app.sections[app.currentSection] !== 'contact') { app.mouseMarkEnabled = true; }
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
		cvButton.href = this.contentData[this.lang].cvTarget;
		cvButton.title = this.contentData[this.lang].cvButtonTitle;

		const scrollLeftBtn = this.section.querySelector('.scroll-left-btn');
		const scrollRightBtn = this.section.querySelector('.scroll-right-btn');
		scrollLeftBtn.title = this.contentData[this.lang].leftBtn;
		scrollRightBtn.title = this.contentData[this.lang].rightBtn;

		const slide2Title = this.section.querySelector('.about-title-2');
		slide2Title.textContent = this.contentData[this.lang].title2;

		const technicalSkillsTitle = this.section.querySelector('.technical-skills h2');
		technicalSkillsTitle.textContent = this.contentData[this.lang].skillsTitle;
		const softSkillsTitle = this.section.querySelector('.soft-skills h2');
		softSkillsTitle.textContent = this.contentData[this.lang].skillsTitle2;

		const softSkillsList = this.section.querySelector('.soft-skills ul');
		softSkillsList.innerHTML = '';
		for (const skillKey in this.contentData[this.lang].skills) {
			const skillValue = this.contentData[this.lang].skills[skillKey];
			const skillItem = document.createElement('li');
			skillItem.textContent = skillValue;
			softSkillsList.appendChild(skillItem);
		}
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
		rightNavButton.addEventListener('mouseout', (event) => { this.eventMouseOut(); });
		leftNavButton.addEventListener('mouseover', (event) => { app.mouseMarkEnabled = false; });
		leftNavButton.addEventListener('mouseout', (event) => { this.eventMouseOut(); });

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
};
