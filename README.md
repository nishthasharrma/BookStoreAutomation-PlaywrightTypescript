This repository contains a scalable and maintainable API automation framework built using Playwright with TypeScript. It validates major functionalities of a FastAPI-based bookstore service by covering all CRUD operations, ensuring robust request chaining, and generating detailed test reports using Allure.

**Objective**
To develop a comprehensive API automation suite that:

1.Validates CRUD operations: Create, Read, Update, Delete

2.Ensures correctness through status codes, response payloads, headers, and error handling

3.Covers positive and negative scenarios

4.Supports request chaining to simulate real user/API workflows

5.Integrates reporting and CI/CD pipelines using GitHub Actions

**Testing Strategy**
**Approach**
* Each test case targets a specific CRUD operation.

* Designed test flows in a chained fashion (e.g., create → read → update → delete).

* Assertions validate:

    - Response status codes (200, 404, 422)

    - Content-type headers

    - Response body structure and values

**Reliability & Maintainability**

* Used Playwright Test as the test runner and assertion library.

* Created reusable utility functions like getToken() for token-based auth.

* Base URL and environment config are managed centrally via env.config.ts.

**Challenges & Solutions**
<img width="826" height="207" alt="Screenshot 2025-07-27 210825" src="https://github.com/user-attachments/assets/37aa3343-d9ad-4343-9524-85a40018577a" />


**Tech Stack**
* Language: TypeScript

* Test Framework: Playwright Test

* Reporting: Allure Reports

* CI/CD: GitHub Actions

**Folder Structure**

<img width="592" height="792" alt="Screenshot 2025-07-27 180014" src="https://github.com/user-attachments/assets/120db463-9759-4bb2-b87b-b50aa5b5ec89" />


**How to Run the Test Suite**

1. Install Dependencies
npm install

2. Run Tests
npm run test

3. Generate Allure Report
npm run allure:generate

4. Open Allure Report
npm run allure:open


**Environment Configuration**
Edit src/config/env.config.ts to dynamically manage environment-based URLs:

ts
Copy
Edit
export const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:8000'
};

**GitHub Actions – CI/CD Pipeline**

* Located in .github/workflows/playwright.yml, the pipeline includes:

* Node setup and dependency install

* Test execution via npx playwright test

* Allure report generation and publishing (optional)

The workflow runs on:

  - Every push to main

  - Every pull request to main

**Sample Test Report**
Sample Allure report gets generated under:

allure-report/index.html
Open with:

npm run allure:open

<img width="1320" height="683" alt="Screenshot 2025-07-28 112533" src="https://github.com/user-attachments/assets/72600e80-25c7-48b1-a1bf-8fbaffc11f79" />




