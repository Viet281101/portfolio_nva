
class Courses {
	constructor() {
		this.section = document.getElementById('courses');
		this.tabList = ['L1', 'L2', 'L3', 'M1'];
		this.x_close = "./assets/icons/x_close.png";
		this.contentData = {};
		this.lang = app.lang;
		this.loadContentData();
	};

	loadContentData() {
		fetch('./js/data/courses.json')
			.then(response => response.json())
			.then(data => { this.contentData = data; this.createCoursesContent(); })
			.catch(error => console.error('Error loading the courses content:', error));
	};

	createCoursesContent() {
		if (Object.keys(this.contentData).length === 0) return;
		this.lang = app.lang;
		this.section.innerHTML = '';

		this.title = document.createElement('h2');
		this.title.innerHTML = this.contentData[this.lang].title;
		Object.assign(this.title.style, {
			fontSize: '34px',
		});
		this.section.appendChild(this.title);

		this.desc = document.createElement("p");
		this.desc.textContent = this.contentData[this.lang].desc;
		Object.assign(this.desc, {
			textAlign: 'center',
		});
		this.section.appendChild(this.desc);
		this.createTabs();
		document.getElementById("defaultOpen").click();
	};

	createTabs() {
		this.tab = document.createElement("div");
		this.tab.className = "tab";
		Object.assign(this.tab, {
			overflow: 'hidden', border: '1px solid #ccc', background: 'transparent',
		});
		this.section.appendChild(this.tab);

		this.tabList.forEach((tabName) => {
			const tabButton = document.createElement("button");
			tabButton.className = "tablinks";
			tabButton.title = this.contentData[this.lang].tabBtnTitle + tabName;
			tabButton.textContent = tabName;
			Object.assign(tabButton.style, {
				border: '1px solid #555', outline: 'none', backgroundColor: '#333', float: 'left',
				cursor: 'pointer', padding: '14px 16px', transition: '0.3s',
				fontSize: '18px', fontFamily:"'Pixel', sans-serif", color:'#fff', fontWeight: 'bold',
			});
			tabButton.addEventListener("click", (e) => this.openTab(e, tabName));
			tabButton.addEventListener("mouseover", (e) => {
				if (!e.target.classList.contains("active")) { e.target.style.backgroundColor = "#444"; }
				else { e.target.style.backgroundColor = "#666"; }
			});
			tabButton.addEventListener("mouseout", (e) => {
				if (!e.target.classList.contains("active")) { e.target.style.backgroundColor = "#333"; }
				else { e.target.style.backgroundColor = "#666"; }
			});

			if (tabName === this.tabList[0]) { tabButton.id = "defaultOpen"; }
	
			this.tab.appendChild(tabButton);
		});
		this.createTabsContent();
	};

	createTabsContent() {
		this.tabList.forEach((tabName) => {
			const tabContent = document.createElement("div");
			tabContent.id = tabName;
			tabContent.className = "tabcontent";
			Object.assign(tabContent.style, {
				display: 'none', padding: '6px 12px',
				border: '1px solid #ccc', borderTop: 'none',
				background: 'transparent',
			});

			const closeButton = document.createElement("img");
			closeButton.src = this.x_close;
			closeButton.title = "Close Tab";
			closeButton.alt = "Close";
			closeButton.className = "topright";
			Object.assign(closeButton.style, {
				float: 'right', cursor: 'pointer', width: '30px', height: '30px',
			});
			closeButton.addEventListener("click", () => {
				tabContent.style.display = 'none';
			});
			tabContent.appendChild(closeButton);
			this.section.appendChild(tabContent);
		});
	};

	openTab(event, tabName) {
		var i, tabContent, tablinks;
		tabContent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabContent.length; i++) {
			tabContent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
			Object.assign(tablinks[i].style, {
				backgroundColor: '#333', 
			});
		}
		document.getElementById(tabName).style.display = 'block';
		event.currentTarget.className += " active";
		Object.assign(event.currentTarget.style, {
			backgroundColor: '#666',
		});
	};

	updateContent(lang) {
		this.lang = lang;
		this.title.innerHTML = this.contentData[this.lang].title;
		this.desc.textContent = this.contentData[this.lang].desc;
	};
};
