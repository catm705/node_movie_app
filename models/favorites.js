var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var FavoriteSchema = new Schema( {
  id: String,
  title: String, // movie title to search for
  type: String, // type of result to return
  year: String, // year of release
  plot: String, // plot
  tomatoes: String // rotten tomatoes rating
} );

module.exports = mongoose.model( 'Favorite', FavoriteSchema );
