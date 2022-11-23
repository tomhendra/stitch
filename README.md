# Welcome to Stitch

This project serves to demonstrate my ability in creating a React Application.

It uses the following stack, all three of which I learned for this assignment.

- Next.js
- Chakra UI
- YouTbe API

The requirement was to create a basic Twitch clone. See the `docs` directory for full details.

## Twitch architecture

- **Framework**: React App (v18) (probably a custom Webpack / Vite build)
- **Component library**: Almost certainly custom based on their [design system](https://brand.twitch.tv/) at Twitch's scale.
- **Styles**: Styled Components
- **API**: Custom
- **Deployment**: AWS (obviously, being Amazon-owned!)

**Note** - Twitch serves a separate app at [https://m.twitch.tv](https://m.twitch.tv) for handheld devices.

## Stitch architecture

- **Framework**: [Next.js v13 (stable)](https://nextjs.org/docs/getting-started) (React v18)
- **Component library**: [Chakra UI](https://chakra-ui.com/)
- **Styles**: [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) + CSS utils
- **API**: [YouTube](https://developers.google.com/youtube/)
- **Deployment**: [Vercel](https://vercel.com/)

## Component architecture

See `./components/NewComponent` for a structural example.

## Google Cloud Platform API quotas

If you notice the app isn't fetching data it is almost certainly because the
daily API quota limit has expired.

Because Next.js builds static pages for this app at build time on the server, the API takes a hit every time I push to GitHub and trigger a build.

I have created 7 different apps on GCP so far! I am monitoring the situation
and swapping out API keys as and when quota limits are reached.

## CSS declaration order style guide

This is not enforced via tooling but is recommended for the benefit of your compañeros.

```css
.selector {
  /* Positioned layout */
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;

  /* Display & Box Model */
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid #333;
  margin: 10px;

  /* Color */
  background: #000;
  color: #fff

  /* Text */
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.4;
  text-align: right;

  /* Other */
  cursor: pointer;

  /* Animations */
  transition: filter 400ms;
}
```

## CSS future specs

Keep close to the upcoming CSS specs' progress as documented by [CSSDB](https://cssdb.org/#all-property).
CSS is evolving rapidly with native nesting and scoping solutions on the horizon.

A PostCSS plugin exists called `postcss-preset-env` that allows us to use future
specs today. However in favour of **stability** it isn't used in this project.

## Commitlint types

This is a sticky note for me, because I can never remember them!

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test
