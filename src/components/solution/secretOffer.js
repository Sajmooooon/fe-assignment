import { html, render } from "lit-html";
import { button } from "../ui/button";
import { debounce } from "../../utils/debounce";
import { validateEmail } from "../../api/emailApi";
import { showNotification } from "../ui/notification";

const sourceOptions = [
    "Priamo z vášho webu",
    "Sociálne siete",
    "Od priateľa / známeho",
    "E-mail",
    "Iné",
];

let lastEmail = "";

const setFieldError = (field, message = "") => {
    const fieldEl = field.closest(".c-secret-offer__field");
    if (!fieldEl) return;

    const errorEl = fieldEl.querySelector(".c-secret-offer__error");
    field.classList.toggle("is-error", !!message);

    if (errorEl) errorEl.textContent = message;
};

const validateEmailDebounced = debounce(async (field) => {
    const isLocalValid = validateField(field);
    if (!isLocalValid) return;

    const email = field.value;
    lastEmail = email;

    const res = await validateEmail(email);

    if (email !== lastEmail) return;

    setFieldError(field, res.success ? "" : res.message);
}, 600);

const validateNameDebounced = debounce((field) => validateField(field), 300);
const validatePhoneDebounced = debounce((field) => validateField(field), 300);
const validateSourceDebounced = debounce((field) => validateField(field), 300);

const validateField = (field) => {
    if (field.required && !field.value.trim()) {
        setFieldError(field, "Toto pole je povinné");
        return false;
    }

    if (field.type === "email" && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        setFieldError(field, "Zadajte platný e-mail");
        return false;
    }

    if (field.type === "tel" && field.value && !/^\+?[\d\s]{9,15}$/.test(field.value)) {
        setFieldError(field, "Zadajte platné telefónne číslo");
        return false;
    }

    if (field.type !== "email") setFieldError(field, "");

    return true;
};

const onEmailInput = (e) => validateEmailDebounced(e.target);

const onNameInput = (e) => validateNameDebounced(e.target);
const onPhoneInput = (e) => validatePhoneDebounced(e.target);
const onSourceChange = (e) => validateSourceDebounced(e.target);

const onBlur = (e) => validateField(e.target);

const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const fields = [...form.querySelectorAll("input, select")];
    const isValid = fields.map(validateField).every(Boolean);

    if (!isValid) return;

    const dialog = form.closest("dialog");
    dialog.close();

    showNotification({
        text: "Formulár bol úspešne odoslaný. Čoskoro vás kontaktujeme.",
        status: "success",
    });
};

export const secretOffer = () => html`
    <div class="c-secret-offer">
        <div class="c-secret-offer__header">
            <h2 class="c-secret-offer__title">Tajná ponuka produktov Dewalt len pre vás</h2>
            <span class="c-secret-offer__required-note">* povinné polia</span>
        </div>

        <form class="c-secret-offer__form" @submit=${onSubmit} novalidate>
            <div class="c-secret-offer__field">
                <label class="c-secret-offer__label l-text-wrap" for="email">
                    E-mail <span class="c-secret-offer__label--required" aria-hidden="true">*</span>
                </label>
                <input
                    @input=${onEmailInput}
                    @blur=${onBlur}
                    class="c-secret-offer__input"
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                />
                <span class="c-secret-offer__error" aria-live="polite"></span>
            </div>

            <div class="c-secret-offer__row">
                <div class="c-secret-offer__field">
                    <label class="c-secret-offer__label l-text-wrap" for="name">
                        Meno a priezvisko
                        <span class="c-secret-offer__label--required" aria-hidden="true">*</span>
                    </label>
                    <input
                        @input=${onNameInput}
                        @blur=${onBlur}
                        class="c-secret-offer__input"
                        type="text"
                        id="name"
                        name="name"
                        required
                        aria-required="true"
                    />
                    <span class="c-secret-offer__error" aria-live="polite"></span>
                </div>

                <div class="c-secret-offer__field">
                    <label class="c-secret-offer__label l-text-wrap" for="phone">
                        Telefónne číslo (mobil)
                        <span class="c-secret-offer__label--required" aria-hidden="true">*</span>
                    </label>
                    <input
                        @input=${onPhoneInput}
                        @blur=${onBlur}
                        class="c-secret-offer__input c-secret-offer__input--phone"
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+421 _ _ _  _ _ _  _ _ _"
                        required
                        aria-required="true"
                    />
                    <span class="c-secret-offer__error" aria-live="polite"></span>
                </div>
            </div>

            <div class="c-secret-offer__field">
                <label class="c-secret-offer__label l-text-wrap" for="source">
                    Odkiaľ ste sa o tejto ponuke dozvedeli?
                    <span class="c-secret-offer__label--required" aria-hidden="true">*</span>
                </label>
                <div class="c-secret-offer__select-wrap">
                    <select
                        class="c-secret-offer__select"
                        id="source"
                        name="source"
                        required
                        aria-required="true"
                        @change=${onSourceChange}
                        @blur=${onBlur}
                    >
                        ${sourceOptions.map((opt) => html`<option value="${opt}">${opt}</option>`)}
                    </select>
                    <svg
                        class="c-secret-offer__select-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
                <span class="c-secret-offer__error" aria-live="polite"></span>
            </div>

            <div class="c-secret-offer__footer">
                ${button({
                    text: "Získať tajnú ponuku",
                    icon: "arrow",
                    iconPosition: "end",
                    type: "submit",
                })}
                <p class="c-secret-offer__consent l-text-wrap">
                    Odoslaním formuláru súhlasíte so
                    <a
                        class="c-secret-offer__consent-link l-text-wrap"
                        href="/spracovanie-osobnych-udajov"
                    >
                        spracovaním osobných údajov
                    </a>
                </p>
            </div>
        </form>
    </div>
`;
