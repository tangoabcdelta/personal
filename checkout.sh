#!/bin/bash

# set permission for this file: chmod +x file-name.sh


# Function to check if there are any uncommitted changes
function has_uncommitted_changes() {
    git diff-index --quiet HEAD -- || return 0
    git diff-files --quiet || return 0
    git ls-files --other --exclude-standard --directory --no-empty-directory --error-unmatch . >/dev/null 2>&1 || return 0
    return 1
}

# Function to perform the required actions in each directory
function process_directory() {
    cd "$1" || return

    echo "Processing directory: $PWD"

    # Check if the current directory is a git repository
    if [[ -d ".git" ]]; then
        # Check if there are any uncommitted changes
        # if has_uncommitted_changes; then
        #     echo "Error: There are uncommitted changes in $PWD. Resolve the conflicts manually."
        #     return
        # fi

        # Perform git actions
        git status
        git add .
        git stash
        git fetch -a
        git checkout main || git checkout master
        git pull --rebase
        git stash pop
        git stash clear
        yarn install

        # Check if the pull succeeded
        if [[ $? -ne 0 ]]; then
            echo "Error: There was a problem pulling changes in $PWD. Resolve the conflicts manually."
            return
        fi
    else
        echo "Error: $PWD is not a git repository."
    fi

    echo "Completed processing directory: $PWD"
    echo
}

# Main script execution
# parent_directory="/path/to/parent/folder"
parent_directory="~/Documents/Projects/"


# Check if the parent directory exists
if [[ ! -d "$parent_directory" ]]; then
    echo "Error: The parent directory does not exist."
    exit 1
fi

# Loop through each sub-directory in the parent directory
for directory in "$parent_directory"/*; do
    if [[ -d "$directory" ]]; then
        process_directory "$directory"
    fi
done
