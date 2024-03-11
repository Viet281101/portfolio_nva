
class Courses {
	constructor() {
		this.section = document.getElementById('courses');
		this.tabList = ['L1', 'L2', 'L3', 'M1', 'M2'];
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
		Object.assign(this.title.style, { fontSize: '30px', textDecoration: 'underline', });
		this.section.appendChild(this.title);

		this.desc = document.createElement("p");
		this.desc.textContent = this.contentData[this.lang].desc;
		Object.assign(this.desc, { textAlign: 'center', });
		this.section.appendChild(this.desc);
		this.createTabs();
		document.getElementById("defaultOpen")?.click();
	};

	createTabs() {
		this.tab = document.createElement("div");
		this.tab.className = "tab";
		Object.assign(this.tab, { overflow: 'hidden', border: '1px solid #ccc', background: 'transparent', });
		this.section.appendChild(this.tab);

		this.tabList.forEach((tabName) => {
			const tabButton = document.createElement("button");
			tabButton.className = "tablinks";
			tabButton.title = this.contentData[this.lang].tabBtnTitle.replace('{0}', tabName);
			tabButton.textContent = tabName;
			Object.assign(tabButton.style, {
				border: '1px solid #555', outline: 'none', backgroundColor: '#333', float: 'left',
				cursor: 'pointer', padding: '8px 10px', transition: '0.3s',
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
			Object.assign(tabContent.style, { display: 'none',
				border: '1px solid #ccc', borderTop: 'none', background: 'transparent',
			});

			const closeButton = this.createCloseButton(tabContent);
			tabContent.appendChild(closeButton);

			const tabData = this.contentData[this.lang][tabName];
			const tabTitle = document.createElement("h2");
			tabTitle.textContent = tabData['h2'];
			tabContent.appendChild(tabTitle);

			const semesterTabsWrapper = document.createElement("div");
			semesterTabsWrapper.className = "semester-tabs-wrapper";
			const semesterTabContentWrapper = document.createElement("div");
			semesterTabContentWrapper.className = "semester-tabcontent-wrapper";

			Object.keys(tabData).forEach(key => {
				if (key.startsWith("S")) {
					const semesterData = tabData[key];
					const semesterTab = document.createElement("button");
					semesterTab.className = "semester-tablinks";
					semesterTab.textContent = key;
					Object.assign(semesterTab.style, {
						border: '1px solid #555', outline: 'none', backgroundColor: '#333',
						cursor: 'pointer', padding: '4px 10px', transition: '0.3s', float: 'left',
						fontSize: '18px', fontFamily:"'Pixel', sans-serif", color:'#fff', fontWeight: 'bold',
					});
					semesterTabsWrapper.appendChild(semesterTab);

					const semesterContent = document.createElement("div");
					semesterContent.id = `${tabName}-${key}`;
					semesterContent.className = "semester-tabcontent";
					Object.assign(semesterContent.style, { display: 'none', padding: '10px', });

					const semesterTitle = document.createElement("h3");
					semesterTitle.textContent = semesterData['h3'];
					semesterContent.appendChild(semesterTitle);

					const coursesList = document.createElement("ul");
					Object.entries(semesterData["courses"]).forEach(([courseId, courseName]) => {
						const courseItem = document.createElement("li");
						courseItem.textContent = courseName;
						Object.assign(courseItem.style, {
							wordWrap: 'normal', padding: '10px 0px',
						});
						coursesList.appendChild(courseItem);
					});
					Object.assign(coursesList.style, { listStyle: 'none', textAlign: 'left', });
					semesterContent.appendChild(coursesList);
					semesterTabContentWrapper.appendChild(semesterContent);

					semesterTab.addEventListener("click", (e) => this.openSemesterTab(e, `${tabName}-${key}`));
				}
			});
			tabContent.appendChild(semesterTabsWrapper);
			tabContent.appendChild(semesterTabContentWrapper);
			this.section.appendChild(tabContent);
		});
	};

	createCloseButton(tabContent) {
		const closeButton = document.createElement("img");
		closeButton.src = this.x_close;
		closeButton.className = "topright";
		closeButton.title = this.contentData[this.lang].closeBtnTitle;
		closeButton.alt = this.contentData[this.lang].closeBtnAlt;
		Object.assign(closeButton.style, { float: 'right', cursor: 'pointer', width: '35px', height: '35px', padding: '4px 4px', });
		closeButton.addEventListener("click", () => {
			tabContent.style.display = 'none';
		});
		return closeButton;
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
			Object.assign(tablinks[i].style, { backgroundColor: '#333', });
		}
		document.getElementById(tabName).style.display = 'block';
		event.currentTarget.className += " active";
		Object.assign(event.currentTarget.style, { backgroundColor: '#666', });
		const firstSemesterTab = this.section.querySelector(`#${tabName} .semester-tablinks:first-child`);
		if (firstSemesterTab) { firstSemesterTab.click(); }
	};

	openSemesterTab(event, semesterId) {
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("semester-tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("semester-tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].classList.remove("active");
			Object.assign(tablinks[i].style, { backgroundColor: '#333', });
		}
		document.getElementById(semesterId).style.display = "block";
		event.currentTarget.classList.add("active");
		Object.assign(event.currentTarget.style, { backgroundColor: '#666', });
	};

	updateContent(lang) {
		this.lang = lang;
		this.title.innerHTML = this.contentData[this.lang].title;
		this.desc.textContent = this.contentData[this.lang].desc;

		this.tabList.forEach((year) => {
			const yearData = this.contentData[this.lang][year];
			const yearTitle = this.section.querySelector(`#${year} > h2`);
			if (yearTitle) { yearTitle.textContent = yearData['h2']; }

			Object.keys(yearData).forEach((semester) => {
				if (semester.startsWith("S")) {
					const semesterData = yearData[semester];
					const semesterTitle = this.section.querySelector(`#${year}-${semester} > h3`);
					if (semesterTitle) { semesterTitle.textContent = semesterData['h3']; }

					const coursesList = this.section.querySelector(`#${year}-${semester} ul`);
					if (coursesList) {
						coursesList.innerHTML = '';
						Object.entries(semesterData["courses"]).forEach(([courseId, courseName]) => {
							const courseItem = document.createElement("li");
							courseItem.textContent = courseName;
							Object.assign(courseItem.style, { wordWrap: 'normal', padding: '10px 0px', });
							coursesList.appendChild(courseItem);
						});
					}
				}
			});
		});

		const activeYearTab = this.section.querySelector('.tablinks.active');
		if (activeYearTab) { activeYearTab.click(); }

		const activeSemesterTab = this.section.querySelector('.semester-tablinks.active');
		if (activeSemesterTab) { activeSemesterTab.click(); }

		const closeButtons = this.section.querySelectorAll('.topright');
		closeButtons.forEach(button => {
			button.alt = this.contentData[this.lang].closeBtnAlt;
			button.title = this.contentData[this.lang].closeBtnTitle;
		});

		const tabButtons = this.section.querySelectorAll('.tablinks');
		tabButtons.forEach((button, index) => {
			button.title = this.contentData[this.lang].tabBtnTitle.replace('{0}', this.tabList[index]);
		});

		const semesterTabButtons = this.section.querySelectorAll('.semester-tablinks');
		semesterTabButtons.forEach((button) => {
			const [year, semester] = button.id.split('-');
			button.textContent = this.contentData[this.lang][year][semester]['h3'];
		});
	};
};
