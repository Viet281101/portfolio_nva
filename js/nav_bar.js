
class NavBar {
	constructor() {
		this.menu_nav_icon = "./assets/icons/menu.png";
		this.close_nav_icon = "./assets/icons/x_close.png";
		this.lang = 'en';
		this.navItems = [
			{ href: "#home", icon: "./assets/icons/home.png", text: { en: "Home", fr: "Accueil" } },
			{ href: "#about", icon: "./assets/icons/about.png", text: { en: "About", fr: "À propos" } },
			{ href: "#projects", icon: "./assets/icons/project.png", text: { en: "Projects", fr: "Projets" } },
			{ href: "#courses", icon: "./assets/icons/courses.png", text: { en: "Courses", fr: "Cours" } },
			{ href: "#contact", icon: "./assets/icons/info.png", text: { en: "Contact", fr: "Contact" } }
		];
	};

	createNavBar() {
		this.navIcon = document.createElement('img');
		this.navIcon.id = 'nav-icon';
		this.navIcon.src = this.menu_nav_icon;
		document.body.appendChild(this.navIcon);

		const navBar = document.createElement('nav');
		navBar.id = 'nav-bar';
		let navContentHTML = `<div id="nav-content"><img id="close-nav-icon" src="${this.close_nav_icon}" alt="Close" style="display: none;"><ul>`;
		this.navItems.forEach(item => {
			navContentHTML += `<li><a href="${item.href}"><img src="${item.icon}" alt="${item.text[this.lang]}" /><span>${item.text[this.lang]}</span></a></li>`;
		});
		navContentHTML += `</ul></div>`;
		navBar.innerHTML = navContentHTML;
		document.body.appendChild(navBar);

		this.bindNavBarEvents(navBar);
		this.styleNavBar();
		this.updateMenuButtonVisibility();
		window.addEventListener('resize', this.updateMenuButtonVisibility.bind(this));
	};

	updateMenuButtonVisibility() {
		if (window.innerWidth < 768) {
			this.navIcon.style.display = 'block';
		} else {
			this.navIcon.style.display = 'none';
			document.getElementById('nav-bar').style.width = '0';
			document.getElementById('close-nav-icon').style.display = 'none';
		}
	};

	updateLanguage(lang) {
		this.lang = lang;
		document.querySelectorAll('#nav-bar a').forEach((link, index) => {
			const item = this.navItems[index];
			link.querySelector('span').textContent = item.text[lang];
		});
	};

	bindNavBarEvents(navBar) {
		this.navIcon.addEventListener('click', () => {
			navBar.style.width = '100%';
			document.getElementById('close-nav-icon').style.display = 'block';
			this.navIcon.style.display = 'none';
		});

		document.getElementById('close-nav-icon').addEventListener('click', () => {
			navBar.style.width = '0';
			this.navIcon.style.display = 'block';
			document.getElementById('close-nav-icon').style.display = 'none';
		});

		navBar.querySelectorAll('a').forEach(a => {
			a.addEventListener('click', (e) => {
				e.preventDefault();
				const targetSection = document.querySelector(a.getAttribute('href'));
				window.scrollTo({
					top: targetSection.offsetTop,
					behavior: 'smooth'
				});
				navBar.style.width = '0';
				this.navIcon.style.display = 'block';
				document.getElementById('close-nav-icon').style.display = 'none';
			});
		});
	};

	styleNavBar() {
		const style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `
			#nav-bar {
				height: 100%;
				width: 0;
				position: fixed;
				z-index: 11;
				top: 0;
				right: 0;
				background-color: #111;
				overflow-x: hidden;
				transition: 0.5s;
				padding-top: 60px;
			}
			#nav-bar #nav-content {
				width: 100%;
				margin-top: 20px;
			}
			#nav-bar ul {
				padding: 10px 10px;
				list-style: none;
			}
			#nav-bar li {
				margin-top: 10px;
				margin-bottom: 10px;
				border-bottom: 1px solid #f1f1f1;
			}
			#nav-bar a {
				padding: 10px 15px;
				text-decoration: none;
				font-size: 26px;
				color: white;
				display: block;
				transition: 0.3s;
			}
			#nav-bar a img {
				width:60px;
				height:60px;
				margin-right:20px;
			}
			#nav-bar a:hover {
				color: #f1f1f1;
			}
			#nav-icon, #close-nav-icon {
				cursor: pointer;
				position: fixed;
				top: 15px;
				right: 15px;
				width: 40px;
				height: 40px;
				z-index: 12;
			}
		`;
		document.head.appendChild(style);
	};
};


