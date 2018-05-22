"use strict";
exports.__esModule = true;
var AccountsDAO = /** @class */ (function () {
    function AccountsDAO() {
    }
    AccountsDAO.prototype.getAccounts = function () {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:8080/accounts", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        return JSON.parse(xhttp.responseText);
    };
    return AccountsDAO;
}());
exports.AccountsDAO = AccountsDAO;
