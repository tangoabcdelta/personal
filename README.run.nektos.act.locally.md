# How to run

## Installation and Running

- Install Nektos/Act using home brew
- Test for version to verify its installation

```bash
brew install act
act --version
```

- `CD` into the root of your working directory where your github actions are located and run the following:

```bash
# List available jobs in the .github/workflows folder
act -l
```

### Run docker daemon or docker desktop

- Open Docker desktop in your window,
- Check if your Docker service is started.

```bash
# for linux using systemctl
systemctl start docker
systemctl status docker
```

### Configuration
- `act` CLI generates the `.actrc` file in home directory for configuration.
- If it isn't already there, then create it
- The `~/.actrc` file contains the mapping of the Docker images
- To install other Docker images, remove the `~/.actrc` file and re-run the act CLI to install the different Docker images.
- Following are different aliases that can be set against a name e.g. `ubuntu-latest` can be pointed to `summerwind/actions-runner-dind:v2.303.0-ubuntu-22.04-3417c5a`

```bash
# .actrc
# -P ubuntu-latest=node:16.20.2-alpine3.18
-P ubuntu-latest=summerwind/actions-runner-dind:v2.303.0-ubuntu-22.04-3417c5a
-P ubuntu-22.04=node:16-bullseye-slim
-P ubuntu-20.04=node:16-buster-slim
-P ubuntu-18.04=node:16-buster-slim
```



### Dispatching action

- Create the `events.json` at the root
- If you use an apple chip mac, you will need to pass `--container-architecture linux/amd64` as an additional parameter
- **Read more** about Events that trigger workflows: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows
  
**Run actions locally:**

```bash
act workflow_dispatch -e events.json --container-architecture linux/amd64
```

**Remember**:
- Executing these commands will run one or more workflow jobs. If you **do not wish** to run some jobs, just change their extensions or delete them (**do not** commit these changes).
- In the very-first run act, it's slow as it downloads the docker image.

## Other usages



```bash
# list all jobs that are triggered by the pull request event
act push -l

# find job name and run it e.g.
act -j name_of_job
act --job <name-of-your-job>

# draws available workflow jobs in your terminal as a graph
act --graph

```





## Environment Variables

- Create a new `.env` file
- `act` CLI automatically load the variables from the `.env` file.
- You can access it using `${{ env.VAR_NAME }}` inside the action yaml file
- You can pass a custom `.env` file e.g. `act --env-file=my-custom.env`

- For secrets, create a `.secrets` file
- `act` CLI automatically loads it as well and can be accessed with `${{secrets.APP_SECRET}}` notations in the Yaml file.
- You can pass custom secrets as well using `act --secret-file=my-custom.secrets` 

**Example:**
```yaml
# .github/workflows/test.yml

name: Learn environment secrets 

on: pull_request

jobs:
  show:
    runs-on: ubuntu-latest
    steps:
      - name: Show env
        run: echo "App SECRET ${{ secrets.APP_SECRET }}"
      - name: Show varibale
        run: echo "App ID ${{ secrets.APP_ID }}"
```

