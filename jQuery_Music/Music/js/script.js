$(document).ready(function() {
    
  function getMusic(){
 var url='https://blmak.github.io/BigMusicClubConclomerateDates.json'
 
  $.getJSON( url, function( json ) {
        console.log(json)
            $('h2').append("#bigHall"</p><p> " + json.artist.venue)
      });
    }

    getMusic();
})


