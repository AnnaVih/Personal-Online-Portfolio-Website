
$(document).ready(function() {
	/*---------------------------------
	/* For the sticky navigation */
	/*-------------------------------*/
	$('.js-section-about-me').waypoint(function(direction) {
		if(direction == 'down') {
			$('nav').addClass('sticky-nav');
		}else {
			$('nav').removeClass('sticky-nav');
		}
	},  {
 		offset: '60px;'
	});

	/*----------------------------------
	/* Scroll on navigation and buttons */
	/*--------------------------------*/

	$("a[href^='#']").bind("click", function(e){
		e.preventDefault();
  	var anchor = $(this);
  	$('html, body').stop().animate({
    	scrollTop: $(anchor.attr('href')).offset().top-50
  	}, 1000);
  	});

	/* ---------------------------------
	/*   Animation */
	/*--------------------------------*/

		/*  For HEADER  */
		$('.js-heading-fadeIn').addClass('animated jackInTheBox');

		$('.js-header-animated').delay(9000).queue(function() {
			$(this).addClass('animated bounceInDown');
		});


		/* For ABOUT ME section*/
		$('.js-about-me-animated').waypoint(function(direction) {
			$('.js-about-me-animated').addClass('animated bounceInRight');
		}, {
			offset: '50%'
		});

		/* For PROJECTS section*/
		$('.js-projects-animated').waypoint(function(direction) {
			$('.js-projects-animated').addClass('animated bounceInLeft');
		}, {
			offset: '50%'
		});

		$('.projects-animated-work').waypoint(function(direction) {
			$('.projects-animated-work').addClass('animated zoomInDown');
		}, {
			offset: '50%'
		});

		/*For my projects*/
		$('.js-project').mouseover(function() {
			$(this).find('.js-project-caption').
			removeClass('animated slideOutDown').
			addClass('animated slideInUp');
		});

		$('.js-project').mouseout(function() {
			$(this).find('.js-project-caption').
			removeClass('animated slideInUp').
			addClass('animated slideOutDown');
		});

		/* For HIRE ME section*/
		$('.js-hire-me-animated').waypoint(function(direction) {
			$('.js-hire-me-animated').addClass('animated shake');
		}, {
			offset: '80%'
		});


	/*-----------------------------------
	/* Mobile navigation */
	/*---------------------------------*/

		$('.js-mobile-nav-icon').click(function() {
			var nav = $('.js-main-nav');
			var icon = $('.js-mobile-nav-icon i');

			nav.slideToggle(200);
			if(icon.hasClass('ion-navicon-round')) {
				icon.addClass('ion-close-round');
				icon.removeClass('ion-navicon-round');
				
			} else {
				icon.addClass('ion-navicon-round');
				icon.removeClass('ion-close-round');
			}
		});

	/*-----------------------------------
	/* MAP */
	/*---------------------------------*/

		var map = new GMaps({
		    div: '.map',
	        lat: 51.2627597,
			lng: 0.82800484,
			zoom: 9
		});

		map.addMarker({
		  	lat: 51.2627597,
		  	lng: 0.4500384,
		  	title: 'Maidstone',
		  	infoWindow: {
		  	content: '<p>My place in Maidstone</p>'
			}
		});
});

	
