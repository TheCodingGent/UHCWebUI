$('#light-switch').on('switchChange.bootstrapSwitch', function(event, state) {
  if(state == true){
  	console.log("The button is on");
  }else{
  	console.log("The button is off");
  }
});

$('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');  
    if ($(this).find('.btn-primary').size()>0) {
    	$(this).find('.btn').toggleClass('btn-primary');
    }
    $(this).find('.btn').toggleClass('btn-default');
});

$('form').submit(function(){
	alert($(this["options"]).val());
    return false;
});

