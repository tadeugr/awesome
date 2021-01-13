debug:
	DEBUG=search:* npm start

up:
	cd dev; docker-compose up -d
	node search/meili.js

stop:
	cd dev; docker-compose stop

rm:
	make stop
	cd dev; docker-compose rm