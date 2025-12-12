#!/bin/bash

# Build all Docker images
echo "Building Docker images..."

# Build backend
docker build -t skycart/backend:latest -f apps/server/Dockerfile .

# Build dashboard
docker build -t skycart/dashboard:latest -f apps/mfe-dashboard/Dockerfile .

# Build inventory
docker build -t skycart/inventory:latest -f apps/mfe-inventory/Dockerfile .

# Build analytics
docker build -t skycart/analytics:latest -f apps/mfe-analytics/Dockerfile .

# Build shell
docker build -t skycart/shell:latest -f apps/shell/Dockerfile .

echo "All images built successfully!"