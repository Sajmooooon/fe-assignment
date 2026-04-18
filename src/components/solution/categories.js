import { html } from "lit-html";
import { categoryCard } from "../category/categoryCard.js";

const getCategorySize = (productCount) => {
    if (productCount < 20) return "small";
    if (productCount < 40) return "tall";
    return "large";
};

export const solutionCategories = (categories) => html`
    <div class="c-solution-categories">
        <h2 class="c-solution-categories__title">Top kategórie produktov</h2>
        <div class="c-solution-categories__grid">
            ${categories.map((category, index) => categoryCard(category, index))}
        </div>
    </div>
`;
