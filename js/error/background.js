
var radius = 70;
var influenceArea = {
	x: 100,
	y: 100,
	width: radius * 2,
	height: radius * 2
};
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
	Object.assign(element.style, {
		position: 'fixed', top: '0', left: '0', width: '100%', height: '100vh', 
		backgroundImage: "url("+imageUrl+")", backgroundSize: 'cover', backgroundSize: 'cover',
		backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: zIndex, 
		transition: 'background-image 1s ease-in-out'
	});
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


