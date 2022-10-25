/*function myFunction() {
  var x = document.getElementById("Vid");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  const Http = new XMLHttpRequest();
const url='https://ign-apis.herokuapp.com';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  
  const txt = Http.responseText;
const obj = JSON.parse(txt);
document.getElementById("Vid").innerHTML = obj.value;
}
}*/

/*fetch('https://ign-apis.herokuapp.com/').then(data => {
return data.json();
}).then(post => {
console.log(post);
}); */

 /* var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
        console.log(xhttp.responseText)
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = xhttp.responseText;
    } else {
      console.log("error")
    }
};
xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJryijc9s0K4gRG9aU7SDTXdA&key=[YOURAPIKEY]", true);
xhttp.send();  */

const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);