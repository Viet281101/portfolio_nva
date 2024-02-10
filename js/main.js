
let js_files = [
	'background.js',
	'effects/lightslider.js',
	'effects/particles.js',
	'sidebar.js',
	'contents/home.js',
	'contents/about.js',
];

let sections = [
	'home',
	'about',
	'projects',
	'contact',
];
let current_section = 0;

function load_js_files() {
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
		document.body.style.overflow = 'auto';
		$("#fullpage").fullpage({
			autoScrolling: false,
			scrollBar: true,
		});
	}
};


load_js_files();
document.addEventListener('DOMContentLoaded', function() {
	//////*  Load Fullpage   *//////
	load_fullpage();

	//////*  Create Section Home   *//////
	createHomeContent();
	applyHomeStyles();

	//////*  Create Section About   *//////
	createAboutContent();

	//////*  Create Sidebar   *//////
	createSidebar();
	applySidebarStyles();

	updateActiveNavItem(1);
});
window.addEventListener('resize', function() {
	load_fullpage();
});
