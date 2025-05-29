import { renderListWithTemplate } from "./utils.mjs";
/*function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/?product=">
        <img src="" alt="Image of ">
        <h2 class="card__brand"></h2>
        <h3 class="card__name"></h3>
        <p class="product-card__price">$</p>
      </a>
    </li>`
  }*/

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountAmount = isDiscounted
    ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
    : 0;

  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">
        ${isDiscounted
          ? `<span class="discounted-price">$${product.FinalPrice}</span>
             <span class="original-price">$${product.SuggestedRetailPrice}</span>
             <span class="discount-badge">${discountAmount}% OFF</span>`
          : `$${product.FinalPrice}`}
      </p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
      // You passed in this information to make the class as reusable as possible.
      // Being able to define these things when you use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
       this.originalList = [];
    }
  
    async init() {
    const list = await this.dataSource.getData(this.category);
    this.originalList = list;
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;

    // Set up sort event listener
    document.getElementById("sortOptions").addEventListener("change", (e) => {
      const sorted = this.sortList(this.originalList, e.target.value);
      this.renderList(sorted);
    });
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }

  sortList(list, criteria) {
    const sorted = [...list]; // clone original array

    switch (criteria) {
      case "name-asc":
        sorted.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.NameWithoutBrand.localeCompare(a.NameWithoutBrand));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
    }
    return sorted;
  }
}
 