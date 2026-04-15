import { html } from "lit-html";
import { button } from "../button";
import bannerImage from "../../assets/images/main-banner.png";
import bannerImageMob from "../../assets/images/main-banner-mobile.png";

// Banner button click handler
const handleBannerClick = (link, linkTarget = "_self") => {
    if (!link) return;
    window.open(link, linkTarget);
};

// Solution main banner
export const solutionBanner = (banner) => html`
    <div class="c-solution-banner">
        <div
            class="c-solution-banner__image"
            style="${banner.imageUrl ? `background-image: url('${banner.imageUrl}')` : ""}"
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
