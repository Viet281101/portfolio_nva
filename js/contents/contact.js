
class Contact {
	constructor() {
		this.section = document.getElementById('contact');
		this.ic_phone = "./assets/icons/phone.png";
	};

	createContactContent() {
		this.section.innerHTML = '';

		this.title = document.createElement('h2');
		this.title.innerHTML = 'Contact';
		this.title.style.fontSize = window.innerWidth > 900 ? '34px' : '28px';
		this.section.appendChild(this.title);
	};
};
