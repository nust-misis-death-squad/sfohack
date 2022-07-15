rm -rf /var/www/html
cp frontend/ /var/www/html
systemctl restart nginx.service
