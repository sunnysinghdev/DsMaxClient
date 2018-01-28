var Utils = {};
Utils.getMonth = function(index) {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return month[index];
}
Utils.getId = function(id) {
    return document.getElementById(id);
};

Utils.getConfig = function(callback) {
    function handler() {
        if (this.status = 200) {
            callback(JSON.parse(this.response));
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = handler;
    xhr.open('GET', 'config/config.json');
    xhr.send();
};
Utils.getFlatNumber = function() {
    return parseInt(localStorage.getItem("flat_number"));
};
Utils.getRoleType = function() {
    return localStorage.getItem("role_type");
};
Utils.getToken = function() {
    return localStorage.getItem("token_id");
};
Utils.getHtml = function(filename, callback) {
    function handler() {
        if (this.status = 200) {
            callback(this.response);
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = handler;
    xhr.open('GET', filename);
    xhr.send();
};

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
};

function displayNavbar(callback) {
    function handler() {
        if (this.status = 200) {
            Utils.getId("global_navbar").innerHTML = this.response;
            callback();
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = handler;
    xhr.open('GET', 'navbar.html');
    xhr.send();
};

function displayUserDetail() {

};