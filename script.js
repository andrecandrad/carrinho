let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Mjolnir',
        tag: 'martelo',
        price: 5000,
        inCart: 0,
    },
    {
        name: 'Armadura Mark85',
        tag: 'mark',
        price: 8000,
        inCart: 0,
    },
    {
        name: 'Stormbreaker',
        tag: 'storm',
        price: 16000,
        inCart: 0,
    },
    {
        name: 'Escudo do Capitão América',
        tag: 'escudo',
        price: 6000,
        inCart: 0,
    },
    {
        name: 'Manopla do Infinito',
        tag: 'manopla',
        price: 5500,
        inCart: 0,
    },
    {
        name: 'Capa de feiticeiro',
        tag: 'capa',
        price: 12400,
        inCart: 0,
    },
    {
        name: 'Cetro asgardiano',
        tag: 'cetro',
        price: 2999,
        inCart: 0,
    },
    {
        name: 'Traje do Pantera',
        tag: 'pantera',
        price: 29999,
        inCart: 0,
    },
];

for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener("click", () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if(productNumbers){
        document.querySelector("#cart span").textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);

    if (productNumbers){
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector("#cart span").textContent = productNumbers + 1;
    } else{
        localStorage.setItem("cartNumbers", 1);
        document.querySelector("#cart span").textContent = 1;
    }   

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem("totalCost");

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    let productsContainer = document.querySelector(".products");

    if(cartItems && productsContainer){
        productsContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
            productsContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline" class="remove"></ion-icon>
                <img src="mark.jpg" style="width: 70px">
                <span>${item.name}</span>
            </div>
            <div class="price">R$ ${item.price},00</div>
            <div class="quantity">
                <ion-icon name="arrow-back-circle-outline" class="less"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="chevron-forward-circle-outline" class="added"></ion-icon>
            </div>
            <div class="total">
                R$ ${item.inCart * item.price},00
            </div>
                `    
        })
    }
}



/*let add = document.querySelector('.added');
let less = document.querySelector('.less');
let remove = document.querySelector('.remove');
    
    add.addEventListener("click", () => {
        item.inCart += 1
    })
    
    less.addEventListener("click", () => {
        item.inCart -= 1
    })
    
    remove.addEventListener("click", () => {
        item.inCart == 0
    })
*/




onLoadCartNumbers();
displayCart();