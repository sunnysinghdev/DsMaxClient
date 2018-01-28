//import {get } from "mongoose";
var App = {};
App.dataLoaded = false;
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
App.deletePost = function(post_id) {
    Utils.getConfig(function(config) {
        var apiEndPointUrl = config.apiEndPointUrl;

        function handler() {
            if (this.status == 200) {
                // success!
                var rawdata = this.response;
                // document.getElementById("status").innerText = rawdata;
                var arr = JSON.parse(rawdata);
                console.log(arr);
                window.location.href = "home.html";
                //document.getElementById("count").innerText = count;
            } else {

            }
        }
        var req = {};
        req.flat_number = Utils.getFlatNumber();
        req.token_id = Utils.getToken();
        req.post_id = parseInt(post_id);
        var xhr = new XMLHttpRequest();
        xhr.onload = handler;
        xhr.open('POST', apiEndPointUrl + '/dsmax/db/deletepost');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(req));
    });
};
App.sendPost = function() {
    var post_content = document.getElementById("text_post").value;
    if (post_content == null || post_content == "")
        return;
    document.getElementById("footer").style.display = "none";
    Utils.getConfig(function(config) {
        var apiEndPointUrl = config.apiEndPointUrl;

        function handler() {
            if (this.status == 200) {
                // success!
                var rawdata = this.response;
                // document.getElementById("status").innerText = rawdata;
                var arr = JSON.parse(rawdata);
                console.log(arr);
                window.location.href = "home.html";
                //document.getElementById("count").innerText = count;
            } else {

            }
        }
        var req = {};
        req.flat_number = Utils.getFlatNumber();
        req.token_id = Utils.getToken();
        req.content = post_content;
        var xhr = new XMLHttpRequest();
        xhr.onload = handler;
        xhr.open('POST', apiEndPointUrl + '/dsmax/db/sendpost');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(req));
    });
};
App.getAllPost = function() {
        Utils.getConfig(function(config) {
            var apiEndPointUrl = config.apiEndPointUrl;

            function handler() {
                if (this.status == 200) {
                    // success!
                    var rawdata = this.response;
                    // document.getElementById("status").innerText = rawdata;
                    var arr = JSON.parse(rawdata);
                    App.renderPost(arr);
                    //document.getElementById("count").innerText = count;
                } else {

                }
            }
            var req = {};
            req.flat_number = Utils.getFlatNumber();
            req.token_id = Utils.getToken();
            var xhr = new XMLHttpRequest();
            xhr.onload = handler;
            xhr.open('POST', apiEndPointUrl + '/dsmax/db/allpost');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(req));
        });
    }
    //Date format 2018-01-18T14:03:29.742Z
App.renderPost = function(postArr) {
    // postArr = [{ post_id: 1, content: "one", flat_number: 305, datetime: "2018-01-11T14:03:29.742Z" },
    //     { post_id: 2, content: "one dfdf dfdf f", flat_number: 305, datetime: "2018-03-12T14:03:29.742Z" },
    //     { post_id: 3, content: "one rere fer erer", flat_number: 305, datetime: "2018-03-13T14:03:29.742Z" },
    //     { post_id: 4, content: "one four", flat_number: 305, datetime: "2018-04-14T14:03:29.742Z" },
    //     { post_id: 5, content: "one five", flat_number: 305, datetime: "2018-05-15T14:03:29.742Z" }
    // ];
    var ele = document.getElementById("posts");
    Utils.getHtml("post.html", function(content) {
        for (var index in postArr) {
            var rawdata = content;
            var post = postArr[index];
            var d = new Date(Date.parse(post.datetime));
            var postDate = d.getDate() + " " + Utils.getMonth(d.getMonth()) + " " + d.getFullYear();
            var postedBy = "Unknown";
            var postDelete = "none";
            try {
                if (post.flat_number == Utils.getFlatNumber() || Utils.getRoleType() == "admin") {
                    postDelete = "block";
                }
                //console.log(Contacts[post.flat_number]);
                postedBy = Contacts[post.flat_number].owner.split(" ")[0];
                if (Contacts[post.flat_number].co_owner !== "")
                    postedBy += " & " + Contacts[post.flat_number].co_owner.split(" ")[0];
                postedBy += " (" + post.flat_number + ")";
            } catch (e) {
                console.log(e.message);
            }
            rawdata = rawdata.replace("$post_id", post.post_id);
            rawdata = rawdata.replace("$post_id", post.post_id);
            rawdata = rawdata.replace("$post_content", post.content);
            rawdata = rawdata.replace("$post_date", postDate);
            rawdata = rawdata.replace("$posted_by", postedBy);
            rawdata = rawdata.replace("$post_delete", postDelete);
            var newDiv = document.createElement("div");
            newDiv.innerHTML = rawdata;
            ele.appendChild(newDiv);

        }
    });



};

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
    Utils.getConfig(function(config) {
        sendUpdate(config.apiEndPointUrl);
    });
};

function sendUpdate(apiEndPointUrl) {
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
            //            console.log(key + "=" + obj[key]);
        }
    }
    obj.token_id = localStorage.getItem("token_id");
    var xhr = new XMLHttpRequest();
    xhr.onload = handler;

    xhr.open('POST', apiEndPointUrl + '/dsmax/db/update');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(obj));
};



function reloadData(apiEndPointUrl) {
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
            App.dataLoaded = true;
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
    num = parseInt(num);
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
Utils.getConfig(function(config) {
    reloadData(config.apiEndPointUrl);
});