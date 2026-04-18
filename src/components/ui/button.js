import { html } from "lit-html";

const icons = {
    arrow: html`
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                stroke="currentColor"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    `,
    cart: html`
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 1H3L3.4 3M3.4 3H19L16 11H5M3.4 3L5 11M5 11L3 14H17M7 17C7 17.5523 6.55228 18 6 18C5.44772 18 5 17.5523 5 17C5 16.4477 5.44772 16 6 16C6.55228 16 7 16.4477 7 17ZM17 17C17 17.5523 16.5523 18 16 18C15.4477 18 15 17.5523 15 17C15 16.4477 15.4477 16 16 16C16.5523 16 17 16.4477 17 17Z"
                stroke="currentColor"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    `,
};

export const button = ({
    text,
    onClick,
    className = "",
    icon = null,
    iconPosition = "end",
}) => html`
    <button type="button" class="c-button ${className}" @click=${onClick}>
        ${icon && iconPosition === "start" ? icons[icon] : html``}
        <span class="sb-text">${text}</span>
        ${icon && iconPosition === "end" ? icons[icon] : html``}
    </button>
`;
