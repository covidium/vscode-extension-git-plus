### vscode-extension-git-plus
A copy of Atom git-plus package but for VS Code.

This project is inspired by two existing projects.

##### Purpose
The purpose is to provide easy to use Git commands by concatenating multiple ones into a single execution.

##### How to use it
After you install the package in your Visual Studio Code open up the command palette `Ctrl+Shift+P` on Linux/Windows or `Command+Shift+P` on Mac

##### Available commands
|Name|Git equivalent|
|-|-|
|ga |`git add <current-file>`|
|gaa | `git add .` |
|gac | `git add <current-file> && git commit -m <message>` |
|gaac | `git add . && git commit -m <message>`|
|gacp | `git add <current-file> && git commit <message> -m && git push` |
|gaacp | `git add . && git commit -m <message> && git push` |

##### Inspired by:

- [Atom git-plus package](https://github.com/akonwi/git-plus)
- [Visual Studio Code git-add-commit-push](https://github.com/alfredbirk/vscode-extension-git-add-commit-push)
