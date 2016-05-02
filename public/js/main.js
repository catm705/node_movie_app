console.log("Hello world?");
var xhr;
var movieUrl = 'http://www.omdbapi.com/?';
var movieList;


var search = function() {

  var searchTerm = document.getElementById( 't' ).value;
  searchTerm = encodeURIComponent( searchTerm );
  searchUrl = movieUrl + "t=" + searchTerm;
  console.log("searchUrl: ", searchUrl);

  getMovies( searchUrl );
}

function getMovies( url ) {
  console.log("url: ", url );
  xhr = new XMLHttpRequest();

  if ( !xhr ) {
    debugger;
    console.log("Can't create XMLHTTP instance.");
    return false;
  }

  xhr.onreadystatechange = consoleContents;
  xhr.open( 'GET', url );
  xhr.send();

  function consoleContents() {
    if ( xhr.readyState === XMLHttpRequest.DONE ) {
      if ( xhr.status === 200 ) {
        movieList = xhr.responseText;
        console.log( movieList );

        var parentElement = document.getElementById( 'movies' );
        var divElement = document.createElement('div');
        var newContent = document.createTextNode( movieList );
        parentElement.appendChild( newContent );

      }
      else {
        console.log("There was a problem with the request.", xhr.status);
      }
    }
  }
}

// exports.index = function( req, res ) {
//   res.render( 'index', { movieList: movieList} );
// }
