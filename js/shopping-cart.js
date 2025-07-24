let shoppingCart = localStorage.getItem("shoppingCart");

try {
    shoppingCart = JSON.parse(shoppingCart);
}
catch (error) {
    showErrorAlert("Surgio un error al cargar el carrito de compras: " + error.message);
}

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

    changeQuantityInput.onkeydown = (e) => {
        if(["e", "E", "+", "-", ".", ","].includes(e.key)) {
            e.preventDefault();
        }
    }

    deleteButton.onclick = (e) => {
      let cartId = parseInt(e.target.id);
      shoppingCart.splice(getCartIndex(cartId), 1);
      updateCartShopping();

      const toast = Toastify({
        text: `Se elimino el producto del carrito`,
        duration: 1200,
        close: false,
        stopOnFocus: false,
        style: {
          background: "red",
        },
        onClick: function () {
          toast.hideToast();
        },
      }).showToast();
    };
}

function getCartIndex(cartId) {
    return shoppingCart.findIndex((item) => item.id === cartId);
}

function updateCartShopping() {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    renderCartShopping();
}

function showErrorAlert(message) {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
  });
}

function showDeleteCartAlert() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¿Quieres vaciar el carrito de compras?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      deleteCart();
    }
  });
}

function deleteCart() {
  shoppingCart = [];
  localStorage.removeItem("shoppingCart");
  renderCartShopping();
  Swal.fire("Carrito vaciado", "", "success");
}

let deleteCartButton = document.getElementById("delete-shopping-cart");

deleteCartButton.onclick = () => {
    showDeleteCartAlert();
}


function checkout() {
  if (shoppingCart.length === 0) {
    showErrorAlert("El carrito está vacío. Agrega productos antes de proceder.");
    return;
  }

  Swal.fire({
        title: "Confirmación de Compra",
        text: "¿Estás seguro de que deseas proceder con la compra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, proceder",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "checkout.html";
        }
    });
}


let checkoutButton = document.getElementById("checkout-btn");
checkoutButton.onclick = () => {
    checkout();
}