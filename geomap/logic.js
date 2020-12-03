var url = "https://university-ranking.herokuapp.com/api/v1.0/ranking/1/1526";


// Use this link to get the json data
d3.json("universities.json").then (function(data) {
  console.log(data);
  
  var americaQuery = data.filter((america) => america.continent === "America");
  console.log(americaQuery);
  
  var europeQuery = data.filter((europe) => europe.continent === "Europe");
  console.log(europeQuery);

  var asiaQuery = data.filter((asia) => asia.continent === "Asia");
  console.log(asiaQuery);

  var africaQuery = data.filter((africa) => africa.continent === "Africa");
  console.log(africaQuery);

  var oceaniaQuery = data.filter((oceania) => oceania.continent === "Oceania");
  console.log(oceaniaQuery);

  // Define arrays to hold created universities by country markers
  var americaMarkers = [];
  console.log(americaMarkers);
  var europeMarkers = [];
  console.log(europeMarkers);
  var asiaMarkers = [];
  console.log(asiaMarkers);
  var africaMarkers = [];
  console.log(africaMarkers);
  var oceaniaMarkers = [];
  console.log(oceaniaMarkers);

  // Loop through locations and create university and country markers
  for (var i = 0; i < americaQuery.length; i++) {
    americaMarkers.push(
      L.marker(americaQuery[i].location).bindPopup("<h3>" + americaQuery[i].title + "</h3> </hr> <h5>World Ranking: " + americaQuery[i].ranking + "</h5>")
  )};

  for (var i = 0; i < europeQuery.length; i++) {
    europeMarkers.push(
      L.marker(europeQuery[i].location).bindPopup("<h3>" + europeQuery[i].title + "</h3> </hr> <h5>World Ranking: " + europeQuery[i].ranking + "</h5>")
  )};

  for (var i = 0; i < asiaQuery.length; i++) {
    asiaMarkers.push(
      L.marker(asiaQuery[i].location).bindPopup("<h3>" + asiaQuery[i].title + "</h3> </hr> <h5>World Ranking: " + asiaQuery[i].ranking + "</h5>")
  )};

  for (var i = 0; i < africaQuery.length; i++) {
    africaMarkers.push(
      L.marker(africaQuery[i].location).bindPopup("<h3>" + africaQuery[i].title + "</h3> </hr> <h5>World Ranking: " + africaQuery[i].ranking + "</h5>")
  )};

  for (var i = 0; i < oceaniaQuery.length; i++) {
    oceaniaMarkers.push(
      L.marker(oceaniaQuery[i].location).bindPopup("<h3>" + oceaniaQuery[i].title + "</h3> </hr> <h5>World Ranking: " + oceaniaQuery[i].ranking + "</h5>")
  )};

  // Streetmap layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  // Darkmap layer
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Create continent layer groups
  var america = L.layerGroup(americaMarkers);
  var europe = L.layerGroup(europeMarkers);
  var asia = L.layerGroup(asiaMarkers);
  var africa = L.layerGroup(africaMarkers);
  var oceania = L.layerGroup(oceaniaMarkers);


  // Create a baseMaps object
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create an overlay object
  var overlayMaps = {
    America: america,
    Europe: europe,
    Asia: asia,
    Africa: africa,
    Oceania: oceania
  };

  // Define a map object
  var myMap = L.map("map", {
    center: [42.374443, -71.116943],
    zoom: 2,
    layers: [streetmap, america, europe, asia, africa, oceania]
  });

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

});
