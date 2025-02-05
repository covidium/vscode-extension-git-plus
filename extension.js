const vscode = require('vscode');

function activate(context) {
    console.log('Congratulations, your extension "git-plus" is now active!');

    // Access the built-in Git extension API.
    const gitExtension = vscode.extensions.getExtension('vscode.git');
    const git = gitExtension && gitExtension.exports && gitExtension.exports.getAPI(1);

    function getTicketPrefix() {
        if (!git || git.repositories.length === 0) {
            return '';
        }
        let repo = git.repositories[0];
        if (!repo.state.HEAD || !repo.state.HEAD.name) {
            return '';
        }
        let branchName = repo.state.HEAD.name;

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
        repo.inputBox.value = ticket + repo.inputBox.value;

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
