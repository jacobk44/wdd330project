import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
// first create an instance of the ProductData class.
const dataSource = new ExternalServices();
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const productList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
productList.init();
