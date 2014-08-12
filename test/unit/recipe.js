/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Recipe    = require('../../app/models/recipe'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'iron-chef-test';

describe('Recipe', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      console.log(stdout, stderr);
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Recipe object', function(){
      var o = {name:'bbq', ingredients:'pork, vinegar, sauce', photo:'google.com/bbq.jpg', directions:'cook the bbq'},
          r = new Recipe(o);
      expect(r).to.be.instanceof(Recipe);
      expect(r.name).to.equal('bbq');
      expect(r.ingredients).to.have.length(3);
      expect(r.photo).to.equal('google.com/bbq.jpg');
      expect(r.directions).to.equal('cook the bbq');
    });
  });
  describe('.all', function(){
    it('should get all recipes', function(done){
      Recipe.all(function(err, recipes){
        //console.log(recipes);
        expect(recipes).to.have.length(4);
        done();
      });
    });
  });
});

