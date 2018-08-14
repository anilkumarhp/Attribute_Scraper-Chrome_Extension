// responding to click
$("#extract").click(function () {    
    valCheckbox();
});

// initialization
let h_id, h_name, h_class, h_type;
let chkArray = [];
let valSet = ["id", "name", "type", "class"];
let count = 0;

// function to collecct the etails of checked boxes by fetching true or false.
function valCheckbox() {

    h_id = document.getElementById("Check1").checked;
    h_name = document.getElementById("Check2").checked;
    h_class = document.getElementById("Check3").checked;
    h_type = document.getElementById("Check4").checked

    chkArray = [h_id, h_name, h_class, h_type];

    // check if atleast 1 option is selected.
    chkArray.forEach(element => {
        if (element === false) {
            count++;
        }
    })

    //alert user to selech atleast one option.
    if (count === chkArray.length) {
        alert("Select atleast one option");
        location.reload();
        return false;
        
    }

    // sending the array to content script for further processing. 
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            chkArray: chkArray
        }, function (response) {
            alert("Data "+ response.success);
            location.reload();
                          
        });
    });

   
}

