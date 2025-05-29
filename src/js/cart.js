import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();
if (cart.total > 0) {
  // show our checkout button and total if there are items in the cart.
  document.querySelector(".list-footer").classList.remove("hide");
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // If cart is not empty, show footer and calculate total
  if (cartItems.length > 0) {
    document.querySelector(".cart-footer").classList.remove("hide");

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);

    // Insert total into HTML
    document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
  }
}

renderCartContents();

