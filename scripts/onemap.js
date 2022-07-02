// let unix_timestamp = 1656404006
// // Create a new JavaScript Date object based on the timestamp
// // multiplied by 1000 so that the argument is in milliseconds, not seconds.
// var date = new Date(unix_timestamp * 1000);
// // Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

// // Will display time in 10:30:23 format
// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

// console.log(date+' '+formattedTime);

const center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();
const forecastL = L.layerGroup();
const onIncidentL = L.layerGroup();
const offIncidentL = L.layerGroup();

const map = L.map('mapdiv', {
    layers: [forecastL,onIncidentL,offIncidentL]
}).setView([center.x, center.y], 12);

const layerControl = L.control.layers().addTo(map);
layerControl.addOverlay(forecastL, 'Current Forecast');
layerControl.addOverlay(onIncidentL, 'Ongoing Incidents');
layerControl.addOverlay(offIncidentL, 'Resolved Incidents');

const weatherIcon = L.Icon.extend({
    options: {
        iconSize:       [40, 40],
    }
});

const cloudyIcon = new weatherIcon({iconUrl: './img/cloudy.png'});
const pCloudyIcon = new weatherIcon({iconUrl: './img/partlycloudy.png'});
const rainyIcon = new weatherIcon({iconUrl: './img/rainy.png'});
const sunnyIcon = new weatherIcon({iconUrl: './img/sunny.png'});
const thunderyIcon = new weatherIcon({iconUrl: './img/thunderyshowers.png'});
const fairandwarmIcon = new weatherIcon({iconUrl: './img/fairandwarm.png'});
const fairdayIcon = new weatherIcon({iconUrl: './img/fairday.png'});

//Default path pointing to marker icon if icons not stated
L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/images";

//Setting basemap design to follow onemap's prepared theme
const basemap = L.tileLayer('https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 18,
    minZoom: 11
});

//Sets maximum boundary of map to be displayed
map.setMaxBounds([[1.56073, 104.1147], [1.16, 103.502]]);

//Adds basemap layer tiles according to theme to make up the map
basemap.addTo(map);

//This function gets the device current location and passes it to the showCurrentPosition function
const getLocation = () => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showCurrentPosition);
    } 
}

//This function generates a marker icon on the location that is passed to it, along with a popup
const showCurrentPosition = (position) => {           
    marker = new L.Marker([position.coords.latitude, position.coords.longitude]).addTo(map);             
    const popup = L.popup()
    .setContent('You are here!')
    marker.bindPopup(popup);     
}

const showPosition = (position) => {
    marker = new L.Marker([position.coords.latitude, position.coords.longitude], {bounceOnAdd: false}).addTo(map);
}

const removeMapObjects = () => {
    const markerPane = document.querySelector('.leaflet-marker-pane');
    const leafletPopup = document.querySelector('.leaflet-popup-pane');
    const leafletShadow = document.querySelector('.leaflet-shadow-pane');
    markerPane.innerHTML = '';
    leafletPopup.innerHTML = '';
    leafletShadow.innerHTML = '';
}

const getLocationBtn = document.querySelector('#get-location');
getLocationBtn.onclick = getLocation;

const clearMapBtn = document.querySelector('#clear-map');
clearMapBtn.onclick = removeMapObjects;

const mapForecast = (url) => {
    fetch(url)
     .then((rs) => rs.json())
     .then(data => {
        console.log(data);
            const locationInfo = data.area_metadata;
            const locationStatus = data.items[0].forecasts
            locationInfo.forEach((item,index) => {
                let lat = item.label_location.latitude;
                let lon = item.label_location.longitude;
                switch (locationStatus[index].forecast) {
                    case 'Sunny':
                        weatherMarker(lat,lon,item.name,sunnyIcon,'Sunny');
                        break;
                    case 'Fair (Day)':
                        weatherMarker(lat,lon,item.name,fairdayIcon,'Fair (Day)');
                        break;
                    case 'Fair & Warm':
                        weatherMarker(lat,lon,item.name,fairandwarmIcon,'Fair & Warm');
                        break;
                    case 'Cloudy':
                        weatherMarker(lat,lon,item.name,cloudyIcon,'Cloudy');
                        break;
                    case 'Partly Cloudy (Day)':
                        weatherMarker(lat,lon,item.name,pCloudyIcon,'Partly Cloudy (Day)');
                        break;
                    case 'Light Rain':
                        weatherMarker(lat,lon,item.name,rainyIcon,'Light Rain');
                        break;
                    case 'Moderate Rain':
                        weatherMarker(lat,lon,item.name,rainyIcon,'Moderate Rain');
                        break;
                    case 'Showers':
                        weatherMarker(lat,lon,item.name,rainyIcon,'Showers');
                        break;
                    case 'Thundery Showers':
                        weatherMarker(lat,lon,item.name,thunderyIcon,'Thundery Showers');
                    break;
                }
            })
    });
}

const weatherMarker = (lat,long,name,wIcon,forecasted) => {
    marker = new L.Marker([lat, long], {icon: wIcon}).addTo(forecastL);
    marker.bindPopup('<center>'+name+'<br>'+forecasted+'</center>');
}

document.addEventListener('click', (el) => {
    if (el.target && (el.target.id === 'search-button' || el.target.id === 'number')) {
        setTimeout(() => {
            removeMapObjects();
            const bldgName = document.getElementsByClassName('bldg-name');
            const latArr = document.getElementsByClassName('latitude');
            const lonArr = document.getElementsByClassName('longitude');
            for (let i=0; i<bldgName.length; i++) {
                marker = new L.Marker([latArr[i].innerText, lonArr[i].innerText]).addTo(map);
                const popup = L.popup()
                .setLatLng([latArr[i].innerText, lonArr[i].innerText])
                .setContent(bldgName[i].innerText);
                marker.bindPopup(popup);
            }
        }, 500);
        el.stopPropagation();
    }
});

if (window.location.href.match('weather.html') !=null) {
    mapForecast('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast');
    layerControl.removeLayer(onIncidentL);
    layerControl.removeLayer(offIncidentL);
} else if (window.location.href.match('index.html') !=null) {
    layerControl.removeFrom(map);
} else if (window.location.href.match('incidents.html') !=null) {
    layerControl.removeLayer(forecastL);
}