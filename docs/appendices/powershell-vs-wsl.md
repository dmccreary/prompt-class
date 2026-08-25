# PowerShell vs. WSL

*Two shells walk into a terminal. Only one of them has ever met `sed`.*

!!! mascot-welcome "Let's Talk Shells!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Polly waving welcome">
    Time to talk to AI — and to the operating system underneath it! If you're on Windows and setting up Claude Code or Claude Desktop to automate your daily tasks, you'll hit a fork in the road almost immediately: do you let your AI agent drive **Windows PowerShell**, or do you install the **Windows Subsystem for Linux (WSL)** and let it drive a real Linux shell instead? Let's sort out which one earns a permanent spot on your machine.

## Why This Decision Matters

Every time your AI agent runs a command — installing a package, moving a file, publishing a website — it has to translate your request into an actual shell command. Most of the automation scripts, coding tutorials, and AI-agent skills in the world were written assuming a POSIX shell like `bash`. That's not a Windows-vs-Linux culture war opinion; it's just a fact of where 30+ years of tooling history landed.

PowerShell is a genuinely powerful, modern shell — arguably more consistent and object-oriented than `bash` in some ways. But it's a different dialect, with different punctuation, different built-in commands, and different assumptions about what a "pipe" passes between programs. When an AI agent reaches for a Unix-flavored command out of habit, PowerShell either errors out or does something subtly different than intended.

!!! mascot-thinking "A Thought Worth Perching On"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Polly thinking">
    Here's the "aha!" moment: `bash` and PowerShell aren't just two spellings of the same shell. `bash` pipes flow **plain text** from one program to the next. PowerShell pipes flow **structured .NET objects**. That's a genuinely nice design for Windows-native scripting — but it means a command an AI agent copies from a tutorial, a GitHub README, or its own training data (almost always written for `bash`) can fail in ways that have nothing to do with the task itself and everything to do with dialect mismatch.

## The Tradeoffs at a Glance

| | WSL (Linux shell on Windows) | PowerShell (native Windows shell) |
|---|---|---|
| **Setup** | One-time install (`wsl --install`), then a restart | Already installed on every Windows machine |
| **Matches AI tooling defaults** | Yes — most agent skills, install scripts, and examples assume `bash` | No — commands need Windows-specific rewrites |
| **Package managers** | `apt`, `pip`, `npm`, `conda` all behave like they do on Mac/Linux tutorials | Windows equivalents (`winget`, `choco`) exist but aren't what most tutorials show |
| **File paths** | Forward slashes, case-sensitive, POSIX-style (`/home/dan/projects`) | Backslashes, case-insensitive, Windows-style (`C:\Users\Dan\projects`) |
| **Access to Windows-native features** | Limited — no direct registry, COM, or Windows service access | Full — registry, Active Directory, IIS, Office automation |
| **Speed on Windows files** | Slower when working across the WSL/Windows filesystem boundary (`/mnt/c/...`) | Native — no boundary to cross |
| **Error rate with AI-generated commands** | Lower — commands generally "just work" as written | Higher — quoting, aliases, and pipe semantics differ enough to trip up copy-pasted commands |

**The short version:** if your goal is "let my AI agent automate my daily tasks with the fewest surprises," WSL is the safer default. If your task specifically needs to touch Windows itself — the registry, a Windows service, Active Directory — PowerShell is the right (and sometimes only) tool.

### Interactive Comparison

Hover over any highlighted cell below for a concrete command example.

<iframe src="../../sims/powershell-vs-wsl-comparison/main.html" height="692px" width="100%" scrolling="no" style="border: none;"></iframe>

[Open the PowerShell vs. WSL Comparison Infographic Fullscreen](../sims/powershell-vs-wsl-comparison/main.html){ .md-button }

!!! mascot-tip "Polly's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Polly sharing a tip">
    Words matter — let's get them right! You don't have to pick a side forever. Install WSL for your everyday AI-driven automation (file management, git, publishing your website), and keep PowerShell around for the rare moment you need to do something Windows-specific, like managing a Windows service. Most people end up using WSL 90% of the time.

## Getting Set Up

### Installing WSL

From PowerShell (run as Administrator, one time only):

```powershell
wsl --install
```

This installs WSL2 along with a default Ubuntu distribution, then prompts for a restart. After restarting, you launch a Linux terminal by typing `wsl` from the Start menu or from within PowerShell — no dual-boot, no separate machine, just a Linux environment living alongside Windows.

### Already Have PowerShell

Nothing to install — it ships with Windows. Just open it from the Start menu.

