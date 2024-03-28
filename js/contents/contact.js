
class Contact {
	constructor(lang) {
		this.section = document.getElementById('contact');
		const ic = "./assets/icons/";
		this.contentData = {};
		this.lang = lang;
		this.icons = [
			{ name: 'phone', src: ic+"phone.png" },
			{ name: 'mail', src: ic+"mail.png" },
			{ name: 'map', src: ic+"map.png" },
			{ name: 'plus', src: ic+"plus.png" },
		];
		this.loadContentData();
	};
	loadContentData() { fetch('./js/data/contact.json').then(response => response.json()).then(data => { this.contentData = data; this.createContactContent(); }).catch(error => console.error('Error loading the contact content:', error)); };
	createContactContent() {
		if (!this.contentData[this.lang]) return;
		const data = this.contentData[this.lang];
		this.section.innerHTML = '';

		this.title = document.createElement('h2');
		this.title.textContent = 'Contact';
		this.title.style.fontSize = window.innerWidth > 900 ? '34px' : '28px';
		this.section.appendChild(this.title);

		const table = document.createElement('table');
		table.style.marginTop = window.innerWidth > 900 ? '50px' : '20px';
		table.style.width = '90%';
		this.icons.forEach(icon => {
			const row = table.insertRow();
			const cell1 = row.insertCell();
			Object.assign(cell1.style, { padding: '20px', });
			const img = document.createElement('img');
			img.className = "contact-icon"; img.src = icon.src;
			img.alt = icon.name; img.title = icon.name;
			img.style.cursor = 'pointer';
			img.addEventListener('click', () => this.clickInfo(icon.name));
			img.addEventListener('mouseover', (e) => {e.target.style.transform = 'scale(1.1)'});
			img.addEventListener('mouseout', (e) => {e.target.style.transform = 'scale(1.0)'});
			cell1.appendChild(img);

			const cell2 = row.insertCell();
			Object.assign(cell2.style, { padding: '15px', textAlign: 'left', });
			const button = document.createElement('button');
			button.className = 'contact-btn';
			Object.assign(button.style, { fontFamily:"'Pixel', sans-serif", padding: '5px 22px', minWidth: '100%',
				background: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: '15px', cursor: 'pointer', });
			button.style.fontSize = window.innerWidth > 900 ? 'x-large' : 'large';
			button.textContent = data[icon.name];
			button.addEventListener('click', () => this.clickInfo(icon.name));
			button.addEventListener('mouseover', (e) => {e.target.style.textShadow = "2px 2px #00D7FF"; e.target.style.boxShadow = "2px 2px 2px #00D7FF";});
			button.addEventListener('mouseout', (e) => {e.target.style.textShadow = 'none'; e.target.style.boxShadow = 'none'; });
			cell2.appendChild(button);
		});
		this.section.appendChild(table);

		this.desc = document.createElement('p');
		this.desc.textContent = data.desc;
		this.desc.style.marginTop = window.innerWidth > 900 ? '50px' : '20px';
		this.desc.style.fontSize = window.innerWidth > 900 ? 'large' : 'inherit';
		this.section.appendChild(this.desc);
	};
	updateContent(lang) { this.lang = lang; this.createContactContent(); };
	clickInfo(name) {
		switch (name) {
			case 'phone': this.phoneClickInfo(this.lang); break;
			case 'mail': this.mailClickInfo(this.lang); break;
			case 'map': this.mapClickInfo(this.lang); break;
			case 'plus': this.plusClickInfo(this.lang); break;
			default: break;
		}
	};
	phoneClickInfo(lang) {
		const phonePopup = new PhonePopupInfo(lang);
		phonePopup.createPhonePopup();
	};
	mailClickInfo(lang) {
		console.log('mail');
	};
	mapClickInfo(lang) {
		console.log('map');
	};
	plusClickInfo(lang) {
		console.log('plus');
	};
};

class PhonePopupInfo {
	constructor(lang) {
		const ic = "./assets/icons/";
		this.phone_ics = [
			{ name: 'phone_call', src: ic+"phone_call.png" },
			{ name: 'phone_message', src: ic+"phone_message.png" }
		];
		this.lang = lang;
	};
	createPhonePopup() {

	};
};
