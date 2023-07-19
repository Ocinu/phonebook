.PHONY: all \
		help \
		build \
		up \
		down \
		logs \
		clean \
		reload \
		run \
		bash \
		makemigrations \
		static

RUN_IN_DEVTOOLS_CONTAINER=docker-compose run --rm backend
RUN_IN_DEVTOOLS_CONTAINER_PYTEST=docker-compose run --rm -e "TEST_RUNNER=pytest" backend

# target: all - Default target. Does nothing.
all:
	@echo "Hello $(LOGNAME), nothing to do by default"
	@echo "Try 'make help'"

# target: help - Display callable targets.
help:
	@egrep "^# target:" [Mm]akefile

# Docker commands
# target: build - build images.
build:
	set COMPOSE_DOCKER_CLI_BUILD=1
	set DOCKER_BUILDKIT=1
	docker-compose build

# target: up - up services.
up:
	docker-compose up -d

# target: down - destroy services.
down:
	docker-compose down

# target: logs - show logs from services.
logs:
	docker-compose logs -f

# target: clean - remove all dangling images and old volumes data.
clean:
	docker system prune -f

# target: stop - stop some services services.
stop:
	docker-compose stop

# target: reload - restart api service.
reload:
	docker-compose restart api

# target: bash - run bash in container
bash:
	$(RUN_IN_DEVTOOLS_CONTAINER) bash

# Django Commands
# target: makemigrations - run django makemigrations command.
makemigrations:
	$(RUN_IN_DEVTOOLS_CONTAINER) python manage.py makemigrations

# target: static - run django collect static command.
static:
	$(RUN_IN_DEVTOOLS_CONTAINER) python manage.py collectstatic --noinput


# target: migrate - run django migrate
migrate:
	$(RUN_IN_DEVTOOLS_CONTAINER) python manage.py migrate

# target: run - runs ./manage.py args in dev container. Example: make run shell
run:
	$(RUN_IN_DEVTOOLS_CONTAINER) python manage.py $(RUN_COMMAND_IN_DJANGO)
