let map = L.map("mapid", {
  center: [43.00,  -75.00], // latitude, longitude in decimal degrees (find it on Google Maps with a right click!)
  zoom: 5, // can be 0-22, higher is closer
  scrollWheelZoom: false // don't zoom the map on scroll
});
// add the basemap tiles
L.tileLayer(
  "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg" // stamen toner tiles
).addTo(map);

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 1,
  maxZoom: 16,
  ext: 'jpg'
});

// add zoom control in topright corner
    //L.control.zoom({ position:'topright' }).addTo(map);

    // Set Geocoder options
    var geocodingOptions = {
      url: 'https://api.geocode.earth/v1',
      expanded: true,
      attribution: '<a href="https://geocode.earth">Geocode Earth</a>, <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> and <a href="https://geocode.earth/guidelines">others</a>'
    };

    // Replace with your Geocode Earth API key
    L.control.geocoder('ge-fc050a4033212256', geocodingOptions).addTo(map);

