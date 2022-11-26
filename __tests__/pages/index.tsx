import { render, screen } from 'test/test-utils';
import Home from '~/pages/index';
import { sampleChannelsSearchData } from '~/data/api';
import type { Channel } from '~/models/app';

const channelSearchQueryData = sampleChannelsSearchData;

const channels: Channel[] = [];

channelSearchQueryData.items.forEach(item => {
  const { channelId, title, description, thumbnails } = item.snippet;

  channels.push({
    channelId: channelId,
    title: title,
    about: description,
    thumbnail: thumbnails.default.url || '/images/user-circle.png',
  });
});

describe('Home', () => {
  it('renders the h1', () => {
    render(<Home channels={channels} />);

    const heading = screen.getByRole('heading', {
      name: /Welcome to Stitch!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

it('renders unchanged', () => {
  const { container } = render(<Home channels={channels} />);
  expect(container).toMatchInlineSnapshot(`
    .emotion-0 {
      display: grid;
      grid-template-areas: "Navbar Navbar" "Sidebar Main";
      grid-template-rows: 3rem 1fr;
      grid-template-columns: 3rem 1fr;
      min-height: 100%;
    }

    @media screen and (min-width: 30em) {
      .emotion-0 {
        grid-template-columns: 3rem 1fr;
      }
    }

    @media screen and (min-width: 48em) {
      .emotion-0 {
        grid-template-columns: 15rem 1fr;
      }
    }

    .emotion-1 {
      grid-area: Navbar;
      position: -webkit-sticky;
      position: sticky;
      top: 0px;
      box-shadow: var(--chakra-shadows-base);
      background: var(--chakra-colors-gray-50);
      padding: var(--chakra-space-2-5);
      z-index: 4;
    }

    .emotion-2 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      justify-content: space-between;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      gap: var(--chakra-space-3);
    }

    .emotion-2>*:not(style)~*:not(style) {
      margin-top: 0px;
      -webkit-margin-end: 0px;
      margin-inline-end: 0px;
      margin-bottom: 0px;
      -webkit-margin-start: 0.5rem;
      margin-inline-start: 0.5rem;
    }

    .emotion-3 {
      border: 0;
      clip: rect(0, 0, 0, 0);
      height: 1px;
      width: 1px;
      margin: -1px;
      padding: 0px;
      overflow: hidden;
      white-space: nowrap;
      position: absolute;
    }

    .emotion-4 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      gap: var(--chakra-space-4);
    }

    .emotion-4>*:not(style)~*:not(style) {
      margin-top: 0px;
      -webkit-margin-end: 0px;
      margin-inline-end: 0px;
      margin-bottom: 0px;
      -webkit-margin-start: 0.5rem;
      margin-inline-start: 0.5rem;
    }

    .emotion-5 {
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      appearance: none;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      position: relative;
      white-space: nowrap;
      vertical-align: baseline;
      outline: 2px solid transparent;
      outline-offset: 2px;
      line-height: var(--chakra-lineHeights-normal);
      border-radius: var(--chakra-radii-md);
      font-weight: var(--chakra-fontWeights-semibold);
      transition-property: var(--chakra-transition-property-common);
      transition-duration: var(--chakra-transition-duration-normal);
      height: auto;
      min-width: var(--chakra-sizes-10);
      font-size: var(--chakra-fontSizes-md);
      -webkit-padding-start: var(--chakra-space-4);
      padding-inline-start: var(--chakra-space-4);
      -webkit-padding-end: var(--chakra-space-4);
      padding-inline-end: var(--chakra-space-4);
      padding: 0px;
      color: var(--chakra-colors-gray-600);
    }

    .emotion-5:focus-visible,
    .emotion-5[data-focus-visible] {
      box-shadow: var(--chakra-shadows-outline);
    }

    .emotion-5:disabled,
    .emotion-5[disabled],
    .emotion-5[aria-disabled=true],
    .emotion-5[data-disabled] {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: var(--chakra-shadows-none);
    }

    .emotion-5:hover,
    .emotion-5[data-hover] {
      -webkit-text-decoration: underline;
      text-decoration: underline;
    }

    .emotion-5:hover:disabled,
    .emotion-5[data-hover]:disabled,
    .emotion-5:hover[disabled],
    .emotion-5[data-hover][disabled],
    .emotion-5:hover[aria-disabled=true],
    .emotion-5[data-hover][aria-disabled=true],
    .emotion-5:hover[data-disabled],
    .emotion-5[data-hover][data-disabled] {
      background: initial;
      -webkit-text-decoration: none;
      text-decoration: none;
    }

    .emotion-5:active,
    .emotion-5[data-active] {
      color: var(--chakra-colors-gray-700);
    }

    .emotion-7 {
      width: 24px;
      height: 24px;
      display: inline-block;
      line-height: 1em;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      color: var(--chakra-colors-black);
      vertical-align: middle;
    }

    .emotion-8 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      padding: 3px;
    }

    .emotion-10 {
      grid-area: Sidebar;
      background: var(--chakra-colors-gray-50);
      padding-top: var(--chakra-space-4);
      padding-bottom: var(--chakra-space-4);
      z-index: 3;
    }

    .emotion-11 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: start;
      -webkit-box-align: start;
      -ms-flex-align: start;
      align-items: start;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
    }

    .emotion-11>*:not(style)~*:not(style) {
      margin-top: 0.5rem;
      -webkit-margin-end: 0px;
      margin-inline-end: 0px;
      margin-bottom: 0px;
      -webkit-margin-start: 0px;
      margin-inline-start: 0px;
    }

    .emotion-12 {
      font-family: var(--chakra-fonts-heading);
      font-weight: var(--chakra-fontWeights-bold);
      font-size: var(--chakra-fontSizes-xl);
      line-height: 1.33;
      margin-block-end: var(--chakra-space-3);
      display: none;
      -webkit-padding-start: var(--chakra-space-2-5);
      padding-inline-start: var(--chakra-space-2-5);
      -webkit-padding-end: var(--chakra-space-2-5);
      padding-inline-end: var(--chakra-space-2-5);
    }

    @media screen and (min-width: 30em) {
      .emotion-12 {
        display: none;
      }
    }

    @media screen and (min-width: 48em) {
      .emotion-12 {
        line-height: 1.2;
        display: revert;
      }
    }

    .emotion-13 {
      font-family: var(--chakra-fonts-heading);
      font-weight: var(--chakra-fontWeights-bold);
      font-size: var(--chakra-fontSizes-sm);
      line-height: 1.33;
      color: var(--chakra-colors-gray-500);
      display: none;
      -webkit-padding-start: var(--chakra-space-2-5);
      padding-inline-start: var(--chakra-space-2-5);
      -webkit-padding-end: var(--chakra-space-2-5);
      padding-inline-end: var(--chakra-space-2-5);
    }

    @media screen and (min-width: 30em) {
      .emotion-13 {
        display: none;
      }
    }

    @media screen and (min-width: 48em) {
      .emotion-13 {
        line-height: 1.2;
        display: revert;
      }
    }

    .emotion-14 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
    }

    .emotion-15 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: flex-start;
      -webkit-box-align: flex-start;
      -ms-flex-align: flex-start;
      align-items: flex-start;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      width: var(--chakra-sizes-full);
      height: var(--chakra-sizes-full);
      padding: 0px;
    }

    .emotion-15>*:not(style)~*:not(style) {
      margin-top: var(--chakra-space-1-5);
      -webkit-margin-end: 0px;
      margin-inline-end: 0px;
      margin-bottom: 0px;
      -webkit-margin-start: 0px;
      margin-inline-start: 0px;
    }

    .emotion-16 {
      transition-property: var(--chakra-transition-property-common);
      transition-duration: var(--chakra-transition-duration-fast);
      transition-timing-function: var(--chakra-transition-easing-ease-out);
      cursor: pointer;
      -webkit-text-decoration: none;
      text-decoration: none;
      outline: 2px solid transparent;
      outline-offset: 2px;
      color: inherit;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: var(--chakra-line-clamp);
      --chakra-line-clamp: 1;
      width: var(--chakra-sizes-full);
      -webkit-padding-start: var(--chakra-space-2);
      padding-inline-start: var(--chakra-space-2);
      -webkit-padding-end: var(--chakra-space-2);
      padding-inline-end: var(--chakra-space-2);
    }

    .emotion-16:hover,
    .emotion-16[data-hover] {
      background: var(--chakra-colors-gray-100);
    }

    .emotion-16:focus-visible,
    .emotion-16[data-focus-visible] {
      box-shadow: var(--chakra-shadows-outline);
    }

    @media screen and (min-width: 30em) {
      .emotion-16 {
        -webkit-padding-start: var(--chakra-space-2-5);
        padding-inline-start: var(--chakra-space-2-5);
        -webkit-padding-end: var(--chakra-space-2-5);
        padding-inline-end: var(--chakra-space-2-5);
      }
    }

    .emotion-17 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      gap: var(--chakra-space-2);
      padding-block: var(--chakra-space-2);
    }

    .emotion-18 {
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    .emotion-19 {
      font-family: var(--chakra-fonts-heading);
      font-weight: var(--chakra-fontWeights-bold);
      font-size: 1xl;
      line-height: 1.33;
      display: none;
    }

    @media screen and (min-width: 30em) {
      .emotion-19 {
        display: none;
      }
    }

    @media screen and (min-width: 48em) {
      .emotion-19 {
        line-height: 1.2;
        display: revert;
      }
    }

    .emotion-48 {
      grid-area: Main;
      z-index: 1;
      background: var(--chakra-colors-white);
      height: var(--chakra-sizes-full);
      width: var(--chakra-sizes-full);
      padding-block-end: var(--chakra-space-16);
    }

    .emotion-49 {
      width: 100%;
      -webkit-margin-start: auto;
      margin-inline-start: auto;
      -webkit-margin-end: auto;
      margin-inline-end: auto;
      max-width: 2000px;
      -webkit-padding-start: var(--chakra-space-4);
      padding-inline-start: var(--chakra-space-4);
      -webkit-padding-end: var(--chakra-space-4);
      padding-inline-end: var(--chakra-space-4);
      padding: 0px;
    }

    .emotion-50 {
      -webkit-padding-start: var(--chakra-space-2);
      padding-inline-start: var(--chakra-space-2);
      -webkit-padding-end: var(--chakra-space-2);
      padding-inline-end: var(--chakra-space-2);
      padding-top: var(--chakra-space-4);
      padding-bottom: var(--chakra-space-4);
    }

    @media screen and (min-width: 30em) {
      .emotion-50 {
        -webkit-padding-start: var(--chakra-space-4);
        padding-inline-start: var(--chakra-space-4);
        -webkit-padding-end: var(--chakra-space-4);
        padding-inline-end: var(--chakra-space-4);
        padding-top: var(--chakra-space-6);
        padding-bottom: var(--chakra-space-6);
      }
    }

    @media screen and (min-width: 48em) {
      .emotion-50 {
        -webkit-padding-start: var(--chakra-space-6);
        padding-inline-start: var(--chakra-space-6);
        -webkit-padding-end: var(--chakra-space-6);
        padding-inline-end: var(--chakra-space-6);
        padding-top: var(--chakra-space-10);
        padding-bottom: var(--chakra-space-10);
      }
    }

    @media screen and (min-width: 62em) {
      .emotion-50 {
        -webkit-padding-start: var(--chakra-space-10);
        padding-inline-start: var(--chakra-space-10);
        -webkit-padding-end: var(--chakra-space-10);
        padding-inline-end: var(--chakra-space-10);
      }
    }

    .emotion-51 {
      font-family: var(--chakra-fonts-heading);
      font-weight: var(--chakra-fontWeights-bold);
      font-size: var(--chakra-fontSizes-3xl);
      line-height: 1.33;
    }

    @media screen and (min-width: 48em) {
      .emotion-51 {
        font-size: var(--chakra-fontSizes-4xl);
        line-height: 1.2;
      }
    }

    <div>
      <div
        class="emotion-0"
      >
        <div
          class="emotion-1"
        >
          <header
            class="chakra-stack emotion-2"
          >
            <a
              href="/"
            >
              <svg
                fill="none"
                height="30"
                viewBox="0 0 94 36"
                width="76"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="purple"
                  d="M11.099 35.296C7.81833 35.296 5.19133 34.6793 3.218 33.446C1.24467 32.188 0.258 30.2763 0.258 27.711C0.258 26.3543 0.492333 25.3183 0.961 24.603C1.42967 23.8877 2.12033 23.53 3.033 23.53C3.699 23.53 4.24167 23.7027 4.661 24.048C5.08033 24.3933 5.29 24.8373 5.29 25.38C5.29 25.8733 5.253 26.305 5.179 26.675C5.179 26.7737 5.15433 26.9463 5.105 27.193C5.08033 27.4397 5.068 27.6987 5.068 27.97C5.068 29.08 5.623 29.9063 6.733 30.449C7.86767 30.9917 9.44633 31.263 11.469 31.263C13.5657 31.263 15.206 30.893 16.39 30.153C17.574 29.3883 18.166 28.3277 18.166 26.971C18.166 26.1323 17.8947 25.417 17.352 24.825C16.8093 24.2083 16.131 23.7027 15.317 23.308C14.503 22.8887 13.356 22.383 11.876 21.791C9.97667 21.051 8.42267 20.348 7.214 19.682C6.03 19.016 5.00633 18.1157 4.143 16.981C3.30433 15.8217 2.885 14.391 2.885 12.689C2.885 10.913 3.35367 9.33433 4.291 7.953C5.253 6.57167 6.622 5.49866 8.398 4.734C10.1987 3.96933 12.3077 3.587 14.725 3.587C16.5257 3.587 18.1783 3.85833 19.683 4.401C21.1877 4.919 22.384 5.72067 23.272 6.806C24.1847 7.89133 24.641 9.22333 24.641 10.802C24.641 12.356 24.4067 13.5277 23.938 14.317C23.4693 15.1063 22.7787 15.501 21.866 15.501C21.2247 15.501 20.682 15.3037 20.238 14.909C19.8187 14.5143 19.609 14.0457 19.609 13.503C19.609 13.0343 19.646 12.6027 19.72 12.208C19.794 11.468 19.831 10.9993 19.831 10.802C19.831 9.766 19.3253 8.97667 18.314 8.434C17.3027 7.89133 16.0447 7.62 14.54 7.62C12.4187 7.62 10.7907 8.01467 9.656 8.804C8.546 9.56867 7.991 10.654 7.991 12.06C7.991 12.9973 8.27467 13.799 8.842 14.465C9.434 15.131 10.1617 15.686 11.025 16.13C11.8883 16.574 13.097 17.1043 14.651 17.721C16.5257 18.4857 18.0303 19.1763 19.165 19.793C20.2997 20.4097 21.2617 21.2483 22.051 22.309C22.865 23.3697 23.272 24.677 23.272 26.231C23.272 29.1417 22.162 31.3863 19.942 32.965C17.7467 34.519 14.799 35.296 11.099 35.296ZM42.571 26.749C42.8916 26.749 43.1383 26.897 43.311 27.193C43.5083 27.489 43.607 27.896 43.607 28.414C43.607 29.4007 43.3726 30.1653 42.904 30.708C41.8433 32.0153 40.684 33.0883 39.426 33.927C38.168 34.7657 36.725 35.185 35.097 35.185C30.065 35.185 27.549 31.6453 27.549 24.566C27.549 23.4807 27.586 22.383 27.66 21.273H26.217C25.477 21.273 24.9713 21.1373 24.7 20.866C24.4533 20.5947 24.33 20.163 24.33 19.571C24.33 18.1897 24.885 17.499 25.995 17.499H28.104C28.5233 14.7857 29.1646 12.3067 30.028 10.062C30.8913 7.81733 31.9273 6.029 33.136 4.697C34.3693 3.365 35.689 2.699 37.095 2.699C38.131 2.699 38.945 3.15533 39.537 4.068C40.129 4.98067 40.425 6.12767 40.425 7.509C40.425 11.3323 38.8216 14.6623 35.615 17.499H39.759C40.1536 17.499 40.4373 17.5853 40.61 17.758C40.7826 17.9307 40.869 18.2513 40.869 18.72C40.869 20.422 39.4753 21.273 36.688 21.273H32.174C32.1246 22.5063 32.1 23.4683 32.1 24.159C32.1 26.7243 32.396 28.525 32.988 29.561C33.6046 30.597 34.5666 31.115 35.874 31.115C36.9346 31.115 37.872 30.7943 38.686 30.153C39.5 29.5117 40.462 28.5497 41.572 27.267C41.868 26.9217 42.201 26.749 42.571 26.749ZM36.096 6.251C35.726 6.251 35.3066 6.71967 34.838 7.657C34.394 8.56967 33.9623 9.85233 33.543 11.505C33.1483 13.133 32.8153 14.946 32.544 16.944C33.9993 15.686 35.0846 14.28 35.8 12.726C36.54 11.1473 36.91 9.71667 36.91 8.434C36.91 6.97867 36.6386 6.251 36.096 6.251ZM45.4414 15.316C44.4054 15.316 43.6284 15.0817 43.1104 14.613C42.5924 14.1197 42.3334 13.4413 42.3334 12.578C42.3334 11.7147 42.6664 10.9993 43.3324 10.432C44.023 9.84 44.874 9.544 45.8854 9.544C46.798 9.544 47.538 9.766 48.1054 10.21C48.6727 10.654 48.9564 11.283 48.9564 12.097C48.9564 13.0837 48.6357 13.873 47.9944 14.465C47.353 15.0323 46.502 15.316 45.4414 15.316ZM45.1454 35.185C43.542 35.185 42.3704 34.6177 41.6304 33.483C40.915 32.3483 40.5574 30.8437 40.5574 28.969C40.5574 27.859 40.693 26.4407 40.9644 24.714C41.2604 22.9627 41.6304 21.3347 42.0744 19.83C42.2964 19.0407 42.5924 18.498 42.9624 18.202C43.3324 17.906 43.9244 17.758 44.7384 17.758C45.9964 17.758 46.6254 18.1773 46.6254 19.016C46.6254 19.6327 46.391 21.0633 45.9224 23.308C45.3304 26.0213 45.0344 27.859 45.0344 28.821C45.0344 29.561 45.133 30.1283 45.3304 30.523C45.5277 30.9177 45.8607 31.115 46.3294 31.115C46.7734 31.115 47.3284 30.8067 47.9944 30.19C48.6604 29.5733 49.5484 28.599 50.6584 27.267C50.9544 26.9217 51.2874 26.749 51.6574 26.749C51.978 26.749 52.2247 26.897 52.3974 27.193C52.5947 27.489 52.6934 27.896 52.6934 28.414C52.6934 29.4007 52.459 30.1653 51.9904 30.708C49.5484 33.6927 47.2667 35.185 45.1454 35.185ZM66.2018 26.749C66.5225 26.749 66.7692 26.897 66.9418 27.193C67.1392 27.489 67.2378 27.896 67.2378 28.414C67.2378 29.4007 67.0035 30.1653 66.5348 30.708C65.4742 32.0153 64.3148 33.0883 63.0568 33.927C61.7988 34.7657 60.3558 35.185 58.7278 35.185C53.6958 35.185 51.1798 31.6453 51.1798 24.566C51.1798 23.4807 51.2168 22.383 51.2908 21.273H49.8478C49.1078 21.273 48.6022 21.1373 48.3308 20.866C48.0842 20.5947 47.9608 20.163 47.9608 19.571C47.9608 18.1897 48.5158 17.499 49.6258 17.499H51.7348C52.1542 14.7857 52.7955 12.3067 53.6588 10.062C54.5222 7.81733 55.5582 6.029 56.7668 4.697C58.0002 3.365 59.3198 2.699 60.7258 2.699C61.7618 2.699 62.5758 3.15533 63.1678 4.068C63.7598 4.98067 64.0558 6.12767 64.0558 7.509C64.0558 11.3323 62.4525 14.6623 59.2458 17.499H63.3898C63.7845 17.499 64.0682 17.5853 64.2408 17.758C64.4135 17.9307 64.4998 18.2513 64.4998 18.72C64.4998 20.422 63.1062 21.273 60.3188 21.273H55.8048C55.7555 22.5063 55.7308 23.4683 55.7308 24.159C55.7308 26.7243 56.0268 28.525 56.6188 29.561C57.2355 30.597 58.1975 31.115 59.5048 31.115C60.5655 31.115 61.5028 30.7943 62.3168 30.153C63.1308 29.5117 64.0928 28.5497 65.2028 27.267C65.4988 26.9217 65.8318 26.749 66.2018 26.749ZM59.7268 6.251C59.3568 6.251 58.9375 6.71967 58.4688 7.657C58.0248 8.56967 57.5932 9.85233 57.1738 11.505C56.7792 13.133 56.4462 14.946 56.1748 16.944C57.6302 15.686 58.7155 14.28 59.4308 12.726C60.1708 11.1473 60.5408 9.71667 60.5408 8.434C60.5408 6.97867 60.2695 6.251 59.7268 6.251ZM71.2922 35.185C68.8749 35.185 66.9879 34.5067 65.6312 33.15C64.2992 31.7687 63.6332 29.9557 63.6332 27.711C63.6332 25.713 64.0279 23.9617 64.8172 22.457C65.6066 20.9523 66.6302 19.793 67.8882 18.979C69.1462 18.165 70.4659 17.758 71.8472 17.758C73.2039 17.758 74.2522 18.165 74.9922 18.979C75.7569 19.7683 76.1392 20.792 76.1392 22.05C76.1392 23.086 75.9049 23.9617 75.4362 24.677C74.9922 25.3923 74.4002 25.75 73.6602 25.75C73.1916 25.75 72.8092 25.639 72.5132 25.417C72.2419 25.195 72.1062 24.8867 72.1062 24.492C72.1062 24.3193 72.1309 24.122 72.1802 23.9C72.2296 23.678 72.2666 23.5177 72.2912 23.419C72.4146 23.049 72.4762 22.7037 72.4762 22.383C72.4762 22.0623 72.3899 21.8157 72.2172 21.643C72.0692 21.4703 71.8472 21.384 71.5512 21.384C70.9839 21.384 70.4536 21.643 69.9602 22.161C69.4669 22.6543 69.0722 23.3327 68.7762 24.196C68.4802 25.0593 68.3322 26.009 68.3322 27.045C68.3322 29.9063 69.5779 31.337 72.0692 31.337C73.0806 31.337 74.1659 31.004 75.3252 30.338C76.5092 29.6473 77.6686 28.6237 78.8032 27.267C79.0992 26.9217 79.4322 26.749 79.8022 26.749C80.1229 26.749 80.3696 26.897 80.5422 27.193C80.7396 27.489 80.8382 27.896 80.8382 28.414C80.8382 29.3513 80.6039 30.116 80.1352 30.708C78.9759 32.1387 77.5822 33.2487 75.9542 34.038C74.3509 34.8027 72.7969 35.185 71.2922 35.185ZM90.9453 17.758C91.7346 17.758 92.3266 17.9677 92.7213 18.387C93.1406 18.7817 93.3503 19.3737 93.3503 20.163C93.3503 20.8043 93.2146 22.013 92.9433 23.789C92.6966 25.2937 92.4993 26.7243 92.3513 28.081C92.2033 29.413 92.1293 30.9053 92.1293 32.558C92.1293 33.4953 91.932 34.1737 91.5373 34.593C91.1673 34.9877 90.5506 35.185 89.6873 35.185C88.8733 35.185 88.2813 34.9753 87.9113 34.556C87.5413 34.1367 87.3563 33.5077 87.3563 32.669C87.3563 31.6823 87.529 30.0543 87.8743 27.785C88.1703 25.8117 88.3183 24.5537 88.3183 24.011C88.3183 23.6163 88.1826 23.419 87.9113 23.419C87.5906 23.419 87.1343 23.8383 86.5423 24.677C85.9503 25.491 85.3583 26.5763 84.7663 27.933C84.1743 29.2897 83.6933 30.7203 83.3233 32.225C83.052 33.3843 82.7313 34.1737 82.3613 34.593C82.016 34.9877 81.461 35.185 80.6963 35.185C79.9316 35.185 79.3643 34.9137 78.9943 34.371C78.649 33.8037 78.4146 32.9403 78.2913 31.781C78.168 30.6217 78.1063 28.9197 78.1063 26.675C78.1063 22.8763 78.4886 18.9173 79.2533 14.798C80.0426 10.6787 81.1896 7.22533 82.6943 4.438C84.2236 1.626 86.049 0.219998 88.1703 0.219998C89.305 0.219998 90.2176 0.713331 90.9083 1.7C91.6236 2.662 91.9813 3.92 91.9813 5.474C91.9813 7.96533 91.2536 10.5553 89.7983 13.244C88.343 15.908 85.975 19.0283 82.6943 22.605C82.6203 23.8877 82.5833 25.2073 82.5833 26.564C83.3973 24.4673 84.2976 22.7653 85.2843 21.458C86.2956 20.126 87.2823 19.1763 88.2443 18.609C89.231 18.0417 90.1313 17.758 90.9453 17.758ZM87.3933 3.883C86.9493 3.883 86.456 4.52433 85.9133 5.807C85.3706 7.065 84.8403 8.77933 84.3223 10.95C83.829 13.096 83.422 15.4393 83.1013 17.98C84.6306 16.1793 85.8886 14.2183 86.8753 12.097C87.8866 9.97567 88.3923 8.05167 88.3923 6.325C88.3923 5.53567 88.306 4.93133 88.1333 4.512C87.9606 4.09267 87.714 3.883 87.3933 3.883Z"
                />
              </svg>
              <span
                class="emotion-3"
              >
                Switch - Home navigation
              </span>
            </a>
            <div
              class="chakra-stack emotion-4"
            >
              <button
                class="chakra-button emotion-5"
                type="button"
              >
                <span
                  class="emotion-3"
                >
                  Dark
                </span>
                <svg
                  class="chakra-icon emotion-7"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 15.8442C20.6866 16.4382 19.2286 16.7688 17.6935 16.7688C11.9153 16.7688 7.23116 12.0847 7.23116 6.30654C7.23116 4.77135 7.5618 3.3134 8.15577 2C4.52576 3.64163 2 7.2947 2 11.5377C2 17.3159 6.68414 22 12.4623 22C16.7053 22 20.3584 19.4742 22 15.8442Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </svg>
              </button>
              <div
                class="emotion-8"
              >
                <svg
                  class="chakra-icon emotion-7"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </svg>
              </div>
            </div>
          </header>
        </div>
        <div
          class="emotion-10"
        >
          <div
            class="chakra-stack emotion-11"
          >
            <h2
              class="chakra-heading emotion-12"
            >
              For You
            </h2>
            <h3
              class="chakra-heading uppercase emotion-13"
            >
              Followed channels
            </h3>
            <nav
              class="emotion-14"
            >
              <div
                class="chakra-stack emotion-15"
              >
                <a
                  class="chakra-link emotion-16"
                  href="/video-juegos-de-jos"
                >
                  <div
                    class="emotion-17"
                  >
                    <div
                      class="emotion-18"
                    >
                      <img
                        alt="avatar for video juegos  de jos 🤠"
                        class="circular"
                        data-nimg="1"
                        decoding="async"
                        height="30"
                        loading="lazy"
                        src="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fp2tnh0ZkOkxO68WCfbSczqMjILrKSd6bJe7tAl6LPM1b9u5ZT6dYOGQb_YIV-k6IOXivDSlX%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75"
                        srcset="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fp2tnh0ZkOkxO68WCfbSczqMjILrKSd6bJe7tAl6LPM1b9u5ZT6dYOGQb_YIV-k6IOXivDSlX%3Ds88-c-k-c0xffffffff-no-rj-mo&w=32&q=75 1x, /_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fp2tnh0ZkOkxO68WCfbSczqMjILrKSd6bJe7tAl6LPM1b9u5ZT6dYOGQb_YIV-k6IOXivDSlX%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75 2x"
                        style="color: transparent;"
                        width="30"
                      />
                    </div>
                    <p
                      class="chakra-heading emotion-19"
                    >
                      video juegos  de jos 🤠
                    </p>
                  </div>
                </a>
                <a
                  class="chakra-link emotion-16"
                  href="/mr-video-juegos"
                >
                  <div
                    class="emotion-17"
                  >
                    <div
                      class="emotion-18"
                    >
                      <img
                        alt="avatar for mr video juegos"
                        class="circular"
                        data-nimg="1"
                        decoding="async"
                        height="30"
                        loading="lazy"
                        src="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2FD0Jgg2MBfY2aIXEYHU3U8eRdrQ2Lbr7PWjVMe9GfdRCizLld1lCmqr-JxRhUOv_f4bxldIxxbQ%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75"
                        srcset="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2FD0Jgg2MBfY2aIXEYHU3U8eRdrQ2Lbr7PWjVMe9GfdRCizLld1lCmqr-JxRhUOv_f4bxldIxxbQ%3Ds88-c-k-c0xffffffff-no-rj-mo&w=32&q=75 1x, /_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2FD0Jgg2MBfY2aIXEYHU3U8eRdrQ2Lbr7PWjVMe9GfdRCizLld1lCmqr-JxRhUOv_f4bxldIxxbQ%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75 2x"
                        style="color: transparent;"
                        width="30"
                      />
                    </div>
                    <p
                      class="chakra-heading emotion-19"
                    >
                      mr video juegos
                    </p>
                  </div>
                </a>
                <a
                  class="chakra-link emotion-16"
                  href="/video-juegos"
                >
                  <div
                    class="emotion-17"
                  >
                    <div
                      class="emotion-18"
                    >
                      <img
                        alt="avatar for Video Juegos "
                        class="circular"
                        data-nimg="1"
                        decoding="async"
                        height="30"
                        loading="lazy"
                        src="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAMLnZu9tL4dMo4PYjiLaQrOg0VaGn-KGFjxCe4QjDMt4aCMGagp5QxfymRLvBQF1QoVd%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75"
                        srcset="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAMLnZu9tL4dMo4PYjiLaQrOg0VaGn-KGFjxCe4QjDMt4aCMGagp5QxfymRLvBQF1QoVd%3Ds88-c-k-c0xffffffff-no-rj-mo&w=32&q=75 1x, /_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAMLnZu9tL4dMo4PYjiLaQrOg0VaGn-KGFjxCe4QjDMt4aCMGagp5QxfymRLvBQF1QoVd%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75 2x"
                        style="color: transparent;"
                        width="30"
                      />
                    </div>
                    <p
                      class="chakra-heading emotion-19"
                    >
                      Video Juegos 
                    </p>
                  </div>
                </a>
                <a
                  class="chakra-link emotion-16"
                  href="/amo-los-videojuegos"
                >
                  <div
                    class="emotion-17"
                  >
                    <div
                      class="emotion-18"
                    >
                      <img
                        alt="avatar for amo los videojuegos"
                        class="circular"
                        data-nimg="1"
                        decoding="async"
                        height="30"
                        loading="lazy"
                        src="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2FdCrvqBnE74MLcI85W_l8YB4tg3xjkewKUIsMfQJj8GiQ30Jk6xJl0DZOZ5zwK_7E9vD9MkPjHrQ%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75"
                        srcset="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2FdCrvqBnE74MLcI85W_l8YB4tg3xjkewKUIsMfQJj8GiQ30Jk6xJl0DZOZ5zwK_7E9vD9MkPjHrQ%3Ds88-c-k-c0xffffffff-no-rj-mo&w=32&q=75 1x, /_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2FdCrvqBnE74MLcI85W_l8YB4tg3xjkewKUIsMfQJj8GiQ30Jk6xJl0DZOZ5zwK_7E9vD9MkPjHrQ%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75 2x"
                        style="color: transparent;"
                        width="30"
                      />
                    </div>
                    <p
                      class="chakra-heading emotion-19"
                    >
                      amo los videojuegos
                    </p>
                  </div>
                </a>
                <a
                  class="chakra-link emotion-16"
                  href="/yo-con-mis-video-juegos"
                >
                  <div
                    class="emotion-17"
                  >
                    <div
                      class="emotion-18"
                    >
                      <img
                        alt="avatar for Yo con mis Video juegos"
                        class="circular"
                        data-nimg="1"
                        decoding="async"
                        height="30"
                        loading="lazy"
                        src="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAMLnZu-TV_X889hrJl5PXmHqQFuj9qu8-6KKfknCMwu6Z48CPspTjDtD2193O2U15O0C%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75"
                        srcset="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAMLnZu-TV_X889hrJl5PXmHqQFuj9qu8-6KKfknCMwu6Z48CPspTjDtD2193O2U15O0C%3Ds88-c-k-c0xffffffff-no-rj-mo&w=32&q=75 1x, /_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAMLnZu-TV_X889hrJl5PXmHqQFuj9qu8-6KKfknCMwu6Z48CPspTjDtD2193O2U15O0C%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75 2x"
                        style="color: transparent;"
                        width="30"
                      />
                    </div>
                    <p
                      class="chakra-heading emotion-19"
                    >
                      Yo con mis Video juegos
                    </p>
                  </div>
                </a>
                <a
                  class="chakra-link emotion-16"
                  href="/bmx-video-juegos"
                >
                  <div
                    class="emotion-17"
                  >
                    <div
                      class="emotion-18"
                    >
                      <img
                        alt="avatar for bmx video juegos "
                        class="circular"
                        data-nimg="1"
                        decoding="async"
                        height="30"
                        loading="lazy"
                        src="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2FEddpwBprqKcanGFpJ2-9-_MnVa554kcWbpOVspTyIPHrznn-oOCavzLYH1Oo750xUp9PCF2X%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75"
                        srcset="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2FEddpwBprqKcanGFpJ2-9-_MnVa554kcWbpOVspTyIPHrznn-oOCavzLYH1Oo750xUp9PCF2X%3Ds88-c-k-c0xffffffff-no-rj-mo&w=32&q=75 1x, /_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2FEddpwBprqKcanGFpJ2-9-_MnVa554kcWbpOVspTyIPHrznn-oOCavzLYH1Oo750xUp9PCF2X%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75 2x"
                        style="color: transparent;"
                        width="30"
                      />
                    </div>
                    <p
                      class="chakra-heading emotion-19"
                    >
                      bmx video juegos 
                    </p>
                  </div>
                </a>
                <a
                  class="chakra-link emotion-16"
                  href="/aventuras-de-manu-y-video-juegos"
                >
                  <div
                    class="emotion-17"
                  >
                    <div
                      class="emotion-18"
                    >
                      <img
                        alt="avatar for Aventuras de Manu y video juegos"
                        class="circular"
                        data-nimg="1"
                        decoding="async"
                        height="30"
                        loading="lazy"
                        src="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAMLnZu8B6kpmn1--hO--3c3Jzm2t1PvQbkDW1V1pb3j_4vjxurBukPgZYL_AtMGg0f3q%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75"
                        srcset="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAMLnZu8B6kpmn1--hO--3c3Jzm2t1PvQbkDW1V1pb3j_4vjxurBukPgZYL_AtMGg0f3q%3Ds88-c-k-c0xffffffff-no-rj-mo&w=32&q=75 1x, /_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAMLnZu8B6kpmn1--hO--3c3Jzm2t1PvQbkDW1V1pb3j_4vjxurBukPgZYL_AtMGg0f3q%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75 2x"
                        style="color: transparent;"
                        width="30"
                      />
                    </div>
                    <p
                      class="chakra-heading emotion-19"
                    >
                      Aventuras de Manu y video juegos
                    </p>
                  </div>
                </a>
                <a
                  class="chakra-link emotion-16"
                  href="/video-games-juegos"
                >
                  <div
                    class="emotion-17"
                  >
                    <div
                      class="emotion-18"
                    >
                      <img
                        alt="avatar for Video Games Juegos"
                        class="circular"
                        data-nimg="1"
                        decoding="async"
                        height="30"
                        loading="lazy"
                        src="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2F7Ob7nVKBDqbtYNC-Tcl9zwpYKlNs4vtJqBAdslO2Q5WXyeMnkb--V1gHdoFx6PPxj8UWnioz%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75"
                        srcset="/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2F7Ob7nVKBDqbtYNC-Tcl9zwpYKlNs4vtJqBAdslO2Q5WXyeMnkb--V1gHdoFx6PPxj8UWnioz%3Ds88-c-k-c0xffffffff-no-rj-mo&w=32&q=75 1x, /_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2F7Ob7nVKBDqbtYNC-Tcl9zwpYKlNs4vtJqBAdslO2Q5WXyeMnkb--V1gHdoFx6PPxj8UWnioz%3Ds88-c-k-c0xffffffff-no-rj-mo&w=64&q=75 2x"
                        style="color: transparent;"
                        width="30"
                      />
                    </div>
                    <p
                      class="chakra-heading emotion-19"
                    >
                      Video Games Juegos
                    </p>
                  </div>
                </a>
              </div>
            </nav>
          </div>
        </div>
        <main
          class="emotion-48"
        >
          <div
            class="chakra-container emotion-49"
          >
            <div
              class="emotion-50"
            >
              <h1
                class="chakra-heading emotion-51"
              >
                Welcome to Stitch!
              </h1>
              <p
                class="chakra-text emotion-52"
              >
                The next big thing in video streaming.
              </p>
            </div>
          </div>
        </main>
      </div>
      <span
        hidden=""
        id="__chakra_env"
      />
    </div>
  `);
});
