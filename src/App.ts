import * as AccountsDAO from "./dao/AccountsDAO"

var accountsDao: AccountsDAO.AccountsDAO = new AccountsDAO.AccountsDAO();
accountsDao.getAccounts(function(responseText: string) {
    document.body.innerHTML = JSON.stringify(JSON.parse(responseText));
});