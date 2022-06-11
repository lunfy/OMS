const searchContainer = document.querySelector('#search-input-container');
const nameBtn = document.querySelector('#search-name');
const latLongBtn = document.querySelector('#search-lat-long');
const postalBtn = document.querySelector('#search-postal');

//this function creates the search label, field and button for searching address by Name.
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
    nameSubmitBtn.innerText = 'Search';
    nameDiv.append(nameSubmitBtn);

}

nameBtn.onclick = searchName;
