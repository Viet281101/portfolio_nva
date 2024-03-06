
class Courses {
	constructor() {
		this.section = document.getElementById('courses');
		this.leftArrow = 'assets/icons/arrow_left.png';
		this.rightArrow = 'assets/icons/arrow_right.png';
	};

	createCoursesContent() {
		this.section.innerHTML = '';

	};

	scrollSlides(direction) {
		const slidesContainer = this.section.querySelector('.slides-container');
		const slideWidth = this.section.querySelector('.slide').offsetWidth;
		if (direction === 'right') slidesContainer.scrollLeft += slideWidth;
		else if (direction === 'left') slidesContainer.scrollLeft -= slideWidth;
		setTimeout(() => this.updateButtonVisibility(), 50);
	};

	updateButtonVisibility() {
		const slidesContainer = this.section.querySelector('.slides-container');
		const leftNavButton = this.section.querySelector('.scroll-left-btn');
		const rightNavButton = this.section.querySelector('.scroll-right-btn');
		const maxScrollLeft = slidesContainer.scrollWidth - slidesContainer.clientWidth;
		leftNavButton.style.display = slidesContainer.scrollLeft > 0 ? 'block' : 'none';
		rightNavButton.style.display = slidesContainer.scrollLeft < maxScrollLeft ? 'block' : 'none';
	};
};
