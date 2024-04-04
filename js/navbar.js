// Dependencies: jquery, fullpage.js
class Sidebar {
	constructor(lang) {
		this.lang = lang;
		this.sections = ['home', 'about', 'projects', 'courses', 'contact'];
		this.liItems = [
			{href: "#home", icon: "./assets/icons/home.png", text: "Home", texte: "Accueil"},
			{href: "#about", icon: "./assets/icons/about.png", text: "About", texte: "À propos"},
			{href: "#projects", icon: "./assets/icons/project.png", text: "Projects", texte: "Projets"},
			{href: "#courses", icon: "./assets/icons/courses.png", text: "Courses", texte: "Cours"},
			{href: "#contact", icon: "./assets/icons/info.png", text: "Contact", texte: "Contact"},
		];
		this.connectItems = [
			{href: "https://www.linkedin.com/in/viet-nguyen-99a171258/", icon: "./assets/icons/linkedin.png", text: "LinkedIn"},
			{href: "https://github.com/Viet281101/", icon: "./assets/icons/github.png", text: "GitHub"},
			{href: "https://www.facebook.com/profile.php?id=100021927990218", icon: "./assets/icons/facebook.png", text: "Facebook"},
			{href: "https://twitter.com/VietAnh15458684", icon: "./assets/icons/twitter.png", text: "Twitter"},
		];
	};
	createSidebar() {
		this.label = document.createElement('label');
		let input = document.createElement('input');
		Object.assign(input.style, {
			display: 'none', visibility: 'hidden', appearance: 'none',
		});
		this.divSidebar = document.createElement('div');
		let h1Link = document.createElement('a');
		h1Link.href = "#";
		Object.assign(h1Link.style, { textDecoration: 'none', color: '#fff', })
		let h1 = document.createElement('h1');
		Object.assign(h1.style, { textAlign: 'center', paddingBottom: '100px', });
		let ul = document.createElement('ul');
		Object.assign(ul.style, { padding: '0', margin: '0', listStyleType: 'none', });

		input.setAttribute('type', 'checkbox');
		input.setAttribute('id', 'sidebar-toggle');
		this.divSidebar.classList.add('sidebar');
		Object.assign(this.divSidebar.style, {
			position: 'fixed', height: '100%', width: '220px', backgroundColor: '#333', paddingTop: '20px',
			left: '0', top: '0', overflowX: 'hidden', transition: '0.5s', zIndex: '10',
			WebkitBoxSizing: 'border-box', MozBoxSizing: 'border-box', MsBoxSizing: 'border-box', boxSizing: 'border-box',
		});
		h1.textContent = 'VIET';
		h1Link.appendChild(h1);

		this.liItems.forEach(item => {
			let li = document.createElement('li');
			Object.assign(li.style, { listStyle: 'none',});
			let a = document.createElement('a');
			this.img = document.createElement('img');
			this.img.setAttribute('loading', 'lazy');
			Object.assign(this.img.style, { 
				transform: 'scale(0.7)', padding: '0', marginRight: '3px',
			});

			a.setAttribute('href', item.href);
			a.setAttribute('class', 'section-btn');
			a.id = 'nav-' + item.text.toLowerCase();
			Object.assign(a.style, {
				display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white',
				textAlign: 'left', verticalAlign: 'middle', width: '100%', fontSize: '24px',
				borderTop: '1.5px solid #555', borderBottom: '1.5px solid #555', paddingBottom: '14px', paddingTop: '14px',
			});
			this.img.setAttribute('src', item.icon);
			this.img.setAttribute('alt', item.text.toLowerCase() + " icon");

			let textSpan = document.createElement('span');
			if (this.lang === 'en') textSpan.textContent = item.text;
			else textSpan.textContent = item.texte;
			a.appendChild(this.img);
			a.appendChild(textSpan);
			li.appendChild(a);
			ul.appendChild(li);

			a.addEventListener('mouseover', (e) => {
				Object.assign(a.style, { transform: 'scale(1.05)', transition: '0.3s', });
			});
			a.addEventListener('mouseout', (e) => {
				Object.assign(a.style, { transform: 'scale(1.0)', transition: '0.3s', });
			})
			a.addEventListener('click', (e) => {
				e.preventDefault();
				const sectionIndex = this.sections.indexOf(item.text.toLowerCase());
				if (sectionIndex !== -1) {
					this.updateActiveNavItem(sectionIndex + 1);
					$("#fullpage").data('fullpage').moveTo(sectionIndex + 1);
				}
			});
		});
		this.label.addEventListener("mouseover", function() { app.mouseMarkEnabled = false; });
		this.label.addEventListener("mouseout", function() {
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses' && 
				app.sections[app.currentSection] !== 'contact') { app.mouseMarkEnabled = true; }
		});
		h1Link.addEventListener('click', (e) => {
			e.preventDefault();
			window.location.href = window.location.origin + window.location.pathname;
		}, { once:true } );
		this.divSidebar.appendChild(h1Link);
		this.divSidebar.appendChild(ul);
		this.label.appendChild(input);
		this.label.appendChild(this.divSidebar);
		document.body.insertBefore(this.label, document.body.firstChild);
	};
	updateLanguage(lang) {
		this.lang = lang;
		this.liItems.forEach((item) => {
			let a = document.getElementById('nav-' + item.text.toLowerCase());
			if (a) {
				let textSpan = a.querySelector('span');
				textSpan.textContent = "";
				if (this.lang === 'en') textSpan.textContent = item.text;
				else textSpan.textContent = item.texte;
			}
		});
	};	
	createConnectItems() {
		let connectContainer = document.createElement('div');
		connectContainer.classList.add('connect-container');
		Object.assign(connectContainer.style, {
			position: 'absolute', bottom: '30px', left: '0', width: '100%', display: 'flex',
			justifyContent: 'space-around', alignItems: 'center',
		});
		this.connectItems.forEach(item => {
			let a = document.createElement('a');
			let img = document.createElement('img');
			img.setAttribute('loading', 'lazy');
			a.setAttribute('href', item.href);
			a.setAttribute('target', '_blank');
			img.setAttribute('src', item.icon);
			img.setAttribute('alt', item.text.toLowerCase() + " icon");
			img.classList.add('connect-icon');
			Object.assign(img.style, { width: '35px', height: '35px', });
			a.addEventListener('mouseover', (e) => {
				Object.assign(a.style, { transform: 'scale(1.3)', transition: '0.3s', });
			});
			a.addEventListener('mouseout', (e) => {
				Object.assign(a.style, { transform: 'scale(1.0)', transition: '0.3s', });
			})
			a.appendChild(img);
			connectContainer.appendChild(a);
		});
		this.divSidebar.appendChild(connectContainer);
		document.body.insertBefore(this.label, document.body.firstChild);
	};
	updateActiveNavItem(nextIndex) {
		document.querySelectorAll('.sidebar a').forEach((navItem) => { navItem.classList.remove('active'); });
		const activeNavItem = document.getElementById('nav-' + this.sections[nextIndex - 1]);
		if (activeNavItem) { activeNavItem.classList.add('active'); }
	};
};

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

		const navContent = document.createElement('div');
		navContent.id = 'nav-content';

		const closeNavIcon = document.createElement('img');
		closeNavIcon.id = 'close-nav-icon';
		closeNavIcon.src = this.close_nav_icon;
		closeNavIcon.alt = "Close";
		closeNavIcon.style.display = 'none';
		navContent.appendChild(closeNavIcon);

		const ul = document.createElement('ul');
		this.navItems.forEach(item => {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.href = item.href;

			const img = document.createElement('img');
			img.src = item.icon;
			img.alt = item.text[this.lang];

			const span = document.createElement('span');
			span.textContent = item.text[this.lang];

			a.appendChild(img);
			a.appendChild(span);
			li.appendChild(a);
			ul.appendChild(li);
		});
		navContent.appendChild(ul);
		navBar.appendChild(navContent);
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
				window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
				navBar.style.width = '0';
				this.navIcon.style.display = 'block';
				document.getElementById('close-nav-icon').style.display = 'none';
			});
		});
	};
	styleNavBar() {
		const navBar = document.getElementById('nav-bar');
		const navBarStyles = { height: '100%', width: '0', position: 'fixed',
			zIndex: '11', top: '0', right: '0', backgroundColor: '#111',
			overflowX: 'hidden', transition: '0.5s', paddingTop: '60px',
		};
		Object.assign(navBar.style, navBarStyles);

		const navContent = navBar.querySelector('#nav-content');
		const navContentStyles = { width: '100%', marginTop: '20px' };
		Object.assign(navContent.style, navContentStyles);

		const ul = navContent.querySelector('ul');
		const ulStyles = { padding: '10px 10px', listStyle: 'none' };
		Object.assign(ul.style, ulStyles);

		const lis = ul.querySelectorAll('li');
		const liStyles = { marginTop: '10px', marginBottom: '10px', borderBottom: '1px solid #f1f1f1', };
		lis.forEach(li => Object.assign(li.style, liStyles));

		const aStyles = { padding: '10px 15px', textDecoration: 'none',
			fontSize: '26px', color: 'white', display: 'block', transition: '0.3s', };
		const as = navBar.querySelectorAll('a');
		as.forEach(a => Object.assign(a.style, aStyles));

		const aImgs = navBar.querySelectorAll('a img');
		const aImgStyles = { paddingLeft: '10px', width: '60px', height: '60px', marginRight: '40px' };
		aImgs.forEach(img => Object.assign(img.style, aImgStyles));

		const icons = [this.navIcon, document.getElementById('close-nav-icon')];
		const iconStyles = { cursor: 'pointer', position: 'fixed', top: '15px', right: '15px',
			width: '40px', height: '40px', zIndex: '12' };
		icons.forEach(icon => {
			if (icon) Object.assign(icon.style, iconStyles);
		});
	};
};

