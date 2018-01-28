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
}

function Page() {
    this.searchId = getId("search");
    this.detailId = getId("result");

}

function userLoggedIn(email, token, imgUrl) {

    function handler() {
        if (this.status == 200) {
            var user = JSON.parse(this.response).body;
            if (!user.error) {

                person = new UserDetail(user.flat_number, email, token, imgUrl, user.role_type);
                localStorage.setItem("img_url", imgUrl);
                localStorage.setItem("token_id", token);
                localStorage.setItem("role_type", user.role_type);
                localStorage.setItem("flat_number", user.flat_number);
                // console.log(JSON.stringify(user));
                window.location.href = "home.html";
            } else {

                alert("You are not registered!");
                Utils.getConfig(function(config) {
                    document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" +
                        config.website;
                });
            }
            //reloadData();
        } else {

        }
    }
    Utils.getConfig(function(config) {
        var req = {};
        req.email_id = email;
        req.token_id = token;
        var xhr = new XMLHttpRequest();
        xhr.onload = handler;
        xhr.open('POST', config.apiEndPointUrl + '/dsmax/db/updateToken');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(req));
    });


}

function add() {
    getId("result").innerHTML = "";

    function handler() {
        if (this.status == 200) {
            var rawdata = this.response;
            // reloadData();
        } else {

        }
    }
    var obj = {};
    for (var key in ContactSchema) {
        var feild = getId(key);
        if (feild) {
            obj[key] = feild.value;
            feild.value = "";
        }
    }
    var flat_num = parseInt(obj.flat_number);
    if (flat_num > 0 && flat_num < 441) {
        obj.flat_number = flat_num;
    } else {
        alert("Invalid flat number");
        return;
    }

    Utils.getConfig(function(config) {
        var xhr = new XMLHttpRequest();
        xhr.onload = handler;
        xhr.open('POST', config.apiEndPointUrl + '/dsmax/db/insert');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(obj));
    });

};