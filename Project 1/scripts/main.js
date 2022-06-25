const searchContainer = document.querySelector('#search-input-container'),
      nameBtn = document.querySelector('#search-name'),
      latLongBtn = document.querySelector('#search-lat-long');

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
    nameSubmitBtn.setAttribute('class','btn btn-primary mt-2');
    nameSubmitBtn.setAttribute('id','search-button');
    nameSubmitBtn.setAttribute('onclick','searchAddress()');
    nameSubmitBtn.innerText = 'Search';
    nameDiv.append(nameSubmitBtn);

    setTimeout(() => {
      window.scrollTo(0,document.body.scrollHeight)
    },100);
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

    setTimeout(() => {
      window.scrollTo(0,document.body.scrollHeight)
    },100);
}

//This triggers when search button is clicked
//Ohter nested functions inside trigger in this order:
//searchAddress > fetchData > displayData > generateTables, generatePagination > listCreator
const searchAddress = (pg) => {
  const searchText = document.querySelector('#address-name').value;
  let pageNumber = '';
  if (pg === undefined) {
    pageNumber = 1;
  } else {
    pageNumber = pg;
  }
  const url = 'https://developers.onemap.sg/commonapi/search?searchVal='+searchText+'&returnGeom=Y&getAddrDetails=Y&pageNum='+pageNumber;
  fetchData(url);

  setTimeout(() => {
    window.scrollTo(0,document.body.scrollHeight)
  },100);
}

const searchCoord = () => {
  const searchText = document.querySelector('#address-name').value;
  const url = 'https://developers.onemap.sg/commonapi/search?searchVal='+searchText+'&returnGeom=Y&getAddrDetails=Y&pageNum='+pageNumber;
  fetchData(url);

  setTimeout(() => {
    window.scrollTo(0,document.body.scrollHeight)
  },100);
}

//fetches data from API
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
  generatePagination(data);

  const tBody = document.querySelector('tbody');

  resultsArr.forEach((item,index) => {
    const newRow = document.createElement('tr');
    tBody.append(newRow);

    const newTh = document.createElement('th');
    newTh.setAttribute('scope','row');
    newTh.innerHTML = index+1;
    newRow.append(newTh);

    const newTd1 = document.createElement('td');
    newTd1.setAttribute('class','bldg-name');
    newTd1.innerText = item.BUILDING;
    newRow.append(newTd1);

    const newTd2 = document.createElement('td');
    newTd2.innerText = item.ADDRESS;
    newRow.append(newTd2);

    const newTd3 = document.createElement('td');
    newTd3.innerText = item.POSTAL;
    newRow.append(newTd3);

    const hiddenLat = document.createElement('td');
    hiddenLat.setAttribute('class','latitude')
    hiddenLat.setAttribute('hidden','true');
    hiddenLat.innerText = item.LATITUDE;
    newRow.append(hiddenLat);

    const hiddenLon = document.createElement('td');
    hiddenLon.setAttribute('class','longitude')
    hiddenLon.setAttribute('hidden','true');
    hiddenLon.innerText = item.LONGITUDE;
    newRow.append(hiddenLon);
  });
}

const generateTables = () => {
  const resDiv = document.querySelector('#results-container');

  const newTable = document.createElement('table');
  newTable.setAttribute('class','table table-striped');
  resDiv.append(newTable);

  const tableHead = document.createElement('thead');
  newTable.append(tableHead);

  const tableRow = document.createElement('tr');
  tableRow.setAttribute('id','tb-row');
  tableHead.append(tableRow);

  headerColCreator('#');
  headerColCreator('Building Name');
  headerColCreator('Address');
  headerColCreator('Postal Code');

  const tableBody = document.createElement('tbody');
  newTable.append(tableBody);
}

const generatePagination = (data) => {
  const pageDiv = document.querySelector('#pagination');
  pageDiv.innerHTML = '';
  
  const pageNav = document.createElement('nav');
  pageNav.setAttribute('id','page-nav');
  pageNav.setAttribute('area-label','Search results page navigation');
  pageDiv.append(pageNav);

  const pageUlist = document.createElement('ul');
  pageUlist.setAttribute('id','page-ul');
  pageUlist.setAttribute('class','pagination justify-content-center');
  pageNav.append(pageUlist);

  let pagesArr = [...Array(data.totalNumPages).keys()];
  console.log(pagesArr);

  if (pagesArr.length === 1) {
    listCreator('page-item','number', 1);
  } else {
    pagesArr.some(item => {
      listCreator('page-item','number', item+1);
      return item === 9;
    });
    }
}


nameBtn.onclick = searchName;
latLongBtn.onclick = searchLatLong;

//liClass = 'page-item' or 'page-item disabled'>
//textInside = 'value for innerHTML'
const listCreator = (liClass,liId,textInside) => {
  const pageUlist = document.querySelector('#page-ul');
  const listItem = document.createElement('li');
  listItem.setAttribute('class',liClass);
  listItem.setAttribute('onclick','searchAddress(event.target.innerHTML)')
  pageUlist.append(listItem);

  const itemAnchor = document.createElement('a');
  itemAnchor.setAttribute('class','page-link');
  itemAnchor.setAttribute('id', liId)
  itemAnchor.innerHTML = textInside;
  listItem.append(itemAnchor);
}

//title = 'string for header title'
const headerColCreator = (title) => {
  const tableRow = document.querySelector('#tb-row');
  const headerCol = document.createElement('th');
  headerCol.setAttribute('scope','col');
  headerCol.innerText = title;
  tableRow.append(headerCol);
}