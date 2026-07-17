# Rhon Studios

This is a Next.js project built with the App Router.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

The application will automatically reload as changes are made.

---

## Code Style

This project uses:

- **ESLint** for code quality and linting
- **Prettier** for code formatting and styling consistency

### Format the Project

```bash
npm run format
```

### Check Formatting

```bash
npm run format:check
```

### Run ESLint

```bash
npm run lint
```

---

## Formatting Rules

The current Prettier configuration follows these conventions:

- Use semicolons (`;`)
- Use double quotes (`"`)
- Use trailing commas where valid in ES5
- Use 2 spaces for indentation
- Wrap lines around 100 characters
- Always include parentheses around arrow function parameters

Example:

```ts
const titles = gamesData.map((game) => game.title);

const scrollTo = (id: string) => {
  console.log(id);
};
```

These rules help keep the codebase consistent and reduce formatting-related noise in pull requests.
