import { html } from "lit-html";
import { productCard } from "../productCard.js";

export const products = (products) => html`
    <div class="c-solution-content__products">
        ${products.map((product) => productCard(product))}
    </div>
`;
