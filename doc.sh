#!/usr/bin/env bash
yarn doc
git checkout gh-pages
mvc -f doc/* ./
git add .
git commit -m " "
git push
git checkout master
