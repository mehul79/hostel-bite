# HostelBite — E2E Tests

This folder contains the end-to-end UI tests for the **HostelBite** web application.
These are Selenium + ChromeDriver tests written in Java and designed to run locally from Eclipse
as **Java Applications** (not JUnit). They exercise real user flows end-to-end: frontend + backend + routing.

---

## What’s included

- `BaseE2ETest.java` — shared helpers:
  - `startBrowser()` / `closeBrowser()`
  - `clearSession()`, `loginAsSeedUser()`
  - `waitForProductsPage()`, `addFirstProductToCart()`
- `AuthE2ETest.java` — Register & Login flows
- `AddToCartE2ETest.java` — Add a product and validate cart contents
- `CheckoutE2ETest.java` — Checkout and order placement
- `SearchAndFilterE2ETest.java` — Product search and category filter behavior

All tests are standalone Java applications and each test file has a `main()` method.

---

## Prerequisites

1. **Frontend running** — the UI must be reachable at the `baseUrl` (default `http://localhost:5173`).
2. **Backend running** — APIs for auth, products, cart, checkout must be available locally.
3. **Seed user** must exist in the DB for seed-login tests:
   - `seed-shop@hostelbite.demo` / `SeedPass123!`
4. **Chrome** installed (matching your chromedriver).
5. **chromedriver** binary available on disk (path configured below).
6. **Java 17+** and Selenium Java libraries on project classpath (or managed via Maven/Gradle).
7. Eclipse configured to run Java applications.

---

## File / package location

For the setup used in this project, use the package and folder:

package Experiment_1_Packages;
src/Experiment_1_Packages/*.java


Make sure each file's `package` line matches the folder path.

---

## Configure ChromeDriver & headless mode

The default `BaseE2ETest` looks for:

C:\Chrome-Driver\chromedriver_1.exe


Ways to configure:

- **VM arguments (recommended)** — set path & turn on visual browser:
  - Open Run → Run Configurations → (select test) → Arguments → VM arguments
  - Example:
    ```
    -Dwebdriver.chrome.driver="C:\path\to\chromedriver.exe" -Dheadless=false
    ```
- **Or** edit the default in `BaseE2ETest.startBrowser()` temporarily.

**Note:** `-Dheadless=false` will show the browser window (great for debugging). Default in code is headless mode.

---

## Run a test (Eclipse)

1. Right-click the test `.java` file (e.g. `AuthE2ETest.java`).
2. Select **Run As → Java Application**.
3. Watch console output. If running headless you will not see a browser UI; set `-Dheadless=false` to view it.

---

## Run flow summary

- `main()` starts the browser (`startBrowser()`).
- The test executes user steps (login / search / add / checkout).
- On success the test prints `✅ <test> passed`.
- On failure the test throws a `RuntimeException` with a descriptive message.

