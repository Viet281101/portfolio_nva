
class LoadPopupPage {
	constructor() {
		this.popupElement = null;
		this.progressElement = null;
		this.progressValue = 0;
	};

	createPopupPage() {
		this.popupElement = document.createElement('div');
		this.popupElement.id = 'loadPopup';
		Object.assign(this.popupElement.style, {
			position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.9)',
			display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '11',
		});

		const popupContent = document.createElement('div');
		popupContent.className = 'popup-content';

		const loadingText = document.createElement('h2');
		Object.assign(loadingText.style, { color: '#fff', fontSize: '50px', marginBottom: '20px', });
		loadingText.textContent = 'LOADING';

		const progressBar = document.createElement('div');
		progressBar.id = 'progressBar';
		Object.assign(progressBar.style, { width: '50%', height: '30px', backgroundColor: '#ddd', });

		this.progressElement = document.createElement('div');
		this.progressElement.id = 'progressValue';
		this.progressElement.textContent = '0%';
		Object.assign(this.progressElement.style, {
			height: '30px', lineHeight: '30px', textAlign: 'center', color: 'white',
			backgroundImage: 'linear-gradient(-45deg, rgb(177, 8, 189), rgb(88, 186, 255)',
		});

		progressBar.appendChild(this.progressElement);
		popupContent.appendChild(loadingText);
		popupContent.appendChild(progressBar);
		this.popupElement.appendChild(popupContent);
		document.body.appendChild(this.popupElement);	
	};

	hidePopup() {
		this.popupElement.style.display = 'none';
		if (this.popupElement) { this.popupElement.remove(); this.popupElement = null; }
	};
};
