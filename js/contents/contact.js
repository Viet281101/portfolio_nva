
class Contact {
	constructor() {
		this.section = document.getElementById('contact');
		const ic = "./assets/icons/";
		this.ic_phone = ic + "phone.png";
		this.ic_mail = ic + "mail.png";
		this.ic_map = ic + "map.png";
	};

	createContactContent() {
		this.section.innerHTML = '';

		this.title = document.createElement('h2');
		this.title.textContent = 'Contact';
		this.title.style.fontSize = window.innerWidth > 900 ? '34px' : '28px';
		this.section.appendChild(this.title);

		const table = document.createElement('table');

		this.createTableRow(table, this.ic_phone, 'Phone');
		this.createTableRow(table, this.ic_mail, 'Email');
		this.createTableRow(table, this.ic_map, 'Location');

		this.section.appendChild(table);
	};

	createTableRow(table, iconSrc, contactType) {
		const row = document.createElement('tr');

		const iconCell = document.createElement('td');
		const iconImage = document.createElement('img');
		iconImage.src = iconSrc;
		iconCell.appendChild(iconImage);

		const buttonCell = document.createElement('td');
		const button = document.createElement('button');
		button.textContent = contactType;
		button.onclick = function() {
			console.log(contactType);
		};
		buttonCell.appendChild(button);

		row.appendChild(iconCell);
		row.appendChild(buttonCell);

		table.appendChild(row);
	};
};
