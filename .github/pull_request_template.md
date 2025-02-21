## Summary of Changes

* **Issue Number:** Include the issue number (JIRA or Zendesk ticket) that is being fixed
* **What**: What is this about? Please provide a brief summary / context of the changes made in this PR.
* **Why**: Why are you making this change? What's your motivation behind this change?
* **Dependencies**: List all dependencies required for this change.

## Manual Overrides

Use these options only when no alternative is available. Selecting any of the options below will skip the auto-merging of your change to the main branch. Note that a new version will be tagged and published to enable deployments in different environments, but the PR will not be merged, and the feature branch will not be deleted.

- [ ] **DO_NOT_MERGE**: Run all tests and steps, but skip merging the feature branch to the main branch and deleting the feature branch.
- [ ] **SKIP_UNIT_TESTS**: Skip unit tests along with skipping the feature branch merge to the main branch and feature branch deletion.
- [ ] **SKIP_INTEGRATION_TESTS**: Skip integration tests along with skipping the feature branch merge to the main branch and feature branch deletion.
- [ ] **SKIP_SONAR_ANALYSIS**: Skip Sonar analysis along with skipping the feature branch merge to the main branch and feature branch deletion.
- [ ] **SKIP_SNYK_REPO_SCAN**: Skip Snyk repository scan along with skipping the feature branch merge to the main branch and feature branch deletion.
- [ ] **SKIP_SNYK_IMAGE_SCAN**: Skip Snyk image scan along with skipping the feature branch merge to the main branch and feature branch deletion.
- [ ] **SKIP_HEALTH_CHECK**: Skip health check along with skipping the feature branch merge to the main branch and feature branch deletion.
- [ ] **SKIP_CODE_QUALITY_CHECKS**: Skip all code quality checks including linting, code formatting, and static code analysis.
- [ ] **SKIP_SECURITY_CHECKS**: Skip all security checks including dependency vulnerability scan and secret detection.
- [ ] **SKIP_BUILD_VERIFICATION**: Skip the build verification step.
- [ ] **SKIP_DEPLOYMENT**: Skip deployment to the staging environment.
- [ ] **SKIP_SMOKE_TESTS**: Skip smoke tests in the staging environment.
- [ ] **SKIP_DOCUMENTATION_GENERATION**: Skip the generation of documentation.
- [ ] **SKIP_API_DOC_UPDATE**: Skip updating the API documentation.
- [ ] **SKIP_END_TO_END_TESTS**: Skip end-to-end tests along with skipping the feature branch merge to the main branch and feature branch deletion.
- [ ] **SKIP_PERFORMANCE_TESTS**: Skip performance tests along with skipping the feature branch merge to the main branch and feature branch deletion.
- [ ] **SKIP_ACCESSIBILITY_TESTS**: Skip accessibility tests along with skipping the feature branch merge to the main branch and feature branch deletion.
- [ ] **SKIP_CODE_COVERAGE**: Skip code coverage checks.
- [ ] **SKIP_STYLE_CHECKS**: Skip style checks such as PEP8 for Python or ESLint for JavaScript.
- [ ] **SKIP_COMPATIBILITY_TESTS**: Skip compatibility tests with different browsers or environments.
- [ ] **SKIP_LOAD_TESTS**: Skip load testing.
- [ ] **SKIP_BACKUP**: Skip backup procedures before deployment.
- [ ] **SKIP_ROLLBACK**: Skip rollback procedures in case of deployment failure.
- [ ] **SKIP_LOGGING**: Skip logging setup or checks.
- [ ] **SKIP_MONITORING**: Skip monitoring setup or checks.
- [ ] **SKIP_METRICS_COLLECTION**: Skip metrics collection setup or checks.
- [ ] **SKIP_CI_PIPELINE**: Skip the entire continuous integration pipeline.
- [ ] **SKIP_CD_PIPELINE**: Skip the entire continuous deployment pipeline.
- [ ] **SKIP_ENVIRONMENT_SETUP**: Skip environment setup steps.
- [ ] **SKIP_DATABASE_MIGRATIONS**: Skip database migration steps.
- [ ] **SKIP_CACHE_CLEAR**: Skip cache clearing steps.
- [ ] **SKIP_FEATURE_FLAG_CHECKS**: Skip checks related to feature flags.
- [ ] **SKIP_AUDIT_LOGS**: Skip audit logging steps.
- [ ] **SKIP_ERROR_HANDLING_CHECKS**: Skip checks related to error handling mechanisms.
- [ ] **SKIP_USER_PERMISSIONS_CHECKS**: Skip checks related to user permissions and access controls.
- [ ] **SKIP_API_RATE_LIMIT_CHECKS**: Skip checks related to API rate limiting.

