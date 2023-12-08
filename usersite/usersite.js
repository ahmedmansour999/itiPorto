window.onload = function() {
    let data = JSON.parse(localStorage.getItem("curUser"));
    let userName = document.querySelector("#userName");

    if (data && data.displayName != null) {
        userName.innerHTML = data.displayName;
    }
    
};



// ########################################################################################################

// user Curd
document.addEventListener('DOMContentLoaded', function() {
    let userCurt = JSON.parse(localStorage.getItem("userProducts"));
    let container =document.getElementById("container")

    if (userCurt == null ) {
        container.innerHTML = "No product Yet";
    } else {
        container.innerHTML = userCurt
        let deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.parentElement.parentElement.parentElement.remove();
                let updatedHtml = container.innerHTML;
                localStorage.setItem("userProducts", JSON.stringify(updatedHtml));
            });
        });
    }
});


// ########################################################################################################

// user Wishlisht product
document.addEventListener('DOMContentLoaded', function() {
    let userCurt = JSON.parse(localStorage.getItem("userFavProducts"));
    let FavProductcontainer =document.getElementById("FavProductcontainer")

    if (userCurt == null ) {
        FavProductcontainer.innerHTML = "No product Yet";
    } else {
        FavProductcontainer.innerHTML = userCurt
        let deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.parentElement.parentElement.parentElement.remove();
                let updatedHtml = FavProductcontainer.innerHTML;
                localStorage.setItem("userFavProducts", JSON.stringify(updatedHtml));
            });
        });
    }
});


// ########################################################################################################
//mark here profile data

document.addEventListener("DOMContentLoaded" , ()=>{
    let userInfo = JSON.parse(localStorage.getItem("curUser"))
    let userDetails = document.querySelector(".userDetails")
    console.log(userInfo.phoneNumber);
    let UserInfoHtml = `
        <div class="userinfo id">
            <b>user ID:</b>
            <p>${userInfo.apiKey}</p>
        </div>
        <div class="userinfo name">
            <b>name :</b>
            <p>${userInfo.displayName}</p>
        </div>
        <div class="userinfo mail">
            <b>Your account :</b>
            <p>${userInfo.email}</p>
        </div>
        <div class="userinfo phoneNumber">
            <b>phoneNumber :</b>
            <p>${userInfo.phoneNumber}</p>
        </div>
    `
    userDetails.innerHTML = UserInfoHtml ;

})



// ########################################################################################################
//mark here txt Area data

let submitButton = document.getElementById("TxtBtn");

submitButton.addEventListener("click", function() {
    let TextArea = document.getElementById("usermail");
    let TextAreaInput = TextArea.value;

    let LastTxt = JSON.parse(localStorage.getItem("Opinion")) || [];

    let data = JSON.parse(localStorage.getItem("curUser"));
    let username = data.displayName;

    let TextData = {
        "Name": username,
        "txt": TextAreaInput
    };

    LastTxt.push(TextData);

    localStorage.setItem("Opinion", JSON.stringify(LastTxt));

});



// ########################################################################################################
