
let projects = [
	"Othello AI Game",
	"Demo Graphic",
	"Chess Engine",
	"Secure Chat",
	"Detection App",
];

let project_tool = [
	"C, GLUT, SDL2, Minimax Algo",
	"C, OpenGL, GL4Dummies, SDL2",
	"JavaScript, HTML, CSS",
	"Python, Tkinter, AES",
	"Python, OpenCV, Mediapipe",
];

let projects_images = [
	"othello_ai",
	"demo_graphic",
	"chess_engine",
	"chat_app",
	"screen_detection",
];

let project_descript = [
	"Othello AI Game with simple interface and AI using Minimax/Alphabeta Algorithm",
	"Small video graphic demo using OpenGL, SDL2 and GL4Dummies library",
	"Chess Engine with simple web interface and AI using Minimax Algorithm",
	"Simple Securite Chat App with AES encryption, Socket server and client using Tkinter GUI",
	"Simple Detection Apps Collection for screen, face, hand, object, sec, etc",
];

let prev_slide = "./assets/icons/left_arrow.png";
let next_slide = "./assets/icons/right_arrow.png";

function createProjectContent() {
	const section = document.getElementById('projects');
	section.innerHTML = '';

	let lightslider = document.createElement('link');
	lightslider.rel = 'stylesheet';
	lightslider.type = 'text/css';
	lightslider.href = './style/owl.carousel.css';
	document.head.appendChild(lightslider);

	let slider_owl_carousel = document.createElement('div');
	slider_owl_carousel.setAttribute("class", "slider owl-carousel");

	for (let i = 0; i < projects.length; i++) {
		let project = document.createElement('div');
		project.setAttribute("class", "card");
		project.setAttribute("id", projects[i]);
		slider_owl_carousel.appendChild(project);

		let project_image = document.createElement('div');
		project_image.setAttribute("class", "img");
		slider_owl_carousel.appendChild(project_image);

		let img = document.createElement('img');
		img.src = './assets/project/' + projects_images[i] + '.png';
		img.alt = projects_images[i];
		project_image.appendChild(img);
		project.appendChild(project_image);

		let card_content = document.createElement('div');
		card_content.setAttribute("class", "card-content");
		project.appendChild(card_content);

		let title = document.createElement('div');
		title.setAttribute("class", "title");
		title.innerHTML = projects[i];
		card_content.appendChild(title);

		let sub_title = document.createElement('div');
		sub_title.setAttribute("class", "sub-title");
		sub_title.innerHTML = project_tool[i];
		card_content.appendChild(sub_title);

		let description = document.createElement('p');
		description.innerHTML = project_descript[i];
		card_content.appendChild(description);

		let btn = document.createElement("div");
		btn.setAttribute("class", "btn");
		card_content.appendChild(btn);

		let button = document.createElement("button");
		button.innerHTML = "View";
		btn.appendChild(button);
	}

	section.addEventListener('mouseover', function() {
		let target = event.target.closest('.card');
		if (target) {
			target.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2)';
			target.style.border = '1px solid #0056b3';
			target.querySelector('img').style.transform = 'scale(1.1)';
			target.querySelector('p').style.color = '#0056b3';
		}
	});
	section.addEventListener('mouseout', function() {
		let target = event.target.closest('.card');
		if (target) {
			target.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
			target.style.border = '1px solid #f1f1f1';
			target.querySelector('img').style.transform = 'scale(1)';
			target.querySelector('p').style.color = 'white';
		}
	});
	section.appendChild(slider_owl_carousel);

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
	$('.owl-prev').html('<img class="nav-prev-slider" src="' + prev_slide + '" style="width: 50px; height: 50px;">').css({
		"position": "absolute",
		"top": "50%",
		"left": "-25px",
		"transform": "translateY(-50%)",
		"border": "none",
		"background": "none"
	});
	$('.owl-next').html('<img class="nav-next-slider" src="' + next_slide + '" style="width: 50px; height: 50px;">').css({
		"position": "absolute",
		"top": "50%",
		"right": "-25px",
		"transform": "translateY(-50%)",
		"border": "none",
		"background": "none"
	});
};

function applyProjectStyles() {
	const css = `
		@charset "UTF-8";
		#projects {
			// display: flex;
			width: 100%;
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
	`;
	const style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	document.head.appendChild(style);
};

