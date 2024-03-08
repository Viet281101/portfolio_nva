
class Courses {
	constructor() {
		this.section = document.getElementById('courses');
		this.tabList = ['L1', 'L2', 'L3'];
	};

	createCoursesContent() {
		this.section.innerHTML = '';

		this.title = document.createElement('h2');
		this.title.innerHTML = 'Courses';
		Object.assign(this.title.style, {
			fontSize: '34px',
		});
		this.section.appendChild(this.title);

		this.desc = document.createElement("p");
		this.desc.textContent = "My courses in university";
		Object.assign(this.desc, {
			textAlign: 'center',
		});
		this.section.appendChild(this.desc);

		this.createTabs();
	};

	createTabs() {
		this.tab = document.createElement("div");
		this.tab.className = "tab";
		Object.assign(this.tab, {
			overflow: 'hidden', border: '1px solid #ccc', background: 'transparent',
		});
		this.section.appendChild(this.tab);
	};
};
