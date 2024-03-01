
class LoadPopupPage {
	constructor(totalRessources) {
		this.totalRessources = totalRessources;
		this.loadedRessources = 0;
		this.popupElement = null;
		this.progressElement = null;
		this.progressValue = 0;
		this.createPopupPage();
		this.stylePopupPage();
	};

	createPopupPage() {
		this.popupElement = document.createElement('div');
		this.popupElement.id = 'loadPopup';
		this.popupElement.innerHTML = `
				<div class="popup-content">
				<h2>LOADING</h2>
				<div id="progressBar"><div id="progressValue">0%</div></div>
			</div>
		`;
		document.body.appendChild(this.popupElement);
		this.progressElement = document.getElementById('progressValue');
	};

	updateProgress() {
		this.progressValue = Math.floor((this.loadedRessources / this.totalRessources) * 100);
		this.progressElement.textContent = this.progressValue + '%';
		if (this.progressValue === 100) {
			this.hidePopup();
		}
	};

	ressourceLoaded() {
		this.loadedRessources++;
		this.updateProgress();
	};

	hidePopup() {
		this.popupElement.style.display = 'none';
	};

	stylePopupPage() {
		const style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `
			#loadPopup {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.7);
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 9;
			}
			.popup-content h2 {
				color: white;
				margin-bottom: 20px;
			}
			#progressBar {
				width: 50%;
				background-color: #ddd;
			}
			#progressValue {
				height: 20px;
				background-color: green;
				text-align: center;
				line-height: 20px;
				color: white;
			}
		`;
		document.head.appendChild(style);
	};
};
