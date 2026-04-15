import { html } from "lit-html";
import { button } from "../button";
import ctaImage from "../../assets/images/tanjna-ponuka.png";
// CTA button click handler
const handleCtaClick = () => {
    console.log("CTA button clicked");
    // TODO: Implement email form/modal
};

// Solution CTA section
export const solutionCta = (ctaBanner) => html`
    <div class="c-solution-cta">
        <div class="c-solution-cta__image" style="--cta-desktop: url(${ctaImage}); "></div>

        <div class="c-solution-cta__overlay"></div>

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
`;
