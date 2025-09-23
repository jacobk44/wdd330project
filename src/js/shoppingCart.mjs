// ShoppingCart.mjs
import { renderListWithTemplate } from "./utils.mjs";

// template function for cart items
function cartItemTemplate(item) {
  return `
    <li class="cart-item">
      <img src="${item.Image}" alt="${item.Name}" class="cart-item_image">
      <div class="cart-item_info">
        <h3 class="cart-item_name">${item.Name}</h3>
        <p class="cart-item_brand">${item.Brand?.Name || ""}</p>
        <p class="cart-item_price">$${item.FinalPrice.toFixed(2)}</p>
        <p class="cart-item_quantity">Qty: ${item.Quantity || 1}</p>
      </div>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key; // e.g. "so-cart"
    this.listElement = listElement;
  }

  getCartContents() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  renderList() {
    const list = this.getCartContents();

    this.listElement.innerHTML = ""; // clear first
    if (list.length === 0) {
      this.listElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    renderListWithTemplate(cartItemTemplate, this.listElement, list);
  }
}
