---
title: Git
description: Learn to version local and remote code repositories
date: '2022-10-25'
image: /images/git.jpg
categories:
  - Git
  - GitHub
published: true
---

<script>
  import Heading from "../components/heading.svelte"
  import Tag from "../components/tag.svelte"
</script>

![Git commits graphical view](/images/git.jpg)

<Heading str="Introduction" />

Git is a command line tool created by Linux Torvalds—the creator of Linux—for managing code repositories, specifically versioning and collaboration. It allows developers to track changes to source code, rollback to previous commits, and isolate feature development in sandboxed branches. Modern codebase remote storage platforms, e.g., GitHub, use Git to enable international collaboration.

### Prerequisites

Install Git on the local machine with one of the follow platform-specific commands.

Windows:

```ps1
choco install git
```

macOS:

```zsh
brew install git
```

Linux:

```bash
sudo apt install git
```

<Heading str='Authentication' />

GitHub, the repository cloud storage owned by Microsoft, now requires developers to authenticate their machines with SSH keys for added security. The official [online tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) covers all steps to generate an SSH key and add it to a GitHub account. These steps have been consolidated below for convenience.

### Generating an SSH key

<Tag msg='For Windows users, the following commands require a bash-like shell program, such as Git Bash, which is a separate terminal program installed alongside the Git toolchain. You can find this program in the search menu.' />

First, create an SSH key with the email address tied to the GitHub account:

```bash
# replace email address
ssh-keygen -t ed25519 -C "account@example.com"
```

When prompted for a filename, press enter to accept the default. Choose a security passphrase at the next prompt or, alternatively, press enter to proceed without a passphrase.

<Tag msg='If you choose a security passphrase, it will be required for every future commit.' />

Start the background SSH agent:

```bash
eval "$(ssh-agent -s)"
```

Add the SSH private key to the agent:

```bash
ssh-add ~/.ssh/id_ed25519
```

Copy the SSH public key to the clipboard:

```bash
clip < ~/.ssh/id_ed25519.pub
```

If you are not using Git Bash, and the `clip` utility is not installed in your toolchain, then you will probably receive the error `command not found: clip`. In this case, you may simply print the contents of `~/.ssh/id_ed25519.pub` to the console and copy the text key manually:

```bash
cat ~/.ssh/id_ed25519.pub
```

