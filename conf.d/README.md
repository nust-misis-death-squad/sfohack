Конфиг файлы.
- `nginx` - конфиги для сырого и ssl реверс прокси. Деплой:
  ``` bash
  cp sfohack.conf /etc/nginx/sites-available/default
  nginx -t && systemctl restart nginx
  ```
- `docker` - конфиги для докера. Деплой:
  ``` bash
  cp docker/docker-composer.yml ../
  cp docker/Dockerfile ../
  cd ../
  docker-compose up -d
  ```
- `supervisord` - конфиг для supervisord. Деплой: 
  ``` bash
  cp supervisord/sfohack.conf /etc/supervisor/conf.d/
  supervisorctl reread
  supervisorctl update
  ``` 
- `systemd` - конфиг для systemd. Деплой: 
  ``` bash
  cp systemd//sfohack.service /etc/systemd/system/
  systemstl enable sfohack
  systemstl start sfohack
  ```