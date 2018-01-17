var Contacts = {};
var ContactSchema = {
    flat_number: 0,
    owner: "",
    co_owner: "",
    mobile_1: "",
    mobile_2: "",
    email_1: "",
    email_2: "",
    work_1: "",
    work_2: ""
};
var apiEndPointUrl = 'https://dsmax.herokuapp.com';
//var apiEndPointUrl = 'http://localhost:8081';

function add() {
    function handler() {
        if (this.status == 200) {
            var rawdata = this.response;
            reloadData();
            getId("status").innerHTML = rawdata;
        } else {
            getId("status").innerHTML = this.status;

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
    //alert(JSON.stringify(obj));
    //alert(obj)
    xhr.send(JSON.stringify(obj));
};

function loadData() {
    var num = getId("search").value.trim();
    var fill = "";

    if (Contacts.hasOwnProperty(num)) {
        var contact = Contacts[num];

        for (var key in contact) {
            var feild = getId(key);
            if (feild)
                feild.value = contact[key];
        }

    } else {
        alert("Not found");
    }
}

function update() {
    function handler() {
        if (this.status == 200) {
            var rawdata = this.response;
            reloadData();
            getId("status").innerHTML = rawdata;
        } else {
            getId("status").innerHTML = this.status;

        }
    }

    var obj = {};
    for (var key in ContactSchema) {
        var feild = getId(key);
        if (feild) {
            obj[key] = feild.value;
            console.log(key + "=" + obj[key]);
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.onload = handler;
    xhr.open('POST', apiEndPointUrl + '/dsmax/db/update');
    xhr.setRequestHeader('Content-type', 'application/json');
    console.log(JSON.stringify(obj));
    //alert(obj)
    xhr.send(JSON.stringify(obj));
};

function getId(id) {
    return document.getElementById(id);
}

function reloadData() {
    function handler() {
        if (this.status == 200) {
            // success!
            var rawdata = this.response;
            // getId("status").innerText = rawdata;
            var arr = JSON.parse(rawdata);
            var count = 0;
            for (var index in arr) {
                Contacts[arr[index].flat_number] = arr[index];
                count++;
            }
            getId("count").innerText = count;
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
    var fill = "*N/A*";

    if (Contacts.hasOwnProperty(num)) {
        var contact = Contacts[num];

        function onReadDetail() {
            if (this.status == 200) {
                // success!
                var rawdata = this.response;
                for (var key in contact) {
                    rawdata = rawdata.replace("$" + key, contact[key]);
                }
                //rawdata = rawdata.replace("$flat_number", contact.flat_number);
                rawdata = rawdata.replace("$owner", fill);
                rawdata = rawdata.replace("$co_owner", fill);
                rawdata = rawdata.replace("$mobile_1", fill);
                rawdata = rawdata.replace("$mobile_2", fill);
                rawdata = rawdata.replace("$email_1", fill);
                rawdata = rawdata.replace("$email_2", fill);

                getId("result").innerHTML = rawdata;

            } else {

            }
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = onReadDetail;
        xhr.open('GET', 'detail.html');
        xhr.send();

    } else {
        alert("No found");
    }

}
reloadData();