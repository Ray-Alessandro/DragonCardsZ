//Reference Page: https://www.dbs-cardgame.com/fw/en/cardlist
const cards = [
  {
    id: 1,
    name: "Android 16",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-002.webp",
    power: 20000,
    number: "SB01-002",
    cost: 2,
    price: 85,
    is_weekly: true,
  },
  {
    id: 2,
    name: "Android 17",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-003.webp",
    power: 15000,
    number: "SB01-003",
    cost: 2,
    price: 80,
    is_weekly: false,
  },
  {
    id: 3,
    name: "Android 18",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-004.webp",
    power: 5000,
    number: "SB01-004",
    cost: 1,
    price: 50,
    is_weekly: true,
  },
  {
    id: 4,
    name: "Android 18",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-005.webp",
    power: 20000,
    number: "SB01-005",
    cost: 2,
    price: 85,
    is_weekly: false,
  },
  {
    id: 5,
    name: "Android 19",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-006.webp",
    power: 20000,
    number: "SB01-006",
    cost: 3,
    price: 105,
    is_weekly: true,
  },
  {
    id: 6,
    name: "Android 19/Android 20",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-007.webp",
    power: 20000,
    number: "SB01-007",
    cost: 2,
    price: 75,
    is_weekly: false,
  },
  {
    id: 7,
    name: "Android 20",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-008.webp",
    power: 5000,
    number: "SB01-008",
    cost: 1,
    price: 60,
    is_weekly: false,
  },
  {
    id: 8,
    name: "Cell",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-009.webp",
    power: 15000,
    number: "SB01-009",
    cost: 1,
    price: 70,
    is_weekly: false,
  },
  {
    id: 9,
    name: "Cell",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-010.webp",
    power: 25000,
    number: "SB01-010",
    cost: 4,
    price: 150,
    is_weekly: false,
  },
  {
    id: 10,
    name: "Cell",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-011.webp",
    power: 30000,
    number: "SB01-011",
    cost: 5,
    price: 165,
    is_weekly: true,
  },
  {
    id: 11,
    name: "Cell",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-012.webp",
    power: 30000,
    number: "SB01-012",
    cost: 5,
    price: 170,
    is_weekly: false,
  },
  {
    id: 12,
    name: "Cell Jr.",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-013.webp",
    power: 15000,
    number: "SB01-013",
    cost: 3,
    price: 105,
    is_weekly: true,
  },
  {
    id: 13,
    name: "Great Ape Son Goku",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-017.webp",
    power: 25000,
    number: "SB01-017",
    cost: 4,
    price: 150,
    is_weekly: false,
  },
  {
    id: 14,
    name: "Son Goku : Childhood",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-018.webp",
    power: 25000,
    number: "SB01-018",
    cost: 3,
    price: 105,
    is_weekly: true,
  },
  {
    id: 15,
    name: "Son Goku",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-023.webp",
    power: 20000,
    number: "SB01-023",
    cost: 3,
    price: 120,
    is_weekly: true,
  },
  {
    id: 16,
    name: "Vegeta",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-025.webp",
    power: 25000,
    number: "SB01-025",
    cost: 3,
    price: 120,
    is_weekly: true,
  },
  {
    id: 17,
    name: "Nappa",
    image: "https://www.dbs-cardgame.com/fw/images/cards/card/en/SB01-024.webp",
    power: 5000,
    number: "SB01-024",
    cost: 1,
    price: 50,
    is_weekly: true,
  },
];

const weeklyCards = cards.filter((card) => card.is_weekly);

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