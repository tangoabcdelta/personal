# Measuring a website's **frame rate (FPS)** after deployment in a GitHub Action

Measuring a website's **frame rate (FPS)** after deployment in a GitHub Action requires running a **synthetic monitoring tool** that simulates a user visiting the live site and can collect that specific performance metric.

Directly measuring the frame rate of the *deployment process* in GitHub Actions is not possible, as FPS is a user-experience metric of the rendered website in a browser, not a pipeline execution metric.

Here is a recommended approach using popular, performance-focused GitHub Actions:

-----

## 1\. Use a Performance Tool with FPS Capability

The best way to automate this measurement is to integrate a tool designed for web performance testing into your GitHub Actions workflow.

### **Option A: Lighthouse CI (Recommended for General Performance)**

While Lighthouse primarily focuses on Core Web Vitals (like Largest Contentful Paint, Cumulative Layout Shift, and Total Blocking Time), it runs in a headless browser and collects a variety of performance metrics.

* **Lighthouse CI** can be configured in a GitHub Action to run an audit against your deployed URL.
* The raw performance trace data collected by Lighthouse will contain information on rendering performance, including details that can be analyzed for smoothness, but it may not provide a direct, simple FPS number like a specific end-user tool. You'd typically rely on **Total Blocking Time (TBT)** and **Cumulative Layout Shift (CLS)** as proxies for a smooth, jank-free experience.

### **Option B: WebPageTest GitHub Action**

**WebPageTest** is a powerful tool that offers a vast array of metrics, including highly granular rendering and video-based metrics.

* The **WebPageTest GitHub Action** allows you to run a test against your live site.
* You can often configure WebPageTest to record video or capture tracing data which is required to calculate accurate FPS/jank data. The output often includes metrics like **Speed Index** and **Visually Complete**, which are closely related to smooth loading and rendering. You may also be able to define a **Custom Metric** in WebPageTest to capture an average FPS during a scripted interaction.

### **Option C: Custom Puppeteer/Playwright Script**

If you need a very precise or average **Frames Per Second (FPS)** number, you'll need to use a browser automation library like **Puppeteer** or **Playwright** within your GitHub Action.

1. **Write a Node.js script** using Puppeteer/Playwright to:
      * Launch a **headless browser**.
      * Navigate to your **deployed website URL**.
      * Use the browser's DevTools Protocol to **start performance tracing**. Specific tracing categories (like `devtools.timeline` or `browser.frameTiming`) can capture the frame timing data.
      * Execute a **simulated user interaction** (e.g., scroll, click, or animation).
      * **Stop tracing** and process the resulting JSON trace file to calculate the average or minimum FPS during the interaction.
2. **Integrate the script** into your GitHub Action workflow using the `actions/setup-node` and `run` steps.
3. **Output the FPS value** using a standard GitHub Actions command so it appears in the job summary/logs, and fail the job if the FPS is below a specified threshold.

-----

## 2\. GitHub Actions Workflow Structure

Here is a conceptual look at what your GitHub Action workflow would look like:

```yaml
name: Website Performance Test

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    # ... your deployment steps ...
    # This step should result in a publicly accessible URL for your site
    # (e.g., a Netlify preview URL or a staging environment URL).

  performance:
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # 1. Wait for deployment (if necessary, for a new preview URL)
      #    (Optional step depending on your hosting solution)

      # 2. Run the performance test (e.g., using Lighthouse CI Action)
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10 # Or any other performance action
        with:
          url: 'https://your-deployed-website.com' # Use the actual deployed URL
          # Add settings to enforce performance budgets or collect specific metrics
```
