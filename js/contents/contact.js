
class Contact {
	constructor(lang) {
		this.section = document.getElementById('contact');
		const ic = "./assets/icons/";
		this.contentData = {};
		this.lang = lang;
		this.icons = [
			{ name: 'phone', src: ic + "phone.png" },
			{ name: 'mail', src: ic + "mail.png" },
			{ name: 'map', src: ic + "map.png" },
			{ name: 'plus', src: ic + "plus.png" },
		];
		this.loadContentData();
	};

	loadContentData() {
		fetch('./js/data/contact.json').then(response => response.json()).then(data => { this.contentData = data; this.createContactContent(); }).catch(error => console.error('Error loading the contact content:', error));
	};

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
		this.icons.forEach(icon => {
			const row = table.insertRow();
			const cell1 = row.insertCell();
			Object.assign(cell1.style, { padding: '20px', });
			const img = document.createElement('img');
			img.className = "contact-icon";
			img.src = icon.src;
			img.alt = icon.name;
			img.title = icon.name;
			img.style.cursor = 'pointer';
			img.addEventListener('click', () => this.clickInfo(icon.name));
			img.addEventListener('mouseover', (e) => {e.target.style.transform = 'scale(1.1'});
			img.addEventListener('mouseout', (e) => {e.target.style.transform = 'scale(1.0'});
			cell1.appendChild(img);

			const cell2 = row.insertCell();
			Object.assign(cell2.style, { padding: '15px', textAlign: 'left', });
			const button = document.createElement('button');
			button.className = 'contact-btn';
			Object.assign(button.style, { fontFamily:"'Pixel', sans-serif", padding: '8px 22px', minWidth: '100%', color: '#000', borderRadius: '5px'});
			button.style.fontSize = window.innerWidth > 900 ? 'x-large' : 'large';
			button.textContent = data[icon.name];
			button.addEventListener('click', () => this.clickInfo(icon.name));
			cell2.appendChild(button);
		});
		this.section.appendChild(table);

		this.desc = document.createElement('p');
		this.desc.textContent = data.desc;
		this.desc.style.marginTop = window.innerWidth > 900 ? '50px' : '20px';
		this.desc.style.fontSize = window.innerWidth > 900 ? 'large' : 'inherit';
		this.section.appendChild(this.desc);
	};

	clickInfo(name) {
		console.log(name);
	};

	updateContent(lang) {
		this.lang = lang;
		this.createContactContent();
	};
};
