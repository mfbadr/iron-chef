(function(){
  'use strict';

  $(document).ready(function(){
    $('#formhide').click(function(){
      $('.form').toggle(1000);
    });

    $('form').submit(addRecipe);

  });

  function addRecipe(e){
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url  = $('form').attr('action');

    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      console.log(html);
      $('#recipes').append(html);

    $('.form').toggle(1000);
    $('.form input').val('');
    $('.form textarea').val('');
    }});
    //console.log(data, type, url);
    e.preventDefault();
  }
})();

