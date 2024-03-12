
class NavBar {
	constructor(lang) {
		this.menu_nav_icon = "./assets/icons/menu.png";
		this.close_nav_icon = "./assets/icons/x_close.png";
		this.lang = lang;
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
		if (window.innerWidth < 800) {
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
			document.body.style.overflowY = 'hidden';
			this.navIcon.style.display = 'none';
		});

		document.getElementById('close-nav-icon').addEventListener('click', () => {
			navBar.style.width = '0';
			this.navIcon.style.display = 'block';
			document.body.style.overflowY = 'auto';
			document.getElementById('close-nav-icon').style.display = 'none';
		});

		navBar.querySelectorAll('a').forEach(a => {
			a.addEventListener('click', (e) => {
				e.preventDefault();
				document.body.style.overflowY = 'auto';
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
		const navBar = document.getElementById('nav-bar');
		const navBarStyles = {
			height: '100%', width: '0',
			position: 'fixed',
			zIndex: '11',
			top: '0', right: '0',
			backgroundColor: '#111',
			overflowX: 'hidden',
			transition: '0.5s',
			paddingTop: '60px',
		};
		Object.assign(navBar.style, navBarStyles);

		const navContent = navBar.querySelector('#nav-content');
		const navContentStyles = {
			width: '100%',
			marginTop: '20px',
		};
		Object.assign(navContent.style, navContentStyles);

		const ul = navContent.querySelector('ul');
		const ulStyles = {
			padding: '10px 10px',
			listStyle: 'none',
		};
		Object.assign(ul.style, ulStyles);

		const lis = ul.querySelectorAll('li');
		const liStyles = {
			marginTop: '10px',
			marginBottom: '10px',
			borderBottom: '1px solid #f1f1f1',
		};
		lis.forEach(li => Object.assign(li.style, liStyles));

		const aStyles = {
			padding: '10px 15px',
			textDecoration: 'none',
			fontSize: '26px',
			color: 'white',
			display: 'block',
			transition: '0.3s',
		};
		const as = navBar.querySelectorAll('a');
		as.forEach(a => Object.assign(a.style, aStyles));

		const aImgs = navBar.querySelectorAll('a img');
		const aImgStyles = {
			paddingLeft: '10px',
			width: '60px', height: '60px',
			marginRight: '40px',
		};
		aImgs.forEach(img => Object.assign(img.style, aImgStyles));

		const icons = [this.navIcon, document.getElementById('close-nav-icon')];
		const iconStyles = {
			cursor: 'pointer',
			position: 'fixed',
			top: '15px', right: '15px',
			width: '40px', height: '40px',
			zIndex: '12',
		};
		icons.forEach(icon => {
			if (icon) Object.assign(icon.style, iconStyles);
		});
	}
	
};


