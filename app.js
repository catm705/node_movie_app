// Dependencies
// -----------------------------------------------------------
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var fs = require( 'fs' ); // file stream
var path = require( 'path' );
var http = require( 'http' );
var port = process.env.port || 3000;

var mongoose = require( 'mongoose' );
var app = express();

// EXPRESS Configuration - sets connection to our database - hosted by modulus
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
mongoose.model('favorites', {});

// all environments
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', path.join(__dirname, 'views' ) );

// Use hogan - EASIER
app.set( 'view engine', 'html' );
app.set( 'layout', 'layout' );
app.enable( 'view cache' );
app.engine('html', require('hogan-express') );

//'use' means to use functions aka middleware.
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use('/', express.static( path.join( __dirname, 'public' ) ) );



// Routing
app.get( '/', function( req, res ) {
  if ( req.url.indexOf( '/scripts' ) >= 0 ) {
    render( req.url.slice( 1 ), 'application/javascript', httpHandler );
  }
  else if ( req.headers[ 'x-requested-with' ] === 'XMLHttpRequest' ) {
    // Send Ajax Response
  }
  else {
    res.render( 'index' );
  }
} );

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
    res.render( data );
  }
} );



// Console.logs appear in the server shell
var server = app.listen( port, function() {
  console.log( "*************" );
  console.log( "Magic happens on port 3000! :D" );
} );
