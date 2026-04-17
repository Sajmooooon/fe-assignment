import { html } from "lit-html";

const handleCategoryClick = (link, linkTarget = "_self") => {
    if (!link) return;
    window.open(link, linkTarget);
};

export const categoryCard = (category, size = "small") => html`
    <div
        class="c-category-card c-category-card--${size}"
        style="background-image: url('${category.imageUrl}')"
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
    </div>
`;
