chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    let res = request.chkArray;
    setValue(res);
    sendResponse({
      Success: "Extracted.."
  });
});

let res = "";
let h_id, h_name, h_class, h_type;
let chkArray = [];
let valSet = ["id", "name", "type", "class"];
let head = "";
let header = [];
let count = -1;

function setValue(args) {
  console.log("enetering...");
  let valArray = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === true) {
      valArray.push(valSet[i]);
      head += valSet[i] + ',';
    }
  }
  console.log(valArray);
  scraping(valArray);
}

function scraping(atrval) {
  console.log("Entered scraping..");
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

  console.log(csv);
  let hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'data.csv';
  hiddenElement.click();
}