/** no jquery here  **/
/****** some essential functions for our data - called further down ******/

function fetchData() {
  var filePromises = [
    'resultsCall.json',
    'resultsSMS.json',
    'resultsData.json'
  ].map(file => fetch(file).then(r => r.json()));

  Promise.all(filePromises).then(res => {
    const [call, sms, data] = res;

    calculate(call);
    calculate(sms);
   calculate(data);

    changeName(call);
    changeName(sms);
    changeName(data);

    

    table.setData(call);
    table.addData(sms);
    table.addData(data);

    var element = document.getElementById('title');
    element.innerHTML =
      'Asset ID: ' +
      call[0].Value.key +
      ' ' +
      sms[0].Value.key +
      ' ' +
      data[0].Value.key;
  });
}

fetchData();

// Need to replace the 'State' numbers, with real status - the structure is below
// the declared 'changeName' function (earlier) does the replace work and called later on
var cpState = {
  REGISTERED: 1,
  COMPLETED: 2,
  SETTLED: 3
};

function changeName(object) {  
  object.forEach(function(obj) {
    if (obj.Value.currentState == '1') obj.Value.currentState = 'REGISTERED';
    if (obj.Value.currentState == '2') obj.Value.currentState = 'COMPLETED';
    if (obj.Value.currentState == '3') obj.Value.currentState = 'SETTLED';
    if (obj.Value.creator == 'Admin@org1.example.com')
      obj.Value.creator = 'Alice';
    if (obj.Value.creator == 'User1@org1.example.com')
      obj.Value.creator = 'Peter';
  });
}
/****** end function area ******/

var i=0;
var j=0;
var z=0;
function calculate(object) {
  
  object.forEach(function(obj) {

    if (obj.Value.currentState == '2') {i+=parseInt(obj.Value.chargeableunits);j+=parseInt(obj.Value.chargeableunits);z+=parseInt(obj.Value.chargeableunits); };
    if (obj.Value.currentState == '3') {j-=parseInt(obj.Value.chargeableunits);i+=parseInt(obj.Value.chargeableunits)};
   // alert("i= "+i);

document.getElementById("i").innerHTML = "Completed+Settled: "+ i;
document.getElementById("j").innerHTML = "Debt: "+ j;
document.getElementById("z").innerHTML = "Sum completed: "+ z;
  });
}




// need to set tabledata with some sample data, but gets overwritten further down
var tabledata = [
  { id: 1, name: 'Oli Bob', age: '12', col: 'red', dob: '12/08/2017' },
  { id: 2, name: 'Mary May', age: '1', col: 'blue', dob: '14/05/1982' },
  {
    id: 3,
    name: 'Christine Lobowski',
    age: '42',
    col: 'green',
    dob: '22/05/1982'
  },
  {
    id: 4,
    name: 'Brendon Philips',
    age: '125',
    col: 'orange',
    dob: '01/08/1980'
  },
  {
    id: 5,
    name: 'Margret Marmajuke',
    age: '16',
    col: 'yellow',
    dob: '31/01/1999'
  },
  {
    id: 6,
    name: 'Margret Marmajuke',
    age: '16',
    col: 'yellow',
    dob: '31/01/1999'
  },
  {
    id: 7,
    name: 'Margret Marmajuke',
    age: '16',
    col: 'yellow',
    dob: '31/01/1999'
  },
  {
    id: 8,
    name: 'Margret Marmajuke',
    age: '16',
    col: 'yellow',
    dob: '31/01/1999'
  }
];

