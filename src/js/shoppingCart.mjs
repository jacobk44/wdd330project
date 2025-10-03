import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async init() {
    const list = getLocalStorage(this.key) || [];   // ✅ never null
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }

  calculateListTotal(list) {
    if (list.length > 0) {
      const amounts = list.map((item) => item.FinalPrice);
      this.total = amounts.reduce((sum, item) => sum + item, 0); // ✅ safe reduce
    } else {
      this.total = 0;
    }
  }

  renderCartContents(list) {
    const container = document.querySelector(this.parentSelector);
    container.innerHTML = ""; // ✅ clear old contents

    if (list.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      document.querySelector(".list-total").innerText = "$0";
      return;
    }

    const htmlItems = list.map((item) => cartItemTemplate(item));
    container.innerHTML = htmlItems.join("");

    // ✅ replace instead of append
    document.querySelector(".list-total").innerText = `$${this.total}`;
  }
}
