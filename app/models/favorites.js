var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var FavoriteSchema = new Schema( {
  s: String,
  type: String,
  y: String
} );

module.exports = mongoose.model( 'Favorite', FavoriteSchema );
