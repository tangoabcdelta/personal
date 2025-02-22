# My Personal Repository

---

This repository contains various projects and code samples that I have worked on. It includes scripts, experiments, and other miscellaneous files.

Feel free to explore and use any of the code provided here. Contributions and feedback are welcome.


---






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

This setup will send a decorated notification to your Teams channel whenever there is a push to the `main` branch.
You can customize the Adaptive Card content as needed.

