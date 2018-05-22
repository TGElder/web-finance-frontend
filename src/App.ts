import * as AccountsDAO from "./dao/AccountsDAO"

var accountsDao: AccountsDAO.AccountsDAO = new AccountsDAO.AccountsDAO();
document.body.innerHTML = accountsDao.getAccounts();
