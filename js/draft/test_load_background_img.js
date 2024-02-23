
var radius = 70;
var influenceArea = {
	x: 100,
	y: 100,
	width: radius * 2,
	height: radius * 2
};
var sectionBackgroundsPlaceholder = [
	'./assets/background/placeholder_space_px_bg_8.png',
	'./assets/background/placeholder_space_px_bg_10.png',
	'./assets/background/placeholder_space_px_bg_11.png',
	'./assets/background/placeholder_space_px_bg_4.png',
];
var sectionBackgrounds = [
	'./assets/background/space_px_bg_8.png',
	'./assets/background/space_px_bg_10.png',
	'./assets/background/space_px_bg_11.png',
	'./assets/background/space_px_bg_4.png',
];
document.addEventListener('DOMContentLoaded', function() {

	//////*  Background Layers   *//////
	var backgroundPlaceholder = document.createElement('div');
	backgroundPlaceholder.className = 'backgroundPlaceholder';
	applyBackgroundStyles(
		backgroundPlaceholder, 
		sectionBackgroundsPlaceholder[0], 
		-3
	);
	document.body.appendChild(backgroundPlaceholder);

	var backgroundLayer1 = document.createElement('div');
	backgroundLayer1.className = 'backgroundLayer1';
	applyBackgroundStyles(
		backgroundLayer1, 
		sectionBackgrounds[0], 
		-2, 0
	);
	document.body.appendChild(backgroundLayer1);

	var backgroundLayer2 = document.createElement('div');
	applyBackgroundStyles(
		backgroundLayer2, 
		'./assets/background/black_bg.png', 
		-1
	);
	document.body.appendChild(backgroundLayer2);

	updateBackgroundForSection(1);

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
function applyBackgroundStyles(element, imageUrl, zIndex, opacity = 1) {
	element.style.position = 'fixed';
	element.style.top = '0';
	element.style.left = '0';
	element.style.width = '100%';
	element.style.height = '100vh';
	element.style.backgroundImage = 'url(' + imageUrl + ')';
	element.style.backgroundSize = 'cover';
	element.style.backgroundRepeat = 'no-repeat';
	element.style.zIndex = zIndex;
	element.style.opacity = opacity;
	element.style.transition = 'opacity 1s ease-in-out';
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

	if ( document.querySelector('.backgroundPlaceholder') ) {
		var backgroundPlaceholder = document.querySelector('.backgroundPlaceholder');
    	backgroundPlaceholder.style.backgroundImage = 'url(' + sectionBackgroundsPlaceholder[sectionIndex - 1] + ')';
	}

    backgroundLayer1.style.opacity = '0';
    backgroundLayer1.style.backgroundImage = 'url(' + sectionBackgrounds[sectionIndex - 1] + ')';

    setTimeout(() => {
        backgroundLayer1.style.opacity = '1';

		if ( document.querySelector('.backgroundPlaceholder') ) {
			backgroundPlaceholder.remove();
		}
    }, 1000);
};
