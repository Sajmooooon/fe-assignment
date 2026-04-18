import { html } from "lit-html";
import { productCard } from "../product/productCard.js";

export const products = (products) => html`
    <div class="c-solution-content__products">
        ${products.map((product, index) => productCard(product, index))}
    </div>
`;
