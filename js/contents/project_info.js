
class ProjectPopupInfo {
	constructor(details, sources, img) {
		this.details = details;
		this.sources = sources;
		this.img = img;
		this.x_close = "./assets/icons/x_close.png";
	};

	createPopupWindow() {
		const popupContainer = document.createElement('div');
		popupContainer.className = "popupContainer";
		Object.assign(popupContainer.style, {
			position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
			backgroundColor: 'rgba(0,0,0,0.9)', zIndex: '20',
			display: 'flex', justifyContent: 'center', alignItems: 'center',
		});

		const popupContent = document.createElement('div');
		popupContent.style.maxWidth = popupContent.style.maxHeight = window.innerWidth > 900 ? "70%" : "90%";
		Object.assign(popupContent.style, {
			backgroundColor: '#000', borderRadius: '5px', border: '2px solid #fff',
			padding: '20px', overflowY: 'auto', position: 'relative',
		});

		const closeBtn = this.closeButton(popupContainer);

		const img = document.createElement('img');
		img.title = this.img;
		img.alt = this.img;
		img.src = "./assets/project/" + this.img + ".png";
		img.loading = "lazy";
		Object.assign(img.style, {
			maxWidth: '100%', maxHeight: '300px',
			display: 'block',
			objectFit: 'contain',
			margin: '0 auto',
		});

		const details = document.createElement('p');
		details.innerHTML = this.details;
		Object.assign(details.style, { textAlign: 'justify', marginTop: '20px', });

		const sources = document.createElement('a');
		sources.href = this.sources;
		sources.innerHTML = "Source";
		sources.target = "_blank";
		Object.assign(sources.style, {
			display: 'block',
			marginTop: '20px',
			textDecoration: 'none',
			color: '#007bff',
		});

		popupContent.appendChild(closeBtn);
		if (this.img) popupContent.appendChild(img);
		popupContent.appendChild(details);
		if (this.sources) popupContent.appendChild(sources);

		popupContainer.appendChild(popupContent);
		document.body.appendChild(popupContainer);
	};

	closeButton(popupContainer) {
		const closeBtn = document.createElement('img');
		closeBtn.title = "Close";
		closeBtn.alt = "Close";
		closeBtn.src = this.x_close;
		closeBtn.loading = "lazy";
		Object.assign(closeBtn.style, {
			position: 'absolute', top: '10px', right: '10px',
			width: '50px', height: '50px', cursor: 'pointer',
		});
		closeBtn.addEventListener('click', () => {
			popupContainer.remove();
		});
		return closeBtn;
	};
};
