$("button").click(function () {
    valCheckbox();
});

let h_id, h_name, h_class, h_type;
let chkArray = [];
let valSet = ["id", "name", "type", "class"];
let count = -1;

function valCheckbox() {

    h_id = document.getElementById("Check1").checked;
    h_name = document.getElementById("Check2").checked;
    h_class = document.getElementById("Check3").checked;
    h_type = document.getElementById("Check4").checked

    chkArray = [h_id, h_name, h_class, h_type];

    chkArray.forEach(element => {
        if (element === false) {
            count++;
        }
    })

    if (count === chkArray.length) {
        alert("Select atleast one option");
    }

    // let resArray = setValue(chkArray);

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            chkArray: chkArray
        }, function (response) {
            document.getElementById("success").innerHTML = "Data Extracted!!"
        });
    });

}