//Variables
var menuOption = 0;
const cards = [
  "Goku",
  "Vegeta",
  "Piccolo",
  "Frieza",
  "Cell",
  "Majin Buu",
  "Trunks",
  "Gohan",
  "Bulma",
  "Krillin",
  "Yamcha",
];
const cardsPrice = [100, 120, 80, 60, 90, 110, 70, 130, 150, 40, 200];
const cardsQuantity = [10, 5, 8, 3, 2, 4, 6, 7, 9, 1, 15];
var cardsItems = 11;

var userName = "";
const cardsBought = [];
const cardsBoughtQuantity = [];

//Inicio
getUserName();

//Menu
do {
  menuOption = selectMenuOption();

  switch (menuOption) {
    case 1:
      //Comprar Cartas
      showCartas();
      let cardIndex =
        parseInt(
          prompt(
            "Selecciona el número de la carta que deseas comprar (1-" +
              cardsItems +
              "):" +
              "\n" +
              showCartas()
          )
        ) - 1;

      if (cardIndex < 0 || cardIndex >= cardsItems) {
        alert("Índice de carta no válido. Por favor, intenta de nuevo.");
        break;
      }

      let quantity = parseInt(
        prompt("¿Cuántas cartas deseas comprar de " + cards[cardIndex] + "?")
      );
      console.log(
        "¿Cuántas cartas deseas comprar de " + cards[cardIndex] + "? : " + quantity
      );

      if (quantity <= 0) {
        alert("La cantidad debe ser mayor que 0. Inténtalo de nuevo.");
        break;
      } else if (quantity > cardsQuantity[cardIndex]) {
        alert(
          "No hay suficiente cantidad de esta carta. Cantidad disponible: " +
            cardsQuantity[cardIndex]
        );
        break;
      }

      buyDragonCard(cardIndex, quantity);

      break;

    case 2:
      //Añadir un nuevo tipo de carta
      console.log("Añadir un nuevo tipo de carta");
      let newCardName = prompt("Introduce el nombre de la nueva carta:");
      console.log("Introduce el nombre de la nueva carta:" + newCardName);

      let newCardPrice = parseInt(
        prompt("Introduce el precio de la nueva carta:")
      );
      console.log("Introduce el precio de la nueva carta:" + newCardPrice);

      let newCardQuantity = parseInt(
        prompt("Introduce la cantidad de la nueva carta:")
      );
      console.log("Introduce la cantidad de la nueva carta:" + newCardQuantity);

      addDragonCard(newCardName, newCardPrice, newCardQuantity);

      break;

    case 3:
      alert(
        "Gracias por visitarnos + " +
          userName +
          " en DragonCards Z!" +
          "\n" +
          "¡Hasta la próxima guerrero!"
      );
      break;

    default:
      alert("Opción no válida. Por favor, intenta de nuevo.");
  }
} while (menuOption !== 3);

//Metodos
function getUserName() {
  userName = prompt(
    "Bienvenido a DragonCards Z\n" +
      "Por favor, introduce tu nombre de usuario:"
  );
  if (userName === "") {
    alert(
      "El nombre de usuario no puede estar vacío. Por favor, inténtalo de nuevo."
    );
    getUserName();
  } else {
    alert(`Bienvenido, ${userName}!`);
    console.log(`Gracias por visitarnos, ${userName}!`);
    console.log(
      "Recuerda que puedes comprar cartas de Dragon Ball Z y añadir nuevas cartas al catálogo."
    );
  }
}

function selectMenuOption() {
  var menuValidOption = 0;

  do {
    menuValidOption = parseInt(
      prompt(
        " Menu DragonCards Z\n" +
          "1. Comprar cartas\n" +
          "2. Añadir un nuevo tipo de carta\n" +
          "3. Salir\n" +
          "Por favor, elige una opción (1-3):"
      )
    );

    if (menuValidOption < 1 || menuValidOption > 3) {
      alert("Opción no válida. Por favor, elige una opción entre 1 y 3.");
    }
  } while (menuValidOption < 1 || menuValidOption > 3);

  return menuValidOption;
}

// Metodos Principales
function addDragonCard(cardName, cardPrice, cardQuantity) {
  cards.push(cardName);
  cardsPrice.push(cardPrice);
  cardsQuantity.push(cardQuantity);
  cardsItems++;

  console.log(
    "Carta " +
      cardName +
      "añadida con éxito." +
      "\n" +
      "Precio: " +
      cardPrice +
      ", Cantidad: " +
      cardQuantity
  );

  alert(
    "Carta " +
      cardName +
      " añadida con éxito." +
      "\n" +
      "Precio: " +
      cardPrice +
      ", Cantidad: " +
      cardQuantity
  );
}

function buyDragonCard(cardIndex, quantity) {
  if (cardIndex < 0 || cardIndex >= cardsItems) {
    alert("Índice de carta no válido.");
    return;
  }

  if (cardsQuantity[cardIndex] < quantity) {
    alert("No hay suficiente cantidad de esta carta.");
    return;
  }

  cardsQuantity[cardIndex] -= quantity;
  cardsBought.push(cards[cardIndex]);
  cardsBoughtQuantity.push(quantity);
  alert("Compra realizada: " + quantity + " carta(s) de " + cards[cardIndex]);
  console.log(
    "Compra realizada: " +
      quantity +
      " carta(s) de " +
      cards[cardIndex] +
      " por un total de " +
      cardsPrice[cardIndex] * quantity +
      " monedas."
  );
}

function showCartas() {
  let message = "Cartas disponibles:\n";
  for (let i = 0; i < cardsItems; i++) {
    message += (i + 1) + ". " + cards[i] + " - Precio: " + cardsPrice[i] + " - Cantidad: " + cardsQuantity[i] + "\n";
  }
  console.log(message);
  return message;
}
