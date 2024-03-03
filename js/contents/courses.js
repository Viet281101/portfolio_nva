
class Courses {
	constructor() {
		this.section = document.getElementById('courses');
		this.leftArrow = 'assets/icons/arrow_left.png';
		this.rightArrow = 'assets/icons/arrow_right.png';
	};

	createCoursesContent() {
		this.section.innerHTML = '';



		this.applyCoursesStyles();
	};

	applyCoursesStyles() {
		const css = `
			/* Courses section styles */
			@charset "UTF-8";

			`;
		const style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	};
};
