const cartSummary = document.getElementById("cart-summary");
const cartTotal = document.getElementById("cart-total");
const checkoutForm = document.getElementById("checkout-form");

let shoppingCart = localStorage.getItem("shoppingCart");

try {
    shoppingCart = JSON.parse(shoppingCart);
} catch (error) {
    showErrorAlert("Surgió un error al cargar el carrito de compras: " + error.message);
}


function renderCartSummary() {
    if (shoppingCart.length === 0) {
        cartSummary.innerHTML = "<p>No hay productos en el carrito.</p>";
        cartTotal.textContent = "S/ 0.00";
        return;
    }

    let total = 0;
    cartSummary.innerHTML = "";

    shoppingCart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const card = document.createElement("div");
        card.className = "card mb-2 shadow-sm";
        card.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 class="card-title mb-1">${item.name}</h6>
          <small>Cantidad: ${item.quantity} x S/ ${item.price.toFixed(2)}</small>
        </div>
        <strong>S/ ${(subtotal).toFixed(2)}</strong>
      </div>
    `;
        cartSummary.appendChild(card);
    });

    cartTotal.textContent = `S/ ${total.toFixed(2)}`;
}

renderCartSummary();

let numberFields = document.getElementsByClassName("number-field");

for (const field of numberFields) {
    field.onkeydown = (e) => {
        if (!/[0-9]/.test(e.key)) e.preventDefault();
    };
}

let textFields = document.getElementsByClassName("text-field");
for (const field of textFields) {
    field.onkeydown = (e) => {
        if (!/[a-zA-Z\s]/.test(e.key)) e.preventDefault();
    };
}

let form = document.getElementById("checkout-form");

form.onsubmit = (e) => {
    e.preventDefault();

    Swal.fire({
        title: "Confirmación de Compra",
        text: `¿Deseas confirmar el pago de los productos?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            purchaseSuccess();
        }
    });
};

function showErrorAlert(message) {
    Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
    });
}

function purchaseSuccess() {
    Swal.fire({
        title: "¡Pago exitoso!",
        text: "Gracias por tu compra. Te hemos enviado un correo con el detalle.",
        icon: "success",
        confirmButtonText: "Aceptar"
    }).then(() => {
        localStorage.removeItem("shoppingCart");
        window.location.href = "../index.html";
    });
}