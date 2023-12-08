document.addEventListener("DOMContentLoaded", function () {
    const selectedProductId = localStorage.getItem("selectedProduct");
    seeProduct(selectedProductId);
});

let Stars;

function seeProduct(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
            let html = '';
            html += `
                <div class="AllContainer-left">
                    <div class="container-left">
                        <img src="${data.image}" alt="img">
                        <button><a><ion-icon name="cart-outline"></ion-icon>Add to Cart</a></button>
                    </div>
                    <div class="rating">
                        <ion-icon class="star" name="star-outline"></ion-icon>
                        <ion-icon class="star" name="star-outline"></ion-icon>
                        <ion-icon class="star" name="star-outline"></ion-icon>
                        <ion-icon class="star" name="star-outline"></ion-icon>
                        <ion-icon class="star" name="star-outline"></ion-icon>
                    </div>
                </div>
                <div class="container-right">
                    <div class="ProductHead">
                        <h1>${data.title}</h1>
                        <p>${data.price} Eg</p>
                    </div>
                    <hr>
                    <h2>Description</h2>
                    <p>${data.description}</p>
                    <hr>
                    <h2>Category</h2>
                    <p>${data.category}</p>
                    <hr>
                    <div class="rating">
                        <p>Count : ${data.rating.count}</p>
                        <p>rate : ${data.rating.rate}</p>
                    </div>
                </div>`;
            document.getElementById('productContainer').innerHTML = html;
//##############################################################################
            // Select Stars after rendering product details mark here
            Stars = document.querySelectorAll(".rating .star");
            Stars.forEach((star, index) => {
                star.addEventListener("mousemove", function () {
                    Stars.forEach((s, i) => {
                        if (i <= index) {
                            s.classList.add("hovered");
                        } else {
                            s.classList.remove("hovered");
                        }
                    });
                });
                star.addEventListener("mouseleave", () => {
                    Stars.forEach((s) => s.classList.remove("hovered"));
                });
                star.addEventListener("click" , ()=>{
                    Stars.forEach((s , i)=>{
                        if (i <= index) {
                            s.classList.add("clicked")
                        }else{
                            s.classList.remove('clicked')
                        }
                    })
                })
            });
        })
        .catch((error) => console.error("Error fetching data:", error));
}
