
function createAboutContent() {
	const section = document.getElementById('about');
	section.innerHTML = ''; //// Clear any existing content ////

	//// Create title ////
	const aboutTitle = document.createElement('div');
	aboutTitle.className = 'about-title';
	const title = document.createElement('h1');
	title.textContent = 'About Me';
	aboutTitle.appendChild(title);

	//// Create content containers ////
	const aboutContent = document.createElement('div');
	aboutContent.className = 'about-content';

	//// Left content ////
	const aboutLeft = document.createElement('div');
	aboutLeft.className = 'about-content-left';
	const leftTitle = document.createElement('div');
	leftTitle.className = 'about-content-left-title';
	const whoAmI = document.createElement('h2');
	whoAmI.textContent = 'Who am I ?';
	leftTitle.appendChild(whoAmI);
	const leftContent = document.createElement('div');
	leftContent.className = 'about-content-left-content';
	const p1 = document.createElement('p');
	p1.textContent = "I'm a computer science student at the University of Paris 8, Saint Denis. I am passionate about creating interactive, graphic effects. I am also interested in web development and machine learning.";
	leftContent.appendChild(p1);

	//// Right content ////
	const aboutRight = document.createElement('div');
	aboutRight.className = 'about-content-right';
	const rightTitle = document.createElement('div');
	rightTitle.className = 'about-content-right-title';
	const whatIDo = document.createElement('h2');
	whatIDo.textContent = 'What I do ?';
	rightTitle.appendChild(whatIDo);
	const rightContent = document.createElement('div');
	rightContent.className = 'about-content-right-content';
	const p2 = document.createElement('p');
	p2.textContent = "I am currently working on a project to create a website to showcase my projects. I am also learning about machine learning and deep learning.";
	rightContent.appendChild(p2);

	//// Construct the content ////
	aboutLeft.appendChild(leftTitle);
	aboutLeft.appendChild(leftContent);
	aboutRight.appendChild(rightTitle);
	aboutRight.appendChild(rightContent);
	aboutContent.appendChild(aboutLeft);
	aboutContent.appendChild(aboutRight);

	//// Append to the section ////
	section.appendChild(aboutTitle);
	section.appendChild(aboutContent);
};
