# Short Commit Hash Copy

A VS Code extension that automatically copies the short GitHub commit hash to your clipboard whenever you make a new commit.

## Features

- Automatically copies the short commit hash to your clipboard after each commit
- Provides a command to manually copy the latest short commit hash
- Shows notifications when a hash is copied

## Requirements

- Git must be installed and accessible in your PATH
- VS Code Git extension must be enabled

## How it works

This extension:
1. Monitors your Git repositories for new commits
2. When a new commit is detected, it extracts the short commit hash (7 characters)
3. Automatically copies this hash to your clipboard
4. Shows a notification with the copied hash

## Extension Settings

This extension doesn't have any settings yet.

## Known Issues

- None reported yet

## Release Notes

### 0.0.1

Initial release:
- Auto-copy short commit hash on commit
- Manual command to copy latest short hash

## Development

### Building the Extension

```bash
# Install dependencies
npm install

# Compile the TypeScript
npm run compile

# Watch for changes during development
npm run watch
```

### Packaging the Extension

```bash
# Install vsce if you don't have it
npm install -g @vscode/vsce

# Package the extension
vsce package
```

## License

MIT
