$(document).ready(function() {
	/* For the sticky navigation */
	$('.js-section-about-me').waypoint(function(direction) {
		if(direction == 'down') {
			$('nav').addClass('sticky-nav');
		}else {
			$('nav').removeClass('sticky-nav');
		}
	},  {
 		offset: '60px;'
	});

	/* Scroll on buttons */
	$('.js-scroll-to-about-me').click(function() {
		$('html, body').animate({scrollTop: $('.js-section-about-me').offset().top}, 1000)
	});
	$('.js-scroll-to-hire-me').click(function() {
		$('html, body').animate({scrollTop: $('.js-section-hire-me').offset().top}, 1000)
	});

	/* Navigation scroll */
	$(" a[href^='#']").on('click', function(e) {
   		e.preventDefault();
	  	var hash = this.hash;
	    $('html, body').animate({
	       scrollTop: $(hash).offset().top
	    }, 1000, function(){
	       window.location.hash = hash;
	    });
	});

	/* Animation */
		//For HEADER
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

		/* For HIRE ME section*/
		$('.js-hire-me-animated').waypoint(function(direction) {
			$('.js-hire-me-animated').addClass('animated shake');
		}, {
			offset: '80%'
		});

		/* Mobile navigation */
		$('.js-mobile-nav-icon').click(function() {
			var nav = $('.js-main-nav');
			var icon = $('.js-mobile-nav-icon i');

			nav.slideToggle(200);
			if(icon.hasClass('ion-navicon-round')) {
				icon.addClass('ion-close-round');
				icon.removeClass('ion-navicon-round');
				
			} else {
				icon.addClass('ion-navicon-round');
				icon.removeClass('ion-close-round')
			}





		});
});