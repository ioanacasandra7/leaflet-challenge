// store the url as variable
var url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function(data) {
  createFeatures(data.features);
});

function createFeatures(data){
  var myMap = L.map("map", {
      center: [37.77, -122.41],
      zoom: 5
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

  //   make markers
  data.forEach(feature => {
      var mag = feature.properties.mag;

      var color = "";
      if (mag <= 1) {
          color = "green";
      }
      else if (mag <= 2) {
          color = "yellow";
      }
      else if (mag <= 3) {
          color = "#E59866";
      }
      else if (mag <= 4) {
          color = "orange";
      }
      else if (mag <= 5) {
          color = "#D35400";
      }
      else {
          color = "red";
      }

      L.circle([feature.geometry.coordinates[1],
               feature.geometry.coordinates[0]], {
                  fillColor: color,
                  fillOpacity: 0.75,
                  color: color,
                  radius: mag * 10000
               }).bindPopup("<h3> Location: " + feature.properties.place + "<hr>Mag: " + mag + "</h3>").addTo(myMap);
  });
   
   }
