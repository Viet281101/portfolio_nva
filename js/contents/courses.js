
class Courses {
	constructor() {
		this.section = document.getElementById('courses');
	};

	createCoursesContent() {
		this.section.innerHTML = '';

		this.title = document.createElement('h2');
		this.title.innerHTML = 'Courses';
		Object.assign(this.title.style, {
			fontSize: '34px',
		});
		this.section.appendChild(this.title);

	};
};
