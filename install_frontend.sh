sudo rm -rf /var/www/html
cd frontend/ || exit
node -v
npm install
npm run build
sudo cp -r build/ /var/www/html
sudo systemctl restart nginx.service
