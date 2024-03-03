// Dependencies: owl.carousel.css, owl.carousel.js
class Project {
	constructor() {
		this.section = document.getElementById('projects');
		this.contentData = {};
		this.prev_slide = 'nav_left';
		this.next_slide = 'nav_right';
		this.loadContentData();
	};

	loadContentData() {
		fetch('./js/data/project_info.json')
			.then(response => response.json())
			.then(data => { this.contentData = data; this.createProjectContent(app.lang); })
			.catch(error => console.error('Error loading the project content:', error));
	};

	createProjectContent(lang) {
		if (!this.contentData[lang]) return;

		const data = this.contentData[lang];
		this.section.innerHTML = '';

		let title = document.createElement('div');
		title.className = "project-title";
		title.innerHTML = data.title;
		this.section.appendChild(title);

		this.loadSliderCSS();
		this.createSliderCarousel(data);
		this.setupCarouselOptions();
		this.addEventListeners();
		this.setupNavigationButtons();
		this.applyProjectStyles();
	};

	loadSliderCSS() {
		let lightslider = document.createElement('link');
		lightslider.rel = 'stylesheet';
		lightslider.type = 'text/css';
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
		projectSummary.innerHTML = data.summary.replace('{0}', `<strong>${totalProjects}</strong>`);
		this.section.appendChild(projectSummary);
	};

	createProjectElement(projectName, projectData, buttonText, buttonTitle) {
		let project = document.createElement('div');
		project.className = "card";

		// Image
		let project_image = document.createElement('div');
		project_image.className = "img";
		let img = document.createElement('img');
		img.src = './assets/project/' + projectData.image + '.png';
		img.alt = projectName;
		project_image.appendChild(img);

		// Content
		let card_content = document.createElement('div');
		card_content.className = "card-content";

		let title = document.createElement('div');
		title.className = "title";
		title.innerHTML = projectName;

		let sub_title = document.createElement('div');
		sub_title.className = "sub-title";
		sub_title.innerHTML = projectData.tools;

		let description = document.createElement('p');
		description.innerHTML = projectData.desc;

		let btn = document.createElement("div");
		btn.className = "btn";
		let button = document.createElement("button");
		button.innerHTML = buttonText;
		button.title = buttonTitle + projectName;

		card_content.appendChild(title);
		card_content.appendChild(sub_title);
		card_content.appendChild(description);
		card_content.appendChild(btn);
		btn.appendChild(button);

		project.appendChild(project_image);
		project.appendChild(card_content);

		return project;
	};

	updateContent(lang) {
		this.createProjectContent(lang);
	};

	setupCarouselOptions() {
		$(document).ready(function() {
			$('.slider').owlCarousel({
				loop: true,
				nav: true,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				responsive: {
					0: { items: 1 },
					600: { items: 2 },
					1400: { items: 3 },
					1800: { items: 4 },
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
				"position": "absolute",
				"top": "50%",
				"left": "-40px",
				"transform": "translateY(-50%)",
				"border": "none",
				"background": "none"
			});
			$('.owl-next').html('<img title="Scroll Right" class="nav-next-slider" src="./assets/icons/' + this.next_slide + '.png" style="width: 50px; height: 50px;">').css({
				"position": "absolute",
				"top": "50%",
				"right": "-40px",
				"transform": "translateY(-50%)",
				"border": "none",
				"background": "none"
			});
		});
	};

	applyProjectStyles() {
		const css = `
			@charset "UTF-8";
			#projects { width: 100%;}
			.project-title {
				margin-top: 70px;
				font-weight: bold;
				text-align: center;
				padding: 30px;
				font-size: 36px;
				color: #ffffff;
				text-shadow: 4px 4px 4px #0056b3;
			}
			.slider {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				-ms-box-sizing: border-box;
				box-sizing: border-box;
			}
			.card {
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
				transition: 0.3s;
				width: 240px;
				margin: 16px;
				border-radius: 10px;
				overflow: hidden;
				border: 1px solid #f1f1f1;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				-ms-box-sizing: border-box;
				box-sizing: border-box;
			}
			.owl-item {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.img {
				width: 100%;
				height: 160px;
				overflow: hidden;
			}
			.img img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			.card-content { padding: 2px 16px; }
			.title {
				font-weight: bold;
				text-align: center;
				font-size: 20px;
				padding: 5px;
				text-shadow: 3px 3px 3px #0056b3;
			}
			.sub-title {
				text-align: center;
				padding: 5px;
				color: #00D7FF;
			}
			.card-content p {
				text-align: center;
				padding: 5px;
				overflow-wrap: break-word;
			}
			.btn {
				text-align: center;
				margin-top: 10px;
			}
			.btn button {
				border: 1px solid #f1f1f1;
				outline: none;
				padding: 10px;
				background: transparent;
				color: white;
				text-transform: uppercase;
				font-family:'Pixel', sans-serif;
				cursor: pointer;
				border-radius: 5px;
			}
			.btn button:hover { background-color: #0056b3; }
			.nav-prev-slider:hover, .nav-next-slider:hover { transform: scale(1.1); }
			.project-summary {
				text-align: center;
				padding: 20px;
				font-size: 24px;
				color: #ffffff;
			}
			.project-summary strong { color: #00D7FF; }
		`;
		const head = document.head;
		const style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	};
};

