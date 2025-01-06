## Welcome to Git and Github at ChaiCode Cohert!

This documentation is for you to go throught the git and github commands we use at **ChaiCode Cohert**.

> Following the documentation will help you get familiar with the methodology to follow while commiting or handling a ticket, this follows a standardized approach to use so that its easier for every developer to have a streamline workflow to handle git and github.

---

## Understanding Git

Git is a VCS **Version Control System** which helps in maintaining and tracking of files and directories.

### Understanding the 3 states of files.

1. Working Directory
2. Staging Area
3. git directory (Repository)

The working directory has all the files that are present.

Those files once git is initialized moves tovwards the staging area, then moves to towards commit

---

> git init

Running git init initializes an empty Git repository in the current folder, allowing files and directories to be tracked by Git.

---

![Git files work flow](image.png)

### Add a file to staging area

_staging area is the 1st part of git process, 2nd is git commit and 3rd is git push_

## Staging Area

> `git add myfile.txt`

This will add myfile.txt to the staging area, making it ready for a commit.

> `git add .`

This command adds all the files and directories present in the folder to the staging area.

**_The git way_**

![Write -> add -> commit](image-1.png)

Git works on the following cycle where we first write the code and then add the files to staging area where they will be monitored for the changes and modifications.

Finally we commit those changes to the desired _branch_ we want to commit it to.

The entirety of Git works on this basic principle. **write** => **add** => **commit**

---

> `git status`

This command tells us about the current files that are beign tracked and are there any modifications made to the currently tracked files.

The files have **M** meaning modified **A** meaning ready for the commit. Symbols attached to it.

---

> `git commit -m "first commit"`

This commits a already stagged file/s to a commit which generates a hash value for that commit which marks as a point to which we can return back to.

This also means that if we do an buggy edit to the program we can safely revert back to a funcnality at which it was working.

---

> `git log`

This logs up the commits that we have made.

This shows the date, time, message and user who made those commits, and can be tracked down to the particular state or instance.

This shows the hash value which is used in there.

---

> `git log -oneline`

Gives a single line commit data only showing the initial hash characters and the message in one line

> git cat-file _-value_ **hash code**

### values

-t
Instead of the content, show the object type identified by object.

-s
Instead of the content, show the object size identified by object.

-e
Exit with zero status if object exists and is a valid object.

-p
Pretty-print the contents of <object> based on its type.

---

> `git branch`

Shows the current branch and all the availabel branches present.

> `git branch abc`

Creates a new branch names abc which can be used to maybe addition of alternate feature or new ideas to be tested before releasing in main branch

---

> `git push `

Pushes the branch to the github repo which was initialised with.

---

> `git clone *repo-name*`

Clones a repository into a newly created directory.

> `git pull`

Fetches from and integrates with another repository or a local branch.

---

> `git stash`

Temporarily shelves (or stashes) changes you've made to your working directory.

---

> `git diff`

Shows changes between commits, commit and working tree, etc.

---

> `git merge *branch-name*`

Joins tow or more development histories together.

---

> `git rebase *branch-name*`

Reapplies commits on top of another base tip.

---

> `git revert `

Creates a new commit that undoes the changes made by a previous commit.

---

> `git checkout *branch*`

Checkout moves to a particular branch you want to go to.

---

### Guidlines for making a commit

- The commit should be made in an authoritative tone, like an superior ordering a sub-ordinate.

- The commits tone should be past tense

      e.g. -> Use the present tense ("Add feature" not "Added feature").

- Capitalize the first letter

- Use prefixes like `fix: `, `feat: `, `chore: `, `docs:` for categorization.

- `feat: Add tea selection feature fix: Resolve login issue for tea enthusists docs: README with chai varieties`

### Best Practices:

- Emphaize the importance of regular commits.

- Encourage the use of descriptive commit messages.

- Explain the importance of pulling updates retularly to avoid conflicts.
