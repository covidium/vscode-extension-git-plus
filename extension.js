const vscode = require('vscode');

/**
** @param {vscode.ExtensionContext} context
**/


function activate(context) {

  console.log('Congratulations, your extension "git-plus" is now active!');

  let GPgitAdd = vscode.commands.registerCommand('extension.GPgitAdd', function() {
    return vscode.commands.executeCommand("git.stage").then(() => {
      vscode.window.showInformationMessage('Changes added!');
    });
  });

  let GPgitAddAll = vscode.commands.registerCommand('extension.GPgitAddAll', function() {
    return vscode.commands.executeCommand("git.stageAll").then(() => {
      vscode.window.showInformationMessage('All changes added!');
    });
  });

  let GPgitAddAndCommit = vscode.commands.registerCommand('extension.GPgitAddAndCommit', function() {
    return vscode.commands.executeCommand("git.stage").then(() => {
      return vscode.commands.executeCommand("git.commitStaged").then(() => {
        vscode.window.showInformationMessage('Changes added and commited!');
      });
    });
  });

  let GPgitAddAllAndCommit = vscode.commands.registerCommand('extension.GPgitAddAllAndCommit', function() {
    return vscode.commands.executeCommand("git.stageAll").then(() => {
      return vscode.commands.executeCommand("git.commitStaged").then(() => {
        vscode.window.showInformationMessage('All changes added and commited!');
      });
    });
  });

  let GPgitAddAndCommitAndPush = vscode.commands.registerCommand('extension.GPgitAddAndCommitAndPush', function() {
    return vscode.commands.executeCommand("git.stage").then(() => {
      return vscode.commands.executeCommand("git.commitStaged").then(() => {
        return vscode.commands.executeCommand("git.sync").then(() => {
          vscode.window.showInformationMessage('Changes pushed!');
        })
      });
    });
  });

  let GPgitAddAllAndCommitAndPush = vscode.commands.registerCommand('extension.GPgitAddAllAndCommitAndPush', function() {
    return vscode.commands.executeCommand("git.stageAll").then(() => {
      return vscode.commands.executeCommand("git.commitStaged").then(() => {
        return vscode.commands.executeCommand("git.sync").then(() => {
          vscode.window.showInformationMessage('All changes pushed!');
        })
      });
    });
  });

  context.subscriptions.push(GPgitAdd, GPgitAddAll, GPgitAddAndCommit, GPgitAddAllAndCommit, GPgitAddAndCommitAndPush, GPgitAddAllAndCommitAndPush);

}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
