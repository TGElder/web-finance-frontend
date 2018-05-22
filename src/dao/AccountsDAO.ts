export class AccountsDAO {

    getAccounts(): any {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:8080/accounts", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        return JSON.parse(xhttp.responseText);
    }

}