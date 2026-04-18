import { html, render } from "lit-html";

const icons = {
    success: html`
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 1.66669C5.3975 1.66669 1.66667 5.39752 1.66667 10C1.66667 14.6025 5.3975 18.3334 10 18.3334C14.6025 18.3334 18.3333 14.6025 18.3333 10C18.3333 5.39752 14.6025 1.66669 10 1.66669Z"
                stroke="currentColor"
                stroke-width="1.67"
            />
            <path
                d="M6.66667 10.4167L9.16667 12.9167L13.3333 8.33337"
                stroke="currentColor"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    `,

    error: html`
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 1.66669C5.3975 1.66669 1.66667 5.39752 1.66667 10C1.66667 14.6025 5.3975 18.3334 10 18.3334C14.6025 18.3334 18.3333 14.6025 18.3333 10C18.3333 5.39752 14.6025 1.66669 10 1.66669Z"
                stroke="currentColor"
                stroke-width="1.67"
            />
            <path
                d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5"
                stroke="currentColor"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    `,
};

export const notification = ({ text, status = "success" }) => html`
    <div class="c-notification c-notification--${status}" role="alert" aria-live="polite">
        ${icons[status] ? icons[status] : html``}
        <span>${text}</span>
    </div>
`;

export const showNotification = ({ text, status = "success", duration = 3000 }) => {
    let container = document.querySelector(".c-notification-container");

    if (!container) {
        container = document.createElement("div");
        container.className = "c-notification-container";
        document.body.appendChild(container);
    }

    const wrapper = document.createElement("div");
    container.appendChild(wrapper);

    render(notification({ text, status }), wrapper);

    requestAnimationFrame(() => {
        wrapper.querySelector(".c-notification")?.classList.add("c-notification--visible");
    });

    setTimeout(() => {
        wrapper.querySelector(".c-notification")?.classList.remove("c-notification--visible");
        setTimeout(() => wrapper.remove(), 300);
    }, duration);
};
