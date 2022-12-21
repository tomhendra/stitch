# Welcome to Stitch

This project was a take-home test completed in a weekend and improved over a week, which helped me to get my current job.

It uses the following stack, all three of which I had to learn for the project.

- Next.js
- Chakra UI
- YouTbe API

## App architecture

- **Framework**: [Next.js v13 (stable)](https://nextjs.org/docs/getting-started) (React v18)
- **Component library**: [Chakra UI](https://chakra-ui.com/)
- **Styles**: [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) + Custom written CSS utils
- **API**: [YouTube](https://developers.google.com/youtube/)
- **Deployment**: [Vercel](https://vercel.com/)

## Component structure

See `./components/NewComponent` for a structural example.

## pnpm vs npm

pnpm is faster and uses far less disk space due to the way it handles dependency
trees: https://pnpm.io/id/pnpm-vs-npm.

It has native Node version management, interactive package updating, and has
been adopted by some huge projects such as [Next.js](https://github.com/vercel/next.js)
and [Vite](https://github.com/vitejs/vite). I am a massive fan of pnpm.

However for this project it breaks React Testing Library due to types not being
hoisted:

- https://github.com/facebook/create-react-app/issues/12622
- https://www.reddit.com/r/typescript/comments/x59poq/jest_ts_property_tobeinthedocument_does_not_exist/

Rather than spend too much time trying to find a workaround (the SO suggestions
do not work for this project), we will be using npm until the issue is resolved.

Update 15/12/22: There is a workaround: https://github.com/pnpm/pnpm/issues/4920#issuecomment-1226724790
TODO: Test the workaround!

## CSS declaration order style guide

This is not enforced via tooling but is recommended for tidiness.

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

Keep close to the upcoming CSS specs' progress as documented by [CSSDB](https://cssdb.org/#all-property). CSS is evolving rapidly with native nesting and scoping solutions on the horizon.

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
