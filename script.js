var lastScrollTop = 0;

window.addEventListener("scroll", function () {
var navLinksContainer = document.querySelector(".navlinks ul");
var scrollTop = window.scrollY || document.documentElement.scrollTop;

if (scrollTop > lastScrollTop) {
    // Scrolling down
    navLinksContainer.style.position = "fixed";
    navLinksContainer.style.top = "0";
    navLinksContainer.style.left = "0";
    navLinksContainer.style.width = "100%";
    navLinksContainer.style.zIndex = "1000";
} else {
    // Scrolling up
    navLinksContainer.style.position = "relative";
}

lastScrollTop = scrollTop;
});

// ########################################################################################################
//mark here  show caregory

const categoryLinks = document.querySelectorAll(".category-link");
const productsContainer = document.getElementById("products");

function fetchProducts(category) {
fetch(
    `https://fakestoreapi.com/products${
    category !== "all" ? `/category/${category}` : ""
    }`
)
    .then((res) => res.json())
    .then((data) => {
    let html = "";
    if (data) {
        for (let i = 0; i < data.length; i++) {
        html += `
                    <div class="product" id="${data[i].id}">
                        <div class='img'><img src="${data[i].image}" alt="img" width="100%" height="100%"></div>
                        <div class="details">
                            <h1>${data[i].title}</h1>
                            <hr width='100%'>
                            <p>Price : ${data[i].price}$</p>
                        </div>
                        <button>
                            <a  href="./product.html" target="_blank"   ><ion-icon name="eye-outline"></ion-icon></a>
                            <a  target="_blank" onclick="AddProductToCart(${data[i].id})"><ion-icon name="cart-outline"></ion-icon><span>Add to Cart</span></a>
                            <a  target="_blank" id="love" onclick="AddProductToFav(${data[i].id})" ><ion-icon name="heart-outline"></ion-icon></a>
                        </button>
                    </div>`;
                    
        }
    }
    productsContainer.innerHTML=html;    

    })
    .catch((error) => console.error("Error fetching data:", error));
}


categoryLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        categoryLinks.forEach((link) => link.classList.remove("selected"));
        this.classList.add("selected");
        const categoryId = this.getAttribute("data-category");
        fetchProducts(categoryId);
    });
});

// Add the click event for each product to store the selected product ID in local storage
const productContainers = document.querySelectorAll(".products");
productContainers.forEach((container) => {
    container.addEventListener("click", function (event) {
        const productId = event.target.closest(".product").id;
        localStorage.setItem("selectedProduct", productId);
    });
});
fetchProducts("all");


// ########################################################################################################
// show cart 

let cartContainer = document.querySelector(".cart-product-container") ;
let favContainer = document.querySelector(".fav-product-container") ;
let Container = document.querySelector(".container")
function showCart(){
    cartContainer.style.transform = "translateX(0)";
}
function hideCart(){
    cartContainer.style.transform = "translateX(100%) ";
}
function showFav(){
    favContainer.style.transform = "translateX(0)";
}
function hideFav(){
    favContainer.style.transform = "translateX(100%) ";
}

// ########################################################################################################
// show product in cart 

function AddProductToCart(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
            let carts_products = document.querySelector(".carts-products");
            let existingHtml = JSON.parse(localStorage.getItem("cartProducts"));
            let userHtml = JSON.parse(localStorage.getItem("userProducts")) ;
            let newHtml = `
                <div class="cart-product-datails">
                    <div class="img">
                        <img src="${data.image}" width="100%" height="100%" alt="img">
                    </div>
                    <p>${data.title}</p>
                    <div class="price">
                        <p>${data.price}$</p>
                        <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                </div>
            `;
            let userSIte = `
            <tr>
            <td>
                <div class="client" id="productContainer">
                <div class="client-img bg-img" id="productImg" style="background-image: url(${data.image})"></div>
                    <div class="client-info" id="productInfo">
                        <h4 id="productName">${data.title}</h4>
                    </div>
                </div>
            </td>
            <td>
                <p id="productPrice">${data.price}</p>
            </td>
            <td>
                <p id="date" >${new Date().toLocaleString()}</p>
            </td>
            <td>
                <p id="desc">-</p>
            </td>
            <td>
                <div class="actions">
                    <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
                </div>
            </td>
        </tr>
            `
            if (existingHtml) {
                let updatedHtml = existingHtml + newHtml;
                carts_products.innerHTML = updatedHtml;
                localStorage.setItem("cartProducts", JSON.stringify(updatedHtml));
                
            } else {
                let updatedHtml = newHtml;
                carts_products.innerHTML = updatedHtml;
                localStorage.setItem("cartProducts", JSON.stringify(updatedHtml));
                
            }
            
            if (userHtml) {
                let updatedUser = userHtml + userSIte;
                localStorage.setItem("userProducts", JSON.stringify(updatedUser));
            } else {
                let updatedUser = userSIte;
                localStorage.setItem("userProducts", JSON.stringify(updatedUser));
            }
            function added() {
                let msg_added = document.querySelector(".added");
                msg_added.innerHTML = `<p>You Add ${data.title} to your cart</p>`;
                
                setTimeout(() => {
                    msg_added.innerHTML = ""; 
                }, 1000);
            }
            added()
            let deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    button.parentElement.parentElement.remove();
                    let updatedHtml = carts_products.innerHTML;
                    localStorage.setItem("cartProducts", JSON.stringify(updatedHtml));
                });
            });
        })
        .catch(error => console.error("Error fetching product:", error));
}

