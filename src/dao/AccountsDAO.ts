export class AccountsDAO {

    getAccounts(callback): any {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:8080/accounts", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState === 4 && xhttp.status === 200) {
                callback(xhttp.responseText);
            }
        }
    }

}