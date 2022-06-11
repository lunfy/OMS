const searchContainer = document.querySelector('#search-input-container');
const nameBtn = document.querySelector('#search-name');
const latLongBtn = document.querySelector('#search-lat-long');
const postalBtn = document.querySelector('#search-postal');

//This function creates the search label, field and button for searching address by Name
const searchName = () => {
    searchContainer.innerHTML = '';

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for','address-name');
    nameLabel.setAttribute('class','form-label');
    nameLabel.innerText = 'Input address/location name:';
    searchContainer.append(nameLabel);

    const nameDiv = document.createElement('div');
    nameDiv.setAttribute('class','mt-1 mb-1')
    searchContainer.append(nameDiv);

    const nameField = document.createElement('textarea');
    nameField.setAttribute('class','form-control');
    nameField.setAttribute('id','address-name');
    nameField.setAttribute('rows','1');
    nameDiv.append(nameField);

    const nameSubmitBtn = document.createElement('button');
    nameSubmitBtn.setAttribute('type','button');
    nameSubmitBtn.setAttribute('class','btn btn-primary mt-1');
    nameSubmitBtn.setAttribute('id','search-button');
    nameSubmitBtn.setAttribute('onclick','searchAddress()');
    nameSubmitBtn.innerText = 'Search';
    nameDiv.append(nameSubmitBtn);

}

//This function creates the search label, field and button for searching address by Lat-Long
const searchLatLong = () => {
    searchContainer.innerHTML = '';

    const latLabel = document.createElement('label');
    latLabel.setAttribute('for','address-lat');
    latLabel.setAttribute('class','form-label mt-1 mb-1');
    latLabel.innerText = 'Latitude:';
    searchContainer.append(latLabel);

    const latField = document.createElement('textarea');
    latField.setAttribute('class','form-control mt-1 mb-2');
    latField.setAttribute('id','address-lat');
    latField.setAttribute('rows','1');
    searchContainer.append(latField);

    const longLabel = document.createElement('label');
    longLabel.setAttribute('for','address-long');
    longLabel.setAttribute('class','form-label mt-1 mb-1');
    longLabel.innerText = 'Longitude:';
    searchContainer.append(longLabel);

    const longField = document.createElement('textarea');
    longField.setAttribute('class','form-control mt-1 mb-2');
    longField.setAttribute('id','address-long');
    longField.setAttribute('rows','1');
    searchContainer.append(longField);    

    const coordSubmitBtn = document.createElement('button');
    coordSubmitBtn.setAttribute('type','button');
    coordSubmitBtn.setAttribute('class','btn btn-primary mt-1');
    coordSubmitBtn.innerText = 'Search';
    searchContainer.append(coordSubmitBtn);
}

function fetchData(url) {
    fetch(url)
     .then((rs) => rs.json())
     .then(data => {
        displayData(data)
    });
}

function displayData(data) {
    console.log(data);
}

function searchAddress() {
  const searchText = document.querySelector('#address-name').value;
  const pageNum = 1;
  const url = 'https://developers.onemap.sg/commonapi/search?searchVal='+searchText+'&returnGeom=Y&getAddrDetails=Y&pageNum='+pageNum;
  fetchData(url);
}

nameBtn.onclick = searchName;
latLongBtn.onclick = searchLatLong;