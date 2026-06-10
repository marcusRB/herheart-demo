# HerNextBeat Site

Marketing and demo site for HerNextBeat, a women-focused cardiovascular clinical decision support platform. The app is built with React and Vite and packages several embedded HTML prototypes inside a single SPA shell.

## What changed

The React core has been restructured so the site is no longer maintained from one oversized `App.jsx` file.

- Shared design tokens and global CSS live in `src/site/tokens.js`
- Embedded demo source documents live in `src/site/embedded.js`
- Reusable shell and layout components live in `src/components/common.jsx`
- Each top-level screen now has its own module under `src/pages/`
- `src/App.jsx` is now the application shell and page registry only

This keeps the current behavior while making the site easier to extend, review, and maintain.

## Project structure

```text
src/
	App.jsx
	App.css
	index.css
	main.jsx
	assets/
	components/
		common.jsx
	pages/
		BusinessPage.jsx
		ContactPage.jsx
		DemoPage.jsx
		EvidencePage.jsx
		FundingPage.jsx
		HomePage.jsx
		SolutionPage.jsx
		StressTestPage.jsx
		TeamPage.jsx
		index.js
	site/
		embedded.js
		tokens.js
	herheart_ehr_demo.html
	herheart_ehr_full_demo.html
	herheart_financial_simulator.html
	herheart_stress_test.html
```

## Development

Install dependencies:

```bash
npm install
```

Start the Vite dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Preview the production build locally:

```bash
npm run preview
```

## Architecture notes

- Navigation is handled with local React state rather than a router.
- The HTML demos are imported as raw strings and rendered in sandboxed iframes.
- The business simulator and stress test can send a `postMessage` event back to the React shell to switch views.
- Global styling is injected once from the shared token module so visual constants stay centralized.

## Next maintenance steps

- If the site grows further, move repeated page content arrays into dedicated content files.
- If deep linking becomes necessary, replace state-based navigation with `react-router`.
- If forms need to become functional, wire the contact view to a backend or automation endpoint.
