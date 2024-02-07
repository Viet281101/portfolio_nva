
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

function applySidebarStyles() {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = `
		.sidebar {
			position: fixed;
			height: 100%;
			width: 200px;
			background-color: #333;
			padding-top: 20px;
			left: 0;
			top: 0;
			overflow-x: hidden;
			transition: 0.5s;
			z-index: 10;
		}
		label div h1 {
			text-align: center;
			padding-bottom: 50px;
		}
		label div ul li a img {
			scale: 0.7;
			padding: 0;
			margin-right: 2px;
		}
		label div ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
		}
		label div ul li {
			list-style: none;
		}
		label div ul li a {
			display: flex;
			align-items: center;
			padding: 6px;
			text-decoration: none;
			color: white;
			text-align: left;
			vertical-align: middle;
			width: 100%;
			font-size: 20px;
			border: 1.5px solid #555;
		}
		label input {
			display: none;
			visibility: hidden;
			appearance: none;
		}
		@media screen and (max-width: 1000px) {
			.sidebar {
				width: 0;
				visibility: hidden;
			}
			.content {
				margin-left: 0;
			}
		}
	`;
	document.head.appendChild(style);

	var sectionStyle = document.createElement('style');
	sectionStyle.type = 'text/css';
	sectionStyle.innerHTML = `
		@media screen and (min-width: 1001px) {
			section {
				margin-left: 200px;
			}
		}
	`;
	document.head.appendChild(sectionStyle);
};


