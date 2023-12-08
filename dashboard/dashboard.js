let data = JSON.parse(localStorage.getItem("curUser"))
console.log(data.displayName);


let userName = document.getElementById("userName");
    if (data.displayName != null) {
        userName.innerHTML = data.displayName
    }