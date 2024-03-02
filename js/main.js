// Author: Viet NGUYEN
// Dependencies: Sidebar, LangBox, Background, Particles, Lightslider, Home, About, Project, Courses, Contact
class MainApp {
	constructor() {
		this.sections = ['home', 'about', 'projects', 'courses', 'contact'];
		this.jsFiles = [
			'load_progress.js',
			'background.js',
			'effects/lightslider.js',
			'effects/particles.js',
			'sidebar.js',
			'lang_box.js',
			'on_top.js',
			'contents/home.js',
			'contents/about.js',
			'contents/project.js',
			'contents/courses.js',
			'contents/contact.js',
		];
		this.sidebar = null;
		this.background = null;
		this.home = null;
		this.about = null;
		this.project = null;
		this.courses = null;
		this.contact = null;
		this.langBox = null;
		this.btnOnTop = null;
		this.currentSection = 0;
		this.mouseMarkEnabled = true;
		this.animationActive = true;
		this.lang = 'en';

		this.loadFiles();
		this.addEventListeners();
	};

	loadFiles() {
		let icon_page = document.createElement('link');
		icon_page.rel = 'shortcut icon';
		icon_page.href = './assets/icon.png';
		document.head.appendChild(icon_page);

		let style = document.createElement('link');
		style.rel = 'stylesheet';
		style.type = 'text/css';
		style.href = './style/style.css';
		document.head.appendChild(style);

		for (let i = 0; i < this.jsFiles.length; i++) {
			let script = document.createElement('script');
			script.src = './js/' + this.jsFiles[i];
			script.setAttribute("type", "text/javascript");
			script.defer = true;
			document.head.appendChild(script);
		}
	};

	loadFullPage() {
		if (window.innerWidth > 1000) {
			document.body.style.overflow = 'hidden';

			let lightslider = document.createElement('link');
			lightslider.rel = 'stylesheet';
			lightslider.type = 'text/css';
			lightslider.href = './style/lightslider.css';
			document.head.appendChild(lightslider);

			$("#fullpage").fullpage({
				onLeave: (index, nextIndex, direction) => {
					console.log("Leaving section: " + index);
					console.log("Going to section: " + nextIndex);
					console.log("Direction: " + direction);
				},
				afterLoad: (anchorLink, index) => {
					console.log("Loaded section: " + index);
					this.currentSection = index - 1;
					if (this.sidebar) this.sidebar.updateActiveNavItem(index);
					if (this.background) this.background.updateBackgroundForSection(index);
					this.handleSectionChange(index);
					const scrollBtn = document.getElementById('scrollOnTopBtn');
					if (scrollBtn) {
						if (index === 1) { scrollBtn.style.display = 'none'; } 
						else { scrollBtn.style.display = 'block'; }
					}
				},
			});
		} else {
			document.body.style.overflowX = 'hidden';
			$("#fullpage").fullpage({
				autoScrolling: false,
				scrollBar: true,
			});
		}
	};

	updateLanguage(lang) {
		this.lang = lang;
		document.documentElement.lang = lang;
		this.sidebar.updateLanguage(lang);
		this.home.updateContent(lang);
		this.about.updateContent(lang);
		this.project.updateContent(lang);
	};

	handleSectionChange(index) {
		if (this.sections[index - 1] === 'projects' || 
			this.sections[index - 1] === 'home' || 
			this.sections[index - 1] === 'courses') 
		{
			this.mouseMarkEnabled = false;
			this.animationActive = false;
		} else {
			this.mouseMarkEnabled = true;
			this.animationActive = true;
			animate();
		}
	};

	addEventListeners() {
		document.addEventListener('DOMContentLoaded', this.initializeComponents.bind(this));
		window.addEventListener('resize', this.onResize.bind(this));
		window.addEventListener('scroll', this.onScroll.bind(this));
	};

	onResize() {
		this.loadFullPage();
		this.mouseMarkEnabled = window.innerWidth >= 768;
		this.animationActive = window.innerWidth >= 768;	
	};

	onScroll() {
		const scrollBtn = document.getElementById('scrollOnTopBtn');
		scrollBtn.style.display = window.scrollY > 150 ? 'block' : 'none';
	};

	initializeComponents() {
		this.loadFullPage();

		this.sidebar = new Sidebar();
		this.sidebar.createSidebar();
		this.sidebar.updateActiveNavItem(1);
		this.sidebar.createConnectItems();
		this.sidebar.applyStyles();

		this.background = new Background();
		this.background.init();

		this.langBox = new LangBox();
		this.langBox.createLanguageSelector();

		this.btnOnTop = new scrollOnTop();
		this.btnOnTop.createScrollOnTopBtn();

		this.home = new Home();
		this.home.createHomeContent();

		this.about = new About();
		this.about.createAboutContent();

		this.project = new Project();
		this.project.createProjectContent();

		this.courses = new Courses();
		this.courses.createCoursesContent();

		this.contact = new Contact();
		this.contact.createContactContent();

		if (window.innerWidth < 768) {
			this.mouseMarkEnabled = false;
			this.animationActive = false;
		}
		animate();
	};
};

const app = new MainApp();

