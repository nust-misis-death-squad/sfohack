rm -rf /var/www/html
cp -r frontend/ /var/www/html
systemctl restart nginx.service
