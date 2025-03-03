
# ollama:latest
```bash
serve       Start ollama
create      Create a model from a Modelfile
show        Show information for a model
run         Run a model
stop        Stop a running model
pull        Pull a model from a registry
push        Push a model to a registry
list        List models
ps          List running models
cp          Copy a model
rm          Remove a model
help        Help about any command
```

# smollm:latest
Available Commands:

```bash
/set            Set session variables
/show           Show model information
/load <model>   Load a session or model
/save <model>   Save your current session
/clear          Clear session context
/bye            Exit
/?, /help       Help for a command
/? shortcuts    Help for keyboard shortcuts

/set parameter ...     Set a parameter
/set system <string>   Set system message
/set history           Enable history
/set nohistory         Disable history
/set wordwrap          Enable wordwrap
/set nowordwrap        Disable wordwrap
/set format json       Enable JSON mode
/set noformat          Disable formatting
/set verbose           Show LLM stats
/set quiet             Disable LLM stats

/show info         Show details for this model
/show license      Show model license
/show modelfile    Show Modelfile for this model
/show parameters   Show parameters for this model
/show system       Show system message
/show template     Show prompt template

```