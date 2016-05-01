var express = require( 'express' );
var mongoose = require( 'mongoose' );
// connect to our database - hosted by modulus
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require( 'body-parser' );
var port = process.env.port || 3000;

var Favorite = require( './app/models/favorites' );

//use means to use functions aka middleware.
app.use( express.static( path.join(__dirname, '/public' )) );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use('/', express.static( path.join( __dirname, 'public' ) ) );

// ROUTES FOR OUR API
var router = express.Router();

router.use( function( req, res, next ) {
  console.log( "Something is happening." );
  next();
} );

router.get( '/', function( req, res ) {
  res.json( { message: "Hooray! Welcome to our api!" } );
} );

// GET goes to the endpoint and gets all the favorites.
// router.get( '/favorites', function( req, res ) {
//   if ( !req.body.name || !req.body.oid ) {
//     res.send("Error");
//     return
//   }
//   else {
//     var data = JSON.parse( fs.readFileSync( './data.json' ) );
//     data.push( req.body );
//     fs.writeFile( './data.json', JSON.stringify( data ));
//
//     res.setHeader('Content-Type', 'application/json');
//     res.send( data );
//   }
// } );

router.route( '/favorites' )
  .post( function( req, res ) {
    var favorite = new Favorite();

    favorite.title = res.body.title;
    // favorite.id = req.body.i;
    // favorite.title = req.body.s;
    // favorite.year = req.body.y;
    // favorite.plot = req.body.plot;
    // favorite.tomatoes = req.body.tomatoes;

    favorite.save( function( err ) {
      if ( err ) {
        res.send( err );
      }

      res.json( { message: "Favorite saved!" } );
    } );
} );

// REGISTER OUR ROUTES
app.use( '/favorites', router );

// Console.logs appear in the server shell
var server = app.listen( port, function() {
  console.log("Magic happens on port 3000! :D");
} );
