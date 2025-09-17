import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

    let discountHtml = "";
    if (product.SuggestedRetailPrice && product.FinalPrice) {
        const discount = Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100);
        if (discount > 0) {
            discountHtml = `<span class="discount-badge">${discount}% OFF</span>`
        }
    }
    return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}" />
        <h2 class="card__brand">${product.Brand}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.Price}</p>
        ${product.Discount ? `<span class="discount">${product.Discount} OFF</span>` : ""}
      </a>
    </li>
  `;
}


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }


    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(''));

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
