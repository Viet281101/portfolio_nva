
class scrollOnTop {
	constructor() {
		this.scrollOnTopBtn = "./assets/icons/up_arrow.png";
	};

	createScrollOnTopBtn() {
		const btn = document.createElement('button');
		btn.id = 'scrollOnTopBtn';
		btn.innerHTML = `<img src="${this.scrollOnTopBtn}" 
			alt="Scroll to top" 
			style="width: 30px; height: 30px;">`;
		document.body.appendChild(btn);
	
		btn.addEventListener('click', () => {
			$("#fullpage").data('fullpage').moveTo(1);
		});
		btn.addEventListener('mouseover', () => {
			app.mouseMarkEnabled = false;
		});
		btn.addEventListener('mouseout', () => {
			if (app.sections[app.currentSection] !== 'projects' && 
				app.sections[app.currentSection] !== 'home' && 
				app.sections[app.currentSection] !== 'courses') 
			{
				app.mouseMarkEnabled = true;
			}
		});
	
		this.styleScrollOnTopBtn();
	};	

	styleScrollOnTopBtn() {
		const style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `
			#scrollOnTopBtn {
				position: fixed;
				bottom: 20px;
				right: 30px;
				display: none;
				z-index: 10;
				border: none;
				outline: none;
				background-color: #333;
				color: white;
				cursor: pointer;
				padding: 15px;
				border-radius: 50%;
			}
			#scrollOnTopBtn:hover {
				background-color: #555;
			}
		`;
		document.head.appendChild(style);
	};
};
