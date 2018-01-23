//import {get } from "mongoose";

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
var person = null;

function UserDetail(email, token, imgUrl) {
    this.email_id = email;
    this.token_id = token;
    this.imgUrl = imgUrl;
};

function Page() {
    this.searchId = document.getElementById("search");
    this.detailId = document.getElementById("result");

};
var apiEndPointUrl = 'https://dsmax-test.herokuapp.com';
//var apiEndPointUrl = 'http://localhost:8081';





function loadData() {
    var num = document.getElementById("search").value.trim();
    var fill = "";

    if (Contacts.hasOwnProperty(num)) {
        var contact = Contacts[num];

        for (var key in contact) {
            var feild = document.getElementById(key);
            if (feild)
                feild.value = contact[key];
        }

    } else {
        alert("Not found");
    }
};

function update() {
    function handler() {
        if (this.status == 200) {
            var rawdata = this.response;
            reloadData();
            document.getElementById("status").innerHTML = rawdata;
        } else {
            document.getElementById("status").innerHTML = this.status;

        }
    }

    var obj = {};
    for (var key in ContactSchema) {
        var feild = document.getElementById(key);
        if (feild) {
            obj[key] = feild.value;
            console.log(key + "=" + obj[key]);
        }
    }
    obj.token_id = localStorage.getItem("token_id");
    var xhr = new XMLHttpRequest();
    xhr.onload = handler;
    xhr.open('POST', apiEndPointUrl + '/dsmax/db/update');
    xhr.setRequestHeader('Content-type', 'application/json');
    console.log(JSON.stringify(obj));
    //alert(obj)
    xhr.send(JSON.stringify(obj));
};



function reloadData() {
    function handler() {
        if (this.status == 200) {
            // success!
            var rawdata = this.response;
            // document.getElementById("status").innerText = rawdata;
            var arr = JSON.parse(rawdata);
            var count = 0;
            for (var index in arr) {
                Contacts[arr[index].flat_number] = arr[index];
                count++;
            }
            //document.getElementById("count").innerText = count;
        } else {

        }
    }
    var req = {};
    req.token_id = localStorage.getItem("token_id");
    var xhr = new XMLHttpRequest();
    xhr.onload = handler;
    xhr.open('POST', apiEndPointUrl + '/dsmax/db/all');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(req));
};

function setAdmin(id) {
    if (localStorage.getItem("role_type") == "admin") {
        document.getElementById(id).style.display = "block";
        console.log("dssd");
    } else
        console.log("not admin");
};

function setActive(id) {
    document.getElementById("list_admin").classList.remove("active");
    document.getElementById("list_member").classList.remove("active");
    document.getElementById("list_home").classList.remove("active");
    document.getElementById(id).classList.add("active");

};

function setUserImage(id) {
    document.getElementById(id).src = localStorage.getItem("img_url");
};

function setFlatNumber(id) {
    document.getElementById(id).innerText = localStorage.getItem("flat_number");
};

function loadUser(page) {
    setAdmin("list_admin");
    setActive("list_" + page);
    setUserImage("nav_image");
    setFlatNumber("nav_flat_number");
};

function search() {
    // 
    var num = document.getElementById("search").value.trim();
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

                document.getElementById("result").innerHTML = rawdata;

            } else {

            }
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = onReadDetail;
        xhr.open('GET', 'detail.html');
        xhr.send();

    } else {
        document.getElementById("result").innerHTML = "<span style='color:red;'>Not result found</span>";
    }

};
reloadData();