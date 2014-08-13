'use strict';

var Mongo = require('mongodb');

function Recipe(o){
  var i = o.ingredients.split(',').map(function(i){return i.trim();});

  this.name        = (!(o.name.trim().length))        ? 'Food Name'                 : o.name;
  this.ingredients = (!(o.ingredients.trim().length)) ? ['Ingredients','Go','Here'] : i;
  this.photo       = (!(o.photo.trim().length))       ? '/img/nopic.jpg'            : o.photo;
  this.directions  = (!(o.directions.trim().length))  ? 'Directions go here'        : o.directions;

  this.category = o.category;

  this.created = new Date();
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.all = function(cb){
  Recipe.collection.find().sort({created:-1}).toArray(cb);
};

Recipe.create = function(o, cb){
  var r = new Recipe(o);
  Recipe.collection.save(r, cb);
};

Recipe.deleteById = function(id, cb){
  id = Mongo.ObjectID(id);
  Recipe.collection.remove({_id:id}, cb);
};

module.exports = Recipe;

