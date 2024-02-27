
function createContactContent() {
	const section = document.getElementById('contact');
	section.innerHTML = '';

};

function applyContactStyles() {
	const css = `
		/* Contact section styles */
	`;
	const style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	document.head.appendChild(style);
};
