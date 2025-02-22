#!/bin/bash

echo "user: $USER"
echo "home path initialized to:" $HOME
echo
echo
# export HTTP_PROXY=http://<proxy hostname:port>
# export HTTP_PROXY=165.225:122.57:80 # defunkt
# export HTTP_PROXY=136.226.242.24:80
# export HTTPS_PROXY=https://<proxy hostname:port>
# export HTTPS_PROXY=165.225:122.57:443 # defunkt
# export HTTPS_PROXY=136.226.242.24:443

export NO_PROXY=localhost,127.0.0.1,10.96.0.0/12,192.168.59.0/24,192.168.49.0/24,192.168.39.0/24,192.168.0.0/16



export PATH=/usr/local/bin:$PATH
export PATH=/usr/bin:$PATH
export PATH=/usr/bin/:$PATH
export PATH=/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin:$PATH
export PATH=/opt/homebrew/bin:$PATH
export PATH=/opt/homebrew/bin/git-crypt:$PATH
export PATH=//Applications/Sublime\ Text.app/Contents/SharedSupport/bin/:$PATH
export PATH=$HOME/Documents/platform-tools/:$PATH
export PATH=$HOME/.maestro/bin:$PATH
export PATH=$HOME/.nvm/versions/node/v18.20.2/bin/node:$PATH
export PATH=$HOME/.rd/bin:$PATH
export PATH=$HOME/Library/Python/3.9:$PATH


# java
export M2_HOME=/user/apple/apache-maven-3.0.3
export M2=$M2_HOME/bin
export PATH=$M2:$PATH
export JAVA_HOME=/usr/java/jdk1.6.0_22

# wdio testing
export PATH=$HOME/Downloads/chrome\ drivers/chromedriver\ npm/bin:$PATH
export PATH=$HOME/Downloads/chrome\ drivers/chrome-mac-arm64/Google\ Chrome\ for\ Testing.app:$PATH
export CHROMEDRIVER_SKIP_DOWNLOAD=true
export CHROMEDRIVER_FILEPATH=$HOME/Documents/Projects/mca.ui.points/automation/node_modules/chromedriver/bin

# variable overrides
export NODE_TLS_REJECT_UNAUTHORIZED=1
export NODE_EXTRA_CA_CERTS=~/tesco_root_ca.pem

# example
alias lh='ls -lah'
alias k=kubectl

# this doesn't work
# complete -o default -F __start_kubectl k
_kubectl_completion() {
    local cur prev opts
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"
    opts=$(kubectl 2>/dev/null | awk '{print $1}')

    if [[ ${prev} == "kubectl" ]]; then
        COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
        return 0
    fi
}

complete -F _kubectl_completion kubectl


# execute this to reload
# source ~/.bash_profile


export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# This loads nvm

complete -C /opt/homebrew/bin/terraform terraform
alias python=/usr/bin/python3
export PATH=$PATH:$HOME/.maestro/bin



# bun completions
[ -s "$HOME/.bun/_bun" ] && source "$HOME/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# npm caching
alias npmi='sudo bun install --cache-min Infinity'
alias npmis='sudo bun install --save --cache-min Infinity'

# git
alias hist='git log --oneline --decorate --graph --pretty=format:"%h %d %s (%an) %ad" --all'
# git log --oneline --decorate --graph --pretty=format:"%h %d %s (%an) %ad" --all 
# history of the specified file or directory
# git log --oneline --decorate --graph --pretty=format:"%h %d %s (%an) %ad" "$@"
