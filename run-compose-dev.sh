# Need to add api key and url environment variables?

export SECRET_KEY=abc123
export DEBUG=True
export POSTGRES_DB=coin_db
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export PCGS_API_KEY=$1


COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10
docker exec roll_tracker_prod-api-1 python /src/manage.py makemigrations 
docker exec roll_tracker_prod-api-1  python /src/manage.py migrate
docker exec roll_tracker_prod-api-1 python /src/manage.py loaddata coin_data