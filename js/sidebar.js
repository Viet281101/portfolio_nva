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