var table = new Tabulator('#example-table', {
  data: tabledata, /// set the table data
  layout: 'fitDataFill', //fit columns to width of table (optional)
  //height:190, // set height of table (optional)
  //  width:2000,
  addRowPos: 'top',
  history: true,
  dataFiltered:function(filters, rows){
    //filters - array of filters currently applied
    //rows - array of row components that pass the filters
    //alert(rows);
    calculate(rows);
    },
  columnVertAlign: 'bottom', //align header contents to bottom of cell
  groupBy: 'IMSI',
  pagination: 'local',
  paginationSize: 11,
  paginationSizeSelector: [3, 6, 8, 10],

  //responsiveLayout:"collapse",
  columns: [
    //Define Table Columns
    //{formatter:"responsiveCollapse", width:30, minWidth:30, align:"center", resizable:false, headerSort:false},
    //	{title:"Progress", field:"progress", width:100, sorter:"number", bottomCalc:"avg", bottomCalcParams:{precision:3}},
    {
      title: 'Txn Id',
      field: 'TxId',
      sorter: 'string',
      formatter: 'textarea',
      width: 300,
      headerFilter: 'input',
      headerFilterPlaceholder: 'Find Txn Id...'
    },
    {
      title: 'Transaction Info',
      align: 'center',

      columns: [
        {
          title: 'Time Executed',
          field: 'Timestamp',
          sorter: 'string',
          width: 250
        },
        {
          title: 'Txn State',
          field: 'Value.currentState',
          sorter: 'string',
          width: 150
        }
      ]
    },

    {
      title: 'Event Start Time',
      field: 'Value.eventStartTime',
      align: 'left',
      width: 200,
      headerFilter: dateFilterEditor,
      headerFilterFunc: dateFilterFunction
    
    },
    {
      title: 'Invoking ID',
      field: 'Value.creator',
      sorter: 'string',
      width: 150
    },
    {
      title: 'Type of event',
      field: 'Value.typeofevent',
      formatter: 'money',
      sorter: 'string',
      width: 150
    },

    { title: 'HPLMN', field: 'Value.HPLMN', sorter: 'string', width: 200 },
    {
      title: 'chargeable units',
      field: 'Value.chargeableunits',
      formatter: 'money',
      sorter: 'string',
      width: 150
    },
    { title: 'IMSI', field: 'Value.IMSI', sorter: 'string', width: 150 },
    {
      title: 'MSISDN',
      field: 'Value.MSISDN',
      sorter: 'string',
      width: 150,
      headerFilter: 'input',
      headerFilterPlaceholder: 'Find IMSI...'
    },
    {
      title: 'Callreference ID',
      field: 'Value.callreferenceID',
      sorter: 'string',
      width: 150
    },
    
    {
      title: 'Event Duration',
      field: 'Value.eventduration',
      sorter: 'string',
      align: 'left',
      width: 200
    },
    {
      title: 'Cause For Term',
      field: 'Value.CauseForTerm',
      sorter: 'string',
      formatter: 'money',
      align: 'left',
      width: 200
    },
    {
      title: 'Destination',
      field: 'Value.destination',
      sorter: 'string',
      align: 'left',
      width: 200
    }
  ],
  rowClick: function(e, row) {
    //e - the click event object
    //row - row component
    console.log(row);
  }
});

//custom header filter
function dateFilterEditor(cell, onRendered, success, cancel, editorParams) {
  var container = $('<span></span>');
  //create and style input
  var start = $("<input type='date' placeholder='Start'/>");

  var end = $("<input type='date' placeholder='End'/>");

  container.append(start).append(end);

  var inputs = $('input', container);

  inputs
    .css({
      padding: '4px',
      width: '50%',
      'box-sizing': 'border-box'
    })
    .val(cell.getValue());

  function buildDateString() {
    return {
      start: start.val(),
      end: end.val()
    };
  }

  //submit new value on blur
  inputs.on('change blur', function(e) {
    success(buildDateString());
  });

  //submit new value on enter
  inputs.on('keydown', function(e) {
    if (e.keyCode == 13) {
      success(buildDateString());
    }

    if (e.keyCode == 27) {
      cancel();
    }
  });

  console.log(container);
  
  return container[0];
}

//custom filter function
function dateFilterFunction(headerValue, rowValue, rowData, filterParams) {
  //headerValue - the value of the header filter element
  //rowValue - the value of the column in this row
  //rowData - the data for the row being filtered
  //filterParams - params object passed to the headerFilterFuncParams property
  var format = filterParams.format || 'YYYY-MM-DD hh:mm';
  var start = moment(headerValue.start);
  var end = moment(headerValue.end);
  var value = moment(rowValue, format);

  if (rowValue) {
    if (start.isValid()) {
      if (end.isValid()) {
        return value >= start && value <= end;
      } else {
        return value >= start;
      }
    } else {
      if (end.isValid()) {
        return value <= end;
      }
    }
  }

  return false; //must return a boolean, true if it passes the filter.
}

//function to change the 'state' (paper State) to meaningful statuses for HTML rendering

//console.log("actual JSON element is " + actual_JSON[0]);
// Set which Asset ID is being reported upon and display it to appropriate element

//trigger download -- these jquery buttons are not implemented, just placeholder buttons shown for now

//$("#download-csv").click(function(){
//$("#example-table").tabulator("download", "csv", "data.csv");
//});

//trigger download of data.json file
//$("#download-json").click(function(){
//$("#example-table").tabulator("download", "json", "data.json");
//});

//trigger download of data.xlsx file
//$("#download-xlsx").click(function(){
//$("#example-table").tabulator("download", "xlsx", "data.xlsx", {sheetName:"My Data"});
//});

//trigger download of data.pdf file
//$("#download-pdf").click(function(){
//$("#example-table").tabulator("download", "pdf", "data.pdf", {
//orientation:"portrait", //set page orientation to portrait
//        title:"Example Report", //add title to report
//});
//});
