var center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();
var map = L.map('mapdiv').setView([center.x, center.y], 12);

      

var title_options ={
	
	subdomain: '1234',
	attribution:'Map data'
};

var basemap = L.tileLayer('https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png', {
	detectRetina: true,
    attribution: 'New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg" target="_blank" rel="noreferrer">Singapore Land Authority</a>',
    maxZoom: 18,
    minZoom: 11,
    id: 'your.mapbox.project.id',
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjg4OTMsInVzZXJfaWQiOjg4OTMsImVtYWlsIjoibHVuZnkuYW1hbkBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2NTQ5MTkxODcsImV4cCI6MTY1NTM1MTE4NywibmJmIjoxNjU0OTE5MTg3LCJqdGkiOiIwY2IxM2NiZDMzYmM0MmFiZjRkMDkxODU4MmJkNzliZiJ9.LWVBoZjFMmyweHgyhKv9_5BsNwO0zo6_EJpB3hCEPKo'
});

attribution = map.attributionControl;


attribution.setPrefix('<img src="./img/oneMap64-01.png" style="height:20px;width:20px;"/>');

map.setMaxBounds([[1.56073, 104.1147], [1.16, 103.502]]);

basemap.addTo(map);



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
}

function showPosition(position) {
	
	 marker = new L.Marker([position.coords.latitude, position.coords.longitude], {bounceOnAdd: false}).addTo(map);
	 
		var popup = L.popup()
	   .setLatLng([position.coords.latitude, position.coords.longitude]) 
	   .setContent('You are here!')
	   .openOn(map);
	
}

