
class Contact {
	constructor() {
		this.section = document.getElementById('contact');	
	};

	createContactContent() {
		this.section.innerHTML = '';
		this.applyContactStyles();
	};

	applyContactStyles() {
		const css = `
			/* Contact section styles */
			@charset "UTF-8";
			
			`;
		const head = document.head;
		const style = document.createElement('style');

		head.appendChild(style);
		style.type = 'text/css';
		style.innerHTML = css;
	};
};
