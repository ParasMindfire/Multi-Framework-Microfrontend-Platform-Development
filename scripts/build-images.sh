#!/bin/bash
echo "Building Docker images..."

docker build -t skycart/backend:latest -f apps/server/Dockerfile .

docker build -t skycart/dashboard:latest -f apps/mfe-dashboard/Dockerfile .

docker build -t skycart/inventory:latest -f apps/mfe-inventory/Dockerfile .

docker build -t skycart/analytics:latest -f apps/mfe-analytics/Dockerfile .

docker build -t skycart/shell:latest -f apps/shell/Dockerfile .

echo "All images built successfully!"