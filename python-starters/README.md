# Python Starters

## Welcome

## Guides

#### Launch JSON configuration

- The launch.json file in Visual Studio Code (VS Code) is used to configure debugging sessions for various programming languages, including Python.
- It allows you to customize how your Python code is launched and debugged.

##### Key aspects of Python launch.json configuration:

- Creation: You can create a launch.json file by going to the "Run and Debug" view in VS Code and clicking on "create a launch.json file." When prompted, select "Python File" to generate a basic configuration. This file is typically stored in the .vscode folder within your workspace.
- Basic Configuration: A typical launch.json for Python will include:
  - "name": A descriptive name for the configuration.
  - "type": Set to "python" for Python debugging.
  - "request": Usually "launch" to start a new process.
  - "program": Specifies the path to the Python file you want to run. Often set to "${file}" to debug the currently active file.
  - "console": Determines where the program's output and input are handled. Common options include:
    - "integratedTerminal": (Default) Uses VS Code's integrated terminal. Supports input.
    - "externalTerminal": Opens a separate console window. Supports input.
    - "internalConsole": Uses the VS Code Debug Console (not suitable for programs requiring input).

###### Customization:

  - When experiencing a "timeout waiting for debugger connection" or "timed out waiting for debugger to spawn" error in Visual Studio Code while debugging Python applications on Windows, particularly when using a launch.json file, several solutions can be considered e.g. Increase Debugger Timeout in launch.json configuration. Add or modify the timeout property within your specific launch configuration in launch.json. This directly increases the time VS Code waits for the debugger to connect.
  - Environment Variable: Set the `DEBUGPY_PROCESS_SPAWN_TIMEOUT` environment variable in your user account or system settings to a higher value (e.g., 90 or 120 seconds). This globally affects the debugger spawn timeout.
  - Previous Debug Sessions: If using WSL or similar environments, ensure no previous debug sessions are still running and potentially occupying ports. Use commands like sudo kill -9 ps ax | grep python | grep <port_number> | cut -d' ' -f1 to terminate them if necessary.
  - `python.terminal.activateEnvironment`: In your VS Code settings.json, try setting "python.terminal.activateEnvironment": false. This can sometimes help if environment activation is causing delays.
  - Arguments ("args"): You can pass command-line arguments to your Python script by adding an "args" array, e.g., ["--arg1", "value1"]. If you want them to supplied on execution, then you can leave it as "${command:pickArgs}".
  - Environment Variables ("env" or "envFile"): Define environment variables directly in the launch.json using the "env" object or load them from a file using "envFile".
  - Working Directory ("cwd"): Specify the working directory for the launched program.
  - Python Interpreter ("pythonPath"): Explicitly define the path to the Python interpreter to use for debugging, if different from the default. Sometimes it might not be allowed. In windows, you can set your "pythonPath" to "~/AppData/Local/Microsoft/WindowsApps/python.exe" provided you have a bash shell installed and this assumes that your python is installed at C:\Users\$USER\AppData\Local\Microsoft\WindowsApps\python.exe directory
  - Module Launch ("module"): Instead of running a file, you can launch a Python module using the "module" property.

##### Multiple Configurations:

You can define multiple configurations within a single launch.json file, allowing you to easily switch between different debugging scenarios (e.g., debugging different files, testing with different arguments).
• Debugging Controls: Once configured, you can start debugging using the "Run and Debug" view or by pressing F5. You can set breakpoints, step through code (F10, F11), inspect variables, and control the execution flow.

AI responses may include mistakes.

To run a Python file in VS Code using a launch.json configuration, follow these steps:

• Open the Run and Debug View: Click the Run and Debug icon in the VS Code sidebar (the icon resembling a play button with a bug) or press Ctrl+Shift+D (Windows/Linux) or Cmd+Shift+D (macOS). [1]  
• Create/Open launch.json:
• If you don't have a launch.json file in your workspace's .vscode folder, click "create a launch.json file" or go to Run &gt; Open Configurations. [2]  
 • Select "Python Debugger" from the list of debuggers.
• Choose "Python File" from the configuration menu that appears. This will generate a basic launch.json file.