// ########################################################################################################
// show fav product 
function AddProductToFav(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
            let fav_products = document.querySelector(".fav-products");
            let existingHtml = JSON.parse(localStorage.getItem("favProducts"));
            let userFavHtml = JSON.parse(localStorage.getItem("userFavProducts")) ;
            let newHtml = `
                <div class="fav-product-datails">
                    <div class="img">
                        <img src="${data.image}" width="100%" height="100%" alt="img">
                    </div>
                    <p>${data.title}</p>
                    <div class="price">
                        <p>${data.price}$</p>
                        <button class="delete-btn"><ion-icon name="heart"></ion-icon></ion-icon></button>
                    </div>
                </div>
            `;
            let userSIte = `
            <tr>
            <td>
                <div class="client" id="productContainer">
                <div class="client-img bg-img" id="productImg" style="background-image: url(${data.image})"></div>
                    <div class="client-info" id="productInfo">
                        <h4 id="productName">${data.title}</h4>
                    </div>
                </div>
            </td>
            <td>
                <p id="productPrice">${data.price}</p>
            </td>
            <td>
                <p id="date" >${new Date().toLocaleString()}</p>
            </td>
            <td>
                <p id="desc">-</p>
            </td>
            <td>
                <div class="actions">
                    <button class="delete-btn"><ion-icon name="heart"></ion-icon></ion-icon></button>
                </div>
            </td>
        </tr>
            `
            if (existingHtml) {
                let updatedHtml = existingHtml + newHtml;
                fav_products.innerHTML = updatedHtml;
                localStorage.setItem("favProducts", JSON.stringify(updatedHtml));
            } else {
                let updatedHtml = newHtml;
                fav_products.innerHTML = updatedHtml;
                localStorage.setItem("favProducts", JSON.stringify(updatedHtml));
            }
            if (userFavHtml) {
                let updatedUser = userFavHtml + userSIte;
                localStorage.setItem("userFavProducts", JSON.stringify(updatedUser));
            } else {
                let updatedUser = userSIte;
                localStorage.setItem("userFavProducts", JSON.stringify(updatedUser));
            }
            let deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    button.parentElement.parentElement.remove();
                    let updatedHtml = fav_products.innerHTML;
                    localStorage.setItem("favProducts", JSON.stringify(updatedHtml));
                });
            });
        })
        .catch(error => console.error("Error fetching product:", error));
}


// ########################################################################################################
//mark here


let data = JSON.parse(localStorage.getItem("curUser"));

let userName = document.getElementById("userName");
let userHerf = document.getElementById("userHerf");
let logout = document.getElementById("logout") ;


if (data && data.displayName != null) {
    userName.innerHTML = data.displayName;
    userHerf.href = "./usersite/usersite.html";
    logout.style.display = "block"
}


// ########################################################################################################
//mark here LogOut 

logout.addEventListener("click" , ()=>{
    localStorage.removeItem("curUser");
    window.location.reload()
})


// ########################################################################################################
//mark here Admin 

let curUserData =JSON.parse(localStorage.getItem("curUser"))
console.log(curUserData.email);
let Admin = document.getElementById("Admin") ;
let Guest = document.getElementById("Guest") ;

if (curUserData.email === "admin@gmail.com") {
    Admin.style.display = "block";
    Guest.style.display = "none" ;
    adminHerf.href = "./usersite/Admin.html";

}