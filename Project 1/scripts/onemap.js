const center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();
const forecastL = L.layerGroup();

const map = L.map('mapdiv', {
    layers: [forecastL]
}).setView([center.x, center.y], 12);

const weatherIcon = L.Icon.extend({
    options: {
        iconSize:       [40, 40],
    }
});

const layerControl = L.control.layers().addTo(map);
layerControl.addOverlay(forecastL, 'Current Forecast');

const cloudyIcon = new weatherIcon({iconUrl: './img/cloudy.png'});
const pCloudyIcon = new weatherIcon({iconUrl: './img/partlycloudy.png'});
const rainyIcon = new weatherIcon({iconUrl: './img/rainy.png'});
const sunnyIcon = new weatherIcon({iconUrl: './img/sunny.png'});

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
                switch (locationStatus[index].forecast) {
                    case 'Sunny':
                        marker = new L.Marker([item.label_location.latitude, item.label_location.longitude], {icon: sunnyIcon}).addTo(forecastL);
                        marker.bindPopup('<center>'+item.name+'<br>'+'Sunny</center>');
                        break;
                    case 'Cloudy':
                        marker = new L.Marker([item.label_location.latitude, item.label_location.longitude], {icon: cloudyIcon}).addTo(forecastL);
                        marker.bindPopup('<center>'+item.name+'<br>'+'Cloudy</center>');
                        break;
                    case 'Partly Cloudy (Day)':
                        marker = new L.Marker([item.label_location.latitude, item.label_location.longitude], {icon: pCloudyIcon}).addTo(forecastL);
                        marker.bindPopup('<center>'+item.name+'<br>'+'Partly Cloudy (Day)</center>');
                        break;
                    case 'Light Rain':
                        marker = new L.Marker([item.label_location.latitude, item.label_location.longitude], {icon: rainyIcon}).addTo(forecastL);
                        marker.bindPopup('<center>'+item.name+'<br>'+'Light Rain</center>');
                        break;
                    case 'Moderate Rain':
                        marker = new L.Marker([item.label_location.latitude, item.label_location.longitude], {icon: rainyIcon}).addTo(forecastL);
                        marker.bindPopup('<center>'+item.name+'<br>'+'Moderate Rain</center>');
                        break;
                    case 'Showers':
                        marker = new L.Marker([item.label_location.latitude, item.label_location.longitude], {icon: rainyIcon}).addTo(forecastL);
                        marker.bindPopup('<center>'+item.name+'<br>'+'Showers</center>');
                        break;
                }
            })
    });
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
}

if (window.location.href.match('index.html') !=null) {
    layerControl.removeFrom(map);
}