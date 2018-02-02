
$("#home a,  #nav ul li a[href^='#']").on('click', function(e) {
   e.preventDefault();

   var hash = this.hash;

   $('html, body').animate({
       scrollTop: $(hash).offset().top
     }, 600, function(){
       window.location.hash = hash;
     });
});

$("#home img").ready(function(){
  $(".image").fadeTo( 3000 , 0.4);
});

$(".info").fadeIn( 4000 );
$(".btn").click(function(){
  $(".btn").fadeOut();
});

$("#home").click(function(){
  $(".btn").fadeIn(4000);
});
