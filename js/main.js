const URL = "./db/data.json";
let cards = [];
let weeklyCards = [];

function getCards() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      cards = data;
      weeklyCards = data.filter((card) => card.is_weekly);
      renderWeeklyCards(weeklyCards);
    });
}

getCards();

let caurouselCards = document.getElementById("carousel-inner");

function renderWeeklyCards(cards) {
  cards.forEach((card, index) => {
    let cardItem = document.createElement("div");
    cardItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

    cardItem.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-sm-8 col-md-6 col-lg-4">
        <div class="card h-100 shadow">
          <img src="${card.image}" class="card-img mt-4" alt="${card.name} Picture Card"/>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${card.name}</h5>
            <p class="card-text mb-1 card-power">Poder: <strong>${card.power.toLocaleString()}</strong></p>
            <p class="card-text mb-1">Costo: <strong>${card.cost}</strong></p>
            <p class="card-text mb-3 text-success card-price">Precio: <strong>S/ ${card.price}</strong></p>

            <!-- Contador -->
            <div class="counter d-flex mb-3">
              <button class="btn btn-outline-secondary me-2 card-minus-btn">−</button>
              <input type="number" class="form-control text-center quantity" value="1" min="1" readonly style="max-width: 80px"/>
              <button class="btn btn-outline-secondary ms-2 card-plus-btn">+</button>
            </div>

            <!-- Botón -->
            <button class="btn card-add-btn btn-primary mt-auto" id="${card.id}">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>`;

    caurouselCards.appendChild(cardItem);

    addCardEvent(cardItem);
  });
}

renderWeeklyCards(weeklyCards);

function addCardEvent(cardElement) {
  let plusBtn = cardElement.querySelector(".card-plus-btn");
  let minusBtn = cardElement.querySelector(".card-minus-btn");
  let quantityCard = cardElement.querySelector(".quantity");
  let addToCartBtn = cardElement.querySelector(".card-add-btn");

  plusBtn.onclick = () => {
    quantityCard.value = parseInt(quantityCard.value) + 1;
  }

  minusBtn.onclick = () => {
    if (parseInt(quantityCard.value) > 1) {
      quantityCard.value = parseInt(quantityCard.value) - 1;
    }
  }

  addToCartBtn.onclick = (e) => {
    let cardId = e.currentTarget.id;
    console.log(`Añadiendo carta con ID: ${cardId} al carrito`);

    const selectedCard = weeklyCards.find((card) => card.id === parseInt(cardId));

    if (selectedCard) {
      const quantity = parseInt(quantityCard.value);
      addCardToShoppingCart(selectedCard, quantity);
      quantityCard.value = 1;
      console.log(`Carta añadida: ${selectedCard.name}, Cantidad: ${quantity}`);
    }
    else {
      console.error(`Carta con ID: ${cardId} no encontrada`);
    }
  }
}

function addCardToShoppingCart(cardObject, quantity) {
  let currentShoppingCart = localStorage.getItem("shoppingCart");
  currentShoppingCart = JSON.parse(currentShoppingCart);

  if (!currentShoppingCart) {
    currentShoppingCart = [];

    currentShoppingCart.push(buildCartItem(cardObject, quantity));
  }
  else {
    const existingCardIndex = currentShoppingCart.findIndex(item => item.id === cardObject.id);

    if (existingCardIndex !== -1) {
      currentShoppingCart[existingCardIndex].quantity += quantity;
    }
    else {
      currentShoppingCart.push(buildCartItem(cardObject, quantity));
    }
  }

  localStorage.setItem("shoppingCart", JSON.stringify(currentShoppingCart));
  console.log("Carrito de compras actualizado:", currentShoppingCart);
}

function buildCartItem(card, quantity) {
  return {
    id: card.id,
    name: card.name,
    image: card.image,
    power: card.power,
    number: card.number,
    cost: card.cost,
    price: card.price,
    quantity: quantity
  }
}