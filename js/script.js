$(document).ready(function() {
	$('.slider').slick({
		adaptiveHeight:true,
		dots:false,

		slidesToShow:3,
		slidesToScroll:3,
		initialSlide:0,
		speed:1000,
		infinite:false,

		autoplay:false,
		autoplaySpeed:1000,
		pauseOnFocus:true,
		pauseOnHover:true,

		draggable:false,
		touchThreshold:5,

		waitForAnimate:false,
		centerMode:false,
		variableWidth:false,
	});
});


//1) Бургер
//2) Кнопки(анимация)
//3) Поп-апы
//4) Страница компании
//5) Страница Новости

// Бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.header__navbar');
if (iconMenu) {
	const rightImage = document.querySelector('.right-side_inner');
	iconMenu.addEventListener("click", function(e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu-link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth",
			});
			e.preventDefault();
		}
	}
}