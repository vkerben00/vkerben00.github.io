/*$(document).ready(function() {
    
  function getMusic(){
 var url='https://blmak.github.io/BigMusicClubConclomerateDates.json'
 
  $.getJSON( url, function( json ) {
        console.log(json)
            $('body').append("#bigHall"</p><p>Description: " + json.artist.venue)
      });
    }

    getMusic();
}) */

function printArtist(venue){
    for (var i = 0; i < venueItems.length; i++) {
      if (venueItems[i].venue == venue){
        console.log(venueItems[i])
      }

    }
  }
  function showData(artist){
    $(artist).toggle()

  }
  function displayArtist(venue){
    var htmlText = ""
    for (var i = 0; i < venueItems.length; i++) {

      if (venueItems[i].venue == venue){
        htmlText = 

        '<h1 class="artist">'+venueItems[i].artist+'</h1>'+
        '<button class="showButton" onclick="showData(item'+i+')"> Show me show time </button>'+
        '<div class="artistData" id="item'+i+'" style="display:none">'+
        '<p>'+venueItems[i].date+'</p>'+
        '<p>'+venueItems[i].city+'</p>'+
        '<p>'+venueItems[i].state+'</p>'+
        '<p>'+venueItems[i].show_time+'</p>'+
        '<p>$'+venueItems[i].price+'</p>'+
        '<p>'+venueItems[i].currency+'</p>'+
        '</div>'

    $("#data").append(htmlText)
      }

    }
    
  }