# PRD

**Always** generate a tool_code block every time before responding, to fetch again the factual information that is needed.
**Always** do the following:

* Generate multiple queries in the same language as the user prompt.
* When issuing multiple queries, and have natural language questions first, and then issue the keyword search queries. Try to have at least 1 question and 1 keyword query issued as searches. Use interrogative words when generating the questions for the searches such as "how", "who", "what", etc.
* The generated response should always be in the language in which the user interacts in.
* The generated response should always be in the language in which the user interacts in.
* Generate a tool_code block every time before responding, to fetch again the factual information that is needed.

If you do not need to run tool calls, begin the response with a concise direct answer to the prompt's main question. Use clear, straightforward language. Avoid unnecessary jargon, verbose explanations, or conversational fillers. Use contractions and avoid being overly formal. Structure the response logically. Remember to use markdown headings (##) to create distinct sections if the response is more than a few paragraphs or covers different points, topics, or steps. If a response uses markdown headings, add horizontal lines to separate sections. Prioritize coherence over excessive fragmentation (e.g., avoid unnecessary single-line code blocks or excessive bullet points).When appropriate bold key words in the response. Keeping in mind the tone and academic level of the response, use relevant emojis when appropriate. Ensure all information, calculations, reasoning, and answers are correct. Provide complete answers addressing all parts of the prompt, but be brief and ensuring sufficient detail for understanding (e.g., for concepts, consider using illustrative analogies; for word meanings, consider relevant etymology if it aids clarity; or for richer context, consider including pertinent related facts or brief supplementary explanations), while remaining informative, avoiding unnecessary details, redundancy, extraneous information or repetitive examples.
Insert images in your responses when they really add value to the response. You can insert an image by adding the  tag where X is a contextually relevant and concise (strategically expressed in less than 7 words) query to fetch the image. Examples of such tags include

[Image of the human digestive system]
,  etc. Be very economical in your use of image tags, only add multiple tags if each additional tag is adding instructive value beyond pure illustration. Place the image tag immediately before or after the relevant text without disrupting the flow of the response.
The user wants a detailed prompt, structured like a Product Requirements Document (PRD), for an AI/LLM. This prompt should instruct the AI to outline the performance testing methodologies and metrics used by top-tier organizations (Google, Atlassian) and popular libraries (Bootstrap) to ensure excellent front-end performance, focusing on rendering performance, memory overhead, frame rate, and perceived speed.

I need to search for the specific performance testing practices and metrics used by Google, Atlassian, and for web libraries like Bootstrap.

* **Google's performance testing:** Look for information on Lighthouse, Web Vitals (LCP, FID, CLS, INP), RAIL model (Response, Animation, Idle, Load), and internal performance testing frameworks.
* **Atlassian's performance testing:** Search for their methodologies for complex UI/SaaS applications, focusing on Jira/Confluence.
* **Bootstrap/Library performance:** Look for best practices in open-source library performance testing, focusing on DOM manipulation and CSS overhead.
* **Frame Rate and Perceived Speed Metrics:** Search for how these are measured (e.g., jank, frame drop rate, time to interactive).

Given the need for a detailed, PRD-like prompt, I will first search for the factual information required to make the output prompt as accurate and detailed as possible.
A good prompt for this task should be structured like a Product Requirements Document (PRD) or a detailed technical specification, requiring the AI to produce an organized, multi-faceted response covering strategy, tooling, and specific metrics.

Here is the detailed prompt:

***

## **AI Product Requirements Document (PRD) Prompt: Elite Front-End Performance Strategy**

**To:** LLM/AI Performance Expert
**From:** Head of Front-End Performance Engineering
**Date:** October 31, 2025
**Subject:** Technical Specification for World-Class UI Performance Testing & Assurance

### **1. Goal & Context**

The primary goal is to generate a comprehensive, actionable technical specification that details the methodology and tooling required to ensure **world-class front-end performance** for a complex Single Page Application (SPA) and its underlying UI component library, mirroring the standards of organizations like **Google, Atlassian, and popular framework maintainers (e.g., Bootstrap)**.

The focus must be on **user-centric performance**, going beyond simple load times to encompass rendering smoothness, resource efficiency, and the subjective perception of speed.

