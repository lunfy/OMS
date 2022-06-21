const center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();
const map = L.map('mapdiv').setView([center.x, center.y], 12);

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

//Default path pointing to marker icon
L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/images";

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
    .setLatLng([position.coords.latitude, position.coords.longitude]) 
    .setContent('You are here!')
    .openOn(map);         
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

document.addEventListener('click', (el) => {
    if (el.target && el.target.id === 'search-button' || 'number') {
        setTimeout(() => {
            removeMapObjects();
            const bldgName = document.getElementsByClassName('bldg-name');
            const latArr = document.getElementsByClassName('latitude');
            const lonArr = document.getElementsByClassName('longitude');
            for (let i=0; i<bldgName.length; i++) {
                marker = new L.Marker([latArr[i].innerText, lonArr[i].innerText], {bounceOnAdd: false}).addTo(map);
                const popup = L.popup()
                .setLatLng([latArr[i].innerText, lonArr[i].innerText])
                .setContent(bldgName[i].innerText);
                marker.bindPopup(popup);
            }
        }, 100);
        el.stopPropagation();
    }
});

// document.addEventListener('click', (el) => {
//     removeMapObjects;
//     if (el.target && el.target.id === 'number') {
//         setTimeout(() => {
//             const bldgName = document.getElementsByClassName('bldg-name');
//             const latArr = document.getElementsByClassName('latitude');
//             const lonArr = document.getElementsByClassName('longitude');
//             for (let i=0; i<bldgName.length; i++) {
//                 marker = new L.Marker([latArr[i].innerText, lonArr[i].innerText], {bounceOnAdd: false}).addTo(map);
//                 const popup = L.popup()
//                 .setLatLng([latArr[i].innerText, lonArr[i].innerText])
//                 .setContent(bldgName[i].innerText);
//                 marker.bindPopup(popup);
//             }
//         }, 100);
//         el.stopPropagation();
//     }
// });