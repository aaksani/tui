# TUI Playwright Automation

Playwright automation for TUI booking flow using TypeScript and Page Object Model.

## Quick Start

```bash
npm install
npx playwright install
```

## Run Tests

```bash
npm test                    # Run all tests
npm run test:headed        # Run with visible browser
npm run test:debug         # Debug mode
npm run test:ui            # Interactive UI mode
npm run report             # View HTML report
```

## Project Structure

```
Tui/
├── fixtures/          # Playwright fixtures
├── page-objects/      # Page Object Model
├── tests/             # Test files
├── utils/             # Utilities
└── playwright.config.ts
```

## Configuration

Create `.env` to override base URL:
```bash
TUI_BASE_URL=https://www.tui.pl/
```
