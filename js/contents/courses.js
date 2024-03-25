
class Courses {
	constructor(lang) {
		this.section = document.getElementById('courses');
		this.tabList = ['L1', 'L2', 'L3', 'M1', 'M2'];
		this.x_close = "./assets/icons/x_close.png";
		this.contentData = {};
		this.infoData = {};
		this.lang = lang;
		this.loadContentData();
	};

	loadContentData() {
		fetch('./js/data/courses.json')
			.then(response => response.json())
			.then(data => { this.contentData = data; this.createCoursesContent(); })
			.catch(error => console.error('Error loading the courses content:', error));
		fetch('./js/data/courses_info.json')
			.then(response => response.json())
			.then(data => { this.infoData = data; this.createCoursesContent(); })
			.catch(error => console.error('Error loading the courses content:', error));
	};

	createCoursesContent() {
		if (Object.keys(this.contentData).length === 0) return;
		if (Object.keys(this.infoData).length === 0) return;
		this.section.innerHTML = '';

		this.title = document.createElement('h2');
		this.title.textContent = this.contentData[this.lang].title;
		Object.assign(this.title.style, { fontSize: '30px', textDecoration: 'underline', });
		this.section.appendChild(this.title);

		this.desc = document.createElement("p");
		this.desc.textContent = this.contentData[this.lang].desc;
		Object.assign(this.desc, { textAlign: 'center', });
		this.desc.style.fontSize = window.innerWidth > 900 ? 'large' : 'inherit';
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
				cursor: 'pointer', padding: '8px 10px', transition: '0.3s', borderRadius: '5px',
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
				border: '1px solid #ccc', borderTop: 'none', background: 'transparent', });
			const closeButton = this.createCloseButton(tabContent);
			tabContent.appendChild(closeButton);

			const tabData = this.contentData[this.lang][tabName];
			const tabTitle = document.createElement("h2");
			tabTitle.textContent = tabData['h2'];
			tabTitle.style.textDecoration = 'underline';
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
						border: '1px solid #555', outline: 'none', backgroundColor: '#333', borderRadius: '5px', 
						cursor: 'pointer', padding: '4px 10px', transition: '0.3s', float: 'left',
						fontSize: '18px', fontFamily:"'Pixel', sans-serif", color:'#fff', fontWeight: 'bold',
					});
					semesterTab.addEventListener('mouseover', (e) => {
						if (!e.target.classList.contains("active")) { e.target.style.backgroundColor = "#444"; }
						else { e.target.style.backgroundColor = "#666"; }
					});
					semesterTab.addEventListener('mouseout', (e) => {
						if (!e.target.classList.contains("active")) { e.target.style.backgroundColor = "#333"; }
						else { e.target.style.backgroundColor = "#666"; }
					});
					semesterTabsWrapper.appendChild(semesterTab);

					const semesterContent = document.createElement("div");
					semesterContent.id = `${tabName}-${key}`;
					semesterContent.className = "semester-tabcontent";
					Object.assign(semesterContent.style, { display: 'none', padding: '10px', });

					const semesterTitle = document.createElement("h3");
					semesterTitle.textContent = semesterData['h3'];
					semesterTitle.style.fontSize = window.innerWidth > 900 ? "x-large" : "large";
					semesterContent.appendChild(semesterTitle);

					const coursesList = document.createElement("ul");
					Object.entries(semesterData["courses"]).forEach(([courseId, courseName]) => {
						this.updateCourseContent(coursesList, courseId, courseName, this.lang, tabName, key);
					});
					Object.assign(coursesList.style, { listStyle: 'none', textAlign: 'left', padding: '0', margin: '0', });
					coursesList.style.marginLeft = window.innerWidth > 768 ? '100px' : '0';
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
		closeButton.addEventListener("click", () => { tabContent.style.display = 'none'; });
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
		if (firstSemesterTab) { firstSemesterTab?.click(); }
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

	updateCourseContent(content, courseId, courseName, lang, tabName, semesterKey) {
		const courseItem = document.createElement("li");
		courseItem.style.borderTop = window.innerWidth < 768 ? '1px solid #fff' : 'none';
		const courseButton = document.createElement("button");
		courseButton.textContent = courseName;
		Object.assign(courseButton.style, {
			display: 'block', width: '100%', textAlign: 'left', background: 'none', 
			border: 'none', color: 'inherit', textTransform: 'none', cursor: 'pointer',
			fontFamily: "'Pixel', sans-serif", wordBreak: 'keep-all',});
		courseButton.style.fontSize = window.innerWidth > 900 ? 'large' : 'inherit';
		courseButton.style.padding = window.innerWidth > 900 ? '15px 0px' : '10px 0px';
		courseButton.addEventListener('click', () => {
			const courseInfoId = `${tabName}-${semesterKey}-${courseId}`;
			const courseInfo = this.infoData[lang][courseInfoId];
			if (courseInfo) {
				try { if (typeof CoursesInfo === "undefined") { throw new Error("CoursesInfo class is not defined."); }
					const coursePopup = new CoursesInfo(courseInfo.title, courseInfo.description, courseInfo.duration, courseInfo.credits);
					coursePopup.createPopupWindow();
					coursePopup.showPopup(); 
				} catch (error) { console.error(error); alert('An error occurred while initializing components, reloading...'); window.location.reload(); }
			} else { console.log("No detailed info available for this course."); }
		});
		courseButton.addEventListener('mouseover', (e) => { e.target.style.color = '#00D7FF'; });
		courseButton.addEventListener('mouseout', (e) => { e.target.style.color = '#fff'; });
		courseItem.appendChild(courseButton);
		content.appendChild(courseItem);
	};

	updateContent(lang) {
		this.lang = lang;
		this.title.innerHTML = this.contentData[this.lang].title;
		this.desc.textContent = this.contentData[this.lang].desc;

		const tabContent = this.section.querySelectorAll('.tabcontent');
		tabContent.forEach(content => {
			const year = content.id;
			const yearData = this.contentData[this.lang][year];
			if (yearData) {
				const tabTitle = content.querySelector('h2');
				if (tabTitle) { tabTitle.textContent = yearData['h2']; }
				Object.keys(yearData).forEach(key => {
					if (key.startsWith("S")) {
						const semesterData = yearData[key];
						const semesterTitle = content.querySelector(`#${year}-${key} > h3`);
						if (semesterTitle) { semesterTitle.textContent = semesterData['h3']; }
						const coursesList = content.querySelector(`#${year}-${key} ul`);
						if (coursesList) {
							coursesList.innerHTML = '';
							Object.entries(semesterData["courses"]).forEach(([courseId, courseName]) => {
								this.updateCourseContent(coursesList, courseId, courseName, this.lang, year, key);
							});
						}
					}
				});
			}
		});
		const activeYearTab = this.section.querySelector('.tablinks.active');
		if (activeYearTab) { activeYearTab?.click(); }
		this.section.querySelectorAll('.semester-tablinks').forEach(button => {
			const [year, semester] = button.id.split('-');
			const semesterData = this.contentData[this.lang][year] ? this.contentData[this.lang][year][semester] : null;
			if (semesterData) { button.textContent = semesterData['h3']; }
		});
		this.section.querySelectorAll('.topright').forEach(button => {
			button.title = this.contentData[this.lang].closeBtnTitle;
			button.alt = this.contentData[this.lang].closeBtnAlt;
		});
	};
};
