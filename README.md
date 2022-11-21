# Welcome to Stitch app

## Commitlint types

This is a sticky note for Tom, because he never remembers them!

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

## App architecture

- Framework: [Next.js 13 stable](https://nextjs.org/docs/getting-started) (React v18)
- Component library: [Chakra UI](https://chakra-ui.com/)
- Custom styles: [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)
- API: [YouTube](https://developers.google.com/youtube/)
- Deployment: [Vercel](https://vercel.com/)

The data fetching method is currently ISR. To change to SSR we just need to
change `getStaticProps` to `getServerSideProps`. We also remove `getStaticPaths`
because no HTML is needed to be generated at build time for SSR.

### Twitch architecture

- Framework: React App (v18) (probably a custom build)
- Styles: Styled Components (runtime CSS-in-JS)
- API: Custom
- Deployment: AWS (obviously)

**Note** - Twitch serves a [separate app](https://m.twitch.tv) for handheld devices.

### Component architecture

See ./components/NewComponent for a structural example.

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
