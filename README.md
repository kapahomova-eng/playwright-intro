# Playwright UI Tests

UI automation tests for https://fe-delivery.tallinn-learning.ee/

## Tech Stack

- TypeScript
- Playwright
- Node.js

---

# Project Setup

## Prerequisites

Before running the project, make sure you have installed:

- Node.js (v18 or newer recommended)
- npm

Playwright requires browser binaries to be installed before running tests. :contentReference[oaicite:0]{index=0}

---

## Clone the repository

```bash
git clone https://github.com/kapahomova-eng/playwright-intro
```

---

## Install dependencies

```bash
npm install
```

---

## Install Playwright browsers

```bash
npx playwright install
```

This command downloads the browsers required by Playwright. :contentReference[oaicite:1]{index=1}

---

# Test Credentials

The test environment uses the credentials, added as secret keys

# Running Tests

## Run all tests

```bash
npx playwright test
```

---

## Run tests in headed mode

```bash
npx playwright test --headed
```

---

## Run a specific test file

```bash
npx playwright test tests/login.spec.ts

---

## Run tests using Playwright UI

```bash
npx playwright test --ui
```

UI Mode allows running, debugging and inspecting tests interactively. :contentReference[oaicite:2]{index=2}

---

# Test Report

After test execution, open the HTML report with:

```bash
npx playwright show-report
```

Playwright generates an interactive HTML report after execution. :contentReference[oaicite:3]{index=3}

---