## Release Version Upgrade

Choose only one. If none is selected, a patch version is considered.

- [ ] **Major**
- [ ] **Minor**
- [ ] **Patch**

## Type of Change

Please delete options that are not relevant.

- [ ] **Bug fix**: A non-breaking change that fixes an issue.
- [ ] **New feature**: A non-breaking change that adds functionality.
- [ ] **Breaking change**: A change that causes existing functionality to not work as expected.
- [ ] **Engineering Practices**: Improvements in BDD, unit tests, etc.
- [ ] **Documentation update**: Changes that require updates to documentation.
- [ ] **Performance Improvement**: Changes that improve the performance of the application.
- [ ] **Refactoring**: Code changes that neither fix a bug nor add a feature but improve code readability, structure, or maintainability.
- [ ] **Security Fix**: Changes that address security vulnerabilities.
- [ ] **Configuration Change**: Changes to configuration files or settings.
- [ ] **Build System**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- [ ] **CI/CD**: Changes to our Continuous Integration/Continuous Deployment pipeline.
- [ ] **Infrastructure**: Changes that affect infrastructure or deployment configurations.
- [ ] **Localization**: Changes related to internationalization and localization.
- [ ] **Accessibility**: Changes that improve accessibility.
- [ ] **Database**: Changes related to database schema, migrations, or queries.
- [ ] **Logging**: Changes related to logging and monitoring.
- [ ] **Testing**: Adding or updating tests.
- [ ] **Documentation**: Changes or additions to documentation.
- [ ] **Dependency Upgrade**: Changes that involve upgrading dependencies.
- [ ] **Feature Toggle**: Changes related to feature toggles or flags.
- [ ] **Hotfix**: Quick fixes for critical issues.
- [ ] **Prototype**: Experimental changes or proof of concept implementations.
- [ ] **User Interface**: Changes to the user interface or user experience.
- [ ] **API Change**: Changes to the API, including new endpoints or modifications to existing ones.
- [ ] **Data Migration**: Changes involving data migration scripts or processes.


## How Has This Been Tested?

Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce them. List any relevant details for your test configuration.

- [ ] **Unit Tests**: Describe the unit tests that were run and their results.
- [ ] **Integration Tests**: Describe the integration tests that were run and their results.
- [ ] **End-to-End Tests**: Describe the end-to-end tests that were run and their results.
- [ ] **Performance Tests**: Describe the performance tests that were run and their results.
- [ ] **Load Tests**: Describe the load tests that were run and their results.
- [ ] **Stress Tests**: Describe the stress tests that were run and their results.
- [ ] **Security Tests**: Describe the security tests that were run and their results.
- [ ] **Usability Tests**: Describe the usability tests that were run and their results.
- [ ] **Accessibility Tests**: Describe the accessibility tests that were run and their results.
- [ ] **Compatibility Tests**: Describe the compatibility tests that were run and their results.
- [ ] **Regression Tests**: Describe the regression tests that were run and their results.
- [ ] **Smoke Tests**: Describe the smoke tests that were run and their results.
- [ ] **Sanity Tests**: Describe the sanity tests that were run and their results.
- [ ] **Exploratory Tests**: Describe the exploratory tests that were run and their results.
- [ ] **Manual Tests**: Describe any manual tests that were performed and their results.
- [ ] **Automated Tests**: Describe any automated tests that were performed and their results.
- [ ] **User Acceptance Tests (UAT)**: Describe the user acceptance tests that were run and their results.
- [ ] **Alpha/Beta Testing**: Describe any alpha or beta testing that was performed and their results.
- [ ] **Mock Testing**: Describe any mock testing that was performed and their results.
- [ ] **Environment Testing**: Describe the different environments (e.g., staging, production) where the tests were run and their results.
- [ ] **Database Testing**: Describe any database tests that were performed and their results.
- [ ] **API Testing**: Describe any API tests that were performed and their results.
- [ ] **Feature Flag Testing**: Describe any tests related to feature flags that were performed and their results.
- [ ] **Rollback Testing**: Describe any rollback tests that were performed and their results.

