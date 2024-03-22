// Drop-dowm-menu toggle
const dropDownMenus = document.querySelectorAll('.drop-down');

dropDownMenus.forEach(menu => {
	const header = menu.querySelector('.drop-down-header');

	header.addEventListener('click', (e) => {
		menu.classList.toggle('_dropped');
	});
});