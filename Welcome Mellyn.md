# Vibe Coding Office Hours: Kickoff Guide

Welcome! This guide will help you and your friends get set up fast so you can focus on building, learning, and having fun together.

---

## 1. Setting Up Windsurf

**What is Windsurf?**  
Windsurf is a collaborative coding platform that makes it easy to build, deploy, and share web projects.

**Steps:**
1. Go to [Windsurf](https://windsurf.ai) and sign up for an account.
2. Download and install the Windsurf desktop app (Windows/Mac/Linux).
3. Open the app and log in with your account.
4. Connect your GitHub or GitLab account for easier project management.

---

## 2. Setting Up Python

**Why Python?**  
Python is a beginner-friendly language that’s great for quick projects, automation, and web apps.

**Steps:**
1. Download Python from [python.org/downloads](https://python.org/downloads).
2. Run the installer. On the first screen, check “Add Python to PATH”, then click Install.
3. Open a terminal (Command Prompt or PowerShell) and run:  
   ```
   python --version
   ```
   You should see something like `Python 3.12.x`.

---

## 3. Setting Up PowerShell

**What is PowerShell?**  
PowerShell is a powerful terminal for Windows, great for running commands and scripts.

**Steps:**
1. Press `Win + X` and select “Windows PowerShell” or “Terminal”.
2. (Optional) Install [Windows Terminal](https://aka.ms/terminal) for a better experience.

---

## 4. Connecting Windsurf with Git

**Why Git?**  
Git helps you track changes, collaborate, and never lose your work.

**Steps:**
1. In Windsurf, open or create a project.
2. Go to “Settings” > “Version Control” and connect your GitHub/GitLab account.
3. Authorize Windsurf to access your repositories.

---

## 5. Using Git to Store and Track Changes

**Basic Git Commands (Terminal):**
- `git status` – See what’s changed.
- `git add .` – Stage all changes.
- `git commit -m "Your message"` – Save your changes.
- `git push` – Upload changes to the remote repo.

**Steps (Terminal):**
1. Open a terminal in your project folder.
2. Run:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. Now your code is backed up and shareable!

---

## 6. Committing Changes from Windsurf (No Terminal Needed!)

You don’t have to use the terminal every time you want to save your work! Windsurf (and VS Code) has a built-in Source Control panel that makes committing changes easy:

**Steps:**
1. Click the Source Control icon (the branch icon) on the sidebar.
2. You’ll see a list of changed files. Review them by clicking each file.
3. Type a commit message in the box at the top (e.g., `Add new feature` or `Fix bug`).
4. Click the checkmark (✓) or the **Commit** button to save your changes.
5. To upload your changes to GitHub or GitLab, click the “sync” icon or run `git push` from the panel.

**When to Use the Terminal:**
- For advanced Git commands (like branching, merging, or fixing conflicts), you might still need the terminal.
- For everyday work, the Source Control panel is all you need!

---


## 6. Why Creating a Project Directory Matters (A Real-World Example)

Sometimes, the simplest step is the most important: making sure you have a dedicated folder (directory) for your project! Here’s a real story from this very guide:

> When I started writing this kickoff guide, I tried to save it in a new folder called `vibe-coding-office-hours`. But since the folder didn’t exist yet, my assistant couldn’t save the file until I (the user) specifically said, “Hey, you need to create that directory first!” Only then did everything work smoothly.

**Lesson:**
- Always create a new directory for your project before adding files. This keeps things organized and avoids errors.
- You can create a folder in Windows by opening a terminal and running:
  ```
  mkdir my-new-project
  ```
- Or, right-click in File Explorer and choose **New > Folder**.

**Pro Tip:**
If you ever get a “cannot find the path specified” error, double-check that your folder exists!

---

## 9. Working With Multiple Projects at Once (VS Code & Windsurf Workspaces)

If you want to work on several projects at the same time—like you saw in your earlier screenshot—you’ll want to use a workspace instead of just opening a folder. Here’s how:

### Why Use a Workspace?
- Opening a single folder closes all other projects.
- A workspace lets you keep multiple project folders open in the same window.

### How to Set Up a Workspace
1. **Add Folders to Workspace:**
   - Go to `File > Add Folder to Workspace...`
   - Select each project folder you want to work on.
2. **Save Your Workspace:**
   - Go to `File > Save Workspace As...`
   - Save the `.code-workspace` file somewhere easy to find.
3. **Reopen Your Workspace Later:**
   - Open the `.code-workspace` file, and all your projects will appear together!

**Pro Tip:**
If you accidentally close your workspace by opening a folder directly, just reopen your workspace file to get all your projects back.

---

## 10. Quick Tips

- Don’t be afraid to ask questions—everyone starts somewhere!
- Share your screen and pair up for fun and learning.
- Celebrate small wins and cool bugs.

---

Let’s get vibing!
