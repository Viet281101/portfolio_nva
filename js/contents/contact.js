
class Contact {
	constructor() {
		this.section = document.getElementById('contact');
		const ic = "./assets/icons/";
		this.ic_phone = ic+"phone.png";
		this.ic_mail = ic+"mail.png";
		this.ic_map= ic+"map.png";
	};

	createContactContent() {
		this.section.innerHTML = '';

		this.title = document.createElement('h2');
		this.title.innerHTML = 'Contact';
		this.title.style.fontSize = window.innerWidth > 900 ? '34px' : '28px';
		this.section.appendChild(this.title);
	};
};
