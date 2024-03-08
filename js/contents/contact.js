
class Contact {
	constructor() {
		this.section = document.getElementById('contact');	
	};

	createContactContent() {
		this.section.innerHTML = '';

		this.title = document.createElement('h2');
		this.title.innerHTML = 'Contact';
		Object.assign(this.title.style, {
			fontSize: '34px',
		});
		this.section.appendChild(this.title);
	};
};
