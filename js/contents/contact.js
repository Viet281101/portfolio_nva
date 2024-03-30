
class Contact {
	constructor(lang) {
		this.section = document.getElementById('contact');
		Object.assign(this.section.style, { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', });
		this.contentData = {};
		this.lang = lang;
		this.icons = ['phone', 'mail', 'map', 'plus', ];
		this.loadContentData();
	};
	loadContentData() { fetch('./js/data/contact.json').then(response => response.json()).then(data => { this.contentData = data; this.createContactContent(); }).catch(error => console.error('Error loading the contact content:', error)); };
	createContactContent() {
		if (!this.contentData[this.lang]) return;
		const data = this.contentData[this.lang];
		const ic = "./assets/icons/";
		this.section.innerHTML = '';

		this.title = document.createElement('h2');
		this.title.textContent = 'Contact';
		this.title.style.fontSize = window.innerWidth > 900 ? '34px' : '28px';
		this.section.appendChild(this.title);

		this.subtitle = document.createElement('p');
		this.subtitle.textContent = data.subtitle;
		this.subtitle.style.fontSize = window.innerWidth > 900 ? 'large' : 'inherit';
		this.section.appendChild(this.subtitle);

		const table = document.createElement('table');
		table.style.marginTop = window.innerWidth > 900 ? '50px' : '20px';
		table.style.width = '90%';
		this.icons.forEach(icon => {
			const row = table.insertRow();
			const cell1 = row.insertCell();
			Object.assign(cell1.style, { padding: '20px', });
			const img = document.createElement('img');
			img.className = "contact-icon"; img.src = ic+icon+'.png';
			img.alt = img.title = icon;
			img.style.cursor = 'pointer';
			img.addEventListener('click', () => this.clickInfo(icon));
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
			button.textContent = data[icon];
			button.addEventListener('click', () => this.clickInfo(icon));
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
		const actions = [this.phoneClickInfo, this.mailClickInfo, this.mapClickInfo, this.plusClickInfo];
		const index = this.icons.indexOf(name);
		if (index !== -1) { actions[index].call(this, this.lang); }
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
		const ortherInfoPopup = new OrtherInfoPopup(lang);
		ortherInfoPopup.createPopup();
	};
};

class PhonePopupInfo {
	constructor(lang) {
		this.phone_ics = ['phone_call', 'phone_message', ];
		this.x_close = "./assets/icons/x_close.png";
		this.phoneNumbers = ['+33 7 71 24 12 43', '+33 7 71 24 12 43'];
		this.lang = lang;
	};
	createPhonePopup() {
		const overlay = document.createElement('div');
		Object.assign(overlay.style, { position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
			backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '20',
			display: 'flex', justifyContent: 'center', alignItems: 'center', });
		const popup = document.createElement('div');
		popup.style.padding = window.innerWidth > 900 ? '80px' : '40px';
		Object.assign(popup.style, { backgroundColor: '#000', borderRadius: '10px', border: '1px solid #fff',
			display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', });
		const closeButton = this.createCloseBtn(overlay);
		const table = this.createPhoneTable();
		popup.appendChild(closeButton);
		popup.appendChild(table);
		overlay.appendChild(popup);
		document.body.appendChild(overlay);
	};
	createCloseBtn(overlay) {
		const closeButton = document.createElement('img');
		closeButton.src = this.x_close; closeButton.alt = closeButton.title = 'Close'; closeButton.loading = "lazy";
		Object.assign(closeButton.style, { position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', });
		closeButton.style.width = closeButton.style.height = window.innerWidth > 900 ? '50px' : '40px';
		closeButton.addEventListener('click', () => overlay.remove()); return closeButton;
	};
	createPhoneTable() {
		const ic = "./assets/icons/";
		const table = document.createElement('table');
		this.phoneNumbers.forEach((number, index) => {
			const row = table.insertRow();
			const cellIcon = row.insertCell();
			Object.assign(cellIcon.style, { padding: '10px', });
			const img = document.createElement('img');
			img.src = ic+this.phone_ics[index % this.phone_ics.length]+'.png';
			img.alt = img.title = this.phone_ics[index % this.phone_ics.length].replace('_', ' ');
			cellIcon.appendChild(img);
			const cellNumber = row.insertCell();
			cellNumber.textContent = number;
		}); return table;
	};
};

class OrtherInfoPopup {
	constructor(lang) {
		this.icons = [ "github", "gitlab", "twitter", "kaggle", "linkedin", "mattermost", "facebook", "skype", "discord", "youtube", "codepen", "codesandbox", ];
		this.x_close = "./assets/icons/x_close.png";
		this.lang = lang;
	};
	createPopup() {
		const overlay = document.createElement('div');
		Object.assign(overlay.style, { position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
			backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '20', display: 'flex', justifyContent: 'center', alignItems: 'center', });
		const popup = document.createElement('div');
		popup.style.padding = window.innerWidth > 900 ? '40px' : '20px';
		Object.assign(popup.style, { backgroundColor: '#000', borderRadius: '10px', border: '1px solid #fff', display: 'flex',
			flexDirection: 'column', alignItems: 'center', position: 'relative', maxWidth: '600px', width: '80%', });
		const closeButton = this.createCloseBtn(overlay);
		const table = this.createIconsTable();
		popup.appendChild(closeButton);
		popup.appendChild(table);
		overlay.appendChild(popup);
		document.body.appendChild(overlay);
	};
	createCloseBtn(overlay) {
		const closeButton = document.createElement('img');
		closeButton.src = this.x_close; closeButton.alt = closeButton.title = 'Close';
		Object.assign(closeButton.style, { position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', });
		closeButton.style.width = closeButton.style.height = window.innerWidth > 900 ? '50px' : '40px';
		closeButton.addEventListener('click', () => overlay.remove()); return closeButton;
	};
	createIconsTable() {
		const ic = "./assets/icons/";
		const table = document.createElement('table');
		Object.assign(table.style, { width: '100%', });
		const tbody = table.createTBody();
		const iconsPerColumn = window.innerWidth > 900 ? 5 : 12;
		const totalColumns = Math.ceil(this.icons.length / iconsPerColumn);
		for (let col = 0; col < totalColumns; col++) {
			for (let row = 0; row < iconsPerColumn; row++) {
				const iconIndex = col * iconsPerColumn + row;
				if (iconIndex >= this.icons.length) break;
				const icon = this.icons[iconIndex];
				let tableRow;
				if (tbody.rows[row] === undefined) {
					tableRow = tbody.insertRow();
				} else { tableRow = tbody.rows[row]; }
				const cellIcon = tableRow.insertCell(-1);
				Object.assign(cellIcon.style, { padding: '10px', textAlign: 'center' });
				const img = document.createElement('img');
				img.src = `${ic}${icon}.png`; img.alt = img.title = icon;
				img.style.width = img.style.height = window.innerWidth > 900 ? '50px' : '40px';
				cellIcon.appendChild(img);
				const cellName = tableRow.insertCell(-1);
				cellName.textContent = icon.charAt(0).toUpperCase() + icon.slice(1);
				Object.assign(cellName.style, { padding: '10px', textAlign: 'left' });
			}
		} return table;
	};
};
