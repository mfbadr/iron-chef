(function(){
  'use strict';

  $(document).ready(function(){
    $('#formhide').click(function(){
      $('.form').slideToggle(1000);
    });

    $('form').submit(addRecipe);
    $('#recipes').on('click', '.delete', delRecipe);

    $('.cat').click(filterCategory);

    $('#showAll').click(function(){
      $('.recipe').show();
    });

    $('#recipes').on('click', '.ingredient', filterIngredient);
    //$('.ingredient').click(filterIngredient);

  });

  function filterIngredient(e){
    //debugger;
    var ingredient = $(this).text();
    //$('.recipe .ingredient:contains('+ingredient+')').closest('.recipe').fadeOut();
    //debugger;
    $('.recipe ul:not(:contains('+ingredient+'))').closest('.recipe').fadeOut();
    $('.recipe ul:contains('+ingredient+')').closest('.recipe').fadeIn();
    //$('.recipe .ingredient:not(:contains('+ingredient+'))').closest('.recipe').fadeOut();
    //e.preventDefault();
  }

  function filterCategory(e){
    //debugger;
    var category = $(this).text();
    $('.recipe .category:not(:contains('+category+'))').closest('.recipe').fadeOut();
    $('.recipe .category:contains('+category+')').closest('.recipe').fadeIn();
    e.preventDefault();
  }
  function delRecipe(){
    var id   = $(this).parent().attr('data-recipe-id'),
        type = 'delete',
        url  = '/recipes/' + id;

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      console.log(data);
      var $recipe = $('.recipe[data-recipe-id='+data.id+']');
      $recipe.fadeOut(500);

      setTimeout(function(){$recipe.remove();}, 505);
    }});
  }

  function addRecipe(e){
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url  = $('form').attr('action');

    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      //console.log(html);
      var $recipe = $(html).css('display', 'none'); //take the html, make it hidden, save it to a new var
      $('#recipes').prepend($recipe); //add our new hidden html to the DOM
      $recipe.fadeIn(2000); //fade it in

      $('.form input').val(''); //clear the form
      $('.form textarea').val('');
      $('.form').toggle(1000); //hide the form
    }});
    e.preventDefault();
  }
})();

