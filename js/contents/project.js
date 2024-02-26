
let projects = [
	"project_1",
	"project_2",
	"project_3",
	"project_4",
];

let projects_images = [
	"project_1",
	"project_2",
	"project_3",
	"project_4",
];

function createProjectContent() {
	const section = document.getElementById('project');
	section.innerHTML = '';

	let lightslider = document.createElement('link');
	lightslider.rel = 'stylesheet';
	lightslider.type = 'text/css';
	lightslider.href = './style/owl.carousel.css';
	document.head.appendChild(lightslider);

	let slider_owl_carousel = document.createElement('div');
	slider_owl_carousel.setAttribute("class", "slider owl-carousel");
	section.appendChild(slider_owl_carousel);

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
	}


};


function applyProjectStyles() {
	const css = `
		/* Project section styles */
		#project {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			place-items: center;
			text-align: center;
		}
		.slider {
			max-width: 1100px;
			display: flex;
		}
	`;
	const style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	document.head.appendChild(style);
}

