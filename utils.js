var Utils = {};

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
    xhr.open('GET', 'config.json');
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