• Customize the Configuration (Optional):
• The generated launch.json will contain a default configuration named "Python: Current File".
• You can modify this configuration or add new ones to suit your needs. Common properties to adjust include:
• "name": A descriptive name for your configuration.
• "type": Should be "python".
• "request": Typically "launch" for running a program.
• "program": The path to the Python file you want to run. Use ${file} to run the currently open file, or a specific path like ${workspaceFolder}/your_script.py.
• "args": An array of command-line arguments to pass to your script.
• "console": Specifies where the output and input will appear (e.g., "integratedTerminal", "externalTerminal", "internalConsole").

    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Python: Current File",
                "type": "python",
                "request": "launch",
                "program": "${file}",
                "console": "integratedTerminal",
                "justMyCode": true
            },
            {
                "name": "Run Specific Script",
                "type": "python",
                "request": "launch",
                "program": "${workspaceFolder}/src/main.py",
                "args": ["--input", "data.txt"],
                "console": "integratedTerminal"
            }
        ]
    }

• Select and Run the Configuration:
• In the Run and Debug view, select the desired configuration from the dropdown menu at the top.
• Click the green play button (Start Debugging) next to the dropdown or press F5 to run the Python file with debugging, or Ctrl+F5 (Windows/Linux) or Cmd+F5 (macOS) to run without debugging.

VS Code will now execute your Python file according to the settings defined in the selected launch.json configuration.

AI responses may include mistakes.

[1] https://stackoverflow.com/questions/51244223/visual-studio-code-how-debug-python-script-with-arguments[2] https://code.visualstudio.com/docs/python/debugging

# Print Date/Time in Python using a custom Format

- To format a datetime object in Python using a custom format, the `strftime()` method is utilized.
- This method takes a format string as an argument, which consists of various directives (preceded by a `%` sign) representing different components of the date and time.
- **Example: **

```python
from datetime import datetime

# Get the current date and time
current_datetime = datetime.now()

# Define a custom format string
custom_format = "%Y-%m-%d %H:%M:%S %A"  # Year-Month-Day Hour:Minute:Second WeekdayName

# Format the datetime object
formatted_datetime = current_datetime.strftime(custom_format)

# Print the result
print(f"Formatted date and time: {formatted_datetime}")
```

##### Common Directives in Python:

