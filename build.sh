yarn build
rm -rf myriad
cp -r build myriad

sleep 0.3

cp build/index.html index.html.new
sed 's/\/static/build\/static/g' index.html.new > index.html.patched
rm index.html.new index.html
mv index.html.patched index.html