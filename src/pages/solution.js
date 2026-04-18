import { html } from "lit-html";
import { loadData } from "../dataLoader.js";
import { solutionBanner } from "../components/solution/banner.js";
import { solutionCta } from "../components/solution/cta.js";
import { products } from "../components/solution/products.js";
import { solutionCategories } from "../components/solution/categories.js";

// Main page template
export const renderSolutionPage = (data) => {
    if (!data) {
        return html`<div class="l-solution">Loading...</div>`;
    }

    console.log("data.banner:\n", data.banner);
    console.log("data.ctaBanner:\n", data.ctaBanner);
    console.log("data.products:\n", data.products);
    console.log("data.categories:\n", data.categories);

    return html`
        <div class="l-solution">
            <section class="l-solution__banner ">
                <div class="l-container l-container--no-pading">
                    ${data.banner ? solutionBanner(data.banner) : html``}
                </div>
            </section>

            <section class="l-solution__content">
                <div class="l-container is-shorter">
                    <div class="c-solution-content">
                        <div class="c-solution-content__cta">
                            ${data.ctaBanner ? solutionCta(data.ctaBanner) : html``}
                        </div>

                        ${data.products ? products(data.products) : html``}
                    </div>
                </div>
            </section>

            <section class="l-solution__categories">
                <div class="l-container l-container--is-shorter">
                    ${data.categories ? solutionCategories(data.categories) : html``}
                </div>
            </section>
        </div>
    `;
};

/**
 * Load data and render the solution page
 */
export const loadAndRenderSolutionPage = async () => {
    try {
        const data = await loadData();
        return renderSolutionPage(data);
    } catch (error) {
        return html`<div class="l-solution">Error loading data: ${error.message}</div>`;
    }
};
