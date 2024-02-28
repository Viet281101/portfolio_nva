
let js_files = [
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
let sections = [
	'home',
	'about',
	'projects',
	'courses',
	'contact',
];
var sidebar;
var background;
let current_section = 0;
var mouseMarkEnabled = true;
var animationActive = true;

function load_files() {
	let style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = './style/style.css';
	document.head.appendChild(style);

	for (let i = 0; i < js_files.length; i++) {
		let script = document.createElement('script');
		script.src = './js/' + js_files[i];
		script.setAttribute("type", "text/javascript");
		document.head.appendChild(script);
	}
};

function load_fullpage() {
	if (window.innerWidth > 1000) {
		document.body.style.overflow = 'hidden';
		
		let lightslider = document.createElement('link');
		lightslider.rel = 'stylesheet';
		lightslider.type = 'text/css';
		lightslider.href = './style/lightslider.css';
		document.head.appendChild(lightslider);

		$("#fullpage").fullpage({
			onLeave: function(index, nextIndex, direction) {
				console.log("Leaving section: " + index);
				console.log("Going to section: " + nextIndex);
				console.log("Direction: " + direction);
			},
			afterLoad: function(anchorLink, index) {
				console.log("Loaded section: " + index);
				if (sidebar) sidebar.updateActiveNavItem(index);
				if (background) background.updateBackgroundForSection(index);
				if (sections[index - 1] == 'projects' || 
					sections[index - 1] == 'home' ||
					sections[index - 1] == 'courses'
				) {
					mouseMarkEnabled = false;
					animationActive = false;
				} else {
					mouseMarkEnabled = true;
					animationActive = true;
					animate();
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

load_files();
document.addEventListener('DOMContentLoaded', function() {
	load_fullpage();

	let home = new Home();
	home.createHomeContent();

	let about = new About();
	about.createAboutContent();

	let project = new Project();
	project.createProjectContent();

	let courses = new Courses();
	courses.createCoursesContent();
	
	let contact = new Contact();
	contact.createContactContent();
	
	sidebar = new Sidebar();
	sidebar.createSidebar();
	sidebar.updateActiveNavItem(1);
	sidebar.createConnectItems();
	sidebar.applyStyles();

	background = new Background();
	background.init();
	if (window.innerWidth < 768) {
		mouseMarkEnabled = false;
		animationActive = false;
	}
	animate();
});
window.addEventListener('resize', function() {
	load_fullpage();
	if (window.innerWidth < 768) {
		mouseMarkEnabled = false;
	} else {
		mouseMarkEnabled = true;
	}
});
