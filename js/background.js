
var radius = 70;
var influenceArea = {
	x: 100,
	y: 100,
	width: radius * 2,
	height: radius * 2
};
var sectionBackgrounds = [
	'./assets/background/space_px_bg_8.png',
	'./assets/background/space_px_bg_10.png',
	'./assets/background/space_px_bg_11.png',
	'./assets/background/space_px_bg_6.png',
	'./assets/background/space_px_bg_4.png',
];
document.addEventListener('DOMContentLoaded', function() {

	//////*  Background Layers   *//////
	var backgroundLayer1 = document.createElement('div');
	applyBackgroundStyles(
		backgroundLayer1, 
		'./assets/background/space_px_bg_8.png', 
		1
	);
	backgroundLayer1.className = 'backgroundLayer1';
	document.body.appendChild(backgroundLayer1);

	var backgroundLayer2 = document.createElement('div');
	applyBackgroundStyles(
		backgroundLayer2, 
		'./assets/background/black_bg.png', 
		2
	);
	document.body.appendChild(backgroundLayer2);

	//////*  Background mouse mask   *//////
	if (window.innerWidth > 768) {
		setTimeout(() => {
			document.addEventListener('mousemove', function(e) {
				updateBackgroundMask(
					backgroundLayer2, 
					e.clientX, e.clientY, 
					radius
				);
				influenceArea.x = e.clientX - influenceArea.width / 2;
				influenceArea.y = e.clientY - influenceArea.height / 2;
			});
			document.addEventListener('mousedown', function(e) {
				radius = 180;
				updateMouseMask(
					backgroundLayer2, 
					e.clientX, e.clientY, 
					radius
				);
			});
			document.addEventListener('mouseup', function(e) {
				radius = 70;
				updateMouseMask(
					backgroundLayer2, 
					e.clientX, e.clientY, 
					radius
				);
			});
		}, 1000);
	}
});
//////*  Create & Update Background Effects  *//////
function applyBackgroundStyles(element, imageUrl, zIndex) {
	element.style.position = 'fixed';
	element.style.top = '0';
	element.style.left = '0';
	element.style.width = '100%';
	element.style.height = '100vh';
	element.style.backgroundImage = 'url(' + imageUrl + ')';
	element.style.backgroundSize = 'cover';
	element.style.backgroundPosition = 'center';
	element.style.backgroundRepeat = 'no-repeat';
	element.style.zIndex = zIndex;
	element.style.transition = 'background-image 1s ease-in-out';
	//// loading lazy
	element.style.filter = 'blur(10px)';
	element.style.transition = 'filter 0.5s ease-in-out';
	setTimeout(() => {
		element.style.filter = 'blur(0)';
	}, 1000);
};
function updateMouseMask(backgroundLayer, x, y, radius) {
	influenceArea.width = radius * 2;
	influenceArea.height = radius * 2;
	updateBackgroundMask(backgroundLayer, x, y, radius);
};
function updateBackgroundMask(element, x, y, maskSize) {
	element.style.webkitMaskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
	element.style.maskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
};
function updateBackgroundForSection(sectionIndex) {
	var backgroundLayer1 = document.querySelector('.backgroundLayer1');
	backgroundLayer1.style.backgroundImage = 'url(' + sectionBackgrounds[sectionIndex - 1] + ')';
};

