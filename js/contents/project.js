// Dependencies: owl.carousel.css, owl.carousel.js
class Project {
	constructor(lang) {
		this.section = document.getElementById('projects');
		Object.assign(this.section.style, { width: '100%', });
		this.contentData = {};
		this.lang = lang;
		this.prev_slide = 'nav_left'; this.next_slide = 'nav_right';
		this.loadContentData();
	};

	loadContentData() {
		fetch('./js/data/project.json')
			.then(response => response.json())
			.then(data => { this.contentData = data; this.createProjectContent(this.lang); })
			.catch(error => console.error('Error loading the project content:', error));
	};

	createProjectContent(lang) {
		if (!this.contentData[lang]) return;
		const data = this.contentData[lang];
		this.section.innerHTML = '';

		let title = document.createElement('div');
		title.className = "project-title";
		title.innerHTML = data.title;
		Object.assign(title.style, { 
			marginTop: '70px', fontWeight: 'bold', fontSize: '36px',
			textAlign: 'center', padding: '30px', color: '#fff', textShadow: '4px 4px 4px #0056B3',
		});
		this.section.appendChild(title);

		this.loadSliderCSS();
		this.createSliderCarousel(data);
		this.setupCarouselOptions();
		this.addEventListeners();
		this.setupNavigationButtons();
	};

	loadSliderCSS() {
		let lightslider = document.createElement('link');
		lightslider.rel = 'stylesheet'; lightslider.type = 'text/css';
		lightslider.href = './style/owl.carousel.css';
		document.head.appendChild(lightslider);
	};

	createSliderCarousel(data) {
		let slider_owl_carousel = document.createElement('div');
		slider_owl_carousel.className = "slider owl-carousel";
		Object.entries(data.projects).forEach(([projectName, projectData]) => {
			let projectElement = this.createProjectElement(projectName, projectData, data.button, data.button_title);
			slider_owl_carousel.appendChild(projectElement);
		});
		this.section.appendChild(slider_owl_carousel);

		let projectSummary = document.createElement('div');
		projectSummary.className = "project-summary";
		let totalProjects = Object.keys(data.projects).length;
		projectSummary.innerHTML = data.summary.replace('{0}', `<strong style="color:#00D7FF;">${totalProjects}</strong>`);
		Object.assign(projectSummary.style, {
			textAlign: 'center', padding: '20px', color: '#fff', fontSize: '24px',
		});
		this.section.appendChild(projectSummary);
	};

	createProjectElement(projectName, projectData, buttonText, buttonTitle) {
		let project = document.createElement('div');
		project.className = "card";
		Object.assign(project.style, {
			width: '240px', margin: '16px', overflow: 'hidden',
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', transition: '0.3s',
			border: '1px solid #f1f1f1', borderRadius: '10px', 
			mozBoxSize: 'border-box', webkitBoxSize: 'border-box', boxSizing: 'border-box',
		});

		let project_image = document.createElement('div');
		project_image.className = "project-card-img";
		Object.assign(project_image.style, {
			width: '100%', height: '160px', overflow: 'hidden',
		});
		let img = document.createElement('img');
		img.src = './assets/project/' + projectData.image + '.png';
		img.alt = projectName; img.loading = 'lazy'; img.title = projectName;
		Object.assign(img.style, { width: '100%', height: '100%', objectFit: 'cover', });
		project_image.appendChild(img);

		let card_content = document.createElement('div');
		card_content.className = "card-content";
		Object.assign(card_content.style, { padding: '2px 16px', });

		let title = document.createElement('div');
		title.className = "title";
		title.innerHTML = projectName;
		Object.assign(title.style, { 
			fontSize: '20px', fontWeight: 'bold', textAlign: 'center',
			padding: '5px', textShadow: '3px 3px 3px #0056B3',
		});

		let sub_title = document.createElement('div');
		sub_title.className = "sub-title";
		sub_title.innerHTML = projectData.tools;
		Object.assign(sub_title.style, {
			textAlign: 'center', padding: '5px', color: '#00D7FF',
		});

		let description = document.createElement('p');
		description.innerHTML = projectData.desc;
		Object.assign(description.style, {
			textAlign: 'center', padding: '5px', wordWrap: 'break-word',
		});

		let btn = document.createElement("div");
		btn.className = "btn";
		Object.assign(btn.style, { textAlign: 'center', marginTop: '10px',});
		let button = document.createElement("button");
		button.innerHTML = buttonText;
		button.title = buttonTitle + projectName;
		Object.assign(button.style, {
			border: '1px solid #F1F1F1', borderRadius: '5px', outline: 'none', color: 'white',
			padding: '10px', background: 'transparent', cursor: 'pointer',
			textTransform: 'uppercase', fontFamily:"'Pixel', sans-serif",
		});

		card_content.appendChild(title);
		card_content.appendChild(sub_title);
		card_content.appendChild(description);
		card_content.appendChild(btn);
		btn.appendChild(button);

		project.appendChild(project_image);
		project.appendChild(card_content);
		return project;
	};
	updateContent(lang) { this.createProjectContent(lang); };
	setupCarouselOptions() {
		$(document).ready(function() {
			$('.slider').owlCarousel({
				loop: true, nav: true,
				autoplay: true, autoplayTimeout: 3000, autoplayHoverPause: true,
				responsive: {
					0: { items: 1 }, 600: { items: 2 },
					1400: { items: 3 }, 1800: { items: 4 },
				},
			});
	  	});
	};

	addEventListeners() {
		this.section.addEventListener('mouseover', (event) => {
			let target = event.target.closest('.card');
			if (target) {
				target.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2)';
				target.style.border = '1px solid #0056b3';
				target.querySelector('img').style.transform = 'scale(1.1)';
				target.querySelector('p').style.color = '#0056b3';
			}
			});
			this.section.addEventListener('mouseout', (event) => {
			let target = event.target.closest('.card');
			if (target) {
				target.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
				target.style.border = '1px solid #f1f1f1';
				target.querySelector('img').style.transform = 'scale(1)';
				target.querySelector('p').style.color = 'white';
			}
		});
	};

	setupNavigationButtons() {
		$(document).ready(() => {
			$('.owl-prev').html('<img title="Scroll Left" class="nav-prev-slider" src="./assets/icons/' + this.prev_slide + '.png" style="width: 50px; height: 50px;">').css({
				"position": "absolute", "top": "50%", "left": "-40px",
				"transform": "translateY(-50%)",
				"border": "none", "background": "none"
			});
			$('.owl-next').html('<img title="Scroll Right" class="nav-next-slider" src="./assets/icons/' + this.next_slide + '.png" style="width: 50px; height: 50px;">').css({
				"position": "absolute", "top": "50%", "right": "-40px",
				"transform": "translateY(-50%)",
				"border": "none", "background": "none"
			});
		});
	};
};

