$(document).ready(function() {
	$('.slider').slick({
		adaptiveHeight:true,
		dots:false,

		slidesToShow:2,
		slidesToScroll:2,
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


// PopUps
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('popup-close');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener("click", function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener("click", function(e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		})
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if (e.which == 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// Полефилы для старых браузеров
(function() {
	// Проверяем поддержку
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.mathes(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// Проверяем поддержку
	if (!Element.prototype.mathes) {
		// Определяем свойство
		Element.prototype.mathes = Element.prototype.mathesSelector ||
			Element.prototype.webkitMathesSelector ||
			Element.prototype.mozMathesSelector ||
			Element.prototype.msMathesSelector;
	}
})();


function choseService() {
	const topLeft = document.querySelectorAll('.topLeft_corner');
	document.querySelector('.choise_selection').style.background = document.querySelector('.choise_selection').dataset.color;
	document.querySelector('.choise_selection').style.color = 'white';
	for (let index = 0; index < 2; index++) {
		topLeft[index].style.display = 'block';
	}
}