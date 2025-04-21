# Short Commit Hash Copy

A VS Code extension that automatically copies the short commit hash to your clipboard when you make a commit. Perfect for developers who frequently need to reference commit hashes in their workflow.

## The Story Behind This Extension

As a developer who frequently delivers JavaScript files and scripts to client websites, I found myself constantly needing to reference commit hashes. The workflow typically involved:

1. Make changes to a script
2. Commit the changes
3. Navigate to GitHub
4. Copy the commit hash
5. Use that hash in the script delivery process

This manual process was time-consuming and interrupted my workflow, especially when working across different editors like VS Code, Cursor, or WindSurf. I needed a way to instantly grab the commit hash right after making a commit, without leaving my editor.

## Features

- **Automatic Copy**: Automatically copies the short commit hash to your clipboard whenever you make a new commit
- **Manual Copy**: Use the keyboard shortcut `Cmd+Shift+H` (macOS) or `Ctrl+Shift+H` (Windows/Linux) to copy the latest commit hash at any time
- **Status Notifications**: Shows a notification when a commit hash is copied to your clipboard
- **Git Integration**: Seamlessly works with Git repositories in your workspace

## Installation

1. Open VS Code
2. Go to the Extensions view (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for "Short Commit Hash Copy"
4. Click Install

## Usage

The extension works in two ways:

1. **Automatic Mode**: Every time you make a commit, the short hash is automatically copied to your clipboard
2. **Manual Mode**: Press `Cmd+Shift+H` (macOS) or `Ctrl+Shift+H` (Windows/Linux) to copy the latest commit hash

When a hash is copied, you'll see a notification in VS Code confirming the action.

## Requirements

- VS Code 1.96.0 or higher
- Git installed and configured in your workspace

## Extension Settings

This extension contributes the following settings:

- `shortCommitHashCopy.enableAutoCopy`: Enable/disable automatic copying of commit hash when making a new commit (default: `true`)

## Known Issues

None at this time. If you find any issues, please report them on our [GitHub repository](https://github.com/austin-thesing/short-commit-hash-copy).

## Release Notes

### 0.0.1

Initial release:

- Automatic commit hash copying
- Manual copy via keyboard shortcut
- Notification system for copy actions

## License

MIT

---

**Enjoy!** 🚀

Made with ❤️ by [Design X Develop](https://designxdevelop.com)  
Follow me on Twitter [@Austin Thesing](https://twitter.com/austinthesing)
