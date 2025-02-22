# Documentation about all Github Actions Used in the repo








### Decorated Push Notifications

You can send decorated notifications to Microsoft Teams using Adaptive Cards, which allow you to create rich, interactive content.
Here's an example of how to send a decorated notification using GitHub Actions and an Adaptive Card:

### Step 1: Create an Incoming Webhook in Teams
1. **Go to the channel** where you want to send the notification.
2. **Click on the ellipsis (`...`) next to the channel name** and select **"Connectors"**.
3. **Search for "Incoming Webhook"** and add it.
4. **Name your webhook** and click **"Create"**.
5. **Copy the webhook URL** provided.

### Step 2: Set Up GitHub Actions Workflow
Here's a sample GitHub Actions YAML file that sends a decorated notification to Teams:

```yaml
name: Notify Teams

on:
  push:
    branches:
      - main

jobs:
  notify:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Send Teams Notification
        run: |
          curl -H 'Content-Type: application/json' -d '{
            "type": "message",
            "attachments": [
              {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "contentUrl": null,
                "content": {
                  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                  "type": "AdaptiveCard",
                  "version": "1.2",
                  "body": [
                    {
                      "type": "TextBlock",
                      "text": "Build Notification",
                      "weight": "Bolder",
                      "size": "Medium"
                    },
                    {
                      "type": "TextBlock",
                      "text": "The build for the repository has completed.",
                      "wrap": true
                    },
                    {
                      "type": "FactSet",
                      "facts": [
                        {
                          "title": "Repository:",
                          "value": "${{ github.repository }}"
                        },
                        {
                          "title": "Branch:",
                          "value": "${{ github.ref }}"
                        },
                        {
                          "title": "Commit:",
                          "value": "${{ github.sha }}"
                        }
                      ]
                    }
                  ],
                  "actions": [
                    {
                      "type": "Action.OpenUrl",
                      "title": "View Build",
                      "url": "https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                    }
                  ]
                }
              }
            ]
          }' ${{ secrets.TEAMS_WEBHOOK_URL }}
```

### Explanation
- **Incoming Webhook**: The webhook URL you copied from Teams is stored in GitHub Secrets as `TEAMS_WEBHOOK_URL`.
- **Adaptive Card**: The JSON payload defines an Adaptive Card with a title, description, and facts about the build. It also includes a button to view the build details.

### Step 3: Add the Webhook URL to GitHub Secrets
1. **Go to your GitHub repository**.
2. **Navigate to `Settings` > `Secrets and variables` > `Actions`**.
3. **Click `New repository secret`**.
4. **Name the secret `TEAMS_WEBHOOK_URL`** and paste the webhook URL you copied from Teams.


---

To automatically generate and update a Table of Contents (TOC) in your GitHub `README.md` file, you can use tools like `gh-md-toc` or `markdown-toc`. These tools can be integrated into your GitHub Actions workflow to keep the TOC updated without manual intervention.

### Using `markdown-toc` with GitHub Actions

Here's how you can set it up:

1. **Install `markdown-toc`**: This tool generates a TOC based on the headings in your Markdown file.

2. **Create a GitHub Actions Workflow**: This workflow will run `markdown-toc` to update the TOC whenever changes are pushed to the repository.

#### Step-by-Step Guide

1. **Add `markdown-toc` to your project**:
   - You can add it as a development dependency using npm:
     ```sh
     npm install -g markdown-toc
     ```

2. **Create a GitHub Actions Workflow**:
   - Create a file named `.github/workflows/update-toc.yml` in your repository with the following content:

```yaml
name: Update TOC

on:
  push:
    branches:
      - main

jobs:
  update-toc:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

#      - name: Install markdown-toc
#       run: npm install -g markdown-toc

      - name: Check and Install markdown-toc
        run: |
          if ! command -v markdown-toc &> /dev/null; then
            echo "markdown-toc not found, installing..."
            npm install -g markdown-toc
          else
            echo "markdown-toc already installed"
          fi


      - name: Generate TOC
        run: markdown-toc -i README.md

      - name: Commit changes
        run: |
          git config --global user.name 'github-actions[bot]'
          git config --global user.email 'github-actions[bot]@users.noreply.github.com'
          git add README.md
          git commit -m 'Update TOC'
          git push
```

### Explanation

- **Checkout code**: Checks out your repository code.
- **Set up Node.js**: Sets up Node.js environment.
- **Install markdown-toc**: Installs the `markdown-toc` tool. You can modify the GitHub Actions workflow to check if `markdown-toc` is already installed before attempting to install it.
- **Check and Install markdown-toc**: This step checks if `markdown-toc` is already installed using the `command -v markdown-toc` command. If it is not found, it installs `markdown-toc`; otherwise, it skips the installation. This ensures that `markdown-toc` is only installed if it is not already present, optimizing the workflow. Save some bandwidth, may be!
- **Generate TOC**: Runs `markdown-toc` to update the TOC in `README.md`.
- **Commit changes**: Commits and pushes the updated `README.md` back to the repository.

This workflow will automatically update the TOC in your `README.md` file whenever changes are pushed to the `main` branch.








---

---

---

---

---



