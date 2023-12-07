#!/bin/sh
echo "Waiting for postgres..."

while ! nc -z $DATABASE_HOST 5432; do
  sleep 0.1
done

echo "PostgreSQL started"


yarn prisma migrate deploy

node dist/main