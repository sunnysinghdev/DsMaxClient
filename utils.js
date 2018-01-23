var Utils = {};

function getId(id) {
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

function displayNavbar() {
    function handler() {
        if (this.status = 200) {
            getId("global_navbar").innerHTML = this.response;
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = handler;
    xhr.open('GET', 'navbar.html');
    xhr.send();
};

function displayUserDetail() {

};