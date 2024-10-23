 # Contributing to Blues Prompter

 **This document is in draft**

Welcome to Blues Prompter!

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

This is a little pet project of mine that I created for personal use, but as my ambitions for it grew I realised I was probably not the best person to tackle all the possible features, so I welcome the input and wisdom of the open source community to turn it into something really special and useful for performers everywhere.

## Code of Conduct
To follow, but basically, be nice! :smiley:

## How to Contribute

Contributions are made to this repo via Issues and Pull Requests (PRs). A few general guidelines that cover both:

- Search for existing Issues and PRs before creating your own.
- We welcome contributions to issues that are labeled as "help wanted" or "good first issue".
- If you want to contribute to an issue that doesn't already exist, please create a new issue before making any changes.
- Make sure your work aligns with the project's overarching goals.

## Getting Started

1. Fork the repository on GitHub.
2. Clone the fork to your local machine and set up the upstream remote:

   ```bash
   git clone https://github.com/mjkeeble/teleprompter.git
   cd [Your-Project-Name]
   git remote add upstream https://github.com/mjkeeble/teleprompter.git
   ```

3. If you cloned a while ago, get the latest changes from upstream:
    ```bash
    git checkout main
    git pull upstream main
    ```

4. Create a new branch (off the main branch) for your changes:
    ```bash
    git checkout -b your-branch-name
    ```

5. Make your changes, commit them, and push the branch to your fork.
    ```bash
    git add .
    git commit -m "Your detailed description of your changes."
    git push origin your-branch-name
    ```
6. Go to the GitHub page of your fork, and make a pull request:
    - Base branch should be main on the original owner’s repository.
    - Compare branch should be the branch you pushed to your fork.
    - Wait for the maintainer to review your PR, make changes if requested, and wait for it to get merged.

## :bug: Bugs and suggestions 
Bugs and suggestions should be submitted as Issues in the repo. Please provide as much information as possible.
When flagging bugs please provide as much information as possible to allow replication of the issue, at a minimum
  - describe the actual and desired/expected behaviour
  - circumstances under which the problem occurs
  - OS and browser used, including version numbers
  - NodeJS version number
  - suggestions to cure if you have any

and Pull Request Labels

This section lists the labels we use to help us track and manage issues and PRs.

bug - A bug in the project.
documentation - Improvements or additions to documentation.
enhancement - New features or improvements to existing features.
good first issue - Good for newcomers.
help wanted - Extra attention is needed.
question - Further information is requested.


```bash
npm install
```
```bash
npm run dev
```
Submitting a Pull Request
Include screenshots and animated GIFs in your pull request whenever possible.
Follow the style guidelines.
Write detailed commit messages.
If the PR fixes an issue, reference it in the PR description.
Thank you for contributing!
