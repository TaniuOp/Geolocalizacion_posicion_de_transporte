

/*Posicionar el transporte público (trenes y autobuses) de Los Angeles en el mapa. Haciendo fetch de la posición de los vehículos en tiempo real*/
let dataTransportItems = []
let transportLocation = []
let transportCurrentLocation = []


const getPosition = async () => {
    try{
        let transportUrl = await fetch('https://api.metro.net/agencies/lametro/vehicles/')
        let dataTransport = await transportUrl.json()
        dataTransportItems = dataTransport.items
        console.log(dataTransport)
        console.log(dataTransportItems)
        return dataTransportItems 
    }
    catch (error) {
        console.log("we had an error obtaining the data")
    }
}

/*Después de hacer fetch(), tratar el objeto para poder pintar los puntos con Leafelt*/
const getData = async () => {
    try{
        for(let i = 0 ; i < dataTransportItems.length ; i++ ) {
        let latitude = await dataTransportItems[i].latitude
        let longitude = await dataTransportItems[i].longitude
        let id = await dataTransportItems[i].id
        transportCurrentLocation.push(latitude, longitude)  
        L.marker(transportCurrentLocation).addTo(map);
        L.marker(transportCurrentLocation).bindPopup(id).addTo(map); /*Con un popup, dibujar el ID del vehículo*/
        }
        return transportLocation
    }
    catch (error) {
        console.log(error)
    }
}        

async function startData(){
    await getPosition()
    await getData()
}
startData()

// Uso de la librería de Leadelt y Mapbox 
const mapId = 'map';
const initialCoordinates =  [34.074042, -118.270412]; 
const map =  L.map(mapId).setView(initialCoordinates, 9);

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




/*Haz que se refresque la posición de los vehículos en el mapa cada 3 segundos para dar efecto de "movimiento"*/

