import { html } from "lit-html";
import c1 from "../../assets/images/categories/c1.jpg";
import c2 from "../../assets/images/categories/c2.jpg";
import c3 from "../../assets/images/categories/c3.jpg";
import c4 from "../../assets/images/categories/c4.jpg";
import c5 from "../../assets/images/categories/c5.jpg";

const images = [c1, c2, c3, c4, c5];
const handleCategoryClick = (link, linkTarget = "_self") => {
    if (!link) return;
    window.open(link, linkTarget);
};

export const categoryCard = (category, index) => {
    const imageSrc = images[index ?? 0] ?? category.imageUrl;
    console.log(index);
    return html`
        <article
            class="c-category-card"
            style="background-image: url('${imageSrc}')"
            @click=${() => handleCategoryClick(category.link)}
        >
            <div class="c-category-card__overlay"></div>

            <div class="c-category-card__content">
                <div class="c-category-card__main">
                    <div class="c-category-card__header">
                        <h3 class="c-category-card__name">${category.name}</h3>
                        <span class="c-category-card__count">${category.productCount}</span>
                    </div>

                    <ul class="c-category-card__subcategories">
                        ${category.subcategories?.map(
                            (sub) => html`
                                <li class="c-category-card__subcategory">
                                    <a
                                        class="c-category-card__subcategory-link"
                                        href="${sub.link}"
                                        @click=${(e) => e.stopPropagation()}
                                    >
                                        ${sub.name}
                                    </a>
                                </li>
                            `
                        )}
                    </ul>

                    <a
                        class="c-category-card__cta"
                        href="${category.link}"
                        @click=${(e) => e.stopPropagation()}
                    >
                        ${category.ctaText} →
                    </a>
                </div>
            </div>
        </article>
    `;
};
