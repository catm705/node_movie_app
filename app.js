// Dependencies
// -----------------------------------------------------------
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var fs = require( 'fs' ); // file stream
var path = require( 'path' );
var http = require( 'http' );
var hbs = require('express-handlebars');
var cors = require('cors');
var routes = require('./app/routes/index');
var app = express();
app.use(cors());

// EXPRESS Configuration - sets connection to our database - hosted by modulus

// all environments
app.set( 'port', process.env.PORT || 3000 );
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set( 'views', path.join(__dirname, 'views' ) );
app.set( 'view engine', 'hbs' );

// Use hogan - EASIER
app.set( 'layout', 'layout' );
app.enable( 'view cache' );

//'use' means to use functions aka middleware.
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use('/', express.static( path.join( __dirname, 'public' ) ) );

// Routing
app.use( '/', routes );

// Console.logs appear in the server shell
var server = app.listen( process.env.PORT || 3000, function() {
  console.log( "*************" );
  console.log( "Magic happens on port 3000! :D" );
} );