This key must be added to the authorized SSH key list in the GitHub account settings. More detailed instructions for listing authorized keys can be found at the [online tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

<Heading str='Repositories' />

Often, the first step to managing a project is to create or clone a git repository. GitHub is the most common remote repository web application, allowing developers to store large code bases, track changes, and collaborate. Before creating a new repository, you may wish to change the initial branch default name to "main". This setting only needs to be changed once and, though not strictly necessary, may help to avoid extra steps when initializing future repositories. To update the default branch name:

```bash
# only needs to be executed once
git config --global init.defaultBranch main
```

To create a git repository from a local project directory:

```bash
# navigate to project directory
git init
```

In most cases, the first step may be to identify specific files or directories to ignore from tracking. The relative path names of these files and directories can be added to a special gitignore file, which is located in the project root:

```bash
# many developers choose to ignore directories that host virtual environments
echo venv >> .gitignore
```

At this point, the repository is ready to be committed:

```bash
git add -A
git commit -m "First commit message"
```

On GitHub, create a new empty repository. Then return to the console and push the code base to the remote server:

```bash
git remote add origin git@github.com:username/reponame
git push -u origin main
```

Likewise, to clone a repository from GitHub:

```bash
git clone git@github.com:username/reponame
```

<Heading str='Commits' />

In git, a commit deposits new or modified code to the repository, usually with a subject line or description of the changes.

To check the status of current changes:

```bash
git status
```

To inspect individual files:

```bash
git diff filename
```

To add changes to a commit:

```bash
# add all files with changes
git add -A
# add an individual file
git add filename
# add parts of an individual file (patch level)
git add -p filename
```

Using `commit` with the `-p` flag will start an interactive prompt that steps through each group of changes—a group being adjacent lines of code—with the option to add that group to the index. In this way, the developer can better associate changes to a commit.

In general, it is recommended to separate changes into individual commits based on topic. Once changes are staged for a commit:

```bash
# commit changes with full description
git commit
# alternatively, use a brief inline message
git commit -m "Brief description of changes"
```

Using `commit` with no parameters will open a text editor, either a console-based editor like Vim or a standalone application like Notepad, for a description of the changes. The first line is reserved for the **subject**, which briefly summarizes the commit, while all subsequent lines belong to the **body** for more detailed comments. As an example, to add a new Python file that manages a serial connection:

```text
Class to manage external devices connected via serial

Custom class inherits Serial class from pyserial. It includes a modified read method that strips whitespace, e.g., '/r/n', from incoming serial data, as well as a modified write method that adds a newline character to any command string passed as an argument.
```

<Tag msg='Git uses Vim as its default text editor. Though powerful, Vim tends to be less popular among younger developers. Fortunately, git provides the ability to change the default editor in the core configuration file.' />

To change the default text editor:

```bash
# change to nano
git config --global core.editor "nano"
# change to vs code
git config --global core.editor "code --wait"
```

To update the default username and email used for commits:

```bash
git config --global user.name username
git config --global user.email address
```

Alternatively, to specify the username and email for an individual repository:

```bash
git config user.name username
git config user.email address
```

Or, to specify the username and email for an individual commit:

```bash
git commit --author="username email"
```

To view all global configurations:

```bash
git config --global --edit
```

If you want to edit the last commit before pushing to remote storage, i.e., GitHub:

```bash
git commit --amend
```

Committed changes can now be sent to remote storage:

```bash
git push
```

Lastly, to switch between local branches without committing changes:

```bash
git stash
```

<Heading str='Branches' />

### Creating branches

The first branch created when initializing a repository is the `main` branch. This branch serves as the project root and, though not always recommended for collaborative work, may be renamed. Developers create separate daughter branches, where specific features are developed and tested, to prevent breaking changes from entering the project root.

To see a list of local branches on a repository:

```bash
git branch
```

To see a list of local and remote branches:

```bash
# use fetch to update the repository based on remote changes
git fetch
git branch -a
```

To create a new branch on an existing project:

```bash
git branch branchname
```

To switch between branches:

```bash
git checkout branchname
```

To immediately switch to a new branch:

```bash
git checkout -b branchname
```

To push changes to a new remote branch upstream:

```bash
git push --set-upstream origin branchname
```

### Deleting branches

When "trimming" branches, it is often desired to remove both the local and remote instances.

```bash
# delete remote branch where remote name is origin
git push -d origin branchname
# delete local branch instance
git branch -d branchname
# force local branch deletion
git branch -D
```

In the above command set, the first command deletes the remote branch, which shares the same name as the local branch. The `-d` option is an alias for `--delete`. Similarly, the `-D` option is an alias for `--delete --force`, which will delete the local branch regardless of its merge status—unmerged branches throw an error when the user attempts deletion.

After trimming branches, the local list of remote branches may need to be updated manually to reflect the changes.

```bash
# update local records
git remote update origin --prune
# check that the branch list reflects recent changes
git branch -a
```

### Renaming branches

To rename a branch, first update the name of the local branch, then push the "new" renamed branch and delete the old version.

```bash
# navigate to branch
git checkout old-branchname
# rename local branch
git branch -m new-branchname
# push branch to remote origin
git push origin -u new-branchname
# delete old remote branch
git push origin -d old-branchname
```

### Merging branches

Merging is generally reserved for a feature that has matured to the point where it is ready to be added to another branch. As an example, to merge the changes in branch `dev` to `main`:

```bash
# switch to main branch
git checkout main
# merge changes from dev branch
git merge dev
```

Sometimes, conflicts arise when merging two branches, i.e., both branches have diverged and contain conflicting code blocks. In this case, one option is to simply undo the merge and reevaluate:

```bash
git merge --abort
```

Otherwise, you will have to manually edit the source code to determine which set of changes should persist. Then, you will have to create a new commit to formally complete the merge process.

<Heading str='Submodules' />

[Submodules](https://www.git-scm.com/book/en/v2/Git-Tools-Submodules) are one way to incorporate code from other projects that exist as git repositories. This is especially useful if the other repository contains library source code used across several projects. To add another repository as a submodule:

```bash
# inside project directory
git submodule add ssh://github.com/account/reponame
```

This command will add the submodule repository directory to the current project, as well as some hidden configuration files that help git distinguish the submodule from other subdirectories with source code. When working outside the submodule directory, its contents will not be tracked.

To clone a project with existing submodules:

```bash
git clone ssh://github.com/account/reponame
cd reponame
git submodule init
git submodule update
```

As a shorthand to replace the above command set:

```bash
git clone --recurse-submodules ssh://github.com/account/reponame
```

If the project was cloned without the `--recurse-submodules` parameter, the `git submodule init` and `git submodule update` steps can be combined as `git submodule update --init`. Alternatively, to initialize, fetch, and checkout any nested submodules:

```bash
git submodule update --init --recursive
```

Lastly, to update existing submodules with changes:

```bash
git submodule update --remote
```

Occassionally, older repositories may contain git submodules with https authentication. In some cases, it may be necessary to convert existing submodules from https to ssh:

```bash
perl -i -p -e 's|https://(.*?)/|git@\\1:|g' .gitmodules
```
