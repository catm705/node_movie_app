var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push( doc );
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    actors: req.body.actors
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    actors: req.body.actors
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});

module.exports = router;

// router.get( '/favorites', function( req, res ) {
//   if ( !req.body.name || !req.body.oid ) {
//     res.send("Error");
//     return
//   }
//   else {
//     var data = JSON.parse( fs.readFileSync( './data.json' ) );
//
//     data.push( req.body );
//     fs.writeFile( './data.json', JSON.stringify( data ));
//
//     res.setHeader('Content-Type', 'application/json');
//     res.render( data );
//   }
// } );

//
// router.post( '/insert', function( req, res, next ) {
//   var item = {
//     title: req.body.title,
//     year: req.body.year,
//     director: req.body.director,
//     actors: req.body.actors
//   }
//
//   console.log("item: ", item );
//
//   mongo.connect( url, function( err, db ) {
//     assert.equal( null, err );
//     db.collection('favorite-data').insertOne( item, function( err, results ) {
//       assert.equal( null, error );
//
//       console.log("Item inserted: ", item );
//       db.close();
//     } );
//   } );
//
//   res.redirect( '/' );
// } );
//
// router.post( '/update', function( req, res, next ) {
//
// } );
//
// router.post( '/delete', function( req, res, next ) {
//
// } );
//
// // Must include this so app.js can get the route.
// module.exports = router;