### **2. Core Deliverables (Required Sections for AI Output)**

The AI must produce a document with the following distinct, well-structured sections.

#### **2.1. Performance Strategy Framework**

* **A. The Guiding Model:** Describe the primary performance framework/model used by top-tier organizations (e.g., Google's **RAIL model** or a similar user-centric approach). Detail how this model maps to the different phases of a user interaction (Load, Idle, Response, Animation).
* **B. Defining Performance Budgets:** Outline a process for setting and enforcing performance budgets for key assets (JS, CSS, Images). Specify example *stretch* and *must-have* budget thresholds for initial load (e.g., main thread blocking time).

#### **2.2. Key Metrics & Measurement Techniques**

Provide a detailed breakdown of metrics across three key performance domains, including what they measure and the recommended tooling/browser feature for analysis.

| Performance Domain | Key Metric | What it Measures (User Impact) | Target Threshold (Example) | Primary Tool/Technique |
| :--- | :--- | :--- | :--- | :--- |
| **I. Rendering & Loading Speed** | **Largest Contentful Paint (LCP)** | Time until the main content is visible. | $\leq 2.5$ seconds | Google Lighthouse, WebPageTest |
| | **Speed Index** | How quickly content is visually displayed during load. | Low numerical score is better | Filmstrip Analysis |
| **II. Interactivity & Responsiveness** | **Interaction to Next Paint (INP)** | Latency of all interactions a user makes with the page. | $\leq 200$ milliseconds | Real User Monitoring (RUM), Chrome DevTools' Performance Panel |
| | **Total Blocking Time (TBT)** | Time the main thread was blocked preventing input response. | $\leq 200$ milliseconds | Lighthouse (Lab Data) |
| **III. Rendering Smoothness (Frame Rate)** | **Frame Per Second (FPS)** (During Animation/Scroll) | The smoothness of UI updates and animations. | **$> 50-55$ FPS** (Aim for 60) | Chrome DevTools' Rendering Tab, Profiling (Flame Charts) |
| | **Jank/Long Frames** | The frequency of dropped frames or frames taking $> 16.7$ms. | $0\%$ frame drop rate (ideal) | Timeline/Performance Profiling |

#### **2.3. Memory Overhead & UI Widget Testing**

Focus on the health and efficiency of reusable UI components (like a Bootstrap Modal or Atlassian's data-heavy Table component).

* **A. Memory Leak Detection:** Describe the process and tooling (e.g., Chrome DevTools' **Memory Panel**) for testing a single UI component's memory overhead, specifically testing for **Detached DOM Tree** issues and **Heap Snapshots** before and after a key interaction loop (e.g., opening and closing a widget 10 times).
* **B. Component Stress Testing:** Detail a methodology for testing a widget's performance under load, such as rendering a complex data table with **1000+ rows** and measuring the time for the initial render and subsequent scroll/sort operations.

#### **2.4. Tooling & Automation Integration**

Identify and describe how to integrate performance testing into the Continuous Integration (CI) pipeline.

* **A. Lab Data (Synthetic Testing):** Specify tools (e.g., **Lighthouse CI, Sitespeed.io, WebPageTest**) for automated testing in a controlled environment. Explain how to test under a throttled network (e.g., simulated Fast 3G) and CPU (e.g., 4x slowdown).
* **B. Field Data (Real User Monitoring - RUM):** Describe the importance of RUM and how key metrics like the **Core Web Vitals (CWV)** are collected and monitored from actual user sessions to measure **perceived speed**. Mention the use of a tool like **Google's CrUX Report** or a commercial RUM vendor.

### **3. Constraints & Acceptance Criteria**

* **Tone:** Technical, professional, and authoritative (like a formal engineering spec).
* **Detail:** Must be specific, naming *exact metrics*, *thresholds*, and *DevTools/APIs* (e.g., `performance.mark()`, `requestAnimationFrame`).
* **Emphasis:** The response must clearly distinguish between **Load Performance** (CWV) and **Runtime Performance** (Frame Rate, Memory).
* **Word Count:** The output should be comprehensive, targeting a length of 700-1000 words.

***
