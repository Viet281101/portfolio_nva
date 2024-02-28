// Dependencies: owl.carousel.css, owl.carousel.js
class Project {
	constructor() {
		this.projects = [
			"Othello AI Game",
			"Demo Graphic",
			"Chess Engine",
			"Secure Chat",
			"Detection App",
			"Music Virap",
			"Colt Express",
			"Castlevania",
			"Polyominos",
			"Teleporter",
			"Movies Website"
		];
		this.project_tool = [
			"C, GLUT, SDL2, Minimax Algo",
			"C, OpenGL, GL4Dummies, SDL2",
			"JavaScript, HTML, CSS",
			"Python, Tkinter, AES",
			"Python, OpenCV, Mediapipe",
			"Kotlin, Android Studio",
			"Pygame, Tkinter, PIL",
			"JavaScript, Canvas, HTML",
			"JavaScript, HTML, CSS",
			"Godot Engine, GDScript",
			"React, JQuery, HTML, CSS"
		];
		this.projects_images = [
			"othello_ai",
			"demo_graphic",
			"chess_engine",
			"chat_app",
			"screen_detection",
			"music_player_virap",
			"colt_express",
			"castlevania",
			"polyominos",
			"teleporter",
			"movies_web"
		];
		this.project_descript = [
			"Othello AI Game with simple interface and AI using Minimax/Alphabeta Algorithm",
			"Small video graphic demo using OpenGL, SDL2 and GL4Dummies library",
			"Chess Engine with simple web interface and AI using Minimax Algorithm",
			"Simple Securite Chat App with AES encryption, Socket server and client using Tkinter GUI",
			"Simple Detection Apps Collection for screen, face, hand, object, sec, etc",
			"Music Player mobile app for Android with simple interface and features",
			"Colt Express board game with simple interface by Pygame and Tkinter library",
			"2D platformer game with castlevania style using vanilla JS and Canvas API",
			"Website solving Polyominos Puzzle with algorithm and simple interface",
			"2D rpg pixel game make by Godot Engine 3.5.1 with GDScript language",
			"Movies Website with simple interface of movie list and search feature"
		];
		this.prev_slide = "./assets/icons/left_arrow.png";
		this.next_slide = "./assets/icons/right_arrow.png";
		this.section = document.getElementById('projects');
	};

	createProjectContent() {
		this.section.innerHTML = '';

		let title = document.createElement('div');
		title.className = "project-title";
		title.innerHTML = "Projects";
		this.section.appendChild(title);

		this.loadSliderCSS();
		this.createSliderCarousel();
		this.setupCarouselOptions();
		this.applyProjectStyles();
		this.addEventListeners();
		this.setupNavigationButtons();
	};

	loadSliderCSS() {
		let lightslider = document.createElement('link');
		lightslider.rel = 'stylesheet';
		lightslider.type = 'text/css';
		lightslider.href = './style/owl.carousel.css';
		document.head.appendChild(lightslider);
	};

	createSliderCarousel() {
		let slider_owl_carousel = document.createElement('div');
		slider_owl_carousel.className = "slider owl-carousel";
		this.projects.forEach((project, index) => {
			let projectElement = this.createProjectElement(index);
			slider_owl_carousel.appendChild(projectElement);
		});
		this.section.appendChild(slider_owl_carousel);

		let projectSummary = document.createElement('div');
		projectSummary.className = "project-summary";
		projectSummary.innerHTML = `Currently showcasing <strong>${this.projects.length}</strong> projects.`;
		this.section.appendChild(projectSummary);
	};

	createProjectElement(index) {
		let project = document.createElement('div');
		project.className = "card";
		project.id = this.projects[index];

		let project_image = document.createElement('div');
		project_image.className = "img";
		let img = document.createElement('img');
		img.src = './assets/project/' + this.projects_images[index] + '.png';
		img.alt = this.projects_images[index];
		project_image.appendChild(img);

		let card_content = document.createElement('div');
		card_content.className = "card-content";
		project.appendChild(project_image);
		project.appendChild(card_content);

		let title = document.createElement('div');
		title.className = "title";
		title.innerHTML = this.projects[index];
		card_content.appendChild(title);

		let sub_title = document.createElement('div');
		sub_title.className = "sub-title";
		sub_title.innerHTML = this.project_tool[index];
		card_content.appendChild(sub_title);

		let description = document.createElement('p');
		description.innerHTML = this.project_descript[index];
		card_content.appendChild(description);

		let btn = document.createElement("div");
		btn.className = "btn";
		let button = document.createElement("button");
		button.innerHTML = "View";
		btn.appendChild(button);
		card_content.appendChild(btn);

		return project;
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
					1200: { items: 3 },
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
			$('.owl-prev').html('<img class="nav-prev-slider" src="' + this.prev_slide + '" style="width: 50px; height: 50px;">').css({
				"position": "absolute",
				"top": "50%",
				"left": "-25px",
				"transform": "translateY(-50%)",
				"border": "none",
				"background": "none"
			});
			$('.owl-next').html('<img class="nav-next-slider" src="' + this.next_slide + '" style="width: 50px; height: 50px;">').css({
				"position": "absolute",
				"top": "50%",
				"right": "-25px",
				"transform": "translateY(-50%)",
				"border": "none",
				"background": "none"
			});
		});
	};

	applyProjectStyles() {
		const css = `
			@charset "UTF-8";
			#projects {
				// display: flex;
				width: 100%;
			}
			.project-title {
				text-align: center;
				padding: 30px;
				font-size: 36px;
				color: #ffffff;
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
			.card-content {
				padding: 2px 16px;
			}
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
				font-family: 'Pixel', sans-serif;
				cursor: pointer;
				border-radius: 5px;
			}
			.btn button:hover {
				background-color: #0056b3;
			}
			.nav-prev-slider:hover, .nav-next-slider:hover {
				transform: scale(1.1);
			}
			.project-summary {
				text-align: center;
				padding: 20px;
				font-size: 24px;
				color: #ffffff;
			}
			.project-summary strong {
				color: #00D7FF;
			}
		`;
		const head = document.head;
		const style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	};
};