## Feature Tested

Please provide a detailed overview of the specific features that were tested as part of the PR:

- [ ] **Login Functionality**: Tests related to user login, including authentication and authorization.
- [ ] **Registration Process**: Tests related to user registration, including form validation and account creation.
- [ ] **Password Reset**: Tests related to password reset functionality, including email verification and password update.
- [ ] **User Profile Management**: Tests related to updating and managing user profiles.
- [ ] **Search Functionality**: Tests related to search features, including search accuracy and performance.
- [ ] **Shopping Cart**: Tests related to adding, updating, and removing items from the shopping cart.
- [ ] **Checkout Process**: Tests related to the checkout process, including payment processing and order confirmation.
- [ ] **Product Listings**: Tests related to displaying and filtering product listings.
- [ ] **Notifications**: Tests related to sending and receiving notifications, including email and in-app notifications.
- [ ] **File Upload/Download**: Tests related to uploading and downloading files.
- [ ] **API Endpoints**: Tests related to specific API endpoints, including request and response validation.
- [ ] **Data Import/Export**: Tests related to importing and exporting data.
- [ ] **Real-time Updates**: Tests related to real-time updates, such as WebSocket or push notifications.
- [ ] **Reporting and Analytics**: Tests related to generating and displaying reports and analytics.
- [ ] **Role-Based Access Control**: Tests related to role-based access control and permissions.
- [ ] **Localization and Internationalization**: Tests related to language support and localization.
- [ ] **Performance Optimization**: Tests related to performance improvements and optimizations.
- [ ] **Third-Party Integrations**: Tests related to integrations with third-party services or APIs.
- [ ] **Responsive Design**: Tests related to ensuring the application is responsive across different devices and screen sizes.
- [ ] **Accessibility Features**: Tests related to accessibility features, ensuring compliance with accessibility standards.
- [ ] **Error Handling**: Tests related to error handling and displaying appropriate error messages.
- [ ] **Backup and Restore**: Tests related to backup and restore functionality.
- [ ] **Audit Logging**: Tests related to audit logging and tracking user actions.
- [ ] **Feature Toggles**: Tests related to enabling and disabling feature toggles.



**Test Configuration**:

- **Feature file to run**: Provide the command.
- **Jenkins Jobs to run**: Provide the link.

## Checklist

- [ ] Sonar analysis is healthy.
- [ ] Documentation has been updated.
- [ ] No new warnings are generated by my changes.
- [ ] Feature tests have been added and execute with 100% pass results.
- [ ] New and existing unit tests pass locally with my changes.
- [ ] Any dependent changes have been merged and published in downstream modules.

## GitHub Actions Integration

The status of the below checks will be dynamically updated in the PR using GitHub Actions. Ensure all checks pass before merging.

The following checks will be dynamically executed as part of the GitHub Actions workflow:

- **Code Quality Checks**:
  - [ ] Linting
  - [ ] Code Formatting
  - [ ] Static Code Analysis

- **Security Checks**:
  - [ ] Dependency Vulnerability Scan
  - [ ] Secret Detection

- **Testing**:
  - [ ] Unit Tests
  - [ ] Integration Tests
  - [ ] End-to-End Tests

- **Build and Deployment**:
  - [ ] Build Verification
  - [ ] Deployment to Staging Environment
  - [ ] Smoke Tests in Staging

- **Documentation**:
  - [ ] Documentation Generation
  - [ ] API Documentation Update




