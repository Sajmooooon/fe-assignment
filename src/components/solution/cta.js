import { html, render } from "lit-html";
import { button } from "../ui/button";
import ctaImage from "../../assets/images/tanjna-ponuka.png";
import { dialog, closeDialog } from "../ui/dialog";

let dialogEl;
// CTA button click handler

const handleCtaClick = () => {
    if (!dialogEl) {
        const wrapper = document.createElement("div");
        document.body.appendChild(wrapper);

        render(
            dialog({
                content: "test",
                label: "Tajná ponuka",
                onClose: () => closeDialog(dialogEl),
            }),
            wrapper
        );

        dialogEl = wrapper.querySelector("dialog");
    }

    dialogEl.showModal();
};

// Solution CTA section
export const solutionCta = (ctaBanner) => html`
    <div class="c-solution-cta">
        <div class="c-solution-cta__image" style="--cta-desktop: url(${ctaImage}); "></div>

        <div class="c-solution-cta__overlay"></div>

        <div class="c-solution-cta__wrapper">
            <div class="c-solution-cta__content">
                <h2 class="c-solution-cta__content__title">${ctaBanner.title}</h2>

                <div class="c-solution-cta__content__description">${ctaBanner.description}</div>

                ${button({
                    text: ctaBanner.ctaText,
                    onClick: () => handleCtaClick(),
                    icon: "arrow",
                })}
            </div>
        </div>
    </div>
`;
