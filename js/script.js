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