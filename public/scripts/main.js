$(document).ready(function () {
  $('.list-item-example').click(function () {
    $('#query').val($(this).attr('data-url'));
  });

  $('#search').click(function(){
    if($('#query').val().length > 0) {
      $.ajax({
        url: $(location).attr('pathname')+$('#query').val(),
        success: function(obj){
          $("#output").text(JSON.stringify(obj,undefined,4));
        }
      })
    }
  });

});
