const incDiv = document.querySelector('#incident-container');
const createNewIncBtn = document.querySelector('#cni-btn');
const createIncidentBtn = document.querySelector('#create-incident');
const addrRange = document.querySelector('#address-range');
const modalDate = document.querySelector('#incident-date');
const modalCaseId = document.querySelector('#case-id');
const modalStatus = document.querySelector('#status-id');
const modalOpen = document.querySelector('#flex-radio-open');
const modalInProgress = document.querySelector('#flex-radio-ip');
const modalClosed = document.querySelector('#flex-radio-close');
const modalReported = document.querySelector('#report-by');
const modalIncType = document.querySelector('#type-select');
const modalAddress = document.querySelector('#inputAddress');
const modalXAddress = document.querySelector('#inputAddress2');
const modalDate2 = document.querySelector('#incident-date2');
const modalCaseId2 = document.querySelector('#case-id2');
const modalStatus2 = document.querySelector('#status-id2');
const modalOpen2 = document.querySelector('#flex-radio-open2');
const modalInProgress2 = document.querySelector('#flex-radio-ip2');
const modalClosed2 = document.querySelector('#flex-radio-close2');
const modalReported2 = document.querySelector('#report-by2');
const modalIncType2 = document.querySelector('#type-select2');
const modalAddress2 = document.querySelector('#inputAddress22');
const modalXAddress2 = document.querySelector('#inputAddress222');

const searchAddress = async (searchText) => {
	const response = await fetch(
		'https://developers.onemap.sg/commonapi/search?searchVal='+searchText+'&returnGeom=Y&getAddrDetails=Y&pageNum=1',
		{
			method: 'GET'
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    return data;
}

const populateDatalist = async () => {
    addrRange.innerHTML = '';
    if (inputAddress.value != '') {
        const data = await searchAddress(inputAddress.value);
        data.results.forEach(item => {
            const option = document.createElement('option');
            option.setAttribute('value',item.ADDRESS);
            addrRange.append(option);
        });
    } else {
        return;
}

}

const createIncident = () => {
    const newCase = {
        date: modalDate.value,
        caseId: modalCaseId.value,
        caseStatus: modalStatus.innerHTML,
        reporter: modalReported.value,
        caseType: modalIncType.value,
        address: modalAddress.value,
        xAddress: modalXAddress.value,
    }

    if (window.localStorage.length === 0) {
        window.localStorage.setItem('case1', JSON.stringify(newCase));
    } else {
        window.localStorage.setItem('case'+(window.localStorage.length+1), JSON.stringify(newCase));
    }
    
    modalDate.value = '';
    modalCaseId.value = '';
    modalStatus.innerHTML = ''
    modalReported.value = '';
    modalIncType.value = '';
    modalAddress.value = '';
    modalXAddress.value = '';
}

const uniqueCaseId = () => {
    modalCaseId.innerHTML = '';
    const uniqueID = new Date().valueOf();
    modalCaseId.value = uniqueID;
}

const generateIncTables = () => {
    const newTable = document.createElement('table');
    newTable.setAttribute('class','table table-striped');
    incDiv.append(newTable);
  
    const tableHead = document.createElement('thead');
    newTable.append(tableHead);
  
    const tableRow = document.createElement('tr');
    tableRow.setAttribute('id','tb-row');
    tableHead.append(tableRow);
  
    headerColCreator('#');
    headerColCreator('Date');
    headerColCreator('Case No.');
    headerColCreator('Type');
    headerColCreator('Status');
    headerColCreator('');
    headerColCreator('');
  
    const tableBody = document.createElement('tbody');
    newTable.append(tableBody);
  }

  const displayCase = () => {
    incDiv.innerHTML = '';
    generateIncTables();
    const tBody = document.querySelector('tbody');

    for (let i=0; i<window.localStorage.length; i++) {
        const newRow = document.createElement('tr');
        tBody.append(newRow);
        const newTh = document.createElement('th');
        newTh.setAttribute('scope','row');
        newTh.setAttribute('class','item-td')
        newTh.innerHTML = i+1;
        newRow.append(newTh);

        tableItemCreator(newRow,'date',i);
        tableItemCreator(newRow,'caseId',i);
        tableItemCreator(newRow,'caseType',i);
        tableItemCreator(newRow,'caseStatus',i);

        const newTd = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.setAttribute('type','button');
        editBtn.setAttribute('class','btn btn-primary')
        editBtn.setAttribute('data-bs-toggle','modal');
        editBtn.setAttribute('data-bs-target','#staticBackdrop2');
        editBtn.setAttribute('onclick',`editCase(${i})`)
        editBtn.innerHTML = 'Edit';

        const newTd2 = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('type','button');
        removeBtn.setAttribute('class','btn btn-danger')
        removeBtn.innerHTML = 'Remove';


        newTd.append(editBtn);
        newTd2.append(removeBtn);
        newRow.append(newTd);
        newRow.append(newTd2);
    }
  }

const editCase = (i) => {
    modalDate2.value = JSON.parse(window.localStorage.getItem(window.localStorage.key(i))).date;
    modalCaseId2.value = JSON.parse(window.localStorage.getItem(window.localStorage.key(i))).caseId;
    modalStatus2.innerHTML = JSON.parse(window.localStorage.getItem(window.localStorage.key(i))).caseStatus;
    modalReported2.value = JSON.parse(window.localStorage.getItem(window.localStorage.key(i))).reporter;
    modalAddress2.value = JSON.parse(window.localStorage.getItem(window.localStorage.key(i))).address;
    modalXAddress2.value = JSON.parse(window.localStorage.getItem(window.localStorage.key(i))).xAddress;

    switch (modalStatus2.innerHTML) {
        case "Open":
            modalOpen2.checked = true;
            break;
        case "In-Progress":
            modalInProgress2.checked = true;
            break;
        case "Closed":
            modalClosed2.checked = true;
    }
}

const headerColCreator = (title) => {
    const tableRow = document.querySelector('#tb-row');
    const headerCol = document.createElement('th');
    headerCol.setAttribute('scope','col');
    headerCol.innerText = title;
    tableRow.append(headerCol);
}

const tableItemCreator = (row,val,index) => {
    const newTd = document.createElement('td');
    newTd.setAttribute('class','item-td');
    newTd.innerText = JSON.parse(window.localStorage.getItem(window.localStorage.key(index)))[val];
    row.append(newTd);
}

const caseStatusChange = () => {
    const status = document.getElementsByName('flexRadioDefault');

    for (let i=0; i<status.length; i++) {
        if (status[i].checked) {
            modalStatus.innerHTML = status[i].value;
        }
    }
}

document.addEventListener('load',displayCase());
inputAddress.addEventListener('change',populateDatalist);
createNewIncBtn.addEventListener('click',uniqueCaseId);
createIncidentBtn.addEventListener('click',createIncident);
createIncidentBtn.addEventListener('click',displayCase);
modalOpen.addEventListener('click',caseStatusChange);
modalInProgress.addEventListener('click',caseStatusChange);
modalClosed.addEventListener('click',caseStatusChange);
