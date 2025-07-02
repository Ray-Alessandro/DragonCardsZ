let shoppingCart = localStorage.getItem("shoppingCart");
shoppingCart = JSON.parse(shoppingCart);

function renderCartShopping() {
    let shoppingCartBody = document.getElementById("shopping-cart-body");
    let totalPrice = document.getElementById("total-price");
    let checkoutButton = document.getElementById("checkout-btn");
    
    if (!shoppingCart || shoppingCart.length === 0) {
        document.getElementById("empty-cart-message").style.display = "block";
        checkoutButton.disabled = true;
    }

    let total = 0;
    shoppingCartBody.innerHTML = ""; 
    shoppingCart.forEach((cartItem) => {
        const subTotal = cartItem.price * cartItem.quantity;
        total += subTotal;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${cartItem.image}" alt="${cartItem.name}" style="max-width: 70px;"/></td>
            <td>${cartItem.name}</td>
            <td>${cartItem.power.toLocaleString()}</td>
            <td>S/ ${cartItem.price.toFixed(2)}</td>
            <td>
                <input type="number" class="form-control quantity-input text-center" id="${cartItem.id}" value="${cartItem.quantity}" min="1" style="width: 80px; margin: auto;">
            </td>
            <td>S/ ${subTotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn" id="${cartItem.id}">Eliminar</button>
            </td>
        `;

        shoppingCartBody.appendChild(row);
        addEventsItem(row);
    });

    totalPrice.textContent = total.toFixed(2);
}

renderCartShopping();

function addEventsItem(shoppingCartItem) {
    let changeQuantityInput = shoppingCartItem.querySelector(".quantity-input");
    let deleteButton = shoppingCartItem.querySelector(".delete-btn");

    changeQuantityInput.onchange = (e) => {
        let cartId = parseInt(e.target.id);
        let newQuantity = parseInt(e.target.value);
        
        if (newQuantity < 1 || isNaN(newQuantity)) {
            newQuantity = 1;
        }
        
        shoppingCart[getCartIndex(cartId)].quantity = newQuantity;
        updateCartShopping();
    }

    deleteButton.onclick = (e) => {
        let cartId = parseInt(e.target.id);
        shoppingCart.splice(getCartIndex(cartId), 1);
        updateCartShopping();
    }
}

function getCartIndex(cartId) {
    return shoppingCart.findIndex((item) => item.id === cartId);
}

function updateCartShopping() {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    renderCartShopping();
}