
class LoadPopupPage {
	constructor() {
		this.popupElement = null;
		this.progressElement = null;
		this.progressValue = 0;
	};

	createPopupPage() {
		this.popupElement = document.createElement('div');
		this.popupElement.id = 'loadPopup';
		this.popupElement.innerHTML = `
				<div class="popup-content">
				<h2 style="color:#fff; font-size: 50px; margin-bottom: 20px;">LOADING</h2>
				<div id="progressBar"><div id="progressValue">0%</div></div>
			</div>
		`;
		Object.assign(this.popupElement.style, {
			position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.9)',
			display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '11',
		});
		document.body.appendChild(this.popupElement);
		this.progressElement = document.getElementById('progressValue');
		this.stylePopupPage();
	};

	hidePopup() {
		this.popupElement.style.display = 'none';
		if (this.popupElement) { this.popupElement.remove(); this.popupElement = null; }
	};

	stylePopupPage() {
		const progressBar = document.getElementById('progressBar');
		Object.assign(progressBar.style, {
			width: '50%', height: '30px', backgroundColor: '#ddd',
		});
		const progressValue = document.getElementById('progressValue');
		Object.assign(progressValue.style, {
			height: '30px', lineHeight: '30px', textAlign: 'center', color: 'white',
			backgroundImage: 'linear-gradient(-45deg, rgb(177, 8, 189), rgb(88, 186, 255)',
		});
	};
};
