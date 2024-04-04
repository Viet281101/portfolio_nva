// Dependencies: owl.carousel.css, owl.carousel.js
class Project {
	constructor(lang) {
		this.section = document.getElementById('projects');
		Object.assign(this.section.style, { width: '100%', });
		this.contentData = {}; this.infoData = {}; this.lang = lang;
		this.prev_slide = 'nav_left'; this.next_slide = 'nav_right';
		this.loadContentData();
		this.boundHandleProjectClick = this.handleProjectClick.bind(this);
	};
	loadContentData() {
		fetch('./js/data/project.json').then(response => response.json()).then(data => { this.contentData = data; this.createProjectContent(this.lang); }).catch(error => console.error('Error loading the project content:', error));
		fetch('./js/data/project_info.json').then(response => response.json()).then(data => { this.infoData = data; this.createProjectContent(this.lang); }).catch(error => console.error('Error loading the project content:', error));
	};
	createProjectContent(lang) {
		if (!this.contentData[lang]) return;
		const data = this.contentData[lang];
		this.section.innerHTML = '';

		let title = document.createElement('div');
		title.className = "project-title";
		title.textContent = data.title;
		Object.assign(title.style, { fontWeight: 'bold', fontSize: '36px', textAlign: 'center', color: '#fff', textShadow: '4px 4px 4px #0056B3', });
		title.style.padding = title.style.marginTop = window.innerWidth > 900 ? '20px' : '0';
		this.section.appendChild(title);

		let subtitle = document.createElement('p');
		subtitle.className = "project-section-subtitle";
		subtitle.textContent = data.subtitle;
		subtitle.style.fontSize = window.innerWidth > 900 ? '24px' : 'inherit';
		subtitle.style.padding = window.innerWidth > 900 ? '10px' : '0';
		Object.assign(subtitle.style, { textAlign: 'center', color: '#fff', });
		this.section.appendChild(subtitle);

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
			slider_owl_carousel.appendChild(projectElement); });
		this.section.appendChild(slider_owl_carousel);

		let projectSummary = document.createElement('div');
		projectSummary.className = "project-summary";
		let totalProjects = Object.keys(data.projects).length;
		projectSummary.innerHTML = data.summary.replace('{0}', `<strong style="color:#00D7FF;">${totalProjects}</strong>`);
		Object.assign(projectSummary.style, { textAlign: 'center', padding: '20px', color: '#fff', });
		projectSummary.style.fontSize = window.innerWidth > 900 ? '24px' : '20px';
		this.section.appendChild(projectSummary);
	};
	createProjectElement(projectName, projectData, buttonText, buttonTitle) {
		let project = document.createElement('div');
		project.className = "card";
		Object.assign(project.style, { width: '240px', margin: '16px', overflow: 'hidden', transition: '0.3s',
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', border: '1px solid #f1f1f1', borderRadius: '10px', 
			mozBoxSize: 'border-box', webkitBoxSize: 'border-box', boxSizing: 'border-box', });
		project.setAttribute('data-project-id', projectData.id);

		let project_image = document.createElement('div');
		project_image.className = "project-card-img";
		Object.assign(project_image.style, { width: '100%', height: '160px', overflow: 'hidden', });
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
		title.textContent = projectName;
		Object.assign(title.style, { fontSize: '20px', fontWeight: 'bold', textAlign: 'center', padding: '5px', textShadow: '3px 3px 3px #0056B3', });

		let sub_title = document.createElement('div');
		sub_title.className = "sub-title";
		sub_title.textContent = projectData.tools;
		Object.assign(sub_title.style, { textAlign: 'center', padding: '5px', color: '#00D7FF', });

		let description = document.createElement('p');
		description.textContent = projectData.desc;
		Object.assign(description.style, { textAlign: 'center', padding: '5px', wordWrap: 'break-word', });

		let btn = document.createElement("div");
		btn.className = "btn";
		Object.assign(btn.style, { textAlign: 'center', marginTop: '10px',});
		let button = document.createElement("button");
		button.textContent = buttonText;
		button.title = buttonTitle + projectName;
		Object.assign(button.style, { border: '1px solid #F1F1F1', borderRadius: '5px', 
			outline: 'none', padding: '10px', background: 'transparent', cursor: 'pointer',
			color: '#fff', textTransform: 'uppercase', fontFamily:"'Pixel', sans-serif", });

		card_content.appendChild(title);
		card_content.appendChild(sub_title);
		card_content.appendChild(description);
		card_content.appendChild(btn);
		btn.appendChild(button);
		project.appendChild(project_image);
		project.appendChild(card_content);
		return project;
	};
	updateContent(lang) { this.lang = lang; this.createProjectContent(lang); };
	setupCarouselOptions() {
		$(document).ready(function() {
			$('.slider').owlCarousel({ loop: true, nav: true, dots: false,
				autoplay: true, autoHeight: true, autoplayTimeout: 3000, autoplayHoverPause: true,
				responsive: { 0: { items: 1 }, 600: { items: 2 }, 1400: { items: 3 }, 1800: { items: 4 }, },
			});
	  	});
	};
	addEventListeners() {
		this.section.removeEventListener('click', this.boundHandleProjectClick);
		this.section.addEventListener('click', this.boundHandleProjectClick);
		this.section.addEventListener('mouseover', (event) => {
			let target = event.target.closest('.card');
			if (target) {
				target.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2)'; target.style.border = '1px solid #0056b3';
				target.querySelector('img').style.transform = 'scale(1.1)';
				target.querySelector('p').style.color = '#0056b3';
				target.querySelector('button').style.color = target.querySelector('button').style.borderColor = '#00D7FF';
			}
		});
		this.section.addEventListener('mouseout', (event) => {
			let target = event.target.closest('.card');
			if (target) {
				target.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)'; target.style.border = '1px solid #f1f1f1';
				target.querySelector('img').style.transform = 'scale(1)';
				target.querySelector('p').style.color = 'white';
				target.querySelector('button').style.color = target.querySelector('button').style.borderColor = 'white';
			}
		});
	};
	handleProjectClick(event) {
		let target = event.target.closest('.card');
		if (target) {
			const projectId = target.getAttribute('data-project-id');
			const projectInfoData = this.infoData[this.lang][projectId];
			console.log(projectId);
			if (projectInfoData) {
				if (!document.querySelector('.popup-container')) {
					try { 
						if (typeof ProjectPopupInfo === "undefined") { throw new Error("ProjectPopupInfo class is not defined."); }
						const projectPopup = new ProjectPopupInfo(projectInfoData.title, projectInfoData.details, projectInfoData.sources, projectInfoData.imgs);
						projectPopup.createPopupWindow(); app.setScrollable(false);
					} catch (error) {
						console.error(error);
						alert('An error occurred while initializing components, reloading...');
						window.location.reload();
					}
				} }
		}
	};
	setupNavigationButtons() {
		$(document).ready(() => {
			$('.owl-prev').html('<img title="Scroll Left" class="nav-prev-slider" src="./assets/icons/' + this.prev_slide + '.png" style="width: 50px; height: 50px;">').css({
				"position": "absolute", "top": "50%", "left": "-40px",
				"transform": "translateY(-50%)", "border": "none", "background": "none" });
			$('.owl-next').html('<img title="Scroll Right" class="nav-next-slider" src="./assets/icons/' + this.next_slide + '.png" style="width: 50px; height: 50px;">').css({
				"position": "absolute", "top": "50%", "right": "-40px",
				"transform": "translateY(-50%)", "border": "none", "background": "none" });
		});
	};
};

