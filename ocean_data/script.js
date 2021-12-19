let map = L.map("mapid", {
  center: [-33.918861,  18.423300], // latitude, longitude in decimal degrees (find it on Google Maps with a right click!)
  zoom: 7, // can be 0-22, higher is closer
  scrollWheelZoom: false // don't zoom the map on scroll
});
 /* Control panel to display map layers */
  var controlLayers = L.control.layers( null, null, {
    position: "topright",
    collapsed: false
  }).addTo(map);




 // Set Geocoder options
    var geocodingOptions = {
      url: 'https://api.geocode.earth/v1',
      expanded: true,
      attribution: '<a href="https://geocode.earth">Geocode Earth</a>, <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> and <a href="https://geocode.earth/guidelines">others</a>'
    };

    // Replace with your Geocode Earth API key
    L.control.geocoder('ge-fc050a4033212256', geocodingOptions).addTo(map);




  // display Carto basemap tiles with light features and labels
  var light = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  }).addTo(map); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
  controlLayers.addBaseLayer(light, 'Main Map');

  /* Stamen colored terrain basemap tiles with labels */
  var terrain = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
  controlLayers.addBaseLayer(terrain, 'Second Version Map');

  // see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/

  // Read markers data from data.csv
  $.get('sharksightings.xlsx', function(csvString) {

    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;

    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
    for (var i in data) {
      var row = data[i];

      var marker = L.marker([row.Latitude, row.Longitude], {
        opacity: 1,
        // Customize your icon
  icon: L.icon({
    iconUrl: 'shark.svg',
    iconSize: [50, 100]
  })
      }).bindPopup(row.Date);
       
      
      marker.addTo(map);
    }

  });

