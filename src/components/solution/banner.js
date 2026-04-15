import { html } from "lit-html";
import { button } from "../button";
import bannerImage from "../../assets/images/main-banner.png";
import bannerImageMob from "../../assets/images/main-banner-mobile.png";

const handleBannerClick = (link, linkTarget = "_self") => {
    if (!link) return;
    window.open(link, linkTarget);
};

export const solutionBanner = (banner) => html`
    <div class="c-solution-banner">
        <div
            class="c-solution-banner__image"
            style="
                --banner-desktop: url(${bannerImage});
                --banner-mobile: url(${bannerImageMob});
            "
        ></div>

        <div class="c-solution-banner__overlay"></div>

        <div class="c-solution-banner__content">
            <h1 class="c-solution-banner__content__title">${banner.title}</h1>

            <div class="c-solution-banner__content__description">${banner.description}</div>

            ${button({
                text: banner.ctaText,
                onClick: () => handleBannerClick(banner.link, banner.linkTarget),
                icon: "arrow",
            })}
        </div>
    </div>
`;
