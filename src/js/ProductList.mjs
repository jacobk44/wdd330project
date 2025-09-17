import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

    let discountHtml = "";
    if (product.SuggestedRetailPrice && product.FinalPrice) {
        const discount = Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100);
        if (discount > 0) {
            discountHtml = `<span class="discount-badge">${discount}% OFF</span>`
        }
    }
    return `<li class= "product-card">
        <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image || product.image}" alt="${product.Name}">
        ${discountHtml}
        <h2 class="brand">${product.Brand.Name}"</h2>
        <h3 class="product-name">${product.Name}</h3>
        <p class="product-card_price">$${product.FinalPrice.toFixed(2)}</p>
        </a>
    </li>`
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
