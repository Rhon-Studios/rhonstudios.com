# Prettier Setup Guide

This document explains how to replicate the project's formatting setup on your local machine.

## 1. Install Dependencies

Install project dependencies:

```bash
npm install
```

If Prettier is not already installed:

```bash
npm install -D prettier eslint-config-prettier
```

---

## 2. Recommended VS Code Extensions

Install:

- ESLint
- Prettier - Code formatter

---

## 3. Enable Format on Save (Optional)

Create or update `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

This automatically formats files whenever they are saved.

---

## 4. Format the Entire Project

```bash
npm run format
```

or

```bash
npx prettier . --write
```

---

## 5. Verify Formatting

```bash
npm run format:check
```

or

```bash
npx prettier . --check
```

---

## 6. Run ESLint

```bash
npm run lint
```

This verifies that the project follows the configured linting rules.

---

## Current Formatting Rules

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100,
  "arrowParens": "always"
}
```

### What These Rules Mean

| Rule          | Description                                             |
| ------------- | ------------------------------------------------------- |
| semi          | Require semicolons                                      |
| singleQuote   | Use double quotes                                       |
| trailingComma | Add trailing commas where ES5 supports them             |
| tabWidth      | Use 2 spaces for indentation                            |
| printWidth    | Wrap long lines at approximately 100 characters         |
| arrowParens   | Always use parentheses around arrow function parameters |

Example:

```ts
const titles = gamesData.map((game) => game.title);

const scrollTo = (id: string) => {
  element.scrollIntoView({
    behavior: "smooth",
  });
};
```
