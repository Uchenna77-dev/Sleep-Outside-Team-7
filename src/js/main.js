import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

loadHeaderFooter();


productList.init();
