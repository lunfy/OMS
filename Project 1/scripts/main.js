const searchContainer = document.querySelector('#search-input-container');
const nameBtn = document.querySelector('#search-name');
const latLongBtn = document.querySelector('#search-lat-long');
const postalBtn = document.querySelector('#search-postal');

//This function creates the search label, field and button for searching address by Name
const searchName = () => {
    searchContainer.innerHTML = '';

    const latLabel = document.createElement('label');
    latLabel.setAttribute('for','address-name');
    latLabel.setAttribute('class','form-label');
    latLabel.innerText = 'Input address/location name:';
    searchContainer.append(latLabel);

    const nameDiv = document.createElement('div');
    nameDiv.setAttribute('class','mt-1 mb-1')
    searchContainer.append(nameDiv);

    const latField = document.createElement('textarea');
    latField.setAttribute('class','form-control');
    latField.setAttribute('id','address-name');
    latField.setAttribute('rows','1');
    nameDiv.append(latField);

    const coordSubmitBtn = document.createElement('button');
    coordSubmitBtn.setAttribute('type','button');
    coordSubmitBtn.setAttribute('class','btn btn-primary mt-1');
    coordSubmitBtn.innerText = 'Search';
    nameDiv.append(coordSubmitBtn);

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
    longLabel.innerText = 'Longtitude:';
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

nameBtn.onclick = searchName;
latLongBtn.onclick = searchLatLong;
