function createSidebar() {
	let closeButton = document.createElement('img');
	
	closeButton.setAttribute('src', './assets/icons/x_close.png');
	closeButton.setAttribute('alt', 'close icon');
	closeButton.classList.add('close-btn');
	closeButton.style.position = 'absolute';
	closeButton.style.top = '20px';
	closeButton.style.right = '20px';
	closeButton.style.width = '40px';
	closeButton.style.height = '40px';
	closeButton.style.zIndex = '10';
	closeButton.style.cursor = 'pointer';
	closeButton.style.padding = '10px';

	closeButton.addEventListener('click', function() {
		input.checked = false;

		hideMenuSidebar();
	});
	
	divSidebar.appendChild(closeButton);
};

function showMenuSidebar() {
	let sidebar = document.querySelector('.sidebar');
	sidebar.style.visibility = 'visible';
	sidebar.style.width = '220px';
	sidebar.style.transition = '0.5s';
	let content = document.querySelector('.content');
	content.style.marginLeft = '220px';
	let menuBtn = document.querySelector('.menu-btn');
	menuBtn.style.visibility = 'hidden';
};

function hideMenuSidebar() {
	let sidebar = document.querySelector('.sidebar');
	sidebar.style.visibility = 'hidden';
	sidebar.style.width = '0';
	sidebar.style.transition = '0.5s';
	let content = document.querySelector('.content');
	content.style.marginLeft = '0';
	let menuBtn = document.querySelector('.menu-btn');
	menuBtn.style.visibility = 'visible';
};


function createMenuSidebarButton() {
	let contentDiv = document.querySelector('.content');
	if (!contentDiv) return;

	let menuBtn = document.createElement('img');
	menuBtn.setAttribute('src', './assets/icons/menu.png');
	menuBtn.setAttribute('alt', 'menu icon');
	menuBtn.classList.add('menu-btn');
	menuBtn.setAttribute('id', 'sidebar-menu-btn');
	menuBtn.style.position = 'fixed';
	menuBtn.style.top = '20px';
	menuBtn.style.left = '20px';
	menuBtn.style.width = '40px';
	menuBtn.style.height = '40px';
	menuBtn.style.zIndex = '10';
	menuBtn.style.cursor = 'pointer';
	menuBtn.style.padding = '10px';
	menuBtn.style.visibility = 'hidden';

	contentDiv.insertBefore(menuBtn, contentDiv.firstChild);

	menuBtn.addEventListener('click', function() {
		let checkbox = document.querySelector('#sidebar-toggle');
		if (checkbox) {
			checkbox.checked = !checkbox.checked;
		}
		showMenuSidebar();
	});
};

