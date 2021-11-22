$(document).ready(function() {
    
  function getMusic(){
 var url='https://blmak.github.io/BigMusicClubConclomerateDates.json'
 
  $.getJSON( url, function( json ) {
        console.log(json)
            $('h2').append("</p><p>Description: " + json.artist.venue)
      });
    }

    getFruit();
})