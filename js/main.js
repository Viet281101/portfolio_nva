// Author: Viet NGUYEN
// Dependencies: Sidebar.js, Background.js, Home.js, About.js, Project.js, Courses.js, Contact.js
class MainApp {
	constructor() {
		this.sections = ['home', 'about', 'projects', 'courses', 'contact'];
		this.jsFiles = [
			'background.js',
			'effects/lightslider.js',
			'effects/particles.js',
			'sidebar.js',
			'contents/home.js',
			'contents/about.js',
			'contents/project.js',
			'contents/courses.js',
			'contents/contact.js',
		];
		this.sidebar = null;
		this.background = null;
		this.currentSection = 0;
		this.mouseMarkEnabled = true;
		this.animationActive = true;

		this.loadFiles();
		this.addEventListeners();
	};

	loadFiles() {
		let style = document.createElement('link');
		style.rel = 'stylesheet';
		style.type = 'text/css';
		style.href = './style/style.css';
		document.head.appendChild(style);

		for (let i = 0; i < this.jsFiles.length; i++) {
			let script = document.createElement('script');
			script.src = './js/' + this.jsFiles[i];
			script.setAttribute("type", "text/javascript");
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
					if (this.sidebar) this.sidebar.updateActiveNavItem(index);
					if (this.background) this.background.updateBackgroundForSection(index);
					this.handleSectionChange(index);
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
		document.addEventListener('DOMContentLoaded', () => {
			this.initializeComponents();
		});

		window.addEventListener('resize', () => {
			this.loadFullPage();
			this.mouseMarkEnabled = window.innerWidth >= 768;
		});
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

		new Home().createHomeContent();
		new About().createAboutContent();
		new Project().createProjectContent();
		new Courses().createCoursesContent();
		new Contact().createContactContent();

		if (window.innerWidth < 768) {
			this.mouseMarkEnabled = false;
			this.animationActive = false;
		}
		animate();
	};
};

const app = new MainApp();

