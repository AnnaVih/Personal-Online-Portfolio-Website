$(document).ready(function() {
	$('.js-section-about-me').waypoint(function(direction) {
		if(direction == 'down') {
			$('nav').addClass('sticky-nav');
		}else {
			$('nav').removeClass('sticky-nav');
		}
	},  {
 	 offset: '60px'
	});



// 	var waypoints = $('#handler-first').waypoint(function(direction) {
//   notify(this.element.id + ' hit 25% from top of window') 
// }, {
//   offset: '25%'
// })

});