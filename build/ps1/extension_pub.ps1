npm run build_all_prod

$tag = git describe --tags --abbrev=0

gh release create $tag release/*.zip --title "$tag" --notes " "