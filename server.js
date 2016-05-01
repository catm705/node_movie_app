var express = require( 'express' );
var app = express();
var apiRouter = express.Router();

var fs = require('fs');
var path = require('path');
var bodyParser = require( 'body-parser' );

app.use( express.static( path.join(__dirname, '/public' )) );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.use('/', express.static( path.join( __dirname, 'public' ) ) );


// This is a router that gets endpoints of your site.
app.get( '/favorites', function( req, res ) {
  if ( !req.body.name || !req.body.oid ) {
    res.send("Error");
    return
  }
  else {
    var data = JSON.parse( fs.readFileSync( './data.json' ) );
    data.push( req.body );
    fs.writeFile( './data.json', JSON.stringify( data ));

    res.setHeader('Content-Type', 'application/json');
    res.send( data );
  }
} );

// These are considered 'middleware' aka 'filters'
// Logger only does console.logs in the server shell
function logger(req, res, next) {
  console.log( new Date(), req.method, req.url );
  next();
}

// When you write it shows up in the curl shell
// function hello(req, res, next) {
//   res.write( 'Hello \n' );
//   next();
// }
//
// function bye( req,res, next ) {
//   res.write( 'Bye \n' );
//   res.end();
// }

apiRouter.use( logger ); // This only happens on apiRouter
app.use( hello, bye ); // This line first b/c it has an end(), code stops there.
app.use( '/api', apiRouter );

// Console.logs appear in the server shell
var server = app.listen( 3000, function() {
  console.log("We're listening on port 3000! :D");
} );
