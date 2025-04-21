import * as vscode from "vscode";
import * as clipboardy from "clipboardy";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Define interfaces for better type safety
interface GitExtension {
  getAPI(version: number): GitAPI;
}

interface GitAPI {
  repositories: Repository[];
  onDidChangeState: (callback: () => void) => vscode.Disposable;
  onDidOpenRepository: (callback: (repo: Repository) => void) => vscode.Disposable;
}

interface Repository {
  state: {
    onDidChange: (callback: () => void) => vscode.Disposable;
  };
}

// Keep track of disposables for cleanup
const disposables: vscode.Disposable[] = [];

export async function activate(context: vscode.ExtensionContext) {
  // Log activation with more details
  console.log('Extension "short-commit-hash-copy" is now active');
  console.log(`VS Code version: ${vscode.version}`);
  console.log(`Extension path: ${context.extensionPath}`);

  // Register the command to manually copy the short hash
  const disposable = vscode.commands.registerCommand("short-commit-hash-copy.copyHash", async () => {
    try {
      const hash = await getLatestShortCommitHash();
      if (hash) {
        await clipboardy.write(hash);
        vscode.window.showInformationMessage(`Short commit hash copied to clipboard: ${hash}`);
      } else {
        vscode.window.showWarningMessage("No commit hash found");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Error executing copyHash command: ${errorMessage}`);
      vscode.window.showErrorMessage(`Error: ${errorMessage}`);
    }
  });

  context.subscriptions.push(disposable);

  // Set up Git repository change listener
  const gitExtension = vscode.extensions.getExtension<GitExtension>("vscode.git");

  if (!gitExtension) {
    console.warn("Git extension not found");
    return;
  }

  try {
    const gitApi = gitExtension.exports.getAPI(1);

    if (gitApi) {
      // Listen for Git state changes
      disposables.push(
        gitApi.onDidChangeState(() => {
          checkForNewCommit();
        })
      );

      // Set up listeners for existing repositories
      gitApi.repositories.forEach(setupRepositoryListener);

      // Listen for new repositories
      disposables.push(
        gitApi.onDidOpenRepository((repo: Repository) => {
          setupRepositoryListener(repo);
        })
      );
    }
  } catch (error) {
    console.error("Failed to initialize Git API:", error);
  }

  // Add disposables to context subscriptions for cleanup
  context.subscriptions.push(...disposables);
}

// Keep track of the last commit hash to detect new commits
let lastCommitHash: string | null = null;

function setupRepositoryListener(repository: Repository): void {
  const disposable = repository.state.onDidChange(async () => {
    await checkForNewCommit();
  });
  disposables.push(disposable);
}

async function checkForNewCommit(): Promise<void> {
  try {
    console.log("Checking for new commit...");
    const currentHash = await getLatestShortCommitHash();
    const config = vscode.workspace.getConfiguration("shortCommitHashCopy");
    const autoCopyEnabled = config.get<boolean>("enableAutoCopy", true);

    console.log(`Current hash: ${currentHash}, Last hash: ${lastCommitHash}, Auto-copy enabled: ${autoCopyEnabled}`);

    // Only copy if auto-copy is enabled and we have a hash
    if (currentHash && autoCopyEnabled) {
      // If this is our first hash or it's different from the last one
      if (!lastCommitHash || currentHash !== lastCommitHash) {
        console.log("New commit detected, copying hash to clipboard...");
        await clipboardy.write(currentHash);
        vscode.window.showInformationMessage(`New commit detected! Short hash copied to clipboard: ${currentHash}`);
        lastCommitHash = currentHash;
        console.log("Hash copied successfully");
      } else {
        console.log("No new commit detected");
      }
    } else {
      console.log(`Skipping copy - Current hash exists: ${!!currentHash}, Auto-copy enabled: ${autoCopyEnabled}`);
    }
  } catch (error) {
    console.error("Error checking for new commit:", error);
  }
}

async function getLatestShortCommitHash(): Promise<string | null> {
  console.log("Attempting to get latest short commit hash...");
  try {
    // Get the current workspace folder
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      throw new Error("No workspace folder open");
    }

    console.log(`Executing git command in workspace: ${workspaceFolder.uri.fsPath}`);
    const { stdout } = await execAsync("git rev-parse --short HEAD", {
      cwd: workspaceFolder.uri.fsPath,
    });
    console.log(`Git command executed successfully`);

    const hash = stdout.trim();
    return hash || null;
  } catch (error) {
    console.error("Error getting commit hash:", error);
    return null;
  }
}

export function deactivate(): void {
  // Clean up all disposables
  disposables.forEach((d) => {
    try {
      d.dispose();
    } catch (error) {
      console.error("Error disposing:", error);
    }
  });
}
