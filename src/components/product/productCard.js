import { html } from "lit-html";
import { ref } from "lit-html/directives/ref.js";
import { button } from "../ui/button";
import { showNotification } from "../ui/notification.js";
import p1 from "../../assets/images/products/p1.png";
import p2 from "../../assets/images/products/p2.png";

const images = [p1, p2];

export const productCard = (product, index) => {
    const imageSrc = images[index] ?? product.imageUrl;
    let quantity = 1;
    let inputEl;

    const updateQuantity = (newQty) => {
        quantity = Math.max(1, Math.min(100, newQty));
        if (inputEl) inputEl.value = quantity;
    };

    const onDecrement = () => updateQuantity(quantity - 1);
    const onIncrement = () => updateQuantity(quantity + 1);

    const onInputChange = (e) => updateQuantity(parseInt(e.target.value) || 1);

    const onAddToCart = () => {
        if (quantity > 0 && quantity <= 10) {
            showNotification({
                text: `${quantity} ks produktu ${product.name} bolo pridaných do košíka.`,
                status: "success",
            });
        }
        if (quantity > 10) {
            showNotification({
                text: `Prekročili ste maximálny limit 10 ks, produktu ${product.name}, ktoré si môžete pridať do košíka.`,
                status: "error",
            });
        }
    };

    return html`
        <article class="c-product">
            <div class="c-product__badges">
                ${product.badges?.map(
                    (badge) => html`
                        <span class="c-product__badge c-product__badge--${badge.type}"
                            >${badge.label}</span
                        >
                    `
                )}
            </div>

            <div class="c-product__actions">
                <button
                    class="c-product__action"
                    aria-label="Porovnať produkt"
                    title="Porovnať produkt"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.51855 0.0501709V1.95837C8.80054 2.06622 9.0395 2.25971 9.20605 2.50623L13.3672 1.64099L13.4062 1.63318L13.4229 1.66931L15.3008 5.70642H16.0498V6.4281C16.0498 8.04962 14.7309 9.36853 13.1094 9.36853C11.4879 9.36853 10.1689 8.04962 10.1689 6.4281V5.70642H10.918L12.2021 2.94275L9.44141 3.51697C9.3684 4.0502 9.00635 4.49031 8.51855 4.67712V12.5814H9.60547C10.3846 12.5814 11.0186 13.2154 11.0186 13.9945V14.4877H12.0498V15.5248H3.98145V14.4877H5.0127V13.9945C5.0127 13.2154 5.64664 12.5814 6.42578 12.5814H7.48145V4.6781C7.17867 4.56221 6.9248 4.34868 6.75781 4.07556L3.63672 4.724L5.08203 7.83142H5.83105V8.5531C5.83105 10.1746 4.51215 11.4935 2.89062 11.4935C1.2691 11.4935 -0.0498047 10.1746 -0.0498047 8.5531V7.83142H0.699219L2.51953 3.91833L2.53027 3.8949L2.55469 3.89001L6.56934 3.05408C6.66225 2.55062 7.01389 2.13828 7.48145 1.95935V0.0501709H8.51855ZM6.42578 13.6185C6.2188 13.6185 6.0498 13.7875 6.0498 13.9945V14.4877H9.98145V13.9945C9.98145 13.7875 9.81248 13.6185 9.60547 13.6185H6.42578ZM1.01562 8.86853C1.16642 9.7682 1.94884 10.4564 2.89062 10.4564C3.83241 10.4564 4.61483 9.7682 4.76562 8.86853H1.01562ZM11.2344 6.74353C11.3852 7.6432 12.1676 8.33142 13.1094 8.33142C14.0512 8.33142 14.8336 7.6432 14.9844 6.74353H11.2344ZM1.84473 7.83142H3.93652L2.89062 5.57947L1.84473 7.83142ZM12.0635 5.70642H14.1553L13.1094 3.45447L12.0635 5.70642ZM8 2.89978C7.76915 2.89978 7.58105 3.08787 7.58105 3.31873C7.58105 3.54958 7.76915 3.73767 8 3.73767C8.23085 3.73767 8.41895 3.54958 8.41895 3.31873C8.41895 3.08787 8.23085 2.89978 8 2.89978Z"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="0.1"
                        />
                    </svg>
                </button>
                <button
                    class="c-product__action"
                    aria-label="Pridať do obľúbených"
                    title="Pridať do obľúbených"
                >
                    <svg
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.6609 1.87454C13.3204 1.53387 12.9161 1.26364 12.4711 1.07926C12.0262 0.894886 11.5492 0.799988 11.0676 0.799988C10.5859 0.799988 10.109 0.894886 9.66401 1.07926C9.21903 1.26364 8.81475 1.53387 8.47424 1.87454L7.76758 2.5812L7.06091 1.87454C6.37311 1.18674 5.44026 0.800344 4.46758 0.800344C3.49489 0.800344 2.56204 1.18674 1.87424 1.87454C1.18645 2.56233 0.800049 3.49518 0.800049 4.46787C0.800049 5.44056 1.18645 6.37341 1.87424 7.0612L2.58091 7.76787L7.76758 12.9545L12.9542 7.76787L13.6609 7.0612C14.0016 6.7207 14.2718 6.31641 14.4562 5.87144C14.6406 5.42647 14.7355 4.94953 14.7355 4.46787C14.7355 3.98621 14.6406 3.50927 14.4562 3.0643C14.2718 2.61933 14.0016 2.21504 13.6609 1.87454V1.87454Z"
                            stroke="currentColor"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <div class="c-product__image">
                <img class="c-product__img" src="${imageSrc}" alt="${product.name}" />
            </div>

            <div class="c-product__body">
                <div class="c-product__top">
                    <div class="c-product__main">
                        <div
                            class="c-product__rating"
                            aria-label="Hodnotenie ${product.rating} z 5"
                            title="Hodnotenie ${product.rating} z 5"
                        >
                            ${Array.from(
                                { length: 5 },
                                (_, i) => html`
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 13 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.50052 10.4607L2.47747 13L3.54012 8.19325L0 4.94325L4.66558 4.537L6.50052 0L8.33442 4.537L13 4.94325L9.45988 8.19325L10.5225 13L6.50052 10.4607Z"
                                            fill="${i < product.rating ? "#F5D40E" : "#F1F0F6"}"
                                        />
                                    </svg>
                                `
                            )}
                            <span class="c-product__review-count">(${product.reviewCount})</span>
                        </div>
                        <h3 class="c-product__name l-text-wrap ">${product.name}</h3>
                        <p class="c-product__sku l-text-wrap ">${product.sku}</p>
                    </div>

                    <div class="c-product__middle">
                        <div class="c-product__pricing">
                            <span class="c-product__price-original"
                                >${product.originalPrice} ${product.currency}</span
                            >
                            <span class="c-product__price-sale"
                                >${product.salePrice} ${product.currency}</span
                            >
                            <span class="c-product__price-vat"
                                >${product.priceWithoutVAT} ${product.currency} bez DPH</span
                            >
                        </div>
                        <p class="c-product__stock">${product.stock}</p>
                    </div>
                </div>

                <div class="c-product__cart">
                    <div class="c-product__quantity">
                        <button
                            class="c-product__qty-btn"
                            aria-label="Znížiť počet"
                            @keydown=${onDecrement}
                            @click=${onDecrement}
                        >
                            −
                        </button>
                        <input
                            class="c-product__qty-input"
                            aria-label="Počet kusov produktu"
                            value="1"
                            type="number"
                            min="1"
                            max="100"
                            ${ref((el) => (inputEl = el))}
                            @change=${onInputChange}
                        />
                        <button
                            class="c-product__qty-btn"
                            aria-label="Zvýšiť počet"
                            @click=${onIncrement}
                        >
                            +
                        </button>
                    </div>
                    ${button({
                        text: "Do košíka",
                        onClick: onAddToCart,
                        icon: "cart",
                        iconPosition: "start",
                    })}
                </div>
            </div>
        </article>
    `;
};
