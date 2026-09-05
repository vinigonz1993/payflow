.PHONY: dev test build

dev:
	cd backend && npm run start:dev

test:
	cd backend && npm test -- --coverage

build:
	cd backend && npm run build

db-start:
	docker start payflow-postgres 2>nul || docker run --name payflow-postgres \
		-e POSTGRES_USER=payflow \
		-e POSTGRES_PASSWORD=payflow \
		-e POSTGRES_DB=payflow \
		-p 5423:5432 \
		-d postgres:17

db-stop:
	docker stop payflow-postgres

db-remove:
	docker rm payflow-postgres