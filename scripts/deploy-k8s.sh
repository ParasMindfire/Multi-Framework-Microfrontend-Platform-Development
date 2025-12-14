#!/bin/bash

echo "Deploying to Kubernetes..."

kubectl apply -f k8s/namespace.yaml

kubectl apply -f k8s/postgres-deployment.yaml

echo "Waiting for PostgreSQL to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres -n skycart --timeout=120s

kubectl apply -f k8s/backend-deployment.yaml

kubectl apply -f k8s/dashboard-deployment.yaml
kubectl apply -f k8s/inventory-deployment.yaml
kubectl apply -f k8s/analytics-deployment.yaml

kubectl apply -f k8s/shell-deployment.yaml

echo "Deployment complete!"
echo "Access the application at: http://localhost (once LoadBalancer assigns external IP)"