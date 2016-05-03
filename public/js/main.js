console.log("Hello world?");
var xhr;
var movieUrl = 'http://www.omdbapi.com/?';
var movieList;


var search = function() {
  var searchTerm = document.getElementById( 'title' ).value;
  searchTerm = encodeURIComponent( searchTerm );
  searchUrl = movieUrl + "t=" + searchTerm;

  getMovies( searchUrl );
}

function getMovies( url ) {
  xhr = new XMLHttpRequest();

  if ( !xhr ) {
    console.log("Can't create XMLHTTP instance.");
    return false;
  }

  xhr.onreadystatechange = displayContent;
  xhr.open( 'GET', url );
  xhr.send();
}

function displayContent() {
  if ( xhr.readyState === XMLHttpRequest.DONE ) {
    if ( xhr.status === 200 ) {
      movieList = JSON.parse( xhr.responseText );
      console.log( movieList );

      var parentElement = document.getElementById( 'movies' );
      var ulElement = document.createElement( 'ul' );
      ulElement.id = 'searchList';
      parentElement.appendChild( ulElement );
      var newContent;

      var objKeys = ['Title', 'Year', 'Director', 'Actors'];

      for ( var k in movieList ) {
        for ( i = 0; i <= objKeys.length - 1; i++ ) {
          if ( k == objKeys[i] ) {
            var liElement = document.createElement( 'li' );
            newContent = document.createTextNode( objKeys[i] + ": " + movieList[k] );
            liElement.appendChild( newContent );
            ulElement.appendChild( liElement );
          }
        }
      }

      return movieList;
    }
    else {
      console.log("There was a problem with the request.", xhr.status);
    }
  }
}

function reset() {
  document.location.reload( '/' );
}
