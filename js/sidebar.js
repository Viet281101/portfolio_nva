// Dependencies: jquery, fullpage.js
class Sidebar {
	constructor() {
		this.sections = ['home', 'about', 'projects', 'courses', 'contact'];
		this.liItems = [
			{href: "#home", icon: "./assets/icons/home.png", text: "Home"},
			{href: "#about", icon: "./assets/icons/about.png", text: "About"},
			{href: "#projects", icon: "./assets/icons/project.png", text: "Projects"},
			{href: "#courses", icon: "./assets/icons/courses.png", text: "Courses"},
			{href: "#contact", icon: "./assets/icons/info.png", text: "Contact"},
		];
		this.connectItems = [
			{href: "https://www.linkedin.com/in/viet-nguyen-99a171258/", icon: "./assets/icons/linkedin.png", text: "LinkedIn"},
			{href: "https://github.com/Viet281101/", icon: "./assets/icons/github.png", text: "GitHub"},
			{href: "https://www.facebook.com/profile.php?id=100021927990218", icon: "./assets/icons/facebook.png", text: "Facebook"},
			{href: "https://twitter.com/VietAnh15458684", icon: "./assets/icons/twitter.png", text: "Twitter"},
		];
	};

	loadContentData() {
		fetch('./js/data/sidebar.json')
		.then(response => response.json())
		.then(data => {
			this.contentData = data;
			this.createSidebar();
		})
		.catch(error => console.error('Error loading the sidebar content:', error));
	};

	createSidebar() {
		this.label = document.createElement('label');
		let input = document.createElement('input');
		this.divSidebar = document.createElement('div');
		let h1 = document.createElement('h1');
		let ul = document.createElement('ul');

		input.setAttribute('type', 'checkbox');
		input.setAttribute('id', 'sidebar-toggle');
		this.divSidebar.classList.add('sidebar');
		h1.textContent = 'VIET';

		this.liItems.forEach(item => {
			let li = document.createElement('li');
			let a = document.createElement('a');
			let img = document.createElement('img');
			img.setAttribute('loading', 'lazy');

			a.setAttribute('href', item.href);
			a.setAttribute('class', 'section-btn');
			a.id = 'nav-' + item.text.toLowerCase();
			img.setAttribute('src', item.icon);
			img.setAttribute('alt', item.text.toLowerCase() + " icon");

			a.appendChild(img);
			a.append(item.text);
			li.appendChild(a);
			ul.appendChild(li);

			a.addEventListener('click', (e) => {
				e.preventDefault();
				const sectionIndex = this.sections.indexOf(item.text.toLowerCase());
				if (sectionIndex !== -1) {
					this.updateActiveNavItem(sectionIndex + 1);
					$("#fullpage").data('fullpage').moveTo(sectionIndex + 1);
				}
			});
		});

		this.label.addEventListener("mouseover", function() {
			app.mouseMarkEnabled = false;
		});
		this.label.addEventListener("mouseout", function() {
			app.mouseMarkEnabled = true;
		});

		this.divSidebar.appendChild(h1);
		this.divSidebar.appendChild(ul);
		this.label.appendChild(input);
		this.label.appendChild(this.divSidebar);

		document.body.insertBefore(this.label, document.body.firstChild);
	};

	createConnectItems() {
		let connectContainer = document.createElement('div');
		connectContainer.classList.add('connect-container');

		this.connectItems.forEach(item => {
			let a = document.createElement('a');
			let img = document.createElement('img');
			img.setAttribute('loading', 'lazy');

			a.setAttribute('href', item.href);
			a.setAttribute('target', '_blank');
			img.setAttribute('src', item.icon);
			img.setAttribute('alt', item.text.toLowerCase() + " icon");
			img.classList.add('connect-icon');

			a.appendChild(img);
			connectContainer.appendChild(a);
		});

		this.divSidebar.appendChild(connectContainer);
		document.body.insertBefore(this.label, document.body.firstChild);
	};

	updateActiveNavItem(nextIndex) {
		document.querySelectorAll('.sidebar a').forEach((navItem) => {
			navItem.classList.remove('active');
		});

		const activeNavItem = document.getElementById('nav-' + this.sections[nextIndex - 1]);
		if (activeNavItem) {
			activeNavItem.classList.add('active');
		}
	};

	applyStyles() {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `
			@charset "UTF-8";
			.sidebar {
				position: fixed;
				height: 100%;
				width: 220px;
				background-color: #333;
				padding-top: 20px;
				left: 0;
				top: 0;
				overflow-x: hidden;
				transition: 0.5s;
				z-index: 10;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				-ms-box-sizing: border-box;
				box-sizing: border-box;
			}
			.sidebar a.active {
				background-color: #555;
			}
			.sidebar a:hover {
				transform: scale(1.05);
				transition: 0.3s;
			}
			label div h1 {
				text-align: center;
				padding-bottom: 100px;
			}
			label div ul li a img {
				transform: scale(0.7);
				padding: 0;
				margin-right: 3px;
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
				padding-top: 14px;
				padding-bottom: 14px;
				text-decoration: none;
				color: white;
				text-align: left;
				vertical-align: middle;
				width: 100%;
				font-size: 24px;
				border-top: 1.5px solid #555;
				border-bottom: 1.5px solid #555;
			}
			label input {
				display: none;
				visibility: hidden;
				appearance: none;
			}
			.connect-container {
				position: absolute;
				bottom: 30px;
				left: 0;
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
			.connect-icon {
				width: 30px;
				height: 30px;
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
					margin-left: 220px;
				}
			}
		`;
		document.head.appendChild(sectionStyle);
	};
};