!!! mascot-warning "Don't Skip This"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Polly giving a warning">
    I've seen this go wrong more times than I've molted feathers, and trust me, that's a lot: people install WSL and then keep working with their project files under `C:\Users\...` instead of moving them into WSL's own filesystem (`~/`, which is really `\\wsl$\Ubuntu\home\...`). That cross-filesystem access is slow and occasionally flaky. Once you commit to WSL, keep your project's git repo *inside* the Linux filesystem, not on the Windows side.

## Simple Tasks, Side by Side

Here's the same handful of everyday tasks, done both ways. Notice how many of the WSL commands are exactly what you'd type on a Mac — that's the whole point.

### List files in a directory

=== "WSL (bash)"

    ```bash
    ls -la
    ```

=== "PowerShell"

    ```powershell
    Get-ChildItem -Force
    # or the shorter alias
    ls -Force
    ```

### Search inside files for a word

=== "WSL (bash)"

    ```bash
    grep -r "gh-deploy" .
    ```

=== "PowerShell"

    ```powershell
    Select-String -Path * -Pattern "gh-deploy" -Recurse
    ```

### Create a new folder and move into it

=== "WSL (bash)"

    ```bash
    mkdir new-project && cd new-project
    ```

=== "PowerShell"

    ```powershell
    New-Item -ItemType Directory -Name "new-project"
    Set-Location new-project
    ```

### Find and delete every `.tmp` file

=== "WSL (bash)"

    ```bash
    find . -name "*.tmp" -delete
    ```

=== "PowerShell"

    ```powershell
    Get-ChildItem -Recurse -Filter *.tmp | Remove-Item
    ```

### Check if a Python virtual environment tool is installed

=== "WSL (bash)"

    ```bash
    which python3 && python3 --version
    ```

=== "PowerShell"

    ```powershell
    Get-Command python
    python --version
    ```

Notice the pattern: the WSL column is almost always shorter and matches what you'd find in any online tutorial, Stack Overflow answer, or AI-generated snippet. The PowerShell column usually needs its own, Windows-specific translation — and that translation step is exactly where errors creep in when an agent is moving fast.

## The Real Example: Publishing This Book with `mkdocs gh-deploy`

This entire textbook is built with MkDocs and published to GitHub Pages with a single shell command: `mkdocs gh-deploy`. It's a great real-world test case because it involves several steps chained together — activating a Python environment, then building and pushing a static site.

### Publishing from WSL

```bash
# Activate the conda environment that has mkdocs installed
conda activate mkdocs

# Build the site and push it to the gh-pages branch
mkdocs gh-deploy
```

That's it. Two lines. This works identically to how it would work on a Mac or a Linux CI server, because it *is* Linux underneath. If you've ever followed a `mkdocs` tutorial written by someone on a Mac (most of them), you can paste their commands straight into WSL and they'll run.

### Publishing from PowerShell

```powershell
# Activate the conda environment (note the different activation command)
conda activate mkdocs

# Build the site and push it to the gh-pages branch
mkdocs gh-deploy
```

Interesting twist: `mkdocs gh-deploy` itself is a Python console script, so it actually runs the same way in both shells once the environment is active — Python tools tend to be well-behaved cross-platform citizens. The friction shows up *around* the command, not in it:

- If your conda/pip install hit a permissions snag, the fix in PowerShell often involves `Set-ExecutionPolicy` to allow scripts to run — a step that doesn't exist in WSL at all.
- If `mkdocs` isn't on your `PATH`, PowerShell's error message and fix (`$env:PATH`, editing System Environment Variables through a GUI) look completely different from the WSL fix (editing `~/.bashrc` and running `export PATH=...`).
- Git authentication for the push that `gh-deploy` performs behind the scenes sometimes behaves differently with Windows Credential Manager versus a Linux SSH key or credential helper — one more place PowerShell users hit a wall that WSL users don't.

!!! mascot-celebration "Two Lines, Zero Drama"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Polly celebrating">
    Use your words — and use the *right shell* for them! Once you're in WSL, `conda activate mkdocs` followed by `mkdocs gh-deploy` is the entire publishing pipeline for this book. No PATH archaeology, no execution-policy prompts, no "why does this GitHub tutorial not match my screen." Just two lines and a live site.

## Bottom Line for AI-Driven Automation

If you're setting up a Windows machine so an AI agent can handle your daily tasks — file wrangling, running dev tools, publishing a site — install WSL first. It gives your agent the shell environment that most of its training, tooling, and skills already assume, which means fewer errors and less time spent translating commands after the fact. Keep PowerShell in your back pocket for the moments you specifically need Windows itself, not as your everyday driver.

!!! mascot-encourage "You've Got This"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Polly cheering the class on">
    If juggling two shells feels like one more thing to learn on top of prompt engineering itself, that's fair — but you've got this, fellow prompt crafters. Ten minutes installing WSL now saves you dozens of confusing error messages later, and it means every "just run this command" answer your AI agent gives you actually works on the first try.
