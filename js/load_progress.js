
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
				<h2>LOADING</h2>
				<div id="progressBar"><div id="progressValue">0%</div></div>
			</div>
		`;
		document.body.appendChild(this.popupElement);
		this.progressElement = document.getElementById('progressValue');
		this.stylePopupPage();
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
				background-color: rgba(0, 0, 0, 0.3);
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 11;
			}
			.popup-content h2 {
				color: white;
				font-size: 50px;
				margin-bottom: 20px;
			}
			#progressBar {
				width: 50%;
				background-color: #ddd;
			}
			#progressValue {
				height: 30px;
				background-image: linear-gradient(-45deg, rgb(177, 8, 189), rgb(88, 186, 255));
				text-align: center;
				line-height: 30px;
				color: white;
			}
		`;
		document.head.appendChild(style);
	};
};
