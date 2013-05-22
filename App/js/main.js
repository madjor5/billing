// Navigation script
console.log("whtat?");
$(".nav-link").on('click', function(e){
  $('.main-nav > ul').toggle();
  return false;
});
$('.main-nav > ul > li > a').on('click', function(e){
  e.preventDefault;
  $('.main-nav > ul').hide();
});