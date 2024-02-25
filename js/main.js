
let js_files = [
	'background.js',
	'effects/lightslider.js',
	'effects/particles.js',
	'sidebar.js',
	'contents/home.js',
	'contents/about.js',
	'contents/project.js',
	'contents/contact.js',
];

let sections = [
	'home',
	'about',
	'projects',
	'contact',
];
let current_section = 0;

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
				updateActiveNavItem(index);
				updateBackgroundForSection(index);
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
	//////*  Load Fullpage   *//////
	load_fullpage();

	//////*  Create Section Home   *//////
	createHomeContent();
	applyHomeStyles();

	//////*  Create Section About   *//////
	createAboutContent();
	applyAboutStyles();

	//////*  Create Sidebar   *//////
	createSidebar();
	applySidebarStyles();

	updateActiveNavItem(1);
});
window.addEventListener('resize', function() {
	load_fullpage();
});
