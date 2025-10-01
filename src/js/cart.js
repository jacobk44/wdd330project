import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

async function initCart() {
  const cart = new ShoppingCart("so-cart", ".product-list");
  await cart.init();

  if (cart.total > 0) {
    const footer = document.querySelector(".list-footer");
    if (footer) footer.classList.remove("hide");
  }
}

initCart();
