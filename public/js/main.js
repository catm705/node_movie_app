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

      var objKeys = ['Title', 'Year' ];

        for ( i = 0; i <= movieList[ 'Search' ].length - 1; i++ ) {
          var form = document.createElement("form");
          var element1 = document.createElement("input");
          element1.className += "first";

          var element2 = document.createElement("input");
          form.action = "/insert";
          form.method = "POST";
          element2.className += "second";

          parentElement.appendChild( form );
          form.appendChild( element1 );
          form.appendChild( element2 );

          for ( var k in movieList[ 'Search' ][ i ] ) {
            for ( j = 0; j <= objKeys.length - 1; j ++ ) {
              if ( k == objKeys[ j ] ) {
                if ( k == "Title" ) {
                  value1 = movieList[ 'Search'][ i ][ k ];
                  element1.name = "Title";
                  element1.id = "Title";
                  element1.value = value1;
                }

                if ( k == "Year" ) {
                  value2 = movieList[ 'Search'][ i ][ k ];
                  element2.name = "Year";
                  element2.id = "Year";
                  element2.value = value2;

                  var button = document.createElement("button");
                  button.setAttribute( 'type', 'submit' );
                  button.className = 'favorite';
                  button.innerText = 'Add to Favs';

                  form.appendChild( button );
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
  // document.location.reload( '/' );
  var parentElement = document.getElementById( 'movies' );
  parentElement.innerHTML = '';
}