class ProjectPopupInfo {
	constructor(title, details, sources, imgs) {
		this.title = title;
		this.details = details;
		this.sources = sources;
		this.imgs = imgs;
		this.x_close = "./assets/icons/x_close.png";
		this.userInteracted = false;
	};
	createPopupWindow() {
		const popupContainer = document.createElement('div');
		popupContainer.className = "popupContainer";
		Object.assign(popupContainer.style, { position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
			backgroundColor: 'rgba(0,0,0,0.9)', zIndex: '20', display: 'flex', justifyContent: 'center', alignItems: 'center', });

		const popupContent = document.createElement('div');
		popupContent.style.maxWidth = popupContent.style.maxHeight = window.innerWidth > 900 ? "70%" : "90%";
		popupContent.style.fontSize = window.innerWidth > 900 ? "large" : "inherit";
		Object.assign(popupContent.style, { backgroundColor: '#000', borderRadius: '5px', border: '3px solid #fff',
			padding: '20px', overflowY: 'auto', position: 'relative', });

		const closeBtn = this.closeButton(popupContainer);
		const title = document.createElement('h2');
		title.textContent = this.title;
		Object.assign(title.style, { padding: '20px 0', margin: '0', textAlign: 'center', textShadow: '3px 3px 3px #0056B3', });
		popupContent.appendChild(title);

		const imgContainer = this.createImagesContainer();
		if (this.imgs && this.imgs.length > 1) {popupContent.appendChild(imgContainer); this.autoScroll(imgContainer, 1000); }

		const details = document.createElement('p');
		details.innerHTML = this.details;
		Object.assign(details.style, { textAlign: 'justify', marginTop: '20px', });

		const sources = document.createElement('a');
		sources.href = this.sources; sources.textContent = `Source`; sources.target = "_blank";
		Object.assign(sources.style, { display: 'block', marginTop: '20px', textDecoration: 'none', color: '#007bff', });

		popupContent.appendChild(closeBtn);
		if (this.imgs) popupContent.appendChild(imgContainer);
		popupContent.appendChild(details);
		if (this.sources) popupContent.appendChild(sources);

		popupContainer.appendChild(popupContent);
		document.body.appendChild(popupContainer);
	};
	createImagesContainer() {
		const container = document.createElement('div');
		Object.assign(container.style, {
			display: 'flex', overflowX: this.imgs.length > 1 ? 'scroll' : 'hidden', 
			margin: '0 auto 20px', maxWidth: '100%', maxHeight: '250px', gap: '10px', 
			boxSizing: 'border-box', });
		if (window.innerWidth > 900) container.addEventListener('scroll', () => { this.userInteracted = true; });
		container.addEventListener('touchstart', () => { this.userInteracted = true; });
		container.addEventListener('mousedown', () => { this.userInteracted = true; });
		this.imgs.forEach(imgName => {
			if (imgName) {
				const img = document.createElement('img');
				img.title = imgName; img.alt = imgName;
				img.src = `./assets/project/${imgName}.png`;
				img.loading = "lazy";
				Object.assign(img.style, { maxWidth: '100%', maxHeight: '250px', flex: '0 0 auto', 
					border: '1px solid #fff', borderRadius: '5px', objectFit: 'contain', });
				container.appendChild(img);
			}
		}); return container;
	};
	closeButton(popupContainer) {
		const closeBtn = document.createElement('img');
		closeBtn.title = closeBtn.alt = "Close";
		closeBtn.src = this.x_close; closeBtn.loading = "lazy";
		Object.assign(closeBtn.style, {position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', });
		closeBtn.style.width = closeBtn.style.height = window.innerWidth > 900 ? '50px' : '40px';
		closeBtn.addEventListener('click', () => { popupContainer.remove(); app.setScrollable(true); }); return closeBtn;
	};
	autoScroll(container, delay) {
		const stepSize = window.innerWidth - (window.innerWidth / 10);
		let isScrolling = false;
		const startScroll = () => {
			let scrollAmount = 0;
			const doScroll = () => {
				if (scrollAmount < stepSize) { container.scrollLeft += 10; scrollAmount += 10; requestAnimationFrame(doScroll); } 
				else { isScrolling = false; setTimeout(() => startAutoScroll(), delay); }
			};
			doScroll();
		};
		const startAutoScroll = () => {
			if (!this.userInteracted && !isScrolling) {
				isScrolling = true;
				if (container.scrollWidth <= container.scrollLeft + container.offsetWidth) { container.scrollLeft = 0; }
				startScroll();
			}
		};
		if (!this.userInteracted) { setTimeout(() => startAutoScroll(), delay); }
	};
};

