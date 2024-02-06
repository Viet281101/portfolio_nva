
let js_files = [
	'background.js',
	'lightslider.js',
	'particles.js',
];

function load_js_files() {
	for (let i = 0; i < js_files.length; i++) {
		let script = document.createElement('script');
		script.src = './js/' + js_files[i];
		script.setAttribute("type", "text/javascript");
		document.head.appendChild(script);
	}
};

function createSidebar() {
	let label = document.createElement('label');
	let input = document.createElement('input');
	let divSidebar = document.createElement('div');
	let h1 = document.createElement('h1');
	let ul = document.createElement('ul');
	let liItems = [
		{href: "#home", icon: "./assets/icons/home.png", text: "Home"},
		{href: "#about", icon: "./assets/icons/about.png", text: "About"},
		{href: "#projects", icon: "./assets/icons/github.png", text: "Projects"},
		{href: "#contact", icon: "./assets/icons/info.png", text: "Contact"},
	];

	input.setAttribute('type', 'checkbox');
	input.setAttribute('id', 'sidebar-toggle');
	divSidebar.classList.add('sidebar');
	h1.textContent = 'VIET';

	liItems.forEach(item => {
		let li = document.createElement('li');
		let a = document.createElement('a');
		let img = document.createElement('img');

		a.setAttribute('href', item.href);
		img.setAttribute('src', item.icon);
		img.setAttribute('alt', item.text.toLowerCase() + " icon");

		a.appendChild(img);
		a.append(item.text);
		li.appendChild(a);
		ul.appendChild(li);
	});

	divSidebar.appendChild(h1);
	divSidebar.appendChild(ul);
	label.appendChild(input);
	label.appendChild(divSidebar);

	document.body.insertBefore(label, document.body.firstChild);
};

load_js_files();

document.addEventListener('DOMContentLoaded', function() {
	$("#fullpage").fullpage();
	createSidebar();
});
