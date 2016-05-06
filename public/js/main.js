var xhr;
var movieUrl = 'https://www.omdbapi.com/?';
var movieList;


var search = function() {
  var searchTerm = document.getElementById( 'title' ).value;
  searchTerm = encodeURIComponent( searchTerm );
  searchUrl = movieUrl + "s=" + searchTerm;

  getMovies( searchUrl );
};

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

      var parentElement = document.getElementById( 'movies' );
      var ulElement = document.createElement( 'ul' );
      ulElement.id = 'searchList';
      parentElement.appendChild( ulElement );
      var newContent;

      var objKeys = ['Title', 'Year' ];

        for ( i = 0; i <= movieList[ 'Search' ].length - 1; i++ ) {
          for ( var k in movieList[ 'Search' ][ i ] ) {
            for ( j = 0; j <= objKeys.length - 1; j ++ ) {
              if ( k == objKeys[ j ] ) {
                var liElement = document.createElement( 'li' );
                newContent = document.createTextNode( objKeys[ j ] + ": " + movieList[ 'Search'][ i ][ k ] );
                liElement.appendChild( newContent );
                ulElement.appendChild( liElement );
                var br = document.createElement("br");

                if ( k == "Year" ) {
                  ulElement.appendChild( br );
                }
              }
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
