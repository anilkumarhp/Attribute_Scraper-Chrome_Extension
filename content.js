// receiving passed value from popup.js.
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    let res = request.chkArray;
    setValue(res);
    sendResponse({
      success: "Extracted.."
  });
});

//initialization
let valSet = ["id", "name", "type", "class"];
let head = "";

// function to determine the selected attribute name
function setValue(args) {
 
  let valArray = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === true) {
      valArray.push(valSet[i]);
      head += valSet[i] + ',';
    }
  }
  
  scraping(valArray);
}

//function to extract all the selected attributes values
function scraping(atrval) {
  
  let doc = document.querySelectorAll('*');
  let data = [];
  let extracted = [];
  let nodes = [];

  for (let i = 0; i < doc.length; i++) {
    let resVal = [];
    for (let j = 0; j < atrval.length; j++) {
      resVal.push(doc[i].getAttribute(atrval[j]));
    }
    data.push(resVal);
  }

  for (let i = 0; i < data.length; i++) {
    let extract = data[i];
    let flag = false;
    let nodeName = "";
    for (let j = 0; j < extract.length; j++) {

      if (extract[j] !== null) {
        nodeName += `//@` + atrval[j] + '=' + extract[j] + `  `;
        flag = true;
      }
    }

    if (flag) {
      nodes.push(nodeName);
      extracted.push(data[i]);
    }
  }

  download_csv(extracted, nodes);
}

//funtion to write all data to csv file and download it.
function download_csv(extracted, node) {
  var csv = head + "@nodename \n";
  let data = [];
  for (let i = 0; i < extracted.length; i++) {
    let res = extracted[i];
    for (let j = 0; j < res.length; j++) {
      if (res[i] === null) {
        res[i] = " ";
      }
    }
  }

  for (let i = 0; i < extracted.length; i++) {
    data.push(extracted[i]);
    data[i].splice(extracted[i].length, 0, node[i]);
  }

  data.forEach(element => {
    csv += element;
    csv += "\n";
  });

  
  let hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'data.csv';
  hiddenElement.click();
}