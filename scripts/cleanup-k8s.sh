#!/bin/bash

set -e

echo "🗑️  Cleaning up Kubernetes resources..."
echo "======================================="

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

safe_delete() {
    local file=$1
    if [ -f "$file" ]; then
        echo -e "${YELLOW}Deleting resources from $file...${NC}"
        kubectl delete -f "$file" --ignore-not-found=true
    else
        echo -e "${RED}File not found: $file${NC}"
    fi
}

safe_delete "k8s/shell-deployment.yaml"
safe_delete "k8s/analytics-deployment.yaml"
safe_delete "k8s/inventory-deployment.yaml"
safe_delete "k8s/dashboard-deployment.yaml"
safe_delete "k8s/backend-deployment.yaml"

echo -e "${YELLOW}Waiting for pods to terminate...${NC}"
sleep 10

safe_delete "k8s/postgres-deployment.yaml"

echo -e "${YELLOW}Deleting namespace...${NC}"
kubectl delete namespace skycart --ignore-not-found=true --timeout=60s

echo ""
echo -e "${GREEN}✅ Cleanup complete!${NC}"
echo ""
echo "Remaining resources:"
kubectl get all -n skycart 2>/dev/null || echo "Namespace deleted successfully"