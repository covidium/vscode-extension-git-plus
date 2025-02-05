const vscode = require('vscode');

function activate(context) {
    console.log('Congratulations, your extension "git-plus" is now active!');

    // Access the built-in Git extension API.
    const gitExtension = vscode.extensions.getExtension('vscode.git');
    const git = gitExtension && gitExtension.exports && gitExtension.exports.getAPI(1);

    /**
     * Extracts the ticket from the branch name.
     * For example, if the branch is "feat/INFRA-123" it returns "[INFRA-123] ".
     */
    function getTicketPrefix() {
        if (!git || git.repositories.length === 0) {
            return '';
        }
        // Here we assume the first repository in the list.
        let repo = git.repositories[0];
        if (!repo.state.HEAD || !repo.state.HEAD.name) {
            return '';
        }
        let branchName = repo.state.HEAD.name;
        // This regex looks for a slash followed by a pattern like INFRA-123 or BUG-21.
        // Adjust the regex if your branch names differ.
        let match = branchName.match(/\/([^\/]+-[0-9]+)/);
        if (match && match[1]) {
            return `[${match[1]}] `;
        }
        return '';
    }

    // Helper function: Prepend the ticket to the commit message if not already there.
    function setCommitMessagePrefix() {
        if (!git || git.repositories.length === 0) {
            return;
        }
        let repo = git.repositories[0];
        let ticket = getTicketPrefix();
        // Only set the prefix if there isn't already a message.
        if (!repo.inputBox.value) {
            repo.inputBox.value = ticket;
        } else if (!repo.inputBox.value.startsWith(ticket)) {
            repo.inputBox.value = ticket + repo.inputBox.value;
        }
    }

    // Example command: stage changes, then commit with the prefixed message.
    let GPgitAddAndCommit = vscode.commands.registerCommand('extension.GPgitAddAndCommit', function () {
        return vscode.commands.executeCommand("git.stage").then(() => {
            // Set the commit message with the prefix
            setCommitMessagePrefix();
            return vscode.commands.executeCommand("git.commitStaged").then(() => {
                vscode.window.showInformationMessage('Changes added and committed!');
            });
        });
    });

    // You can apply the same idea to the other commit commands. For example:

    let GPgitAddAllAndCommit = vscode.commands.registerCommand('extension.GPgitAddAllAndCommit', function () {
        return vscode.commands.executeCommand("git.stageAll").then(() => {
            setCommitMessagePrefix();
            return vscode.commands.executeCommand("git.commitStaged").then(() => {
                vscode.window.showInformationMessage('All changes added and committed!');
            });
        });
    });

    let GPgitAddAndCommitAndPush = vscode.commands.registerCommand('extension.GPgitAddAndCommitAndPush', function () {
        return vscode.commands.executeCommand("git.stage").then(() => {
            setCommitMessagePrefix();
            return vscode.commands.executeCommand("git.commitStaged").then(() => {
                return vscode.commands.executeCommand("git.sync").then(() => {
                    vscode.window.showInformationMessage('Changes pushed!');
                });
            });
        });
    });

    let GPgitAddAllAndCommitAndPush = vscode.commands.registerCommand('extension.GPgitAddAllAndCommitAndPush', function () {
        return vscode.commands.executeCommand("git.stageAll").then(() => {
            setCommitMessagePrefix();
            return vscode.commands.executeCommand("git.commitStaged").then(() => {
                return vscode.commands.executeCommand("git.sync").then(() => {
                    vscode.window.showInformationMessage('All changes pushed!');
                });
            });
        });
    });

    // The non-commit commands remain unchanged.
    let GPgitAdd = vscode.commands.registerCommand('extension.GPgitAdd', function () {
        return vscode.commands.executeCommand("git.stage").then(() => {
            vscode.window.showInformationMessage('Changes added!');
        });
    });

    let GPgitAddAll = vscode.commands.registerCommand('extension.GPgitAddAll', function () {
        return vscode.commands.executeCommand("git.stageAll").then(() => {
            vscode.window.showInformationMessage('All changes added!');
        });
    });

    context.subscriptions.push(
        GPgitAdd,
        GPgitAddAll,
        GPgitAddAndCommit,
        GPgitAddAllAndCommit,
        GPgitAddAndCommitAndPush,
        GPgitAddAllAndCommitAndPush
    );
}

exports.activate = activate;

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
