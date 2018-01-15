var contacts = {};
var apiEndPointUrl = 'https://dsmax.herokuapp.com';

function add() {
    function handler() {
        if (this.status == 200) {
            var rawdata = this.response;
            getId("status").value = rawdata;
        } else {

        }
    }

    var obj = {};
    obj.flat_number = getId("flat_number").value;
    obj.owner = getId("owner").value;
    obj.co_owner = getId("co_owner").value;
    obj.mobile_1 = getId("mobile_1").value;
    obj.mobile_2 = getId("mobile_2").value;
    obj.email_1 = getId("email_1").value;
    obj.email_2 = getId("email_2").value;

    var xhr = new XMLHttpRequest();
    xhr.onload = handler;
    xhr.open('POST', apiEndPointUrl + '/dsmax/db/insert');
    xhr.setRequestHeader('Content-type', 'application/json');
    alert(JSON.stringify(obj));
    //alert(obj)
    //xhr.send(JSON.stringify(obj));
};

function getId(id) {
    return document.getElementById(id);
}

function reloadData() {
    function handler() {
        if (this.status == 200) {
            // success!
            var rawdata = this.response;
            //alert(rawdata);
            //document.getElementById("output").value = rawdata;
            var arr = JSON.parse(rawdata);

            for (var index in arr) {
                contacts[arr[index].flat_number] = arr[index];
            }
            //var dataJson = JSON.parse(rawdata);
            //createStoreList(dataJson);
        } else {

        }
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = handler;
    //xhr.open('GET', 'http://github.sunnysinghdev.com/BhandaraScooters/WebAngular/inv_parts.json', false);
    xhr.open('GET', apiEndPointUrl + '/dsmax/db/all');
    xhr.send();
};

function search() {
    var num = getId("search").value.trim();
    if (contacts.hasOwnProperty(num)) {
        alert(contacts[num].owner);
    } else {
        alert("No found");
    }
    getId("result").innerHTML = '<div class="well">' +
        '<div class="wells">' +
        '<div class="form-inline">' +
        '<label>Number</label>' +
        '<div class="form-group">' +
        '<input id="flat_number" placeholder="  Number" class="form-control" />' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<h5>Person 1</h5>' +

        '<div class="well">' +
        '<label>' + contacts[num].owner + '</label>' +
        '<div class="form-group">' +
        '<input id="owner" placeholder="  Name" class="form-control" />' +
        '</div>' +
        '<label>Contact Number</label>' +
        '<div class="form-group">' +
        '<input id="mobile_1" placeholder="  Number" class="form-control" />' +
        '</div>' +
        '<label>Email</label>' +
        '<div class="form-group">' +
        '<input id="email_1" placeholder="  Number" class="form-control" />' +
        '</div>' +
        '</div>';
}
reloadData();