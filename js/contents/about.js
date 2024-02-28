// Dependencies: none
class About {
	constructor() {
		this.section = document.getElementById('about');
		this.myCV = './assets/doc/Viet_Nguyen_CV.pdf';
	};

	createAboutContent() {
		this.section.innerHTML = ''; // Clear any existing content

		// Create title
		const aboutTitle = document.createElement('div');
		aboutTitle.className = 'about-title';
		const title = document.createElement('h1');
		title.textContent = 'About Me';
		aboutTitle.appendChild(title);

		// Create content containers
		const aboutContent = document.createElement('div');
		aboutContent.className = 'about-content';

		// Left content
		const aboutLeft = this.createAboutLeftContent();
		// Right content
		const aboutRight = this.createAboutRightContent();

		// Construct the content
		aboutContent.appendChild(aboutLeft);
		aboutContent.appendChild(aboutRight);

		// Append to the section
		this.section.appendChild(aboutTitle);
		this.section.appendChild(aboutContent);

		const cvButton = this.createCVButton();
		this.section.appendChild(cvButton);

		this.applyAboutStyles();
	};

	createAboutLeftContent() {
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

		aboutLeft.appendChild(leftTitle);
		aboutLeft.appendChild(leftContent);
		return aboutLeft;
	};

	createAboutRightContent() {
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

		aboutRight.appendChild(rightTitle);
		aboutRight.appendChild(rightContent);
		return aboutRight;
	};

	createCVButton() {
		const cvButton = document.createElement('a');
		cvButton.href = this.myCV;
		// cvButton.download = 'Viet_NGUYEN_CV.pdf';
		cvButton.textContent = 'Resume';
		cvButton.className = 'cv-button';
		cvButton.target = '_blank';
		return cvButton;
	};

	applyAboutStyles() {
		const css = `
			/* About section styles */
			@charset "UTF-8";
			#about {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.about-title {
				text-align: center;
				padding-bottom: 60px;
			}
			.about-content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 80%;
			}
			.about-content-left, .about-content-right {
				flex: 1;
				padding: 10px;
			}
			.about-content-left {
				order: 1;
			}
			.about-content-right {
				order: 2;
			}
			.about-content-left-title, .about-content-right-title {
				padding-bottom: 20px;
			}
			.about-content-left-content, .about-content-right-content {
				text-align: left;
			}
			.about-content-left-content p, .about-content-right-content p {
				font-size: 1.2em;
			}
			.cv-button {
				display: block;
				margin: 20px auto;
				padding: 10px 20px;
				text-transform: uppercase;
				font-size: 24px;
				text-align: center;
				border-radius: 5px;
				border: 2px solid #00D7FF;
				text-decoration: none;
				color: #fff;
			}
			.cv-button:hover {
				color: #00D7FF;
			}
			@media screen and (max-width: 1000px) {
				#about .about-content {
					flex-direction: column;
					align-items: center;
					font-size: 12px;
				}
				.about-title { padding-bottom: 20px; }
				.about-content-left-title, .about-content-right-title { padding-bottom: 5px;}
				.about-content-left, .about-content-right {
					order: 1;
					width: 100%;
					padding: 0;
				}
				.about-content-left {
					padding-bottom: 20px;
				}
			}
		`;
		const head = document.head;
		const style = document.createElement('style');

		head.appendChild(style);
		style.type = 'text/css';
		style.innerHTML = css;
	};
};

