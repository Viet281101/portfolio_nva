
let js_files = [
	'background.js',
	'effects/lightslider.js',
	'effects/particles.js',
	'sidebar.js',
	'contents/home.js',
	'contents/about.js',
];

function load_js_files() {
	for (let i = 0; i < js_files.length; i++) {
		let script = document.createElement('script');
		script.src = './js/' + js_files[i];
		script.setAttribute("type", "text/javascript");
		document.head.appendChild(script);
	}
};

load_js_files();

document.addEventListener('DOMContentLoaded', function() {
	$("#fullpage").fullpage({
		onLeave: function(index, nextIndex, direction) {
			console.log("Leaving section: " + index);
		},
		afterLoad: function(anchorLink, index) {
			console.log("Loaded section: " + index);
		},
	});

	//////*  Create Section Home   *//////
	createHomeContent();
	applyHomeStyles();

	//////*  Create Section About   *//////
	createAboutContent();

	//////*  Create Sidebar   *//////
	createSidebar();
	applySidebarStyles();
});
