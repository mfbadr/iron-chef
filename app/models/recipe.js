'use strict';

function Recipe(o){
  this.name = o.name;
  this.ingredients = o.ingredients.split(',');
  this.photo = o.photo;
  this.directions = o.directions;
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.all = function(cb){
  Recipe.collection.find().toArray(cb);
};

module.exports = Recipe;

