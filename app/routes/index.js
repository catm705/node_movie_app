var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

// Locally you need a different variable for url instead of heroku's MONGODB_URI
// var mongoUrl = "mongodb://localhost:27017/mydb";

/* GET home page. */
router.get('/', function( req, res, next ) {
  res.render( 'index' );
});

//Get favorites - mongoUrl
router.get('/get-data', function( req, res, next ) {
  var resultArray = [];
  mongo.connect( mongoUrl, function( err, db ) {
    assert.equal( null, err );

    var cursor = db.collection( 'user-data' ).find();
    cursor.forEach(function( doc, err ) {
      assert.equal( null, err );
      resultArray.push( doc );
    }, function() {
      db.close();
      res.render('index', { items: resultArray });
    });
  });
});

// Save favorites to database
router.post('/insert', function( req, res, next ) { // req = undefined
  var item = {
    title: req.body.Title,
    year: req.body.Year,
  };

  mongo.connect( mongoUrl, function( err, db ) {
    assert.equal( null, err );

    db.collection( 'user-data' ).insertOne( item, function( err, result ) {
      assert.equal( null, err );
      db.close();
    });
  });

  res.redirect( '/' );
});

// Delete favorites
router.post( '/delete', function( req, res, next ) {
  var id = req.body.id;

  mongo.connect( mongoUrl, function( err, db ) {
    assert.equal( null, err );
    db.collection( 'user-data' ).deleteOne( {"_id": objectId( id )}, function( err, result ) {
      assert.equal( null, err );
      console.log( 'Item deleted' );
      db.close();
      res.render( 'index' );
    });
  });
});

module.exports = router;
