// Navigation script
$(".nav-link").on('click', function(e){
  $('.main-nav > ul').toggle();
  return false;
});
$('.main-nav > ul').on('click', function(e){
  $('.main-nav > ul').hide();
});