- Year: `%Y` (full year, e.g., 2025), `%y` (two-digit year, e.g., 25)
- Month: `%m` (month as a zero-padded decimal number, e.g., 08), `%b` (abbreviated month name, e.g., Aug), `%B` (full month name, e.g., August)
- Day: `%d` (day of the month as a zero-padded decimal number, e.g., 13), `%j` (day of the year as a zero-padded decimal number, e.g., 225)
- Weekday: `%a` (abbreviated weekday name, e.g., Wed), `%A` (full weekday name, e.g., Wednesday)
- Hour: `%H` (hour in 24-hour format, e.g., 13), `%I` (hour in 12-hour format, e.g., 01)
- Minute: `%M` (minute as a zero-padded decimal number, e.g., 17)
- Second: `%S` (second as a zero-padded decimal number, e.g., 00)
- Microsecond: `%f` (microsecond as a zero-padded decimal number)
- AM/PM: `%p` (Locale's equivalent of AM/PM)
- Timezone: `%Z` (Time zone name or abbreviation), `%z` (UTC offset in the form +HHMM or -HHMM)

By combining these directives, a wide range of custom date and time formats can be achieved.

Thanks for the detailed breakdown—this kind of clarity makes debugging way easier. Based on what you’ve described, here’s what’s likely going wrong and how to fix it:

---

### 🧠 What's Happening

- You're using `"program": "${file}"`, which already points to `hello.py`.
- Then you're also passing `"args": ["hello.py"]`, which means you're effectively running `python hello.py hello.py`.
- VS Code launches the integrated terminal, but it’s not executing anything because the shell setup might be misaligned with how VS Code expects to run Python.
- Git Bash is your preferred shell, but VS Code might be defaulting to PowerShell for debug sessions, especially if Git Bash isn't properly registered for debugging.

---

### ✅ Fix the `launch.json`

Here’s a corrected version of your `launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Current File",
      "type": "debugpy",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal",
      "envFile": "${workspaceFolder}/.env",
      "cwd": "${workspaceFolder}",
      "justMyCode": true,
      "args": ["--your-arg", "value"] // Replace with actual arguments your script expects
    }
  ]
}
```

**Key Fixes:**

- Removed `"hello.py"` from `args`—you don’t need to pass the filename again.
- Ensure the arguments are relevant to what `hello.py` expects.

---

##### 🛠️ Make Git Bash Work with Debugging in Windows

VS Code doesn’t officially support Git Bash as the debug terminal, but you can try this workaround:

###### **Set Git Bash as default terminal:**

- Press command / ctrl + shift + P to open the command pallette
-

```json
"terminal.integrated.defaultProfile.windows": "Git Bash"
```

in your `settings.json`.

2. **Ensure Git Bash is registered in terminal profiles:**

   ```json
   "terminal.integrated.profiles.windows": {
     "Git Bash": {
       "path": "C:\\Program Files\\Git\\bin\\bash.exe",
       "args": ["--login"]
     }
   }
   ```

3. **Use `"console": "externalTerminal"`** in `launch.json` if `integratedTerminal` fails to work with Git Bash:
   ```json
   "console": "externalTerminal"
   ```

---

### 🧪 Test It

Once you’ve made these changes:

- Open `hello.py`
- Hit F5 to start debugging
- Confirm the terminal opens and runs the script with the expected arguments

---

If it still launches PowerShell or hangs, we can try forcing the terminal type or even using a task-based workaround to launch Git Bash manually before debugging. Want to go that route if this doesn’t work?

#### Linters in pyproject.toml

The pyproject.toml file, a standard for Python project configuration, can be used to configure various development tools, including linters. This provides a centralized and consistent way to manage linter settings across a project.

**How Linters are Configured in pyproject.toml:**

Linter configurations are typically placed within the [tool] table in pyproject.toml, followed by a sub-table named after the specific linter. For example, to configure the black linter, you would use [tool.black].

**Example Configuration for Black Linter:**

```python
[tool.black]
line-length = 88
target-version = ['py38']
include = '\.pyi?$'
exclude = '''
/(
    \.git
  | \.hg
  | \.mypy_cache
  | \.tox
  | \.venv
  | _build
  | buck-out
  | build
  | dist
)/
'''
```

**Benefits of Using pyproject.toml for Linter Configuration:**

-   Centralized Configuration: All project-related configurations, including linter settings, are in one place.
-   Consistency: Ensures that all developers working on the project use the same linter settings, leading to consistent code style and quality.
-   Version Control: Linter configurations are version-controlled along with the project code.
-   Tool Agnostic: pyproject.toml is a standard, so different tools can read and apply the same configurations.

**Common Linters Configured with pyproject.toml:**

-   Black: A popular opinionated code formatter that acts as a linter by enforcing a consistent style.
-   Flake8: A wrapper around PyFlakes, pycodestyle, and McCabe, providing comprehensive linting.
-   isort: A tool for sorting imports alphabetically and automatically separating them into sections.
-   mypy: A static type checker for Python.

By utilizing pyproject.toml, you can effectively manage and enforce code quality standards within your Python projects.


To read a file in Python, the following steps are typically involved:

- Open the file: Use the open() function to open the file. This function takes the file path (or filename if it's in the current working directory) and the mode as arguments. For reading, the mode is usually 'r'.

```python
    file = open("example.txt", "r")
```

###### Read the content:

Once the file is open, you can read its content using various methods:

###### read():

Reads the entire content of the file and returns it as a single string.
```python
  content = file.read()
  print(content)
  file.close()
```

###### Close the file:

After reading, it is crucial to close the file using the `close()` method to release system resources and prevent potential data corruption.

```python
  file.close()
```

###### `readline()` function

This reads a single line from the file and returns it as a string. Subsequent calls to readline() will read the next line.

```python
  # readline
  line1 = file.readline()
  line2 = file.readline()
  print(line1)
  print(line2)
  file1.close()
  file2.close()
```

###### `readlines()`

This reads all lines from the file and returns them as a list of strings, where each string represents a line.

```python
  content = file.read()
  print(content)

  # readline
  line1 = file.readline()
  line2 = file.readline()
  print(line1)
  print(line2)

  # readlines
  lines = file.readlines()
  for line in lines:
    print(line.strip()) # .strip() removes newline characters

```

###### Iterating directly over the file object:**

This is often the most memory-efficient way to read a file line by line, especially for large files.

```python
  for line in file:
    print(line.strip())
```

**Using with open() (Recommended):**

The with open() statement is the preferred way to handle files in Python because it automatically handles closing the file, even if errors occur.

```python
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
# The file is automatically closed here
```

