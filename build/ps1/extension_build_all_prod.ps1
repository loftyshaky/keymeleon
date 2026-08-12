

rimraf dist
rimraf release/**/* --glob

npm run prod_exit_build
zip-a-folder ./dist ./release/windows.zip -d 'Keymeleon/'
rimraf dist
