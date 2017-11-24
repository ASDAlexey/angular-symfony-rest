#!/usr/bin/env sh
set -e # Prevents script from running if there are any errors.
git branch -D $1 # Clear local branch to avoid conflicts
git stash save # Stashes everything away incase you didn't commit them
npm run build # Step 2, insert your build script here
REV=`git rev-parse HEAD` # Gets commit hash as message
git checkout $1 # Step 3
git rm -rf . # Step 4
git checkout $2 -- .gitignore # Step 5
mv dist/* . && rm -rf dist # Step 6
git add . # Step 7
git commit -m "deployed $REV" # Step 8
git push origin +$1 # Step 9
git checkout $2 # Step 10
#git stash pop # Applies previously saved stash so you can continue working on changes. Once applied, removes stash
