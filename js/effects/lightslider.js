
document.addEventListener('DOMContentLoaded', (event) => {
	const sections = document.querySelectorAll('section');
	const options = {
		root: null,
		threshold: 0.7,
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
			} else {
				entry.target.classList.remove('in-view');
			}
		});
	}, options);

	sections.forEach(section => {
		observer.observe(section);
	});
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		let target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
	});
});



