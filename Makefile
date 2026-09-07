.PHONY: dev test build

dev:
	cd backend && npm run start:dev

test-db:
	docker start test-payflow-postgres 2>nul || docker run --name test-payflow-postgres \
		-e POSTGRES_USER=test-payflow \
		-e POSTGRES_PASSWORD=test-payflow \
		-e POSTGRES_DB=test-payflow \
		-p 5421:5432 \
		-d postgres:17

test-migrations: test-db
	cd backend && set DATABASE_URL=postgresql://test-payflow:test-payflow@localhost:5421/test-payflow && npx prisma migrate deploy

test: test-migrations
	-cd backend && npm test
	docker rm -v -f test-payflow-postgres

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

lint:
	cd backend && npm run lint