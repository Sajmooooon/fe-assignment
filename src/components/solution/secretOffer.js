import { html } from "lit-html";
import { button } from "../ui/button";

const sourceOptions = [
    "Priamo z vášho webu",
    "Sociálne siete",
    "Od priateľa / známeho",
    "E-mail",
    "Iné",
];

const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    console.log(Object.fromEntries(data));
};

export const secretOffer = () => html`
    <div class="c-secret-offer">
        <div class="c-secret-offer__header">
            <h2 class="c-secret-offer__title">Tajná ponuka produktov Dewalt len pre vás</h2>
            <span class="c-secret-offer__required-note">* povinné polia</span>
        </div>

        <form class="c-secret-offer__form" @submit=${onSubmit} novalidate>
            <div class="c-secret-offer__field">
                <label class="c-secret-offer__label" for="email">
                    E-mail <span class="c-secret-offer__label--required" aria-hidden="true">*</span>
                </label>
                <input
                    class="c-secret-offer__input"
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                />
            </div>

            <div class="c-secret-offer__row">
                <div class="c-secret-offer__field">
                    <label class="c-secret-offer__label" for="name">
                        Meno a priezvisko
                        <span class="c-secret-offer__label--required" aria-hidden="true">*</span>
                    </label>
                    <input
                        class="c-secret-offer__input"
                        type="text"
                        id="name"
                        name="name"
                        required
                        aria-required="true"
                    />
                </div>

                <div class="c-secret-offer__field">
                    <label class="c-secret-offer__label" for="phone">
                        Telefónne číslo (mobil)
                        <span class="c-secret-offer__label--required" aria-hidden="true">*</span>
                    </label>
                    <input
                        class="c-secret-offer__input c-secret-offer__input--phone"
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+421 _ _ _  _ _ _  _ _ _"
                        required
                        aria-required="true"
                    />
                </div>
            </div>

            <div class="c-secret-offer__field">
                <label class="c-secret-offer__label" for="source">
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
            </div>

            <div class="c-secret-offer__footer">
                ${button({
                    text: "Získať tajnú ponuku",
                    icon: "arrow",
                    iconPosition: "end",
                })}
                <p class="c-secret-offer__consent">
                    Odoslaním formuláru súhlasíte so
                    <a class="c-secret-offer__consent-link" href="/spracovanie-osobnych-udajov">
                        spracovaním osobných údajov
                    </a>
                </p>
            </div>
        </form>
    </div>
`;
