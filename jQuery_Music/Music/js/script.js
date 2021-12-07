$(document).ready(function() {
    
  function getMusic(){
 var url='https://blmak.github.io/BigMusicClubConclomerateDates.json'
 
  $.getJSON( url, function( json ) {
        console.log(json)
            $('body').append("#bigHall"</p><p>Description: " + json.artist.venue)
      });
    }

    getMusic();
})


