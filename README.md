This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Homepage visuals and GitHub activity

- `HeroParticles` renders a lightweight Canvas particle field. It pauses off screen and in background tabs, respects reduced-motion preferences, and includes a pause control.
- GitHub activity displays public contributions for `oneyoung19` using [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api). The browser loads the last-year endpoint without a token. Upstream caches results for one hour; unavailable or malformed responses show an explicit retry state rather than synthetic data. Change `USERNAME` in `src/components/github-contributions.tsx` to use another profile.
- Contribution calendars include commits and other GitHub contribution types. Keyboard users can navigate dates with arrow keys or expand the daily data table. On small screens, the calendar scrolls horizontally.
- Calendar parsing and date alignment checks (Node.js 22.6+): `node --experimental-strip-types --test tests/contributions.test.mjs`.
