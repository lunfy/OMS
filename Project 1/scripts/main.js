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

const fetchData = (url) => {
    fetch(url)
     .then((rs) => rs.json())
     .then(data => {
        displayData(data)
    });
}

const displayData = (data) => {
  const resultsContainer = document.querySelector('#results-container');
  const resultsArr = data.results;
  resultsContainer.innerHTML = '';

  console.log(data);

  generateTables();

  const tBody = document.querySelector('tbody');

  resultsArr.forEach((item,index) => {
    const newRow = document.createElement('tr');
    tBody.append(newRow);

    const newTh = document.createElement('th');
    newTh.setAttribute('scope','row');
    newTh.innerHTML = index+1;
    newRow.append(newTh);

    const newTd1 = document.createElement('td');
    newTd1.innerText = item.BUILDING;
    newRow.append(newTd1);

    const newTd2 = document.createElement('td');
    newTd2.innerText = item.ADDRESS;
    newRow.append(newTd2);

    const newTd3 = document.createElement('td');
    newTd3.innerText = item.POSTAL;
    newRow.append(newTd3);
  });
}

const searchAddress = () => {
  let searchText = document.querySelector('#address-name').value;
  const pageNum = 1;
  const url = 'https://developers.onemap.sg/commonapi/search?searchVal='+searchText+'&returnGeom=Y&getAddrDetails=Y&pageNum='+pageNum;
  fetchData(url);
  document.querySelector('#address-name').value = '';
}

const generateTables = () => {
  const resDiv = document.querySelector('#results-container');

  const newTable = document.createElement('table');
  newTable.setAttribute('class','table table-striped');
  resDiv.append(newTable);

  const tableHead = document.createElement('thead');
  newTable.append(tableHead);

  const tableRow = document.createElement('tr');
  tableHead.append(tableRow);

  const headerCol1 = document.createElement('th');
  headerCol1.setAttribute('scope','col');
  headerCol1.innerText = '#';
  tableRow.append(headerCol1);

  const headerCol2 = document.createElement('th');
  headerCol2.setAttribute('scope','col');
  headerCol2.innerText = 'Building Name';
  tableRow.append(headerCol2);

  const headerCol3 = document.createElement('th');
  headerCol3.setAttribute('scope','col');
  headerCol3.innerText = 'Address';
  tableRow.append(headerCol3);

  const headerCol4 = document.createElement('th');
  headerCol4.setAttribute('scope','col');
  headerCol4.innerText = 'Postal Code';
  tableRow.append(headerCol4);

  const tableBody = document.createElement('tbody');
  newTable.append(tableBody);
}

nameBtn.onclick = searchName;
latLongBtn.onclick = searchLatLong;