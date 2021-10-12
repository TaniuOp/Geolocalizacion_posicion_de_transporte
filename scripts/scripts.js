
const mapId = 'map';
const initialCoordinates =  [46.834515, 8.035911]; 
const map =  L.map(mapId).setView(initialCoordinates, 7);



const getMyLocation = () => {
    try {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
            console.log(`Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`);
            initialCoordinates[0]= position.coords.latitude 
            initialCoordinates[1]= position.coords.longitude 
            L.marker(initialCoordinates).addTo(map); // Añadimos el marcador a nuestra posición inicial
            L.marker(initialCoordinates).bindPopup("<b>Seengen</b><br>Mi casa actual").addTo(map); // Añadimos el popup
            map.setView(initialCoordinates, 11);
            });
      }
      return initialCoordinates 
    }
    catch {
        console.warn("Tu navegador no soporta Geolocalización!!")
    }
  }
getMyLocation()

const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const ACCESS_TOKEN =
  'pk.eyJ1IjoidGFuaXVvcCIsImEiOiJja3VtbW40aDgwYzE1Mm9vYTZ3anh0djduIn0.V5JR-9viJfUS4_auGUuVww';

L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN
  }).addTo(map);

  