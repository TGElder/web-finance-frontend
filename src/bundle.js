(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var AccountsDAO = require("./dao/AccountsDAO");
var accountsDao = new AccountsDAO.AccountsDAO();
document.body.innerHTML = accountsDao.getAccounts();

},{"./dao/AccountsDAO":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
