// Author: Viet NGUYEN
class MainApp {
	constructor() {
		this.sections = ['home', 'about', 'projects', 'courses', 'contact'];
		this.jsFiles = [
			'load_progress.js', 'background.js',
			'effects/lightslider.js', 'effects/particles.js',
			'sidebar.js', 'nav_bar.js',
			'lang_box.js', 'on_top.js',
			'contents/home.js',
			'contents/about.js',
			'contents/project.js', 'contents/project_info.js',
			'contents/courses.js', 'contents/courses_info.js',
			'contents/contact.js',
		];
		this.sidebar = null; this.navBar = null;
		this.background = null;
		this.home = null; this.about = null; this.project = null; this.courses = null; this.contact = null;
		this.langBox = null; this.btnOnTop = null;
		this.currentSection = 0;
		this.mouseMarkEnabled = true; this.animationActive = true;
		this.lang = 'en';
		this.loadFiles();
		this.addEventListeners();
	};

	loadFiles() {
		let icon_page = document.createElement('link');
		icon_page.rel = 'shortcut icon'; icon_page.href = './assets/icon.png';
		document.head.appendChild(icon_page);
		let style = document.createElement('link');
		style.rel = 'stylesheet'; style.type = 'text/css'; 
		style.href = './style/style.css'; document.head.appendChild(style);
		let loadErrors = false;
		const handleError = () => { 
			if (!loadErrors) { loadErrors = true; alert('Failed to load some resources, reloading...'); window.location.reload(); } 
		};
		for (let i = 0; i < this.jsFiles.length; i++) {
			let script = document.createElement('script');
			script.src = './js/' + this.jsFiles[i]; script.setAttribute("type", "text/javascript");
			script.defer = true; script.onerror = handleError; document.head.appendChild(script);
		}
	};

	loadFullPage() {
		if (window.innerWidth > 1000) {
			document.body.style.overflow = 'hidden';
			let lightslider = document.createElement('link');
			lightslider.rel = 'stylesheet'; lightslider.type = 'text/css';
			lightslider.href = './style/lightslider.css';
			document.head.appendChild(lightslider);
			$("#fullpage").fullpage({
				afterLoad: (anchorLink, index) => {
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
			$("#fullpage").fullpage({ autoScrolling: false, scrollBar: true, fitToSection: false});
		}
	};

	updateLanguage(lang) {
		document.documentElement.lang = lang; this.lang = lang;
		if (this.sidebar) this.sidebar.updateLanguage(lang);
		if (this.home) this.home.updateContent(lang);
		if (this.about) this.about.updateContent(lang);
		if (this.project) this.project.updateContent(lang);
		if (this.courses) this.courses.updateContent(lang);
		if (this.contact) this.contact.updateContent(lang);
		if (this.navBar) this.navBar.updateLanguage(lang);
		if (this.btnOnTop) this.btnOnTop.updateContent(lang);
	};

	handleSectionChange(index) {
		if (this.sections[index - 1] === 'projects' || this.sections[index - 1] === 'home' || this.sections[index - 1] === 'courses' ||
			this.sections[index - 1] === 'contact') { this.mouseMarkEnabled = this.animationActive = false; }
		else { this.mouseMarkEnabled = this.animationActive = true; animateParticles(); }
	};

	addEventListeners() {
		document.addEventListener('DOMContentLoaded', this.initializeComponents.bind(this));
		window.addEventListener('resize', this.onResize.bind(this));
		window.addEventListener('scroll', this.onScroll.bind(this));
		document.addEventListener('keydown', (event) => {
			const fullpageApi = $('#fullpage').data('fullpage');
			if (!fullpageApi) return;
			if (welcomeStartUpPopUp) welcomeStartUpPopUp.closePopup();
			switch (event.key) {
				case 'ArrowUp': this.moveSectionUp(); break;
				case 'ArrowDown': this.moveSectionDown(); break;
				case 'ArrowLeft': if(this.isHorizontallyScrollSection()) {this.scrollSlideLeft();} break;
				case 'ArrowRight': if(this.isHorizontallyScrollSection()) {this.scrollSlideRight();} break;
				default: break;
			}
		});
	};
	isHorizontallyScrollSection() {
		if (window.innerWidth > 1000) {
			if (this.sections[this.currentSection] === 'about') return true;
		} return false;
	};
	scrollSlideLeft() {
		if (this.about && this.sections[this.currentSection] === 'about') this.about.scrollSlides('left');
	};
	scrollSlideRight() {
		if (this.about && this.sections[this.currentSection] === 'about') this.about.scrollSlides('right');
	};
	moveSectionUp() {
		const fullpageApi = $('#fullpage').data('fullpage');
		let targetIndex = fullpageApi.currIndex - 1;
		if (targetIndex >= 0) { fullpageApi.moveTo(targetIndex + 1); }
	};
	moveSectionDown() {
		const fullpageApi = $('#fullpage').data('fullpage');
		let targetIndex = fullpageApi.currIndex + 1;
		if (targetIndex < $('#fullpage').children().length) { fullpageApi.moveTo(targetIndex + 1); }
	};
	onResize() {
		this.loadFullPage();
		this.mouseMarkEnabled = this.animationActive = window.innerWidth >= 768;	
		if (this.navBar) this.navBar.updateMenuButtonVisibility();
	};
	onScroll() {
		const scrollBtn = document.getElementById('scrollOnTopBtn');
		scrollBtn.style.display = window.scrollY > 150 ? 'block' : 'none';
	};

	createContents() {
		if (this.sidebar) {
			this.sidebar.createSidebar();
			this.sidebar.updateActiveNavItem(1);
			this.sidebar.createConnectItems();
		}
		if (this.background) this.background.init();
		if (this.langBox) this.langBox.createLanguageSelector();
		if (this.btnOnTop) this.btnOnTop.createScrollOnTopBtn();
		if (this.navBar) {
			this.navBar.createNavBar(); 
			this.navBar.updateMenuButtonVisibility();
		}
		if (this.home) this.home.createHomeContent();
		if (this.about) this.about.createAboutContent();
		if (this.project) this.project.createProjectContent();
		if (this.courses) this.courses.createCoursesContent();
		if (this.contact) this.contact.createContactContent();
	};

	initializeComponents() {
		try { if (typeof Sidebar === "undefined" || typeof NavBar === "undefined" || typeof Background === "undefined" ||
				typeof LangBox === "undefined" || typeof ScrollOnTop === "undefined" || typeof Home === "undefined" ||
				typeof About === "undefined" || typeof Project === "undefined" || typeof Courses === "undefined" ||
				typeof Contact === "undefined") { throw new Error("Some classes are not defined."); }
			this.loadFullPage();
			if (window.innerWidth < 830) this.navBar = new NavBar(this.lang);
			else this.sidebar = new Sidebar(this.lang);
			this.background = new Background();
			this.langBox = new LangBox(this.lang);
			this.btnOnTop = new ScrollOnTop();
			this.home = new Home(this.lang);
			this.about = new About(this.lang);
			this.project = new Project(this.lang);
			this.courses = new Courses(this.lang);
			this.contact = new Contact(this.lang);
			this.createContents();
			this.mouseMarkEnabled = this.animationActive = window.innerWidth >= 768;
			setTimeout(() => { animateParticles(); }, 8000);
		} catch (error) { console.error(error); alert('An error occurred while initializing components, reloading...'); window.location.reload(); }
	};
};

const app = new MainApp();
