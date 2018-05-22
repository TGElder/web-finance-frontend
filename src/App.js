"use strict";
exports.__esModule = true;
var AccountsDAO = require("./dao/AccountsDAO");
var accountsDao = new AccountsDAO.AccountsDAO();
document.body.innerHTML = accountsDao.getAccounts();
