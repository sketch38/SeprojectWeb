 $( document ).ready(function(){
 	$(".button-collapse").sideNav({
		closeOnClick: false
	});
    $('select').material_select();
    $('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
   		selectYears: 15 // Creates a dropdown of 15 years to control year
  	});
  	$('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  	$('.parallax').parallax();
 });
